const eleventySass = require("eleventy-sass");
const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
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
        urlPath: "/content/img",
        outputDir: "./public/content/img",
        sharpPngOptions: {
          progressive: true,
          quality: 85,
        },
        sharpJpegOptions: {
          progressive: true,
          quality: 85,
        }
        /*         filenameFormat: function (id, src, width, format, options) {
          const extension = path.extname(src);
          const name = path.basename(src, extension);

          return `${name}-${width}w.${format}`;
        } */
      });

      let lowsrc;
      let highsrc;
      let aspectRatio

      lowsrc = inputExtension == "png" ? metadata.png[0] : metadata.jpeg[0];
      highsrc =
        inputExtension == "png"
          ? metadata.png[metadata.png.length - 1]
          : metadata.jpeg[metadata.jpeg.length - 1];

          aspectRatio = `${lowsrc.width}/${lowsrc.height}`

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

  eleventyConfig.addPlugin(eleventySass, {
    compileOptions: {
      permalink: function (contents, inputPath) {
        return (data) =>
          data.page.filePathStem.replace(/^\/scss\//, "/css/") + ".css";
      },
    },
    sass: {
      style: "compressed",
      sourceMap: true,
    },
  });

  eleventyConfig.addPassthroughCopy("./CNAME");

  eleventyConfig.addPassthroughCopy("./src/styles");
  eleventyConfig.addWatchTarget("./src/styles/");

  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addWatchTarget("./src/js/");

  eleventyConfig.addWatchTarget("./src/content/");

  eleventyConfig.addPassthroughCopy("./src/content/video");

  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addWatchTarget("./img");

  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
