import type { PersonId, Relationship } from "@/mock/family";

export type LayoutNode = {
  id: PersonId;
  x: number;
  y: number;
  generation: number;
  groupId: string;
};

export type LayoutEdge = {
  id: string;
  kind: "spouse" | "parent";
  from: PersonId;
  to: PersonId;
};

export type TreeLayout = {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  nodeById: Map<PersonId, LayoutNode>;
  world: { width: number; height: number };
  meta: {
    generations: number;
    rowHeight: number;
    nodeWidth: number;
    nodeHeight: number;
  };
};

type LayoutConfig = {
  nodeWidth?: number;
  nodeHeight?: number;
  colGap?: number;
  rowGap?: number;
  padding?: number;
};

function ufMake<T extends string>() {
  const parent = new Map<T, T>();
  const rank = new Map<T, number>();

  const find = (x: T): T => {
    const p = parent.get(x);
    if (!p || p === x) {
      parent.set(x, x);
      rank.set(x, rank.get(x) ?? 0);
      return x;
    }
    const root = find(p);
    parent.set(x, root);
    return root;
  };

  const union = (a: T, b: T) => {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return;
    const rka = rank.get(ra) ?? 0;
    const rkb = rank.get(rb) ?? 0;
    if (rka < rkb) parent.set(ra, rb);
    else if (rka > rkb) parent.set(rb, ra);
    else {
      parent.set(rb, ra);
      rank.set(ra, rka + 1);
    }
  };

  return { find, union };
}

export function buildGenerationLayout(
  personIds: PersonId[],
  relationships: Relationship[],
  config: LayoutConfig = {},
): TreeLayout {
  const nodeWidth = config.nodeWidth ?? 232;
  const nodeHeight = config.nodeHeight ?? 84;
  const colGap = config.colGap ?? 44;
  const rowGap = config.rowGap ?? 170;
  const padding = config.padding ?? 160;

  const edges: LayoutEdge[] = relationships.map((r) => ({
    id: r.id,
    kind: r.type,
    from: r.fromPersonId,
    to: r.toPersonId,
  }));

  const parentsOf = new Map<PersonId, Set<PersonId>>();
  const childrenOf = new Map<PersonId, Set<PersonId>>();
  const spouseOf = new Map<PersonId, Set<PersonId>>();

  for (const id of personIds) {
    parentsOf.set(id, new Set());
    childrenOf.set(id, new Set());
    spouseOf.set(id, new Set());
  }

  for (const r of edges) {
    if (r.kind === "parent") {
      parentsOf.get(r.to)?.add(r.from);
      childrenOf.get(r.from)?.add(r.to);
    } else {
      spouseOf.get(r.from)?.add(r.to);
      spouseOf.get(r.to)?.add(r.from);
    }
  }

  // 1) Base generations from parent links
  const gen = new Map<PersonId, number>();
  for (const id of personIds) gen.set(id, 0);

  // Multiple passes; stable, deterministic, no jumping.
  for (let i = 0; i < personIds.length + 3; i++) {
    let changed = false;
    for (const r of edges) {
      if (r.kind !== "parent") continue;
      const gp = gen.get(r.from) ?? 0;
      const gc = gen.get(r.to) ?? 0;
      if (gc < gp + 1) {
        gen.set(r.to, gp + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  // 2) Spouse pairing groups (union-find)
  const uf = ufMake<PersonId>();
  for (const r of edges) if (r.kind === "spouse") uf.union(r.from, r.to);

  const membersByGroup = new Map<string, PersonId[]>();
  for (const id of personIds) {
    const root = uf.find(id);
    const key = `g_${root}`;
    const arr = membersByGroup.get(key) ?? [];
    arr.push(id);
    membersByGroup.set(key, arr);
  }
  for (const arr of membersByGroup.values()) arr.sort();

  // Align spouses to the earliest generation in their group.
  const groupGen = new Map<string, number>();
  for (const [g, members] of membersByGroup.entries()) {
    const gmin = Math.min(...members.map((m) => gen.get(m) ?? 0));
    groupGen.set(g, gmin);
    for (const m of members) gen.set(m, gmin);
  }

  const maxGen = Math.max(...personIds.map((id) => gen.get(id) ?? 0), 0);
  const generations = maxGen + 1;

  // 3) Sibling grouping keys: same parent set => stable grouping
  const parentKey = (id: PersonId) => {
    const ps = [...(parentsOf.get(id) ?? new Set())].sort();
    return ps.length ? ps.join("|") : `root:${id}`;
  };

  // 4) Build rows: order spouse-groups + singles with stable sort
  const rows: Array<Array<{ groupId: string; memberIds: PersonId[]; sortKey: string }>> = Array.from(
    { length: generations },
    () => [],
  );

  for (const [groupId, memberIds] of membersByGroup.entries()) {
    const g = groupGen.get(groupId) ?? 0;
    const sortKey = memberIds.join("|");
    rows[g].push({ groupId, memberIds, sortKey });
  }

  // Add “singletons” not in spouse group? (union-find will still create group of 1)
  for (const row of rows) {
    row.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
  }

  // Reorder within row to keep siblings close (by parentKey of first member’s children where possible)
  // Simple stable pass: sort by parentKey of self (or parents), then by sortKey.
  for (let g = 0; g < rows.length; g++) {
    rows[g].sort((a, b) => {
      const ak = parentKey(a.memberIds[0]!);
      const bk = parentKey(b.memberIds[0]!);
      const c = ak.localeCompare(bk);
      if (c !== 0) return c;
      return a.sortKey.localeCompare(b.sortKey);
    });
  }

  // 5) Assign coordinates
  const nodeById = new Map<PersonId, LayoutNode>();
  let worldWidth = 0;

  for (let g = 0; g < rows.length; g++) {
    const items = rows[g];
    const y = padding + g * rowGap;

    let rowX = padding;
    for (const item of items) {
      const memberCount = item.memberIds.length;
      const groupWidth = memberCount * nodeWidth + (memberCount - 1) * 18;
      const xStart = rowX;

      item.memberIds.forEach((id, idx) => {
        const x = xStart + idx * (nodeWidth + 18);
        nodeById.set(id, { id, x, y, generation: g, groupId: item.groupId });
      });

      rowX += groupWidth + colGap;
    }

    worldWidth = Math.max(worldWidth, rowX + padding);
  }

  const worldHeight = padding + (generations - 1) * rowGap + nodeHeight + padding;

  // 6) Center rows by shifting each generation to world center
  const centerX = worldWidth / 2;
  for (let g = 0; g < rows.length; g++) {
    const idsInRow = personIds.filter((id) => (gen.get(id) ?? 0) === g);
    if (!idsInRow.length) continue;
    const xs = idsInRow.map((id) => nodeById.get(id)!.x);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs) + nodeWidth;
    const rowCenter = (minX + maxX) / 2;
    const dx = centerX - rowCenter;
    for (const id of idsInRow) {
      const n = nodeById.get(id)!;
      nodeById.set(id, { ...n, x: n.x + dx });
    }
  }

  const nodes = [...nodeById.values()].sort((a, b) => a.id.localeCompare(b.id));

  return {
    nodes,
    edges,
    nodeById,
    world: { width: worldWidth, height: worldHeight },
    meta: { generations, rowHeight: rowGap, nodeWidth, nodeHeight },
  };
}

