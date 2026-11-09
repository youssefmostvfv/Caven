const fs = require("fs");

const files = ["products.html", "index.html"];
const soldOutImages = [
  "img/caps/caven-cap-light-blue.webp",
  "img/caps/caven-cap-purple.webp",
  "img/caps/caven-cap-royal-blue.webp",
  "img/caps/caven-cap-sage.webp",
];

files.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    soldOutImages.forEach((img) => {
      const regex = new RegExp(
        `(<div class="product-image-box"\\s*>\\s*)(<img src="${img}")`,
        "g",
      );
      content = content.replace(
        regex,
        `$1<span class="sold-out-badge">قريبا</span>\n                        $2`,
      );
    });
    fs.writeFileSync(file, content, "utf8");
  }
});
