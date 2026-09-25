const fs = require('fs');
const files = ['index.html', 'products.html', 'product-details.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.split('خصم 30%').join('خصم 60%');
        fs.writeFileSync(file, content, 'utf8');
    }
});
