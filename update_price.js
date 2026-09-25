const fs = require('fs');
const files = ['index.html', 'products.html', 'product-details.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace visual prices
        content = content.split('250 ج.م').join('200 ج.م');
        content = content.split('>250<').join('>200<');
        
        // Replace data-price attributes
        content = content.split('data-price="250"').join('data-price="200"');
        
        fs.writeFileSync(file, content, 'utf8');
    }
});
