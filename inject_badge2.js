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
            const regex = new RegExp(`(<img src="${img}")`, 'g');
            // Check if badge already exists before adding
            if (!content.includes(`<span class="sold-out-badge">نفذت الكمية</span>\n                        <img src="${img}"`)) {
                content = content.replace(regex, `<span class="sold-out-badge">نفذت الكمية</span>\n                        $1`);
            }
        });
        fs.writeFileSync(file, content, 'utf8');
    }
});
