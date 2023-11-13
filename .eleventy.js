const eleventySass = require("eleventy-sass");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcssCriticalCSS = require("postcss-critical-css");
const Image = require("@11ty/eleventy-img");
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const fs = require("fs");
const fsExtra = require("fs-extra");
const cssutil = require("cssutil");

// const path = require("path");

module.exports = function (eleventyConfig) {
  console.log(`ENV:${process.env.ELEVENTY_ENV}`);

  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: "en",
  });

  eleventyConfig.addShortcode("i18n", async function (en, ru) {
    if (this.page.lang == "en") {
      return en;
    } else {
      return ru;
    }
  });

  //images processing

  eleventyConfig.addShortcode(
    "image",
    async function (src, cls, alt, widths, sizes = "100vw") {
      if (alt === undefined) {
        throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
      }

      let inputExtension = src.split(".").pop();

      let metadata = await Image(src, {
        widths: [...widths, null], // keep original resolution
        formats: ["avif", "webp", null], // keep original format
        urlPath: "/content/images",
        outputDir: "./public/content/images",
        sharpPngOptions: {
          progressive: true,
          quality: 85,
        },
        sharpJpegOptions: {
          progressive: true,
          quality: 85,
        },
        /*         filenameFormat: function (id, src, width, format, options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);

          return `${name}-${width}w.${format}`;
        } */
      });

      let lowsrc;
      let highsrc;
      let aspectRatio;

      lowsrc = inputExtension == "png" ? metadata.png[0] : metadata.jpeg[0];
      highsrc =
        inputExtension == "png"
          ? metadata.png[metadata.png.length - 1]
          : metadata.jpeg[metadata.jpeg.length - 1];

      aspectRatio = `${lowsrc.width}/${lowsrc.height}`;

      return `<picture style="aspect-ratio: ${aspectRatio}">
			${Object.values(metadata)
        .map((imageFormat) => {
          return `  <source type="${
            imageFormat[0].sourceType
          }" srcset="${imageFormat
            .map((entry) => entry.srcset)
            .join(", ")}" sizes="${sizes}">`;
        })
        .join("\n")}
				<img
					src="${highsrc.url}"
          class="${cls}"
          alt="${alt}"

					loading="lazy"
					decoding="async">
			</picture>`;
      /* width="${highsrc.width}"
          height="${highsrc.height}" */
    }
  );

  eleventyConfig.addPlugin(eleventySass, [
    {
      /*       compileOptions: {
        permalink: function(permalinkString, inputPath) {
          return (data) => {
            return data.page.filePathStem.replace(/^\/scss\//, "/css/") + ".css";
          };
        }
      }, */
      sass: {
        style: "compressed",
        sourceMap: true,
      },
    },
    {
      postcss: postcss([
        autoprefixer,
        // postcssCriticalCSS({
        // outputPath: "./public",
        // preserve: false,
        // }),
      ]),
      when: { ELEVENTY_ENV: "production" },
    },
  ]);

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy("./CNAME");

  eleventyConfig.addPassthroughCopy("./src/_styles");
  eleventyConfig.addWatchTarget("./src/_styles/");

  eleventyConfig.addPassthroughCopy("./src/_js");
  eleventyConfig.addWatchTarget("./src/_js/");

  eleventyConfig.addWatchTarget("./src/content/");

  eleventyConfig.addPassthroughCopy("./src/content/files");
  eleventyConfig.addPassthroughCopy("./src/content/video");
  eleventyConfig.addPassthroughCopy("./src/content/images");

  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addWatchTarget("./img");

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  eleventyConfig.on("eleventy.after", async ({}) => {
    // concat styles on production
    if (process.env.ELEVENTY_ENV == "production") {
      cssutil.build(
        ["./public/_styles/base.css", "./public/_styles/style.css"],
        function (e, css) {
          if (e) {
            throw e;
          }

          fs.writeFile("./public/_styles/bundle.css", css, function (e) {
            // Continue building
          });
        }
      );
    }

    // copy index.html to the root to avoid template duplicating (because there are no redirects at github pages)
    fsExtra.copy(
      "./public/en/index.html",
      "./public/index.html",
      { overwrite: true },
      (err) => {
        if (err) return console.error(err);
        console.log("index.html has been copied to the root");
      }
    );
  });

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layouts",
    },
  };
};
