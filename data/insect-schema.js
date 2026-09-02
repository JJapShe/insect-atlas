/**
 * Insect Atlas species schema draft. Keep actual records in insects.js.
 * All provenance fields belong to the image/record review process, not UI copy.
 */
export const insectSchema = Object.freeze({
  id: "string: stable kebab-case id",
  scientificName: "string",
  koreanName: "string",
  taxonomy: { order: "string", family: "string" },
  appearancePeriod: { label: "string", kind: "geologic-or-modern" },
  habitat: ["string"],
  diet: "string",
  size: { label: "string", millimeters: "number | null" },
  familiarityLevel: "1 | 2 | 3 | 4",
  keyAppearanceCues: ["string"],
  gallery: [{ src: "project-local path", alt: "string", role: "representative | review | reference", provenance: { source: "string", license: "string", prompt: "string | null", seed: "string | null", workflow: "string", reviewStatus: "string" } }],
  sources: [{ label: "string", url: "string" }],
  licenseStatus: "string",
  reviewStatus: "draft | review | approved | rejected",
});

