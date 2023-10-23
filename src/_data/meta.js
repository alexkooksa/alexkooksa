module.exports = {
  env: process.env.ELEVENTY_ENV || "development",
  url: process.env.URL || "http://localhost:8080",
  siteName: "kooksa.codes",
  siteDescription: "",
  languages: [
    {
      label: "ru",
      code: "ru",
      long: "Русский",
      localeCode: "ru_RU",
    },
    {
      label: "en",
      code: "en",
      long: "English",
      localeCode: "en_EN",
    },
  ],
};
