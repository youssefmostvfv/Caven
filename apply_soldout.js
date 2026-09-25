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
        
        const cards = content.split('<div class="product-card"');
        let newContent = cards[0];
        
        for (let i = 1; i < cards.length; i++) {
            let cardStr = cards[i];
            let isSoldOut = false;
            
            for (const img of soldOutImages) {
                if (cardStr.includes(img)) {
                    isSoldOut = true;
                    break;
                }
            }
            
            if (isSoldOut && !cardStr.startsWith(' sold-out-card')) {
                // To avoid adding it multiple times if run repeatedly
                newContent += '<div class="product-card sold-out-card"' + cardStr;
            } else {
                newContent += '<div class="product-card"' + cardStr;
            }
        }
        
        fs.writeFileSync(file, newContent, 'utf8');
    }
});
