// Development-only shape example. This module is not imported by the production build.
// Do not turn this into a real species record; use data/insect-schema.js as the contract.
export const devFixtureExample = Object.freeze({
  id: "example-not-a-real-record",
  scientificName: "Example scientific name",
  koreanName: "개발용 예시",
  taxonomy: { order: "Example order", family: "Example family" },
  appearancePeriod: { label: "example period", kind: "modern" },
  habitat: [], diet: "", size: { label: "", millimeters: null }, familiarityLevel: 1,
  keyAppearanceCues: [], gallery: [], sources: [], licenseStatus: "not for release", reviewStatus: "draft",
});

