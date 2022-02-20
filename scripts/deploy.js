const { writeFileSync } = require("fs");
const ghPages = require("gh-pages");

const options = {
  dotfiles: true,
};

// disable Jekyll
writeFileSync("./out/.nojekyll", "", "utf-8");

// publish *_*
ghPages.publish("out", options, () => console.log("Done!"));
