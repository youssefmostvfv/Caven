// بيانات الكابات الجديدة — عدّل الأسعار والأوصاف من هنا
// نفس طريقة الساعات: كل موديل ليه سعر واحد لكل ألوانه (variants)
// برا: كل لون ككارت لوحده | جوا (صفحة المنتج): الألوان كلها مع بعض
// price: السعر الحالي | oldPrice: السعر قبل الخصم (اتركه null لو مفيش خصم)
window.CAPS = {
    'balenciaga': {
        title: 'كاب بالنسياجا',
        price: 600, oldPrice: null,
        description: 'كاب أسود بتطريز اسم الماركة بالأبيض من قدام، وحافة مقطّعة بستايل مميز، بحزام خلفي قابل للتعديل.',
        variants: [
            { id: '268379', color: 'أسود', hex: '#111827', images: ['img/caps/268379.jpg', 'img/caps/268323.jpg', 'img/caps/268347.jpg'] }
        ]
    },
    'lv-distressed': {
        title: 'كاب لويس فيتون مقطّع',
        price: 600, oldPrice: null,
        description: 'كاب بقماش مقطّع (Distressed) وتطريز بارز من قدام. ارتفاع 12 سم وعرض 19 سم، ومقاس من 58 لـ 62 سم بحزام قابل للتعديل.',
        variants: [
            { id: '268392', color: 'أسود', hex: '#111827', images: ['img/caps/268392.jpg', 'img/caps/268326.jpg', 'img/caps/268356.jpg', 'img/caps/268362.jpg', 'img/caps/268390.jpg'] },
            { id: '268353', color: 'أبيض', hex: '#f9fafb', images: ['img/caps/268353.jpg', 'img/caps/268404.jpg'] }
        ]
    },
    'gucci': {
        title: 'كاب جوتشي',
        price: 600, oldPrice: null,
        description: 'كاب أبيض بنقشة بارزة على القماش، وحافة بنقشة GG البيج والبني مع إطار ذهبي.',
        variants: [
            { id: '268329', color: 'أبيض', hex: '#f9fafb', images: ['img/caps/268329.jpg', 'img/caps/268359.jpg', 'img/caps/268402.jpg'] }
        ]
    },
    'balmain': {
        title: 'كاب بالمان',
        price: 600, oldPrice: null,
        description: 'كاب بحروف اسم الماركة البارزة على الجنبين ومن قدام، بحزام خلفي قابل للتعديل.',
        variants: [
            { id: '268342', color: 'أسود', hex: '#111827', images: ['img/caps/268342.jpg', 'img/caps/268350.jpg', 'img/caps/268396.jpg'] },
            { id: '268398', color: 'أحمر', hex: '#dc2626', images: ['img/caps/268398.jpg', 'img/caps/268370.jpg', 'img/caps/268383.jpg'] }
        ]
    },
    'lv-text': {
        title: 'كاب لويس فيتون',
        price: 600, oldPrice: null,
        description: 'كاب أسود بتطريز اسم الماركة بخط مميز وبارز باللون الأبيض، بحزام خلفي قابل للتعديل.',
        variants: [
            { id: '268373', color: 'أسود', hex: '#111827', images: ['img/caps/268373.jpg', 'img/caps/268367.jpg'] }
        ]
    }
};

// كل لون ككارت لوحده
window.CAP_CARDS = Object.entries(window.CAPS).flatMap(([key, c]) =>
    c.variants.map(v => ({
        key, id: v.id, price: c.price, oldPrice: c.oldPrice, hex: v.hex,
        title: c.variants.length > 1 ? `${c.title} - ${v.color}` : c.title,
        image: v.images[0]
    }))
);
