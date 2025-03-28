// Plugin Imports
const pluginDirectoryOutput = require("@11ty/eleventy-plugin-directory-output");
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");

// Filter Imports
const filterFormatDate = require("./src/config/filters/formatDate");

module.exports = function (eleventyConfig) {
  /**
   *  PLUGINS
   *      Adds additional eleventy functionality through official or community-created add-ons
   *      https://www.11ty.dev/docs/plugins/
   */

  // Provides benchmarks in the terminal when a website is built. Useful for diagnostics.
  // https://www.11ty.dev/docs/plugins/directory-output/
  eleventyConfig.addPlugin(pluginDirectoryOutput);

  // Allows navigation items to be defined in a scalable way via the front matter
  // https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(pluginEleventyNavigation);

  /**
   *  PASSTHROUGH'S
   *      Copy/paste non-template files straight to /public, without any interference from the eleventy engine
   *      https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("./src/assets/css");
  eleventyConfig.addPassthroughCopy("./src/assets/favicons");
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/images");
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/assets/svgs");
  eleventyConfig.addPassthroughCopy("./src/admin");
  eleventyConfig.addPassthroughCopy("src/_data/coupons.json");

  /**
   *  FILTERS
   *      Allows modification of data before it is outputted, denoted by {{ contentToPrint | filterName }}
   *          https://www.11ty.dev/docs/filters/
   */

  // Turns a date from ISO format to a more human-readable one
  eleventyConfig.addFilter("formatDate", filterFormatDate);

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
  };
};
