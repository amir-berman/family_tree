export type PersonId = `p_${string}`;

export type Person = {
  id: PersonId;
  fullNameHe: string;
  fullNameEn?: string;
  birthDate?: string; // ISO date (YYYY-MM-DD)
  deathDate?: string; // ISO date (YYYY-MM-DD)
  isDeceased?: boolean;
  memorialSymbol?: "rose";
  bioHe?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  accent?: "violet" | "sky" | "emerald" | "amber" | "rose";
};

export type RelationshipType = "parent" | "spouse";

export type Relationship = {
  id: `r_${string}`;
  type: RelationshipType;
  fromPersonId: PersonId;
  toPersonId: PersonId;
};

export type MediaType = "photo" | "video";

export type MediaItem = {
  id: `m_${string}`;
  type: MediaType;
  titleHe: string;
  createdAt: string; // ISO datetime
  url: string;
  thumbnailUrl?: string;
  personIds: PersonId[];
  year?: number;
};

export type FeedItemType = "memory" | "milestone";

export type FeedItem = {
  id: `f_${string}`;
  type: FeedItemType;
  titleHe: string;
  bodyHe?: string;
  createdAt: string; // ISO datetime
  personIds: PersonId[];
  mediaIds?: Array<MediaItem["id"]>;
  year?: number;
};

export const persons: Person[] = [
  {
    id: "p_lev",
    fullNameHe: "לב אלון",
    fullNameEn: "Lev Alon",
    birthDate: "1948-09-03",
    bioHe: "שקט מבחוץ, עולם שלם מבפנים. אוהב לכתוב סיפורים על אנשים.",
    accent: "violet",
  },
  {
    id: "p_maya",
    fullNameHe: "מאיה אלון",
    fullNameEn: "Maya Alon",
    birthDate: "1952-02-11",
    bioHe: "הלב של הבית. אוספת תמונות ורגעים קטנים שלא חוזרים.",
    isDeceased: true,
    memorialSymbol: "rose",
    deathDate: "2021-08-09",
    accent: "rose",
  },
  {
    id: "p_noa",
    fullNameHe: "נועה אלון",
    fullNameEn: "Noa Alon",
    birthDate: "1982-06-28",
    bioHe: "זוכרת תאריכים, ריחות ושירים. מחברת בין הדורות.",
    accent: "sky",
  },
  {
    id: "p_ilan",
    fullNameHe: "אילן אלון",
    fullNameEn: "Ilan Alon",
    birthDate: "1985-01-15",
    bioHe: "אוהב לצלם. מאמין שבכל משפחה יש יקום.",
    accent: "emerald",
  },
  {
    id: "p_yehuda",
    fullNameHe: "יהודה אלון",
    birthDate: "1922-04-16",
    deathDate: "1999-12-02",
    isDeceased: true,
    memorialSymbol: "rose",
    bioHe: "בנה בתים בידיים, אבל בעיקר בנה אנשים.",
    accent: "amber",
  },
  {
    id: "p_rina",
    fullNameHe: "רינה אלון",
    birthDate: "1926-09-21",
    deathDate: "2008-03-10",
    isDeceased: true,
    memorialSymbol: "rose",
    bioHe: "הייתה מחברת סיפורים לתוך אוכל ושולחן.",
    accent: "rose",
  },
  {
    id: "p_david",
    fullNameHe: "דוד כהן",
    birthDate: "1920-01-02",
    deathDate: "2001-06-14",
    isDeceased: true,
    memorialSymbol: "rose",
    bioHe: "אהב מוזיקה ישנה ושיחות ארוכות בלילה.",
    accent: "sky",
  },
  {
    id: "p_esther",
    fullNameHe: "אסתר כהן",
    birthDate: "1924-07-07",
    deathDate: "2016-11-20",
    isDeceased: true,
    memorialSymbol: "rose",
    bioHe: "השקט שלה היה סוג של כוח.",
    accent: "violet",
  },
  {
    id: "p_tamar",
    fullNameHe: "תמר אלון",
    birthDate: "1955-05-08",
    bioHe: "אחות של לב. תמיד יודעת למצוא את המילים הנכונות.",
    accent: "amber",
  },
  {
    id: "p_eitan",
    fullNameHe: "איתן אלון",
    birthDate: "1958-12-19",
    bioHe: "אח של לב. איש של דרך, ים, ורוח טובה.",
    accent: "emerald",
  },
  {
    id: "p_shai",
    fullNameHe: "שי אלון",
    birthDate: "1979-03-03",
    bioHe: "בן של תמר. אוהב לבנות דברים קטנים שעושים שמח.",
    accent: "sky",
  },
  {
    id: "p_gal",
    fullNameHe: "גל אלון",
    birthDate: "1981-09-12",
    bioHe: "בן של תמר. יותר מופנם, יותר עמוק.",
    accent: "violet",
  },
  {
    id: "p_lior",
    fullNameHe: "ליאור אלון",
    birthDate: "1987-11-02",
    bioHe: "בן של איתן. תמיד מצלמה ביד.",
    accent: "emerald",
  },
  {
    id: "p_dana",
    fullNameHe: "דנה אלון",
    birthDate: "1990-02-20",
    bioHe: "בת של איתן. מחברת בין אנשים בקלות.",
    accent: "rose",
  },
  {
    id: "p_yael",
    fullNameHe: "יעל אלון",
    birthDate: "2010-04-05",
    bioHe: "בת של נועה. סקרנית ואמיצה.",
    accent: "amber",
  },
  {
    id: "p_amit",
    fullNameHe: "עמית אלון",
    birthDate: "2013-08-18",
    bioHe: "בן של נועה. צוחק מהר, לומד מהר.",
    accent: "sky",
  },
  {
    id: "p_nadav",
    fullNameHe: "נדב אלון",
    birthDate: "2016-01-29",
    bioHe: "בן של אילן. אנרגיה בלי סוף.",
    accent: "emerald",
  },
  {
    id: "p_mika",
    fullNameHe: "מיקה אלון",
    birthDate: "2019-06-09",
    bioHe: "בת של אילן. שקטה, מציירת.",
    accent: "violet",
  },
  {
    id: "p_ronen",
    fullNameHe: "רונן לוי",
    birthDate: "1981-10-01",
    bioHe: "בן זוג של נועה. עוגן רגוע.",
    accent: "emerald",
  },
  {
    id: "p_neta",
    fullNameHe: "נטע לוי",
    birthDate: "1987-04-14",
    bioHe: "בת זוג של אילן. תמיד מביאה אור.",
    accent: "rose",
  },
];

