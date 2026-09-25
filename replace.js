const fs = require('fs');
const files = ['index.html', 'products.html', 'product-details.html'];

const replacements = {
    'كاب عنابي': 'كاب برجاندي',
    'كاب رمادي غامق': 'كاب محجر',
    'كاب رمادي داكن': 'كاب محجر',
    'كاب رمادي': 'كاب محجر',
    'كاب أخضر غامق': 'كاب محجر زيتي',
    'كاب سماوي': 'كاب محجر سماوي',
    'كاب وردي': 'كاب محجر وردي',
    'كاب بنفسجي': 'كاب محجر بنفسجي',
    'كاب أزرق ملكي': 'كاب ازرق ملكي',
    'كاب مريمية': 'كاب زيتي'
};

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    for (const [oldName, newName] of Object.entries(replacements)) {
        content = content.split(oldName).join(newName);
    }
    fs.writeFileSync(file, content, 'utf8');
});
