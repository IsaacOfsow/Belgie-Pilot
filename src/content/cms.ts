/**
 * CMS- / MONDAY-DATAMODEL — de velden waarmee een artikel later automatisch binnenkomt.
 *
 * Flow (nog niet gekoppeld, zie docs/PILOT-STATUS.md):
 *   bron → scraper → Monday Newsmonitor → AI-selectie → productie → QC → publicatie → social → analytics
 *
 * De site toont alleen artikels met status "published". Alle andere statussen blijven intern.
 * Velden hoeven niet allemaal zichtbaar te zijn; ze staan klaar voor de koppeling.
 */

/** Publicatiestatus (Draft → … → Published / Rejected). */
export const statuses = ["draft", "ai_generated", "needs_review", "approved", "published", "rejected"] as const;
export type PublicationStatus = (typeof statuses)[number];
export const statusLabels: Record<PublicationStatus, string> = {
  draft: "Concept", ai_generated: "AI-gegenereerd", needs_review: "Nakijken nodig", approved: "Goedgekeurd", published: "Gepubliceerd", rejected: "Afgekeurd",
};

/** Urgentie zoals in de Newsmonitor. */
export const urgencies = ["normaal", "hoog", "breaking"] as const;
export type Urgency = (typeof urgencies)[number];
export const urgencyLabels: Record<Urgency, string> = { normaal: "Normaal", hoog: "Hoog", breaking: "Breaking" };

export type SocialStatus = "none" | "planned" | "posted";

/** Interne kwaliteitscontrole — niet publiek zichtbaar. */
export type QualityControl = { sourceChecked: boolean; factChecked: boolean; languageChecked: boolean; visualChecked: boolean };

/** Eén artikelrecord zoals het uit Monday / een CMS komt (snake_case = veldnamen in Monday). */
export type ArticleRecord = {
  id: string;
  title: string;
  slug: string;
  article_body: string; // alinea's gescheiden door een lege regel
  summary: string;
  category: string; // slug of label
  source_name: string;
  source_url: string;
  /** Laatst gecontroleerd (YYYY-MM-DD) — optioneel. */
  source_checked: string;
  image: string;
  publication_date: string; // YYYY-MM-DD of ISO
  publication_time: string; // HH:mm
  status: PublicationStatus;
  social_linkedin_text: string;
  social_facebook_text: string;
  social_status: SocialStatus;
  urgency: Urgency;
  language: string; // bv. nl-BE
  country: string;
  region: string;
  tags: string[];
  video_url: string;
  featured: boolean;
  breaking_news: boolean;
  qc: QualityControl;
};

/** Aliassen die de Monday-export gebruikt (de site begrijpt beide). */
export type ArticleRecordAliases = { article: string; photo: string; source: string; linkedin_text: string; facebook_text: string };

export const parseStatus = (v: unknown): PublicationStatus | null => {
  const s = String(v ?? "").toLowerCase().trim().replace(/[\s-]+/g, "_");
  return (statuses as readonly string[]).includes(s) ? (s as PublicationStatus) : null;
};

export const parseUrgency = (v: unknown): Urgency => {
  const s = String(v ?? "").toLowerCase().trim();
  return (urgencies as readonly string[]).includes(s) ? (s as Urgency) : "normaal";
};