export const relationships: Relationship[] = [
  { id: "r_yehuda_rina_spouse", type: "spouse", fromPersonId: "p_yehuda", toPersonId: "p_rina" },
  { id: "r_david_esther_spouse", type: "spouse", fromPersonId: "p_david", toPersonId: "p_esther" },

  { id: "r_yehuda_lev_parent", type: "parent", fromPersonId: "p_yehuda", toPersonId: "p_lev" },
  { id: "r_rina_lev_parent", type: "parent", fromPersonId: "p_rina", toPersonId: "p_lev" },
  { id: "r_yehuda_tamar_parent", type: "parent", fromPersonId: "p_yehuda", toPersonId: "p_tamar" },
  { id: "r_rina_tamar_parent", type: "parent", fromPersonId: "p_rina", toPersonId: "p_tamar" },
  { id: "r_yehuda_eitan_parent", type: "parent", fromPersonId: "p_yehuda", toPersonId: "p_eitan" },
  { id: "r_rina_eitan_parent", type: "parent", fromPersonId: "p_rina", toPersonId: "p_eitan" },

  { id: "r_lev_maya_spouse", type: "spouse", fromPersonId: "p_lev", toPersonId: "p_maya" },

  { id: "r_david_maya_parent", type: "parent", fromPersonId: "p_david", toPersonId: "p_maya" },
  { id: "r_esther_maya_parent", type: "parent", fromPersonId: "p_esther", toPersonId: "p_maya" },

  { id: "r_lev_noa_parent", type: "parent", fromPersonId: "p_lev", toPersonId: "p_noa" },
  { id: "r_maya_noa_parent", type: "parent", fromPersonId: "p_maya", toPersonId: "p_noa" },
  { id: "r_lev_ilan_parent", type: "parent", fromPersonId: "p_lev", toPersonId: "p_ilan" },
  { id: "r_maya_ilan_parent", type: "parent", fromPersonId: "p_maya", toPersonId: "p_ilan" },

  { id: "r_noa_ronen_spouse", type: "spouse", fromPersonId: "p_noa", toPersonId: "p_ronen" },
  { id: "r_noa_yael_parent", type: "parent", fromPersonId: "p_noa", toPersonId: "p_yael" },
  { id: "r_ronen_yael_parent", type: "parent", fromPersonId: "p_ronen", toPersonId: "p_yael" },
  { id: "r_noa_amit_parent", type: "parent", fromPersonId: "p_noa", toPersonId: "p_amit" },
  { id: "r_ronen_amit_parent", type: "parent", fromPersonId: "p_ronen", toPersonId: "p_amit" },

  { id: "r_ilan_neta_spouse", type: "spouse", fromPersonId: "p_ilan", toPersonId: "p_neta" },
  { id: "r_ilan_nadav_parent", type: "parent", fromPersonId: "p_ilan", toPersonId: "p_nadav" },
  { id: "r_neta_nadav_parent", type: "parent", fromPersonId: "p_neta", toPersonId: "p_nadav" },
  { id: "r_ilan_mika_parent", type: "parent", fromPersonId: "p_ilan", toPersonId: "p_mika" },
  { id: "r_neta_mika_parent", type: "parent", fromPersonId: "p_neta", toPersonId: "p_mika" },

  { id: "r_tamar_shai_parent", type: "parent", fromPersonId: "p_tamar", toPersonId: "p_shai" },
  { id: "r_tamar_gal_parent", type: "parent", fromPersonId: "p_tamar", toPersonId: "p_gal" },
  { id: "r_eitan_lior_parent", type: "parent", fromPersonId: "p_eitan", toPersonId: "p_lior" },
  { id: "r_eitan_dana_parent", type: "parent", fromPersonId: "p_eitan", toPersonId: "p_dana" },
];

