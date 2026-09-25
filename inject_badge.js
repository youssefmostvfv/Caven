const fs = require('fs');

const files = ['products.html', 'index.html'];
const soldOutImages = [
    'img/caven-cap-light-blue.webp',
    'img/caven-cap-purple.webp',
    'img/caven-cap-royal-blue.webp',
    'img/caven-cap-sage.webp'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        soldOutImages.forEach(img => {
            const regex = new RegExp(`(<div class="product-image-box"\\s*>\\s*)(<img src="${img}")`, 'g');
            content = content.replace(regex, `$1<span class="sold-out-badge">نفذت الكمية</span>\n                        $2`);
        });
        fs.writeFileSync(file, content, 'utf8');
    }
});