export const mediaItems: MediaItem[] = [
  {
    id: "m_early_album",
    type: "photo",
    titleHe: "אלבום ישן — אור בחדר מדרגות",
    createdAt: "2001-05-14T20:14:00Z",
    url: "/",
    personIds: ["p_lev", "p_maya"],
    year: 2001,
  },
  {
    id: "m_wedding_reel",
    type: "video",
    titleHe: "קטע וידאו — צחוק של שבת",
    createdAt: "2012-11-03T19:40:00Z",
    url: "/",
    personIds: ["p_noa", "p_ilan"],
    year: 2012,
  },
];

export const feedItems: FeedItem[] = [
  {
    id: "f_memory_1",
    type: "memory",
    titleHe: "רגע קטן שנשאר גדול",
    bodyHe: "מצאנו צילום ישן בין ספרים. אף אחד לא זוכר מי צילם — אבל כולם זוכרים איך זה הרגיש.",
    createdAt: "2024-10-02T08:30:00Z",
    personIds: ["p_lev", "p_maya"],
    mediaIds: ["m_early_album"],
    year: 2024,
  },
  {
    id: "f_milestone_1",
    type: "milestone",
    titleHe: "יום הולדת — נועה",
    bodyHe: "עוד סיבוב סביב השמש, ועוד שכבה של סיפור.",
    createdAt: "2025-06-28T09:00:00Z",
    personIds: ["p_noa"],
    year: 2025,
  },
];

export function getPersonById(id: PersonId) {
  return persons.find((p) => p.id === id) ?? null;
}

export function getCloseRelatives(personId: PersonId) {
  const spouseIds = new Set<PersonId>();
  const parentIds = new Set<PersonId>();
  const childIds = new Set<PersonId>();

  for (const rel of relationships) {
    if (rel.type === "spouse") {
      if (rel.fromPersonId === personId) spouseIds.add(rel.toPersonId);
      if (rel.toPersonId === personId) spouseIds.add(rel.fromPersonId);
    }

    if (rel.type === "parent") {
      if (rel.toPersonId === personId) parentIds.add(rel.fromPersonId);
      if (rel.fromPersonId === personId) childIds.add(rel.toPersonId);
    }
  }

  return {
    spouses: [...spouseIds]
      .map((id) => getPersonById(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    parents: [...parentIds]
      .map((id) => getPersonById(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    children: [...childIds]
      .map((id) => getPersonById(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)),
  };
}

