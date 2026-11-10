// بيانات الساعات — عدّل الأسعار والأوصاف من هنا
// كل موديل ليه سعر واحد لكل ألوانه (variants)
// برا (الصفحة والقسم): كل لون بيظهر ككارت لوحده
// جوا (صفحة المنتج): الألوان كلها بتظهر مع بعض وتقدر تبدّل بينهم
// price: السعر الحالي | oldPrice: السعر قبل الخصم (اتركه null لو مفيش خصم)
// type: 'men' رجالي | 'women' حريمي
window.WATCHES = {
    'casio-square': {
        title: 'ساعة كاسيو مربعة', type: 'men',
        price: 240, oldPrice: null,
        description: 'ساعة كاسيو كلاسيك بإطار مربع ومينا أسود، بأستيك ستانلس ستيل فضي وبيان التاريخ.',
        variants: [
            { id: '267633', color: 'فضي / أسود', hex: '#1f2937', images: ['img/watches/267633.jpg'] }
        ]
    },
    'rolex-daytona': {
        title: 'ساعة رولكس دايتونا', type: 'men',
        price: 500, oldPrice: null,
        description: 'ساعة كرونوجراف بأستيك فضي وذهبي ومينا أسود بعدادات ذهبية، وإطار ذهبي مدرّج.',
        variants: [
            { id: '267636', color: 'فضي / ذهبي', hex: '#d4af37', images: ['img/watches/267636.jpg', 'img/watches/270239.jpg'] }
        ]
    },
    'lacoste-bracelet': {
        title: 'ساعة لاكوست', type: 'women',
        price: 280, oldPrice: null,
        description: 'ساعة لاكوست بأستيك ستانلس ستيل فضي بتصميم أنيق، تيجي في علبة الماركة.',
        variants: [
            { id: '267641', color: 'فضي', hex: '#c0c0c0', images: ['img/watches/267641.jpg'] }
        ]
    },
    'rolex-oyster': {
        title: 'ساعة رولكس أويستر', type: 'men',
        price: 150, oldPrice: null,
        description: 'ساعة رولكس بأستيك ستانلس ستيل فضي ومينا فضي لامع، تصميم كلاسيك يناسب كل الأوقات.',
        variants: [
            { id: '267642', color: 'فضي', hex: '#c0c0c0', images: ['img/watches/267642.jpg'] }
        ]
    },
    'tissot-chrono': {
        title: 'ساعة تيسو كرونوجراف', type: 'men',
        price: 320, oldPrice: null,
        description: 'ساعة تيسو كرونوجراف بأستيك ستانلس ستيل فضي، بثلاث عدادات وبيان التاريخ.',
        variants: [
            { id: '267649', color: 'مينا أسود', hex: '#111827', images: ['img/watches/267649.jpg'] },
            { id: '267652', color: 'مينا أبيض', hex: '#f3f4f6', images: ['img/watches/267652.jpg'] }
        ]
    },
    'women-leather-square': {
        title: 'ساعة حريمي جلد', type: 'women',
        price: 130, oldPrice: null,
        description: 'ساعة حريمي رقيقة بإطار مربع ناعم وأستيك جلد، تصميم بسيط وأنيق للاستخدام اليومي.',
        variants: [
            { id: '267655', color: 'أسود', hex: '#111827', images: ['img/watches/267655.jpg'] },
            { id: '267687', color: 'نبيتي', hex: '#7f1d3a', images: ['img/watches/267687.jpg'] }
        ]
    },
    'guoi-rose-set': {
        title: 'طقم ساعة روز جولد مع انسيال', type: 'women',
        price: 200, oldPrice: null,
        description: 'طقم حريمي: ساعة بأستيك حلقات روز جولد مع انسيال مطابق.',
        variants: [
            { id: '267657', color: 'روز جولد', hex: '#b76e79', images: ['img/watches/267657.jpg'] }
        ]
    },
    'square-silver-set': {
        title: 'طقم ساعة مربعة مع انسيال مسمار', type: 'women',
        price: 250, oldPrice: null,
        description: 'طقم حريمي: ساعة مربعة بأستيك ستانلس ستيل فضي مع انسيال مسمار فضي.',
        variants: [
            { id: '267659', color: 'فضي', hex: '#c0c0c0', images: ['img/watches/267659.jpg'] }
        ]
    },
    'rolex-women-set': {
        title: 'طقم ساعة رولكس حريمي مع انسيال', type: 'women',
        price: 250, oldPrice: null,
        description: 'طقم حريمي: ساعة رولكس فضي بمينا أبيض مع انسيال مسمار فضي.',
        variants: [
            { id: '267661', color: 'فضي', hex: '#c0c0c0', images: ['img/watches/267661.jpg'] }
        ]
    },
    'casio-octagon-set': {
        title: 'طقم ساعة كاسيو مع انسيال', type: 'women',
        price: 250, oldPrice: null,
        description: 'طقم: ساعة كاسيو بإطار مثمن وأستيك ستانلس ستيل فضي مع انسيال فضي.',
        variants: [
            { id: '267664', color: 'فضي', hex: '#c0c0c0', images: ['img/watches/267664.jpg'] }
        ]
    },
    'women-leather-oval': {
        title: 'ساعة حريمي بيضاوي جلد', type: 'women',
        price: 130, oldPrice: null,
        description: 'ساعة حريمي بإطار بيضاوي وأرقام رومانية وأستيك جلد رفيع، تصميم كلاسيك راقي.',
        variants: [
            { id: '267666', color: 'أسود', hex: '#111827', images: ['img/watches/267666.jpg'] },
            { id: '267670', color: 'أبيض', hex: '#f9fafb', images: ['img/watches/267670.jpg'] }
        ]
    },
    'rolex-fluted': {
        title: 'ساعة رولكس ديت جست', type: 'men',
        price: 280, oldPrice: null,
        description: 'ساعة رولكس بإطار مخدد وأستيك ستانلس ستيل فضي، مع بيان اليوم والتاريخ.',
        variants: [
            { id: '267668', color: 'مينا أسود', hex: '#111827', images: ['img/watches/267668.jpg'] },
            { id: '267672', color: 'مينا أزرق', hex: '#1e3a8a', images: ['img/watches/267672.jpg'] },
            { id: '267692', color: 'مينا فضي', hex: '#e5e7eb', images: ['img/watches/267692.jpg'] }
        ]
    },
    'hilfiger': {
        title: 'ساعة تومي هيلفيجر', type: 'men',
        price: 400, oldPrice: null,
        description: 'ساعة تومي هيلفيجر بأستيك ستانلس ستيل فضي، مع بيان اليوم والتاريخ وعقرب ثواني أحمر.',
        variants: [
            { id: '267676', color: 'مينا أزرق', hex: '#1e40af', images: ['img/watches/267676.jpg'] },
            { id: '267680', color: 'مينا أبيض', hex: '#f3f4f6', images: ['img/watches/267680.jpg'] },
            { id: '270247', color: 'مينا أسود', hex: '#111827', images: ['img/watches/270247.jpg'] }
        ]
    },
    'oval-bangle-set': {
        title: 'طقم ساعة بيضاوي مع انسيال مسمار', type: 'women',
        price: 180, oldPrice: null,
        description: 'طقم حريمي: ساعة بيضاوي بأستيك غوايشة وأرقام رومانية مع انسيال مسمار مطابق.',
        variants: [
            { id: '267682', color: 'فضي', hex: '#c0c0c0', images: ['img/watches/267682.jpg'] },
            { id: '267689', color: 'ذهبي', hex: '#d4af37', images: ['img/watches/267689.jpg'] }
        ]
    },
    'gold-trio-set': {
        title: 'طقم ساعة ذهبي مع انسيالين', type: 'women',
        price: 150, oldPrice: null,
        description: 'طقم حريمي ذهبي: ساعة صغيرة مع انسيال مسمار وانسيال مبروم.',
        variants: [
            { id: '267684', color: 'ذهبي', hex: '#d4af37', images: ['img/watches/267684.jpg'] }
        ]
    },
    'sweston-round': {
        title: 'ساعة سويستون ذهبي', type: 'men',
        price: 400, oldPrice: null,
        description: 'ساعة سويستون بأستيك ذهبي وإطار دائري، تيجي في علبة الماركة.',
        variants: [
            { id: '270172', color: 'مينا أبيض', hex: '#f3f4f6', images: ['img/watches/270172.jpg'] },
            { id: '270173', color: 'مينا أسود', hex: '#111827', images: ['img/watches/270173.jpg'] }
        ]
    },
    'sweston-rect': {
        title: 'ساعة سويستون مستطيلة ذهبي', type: 'men',
        price: 400, oldPrice: null,
        description: 'ساعة سويستون بإطار مستطيل وأستيك ذهبي، تصميم كلاسيك فخم.',
        variants: [
            { id: '270174', color: 'مينا أبيض', hex: '#f3f4f6', images: ['img/watches/270174.jpg'] },
            { id: '270175', color: 'مينا أسود', hex: '#111827', images: ['img/watches/270175.jpg'] }
        ]
    },
    'rolex-leather-set': {
        title: 'طقم ساعة رولكس جلد مع انسيال', type: 'men',
        price: 350, oldPrice: null,
        description: 'طقم رجالي: ساعة رولكس بأستيك جلد شامواه وبيان التاريخ، مع انسيال فضي.',
        variants: [
            { id: '270185', color: 'بني / مينا أسود', hex: '#5b4040', images: ['img/watches/270185.jpg'] },
            { id: '270192', color: 'بني / مينا أبيض', hex: '#8b6f6f', images: ['img/watches/270192.jpg'] },
            { id: '270193', color: 'هافان / مينا أسود', hex: '#c8875a', images: ['img/watches/270193.jpg'] },
            { id: '270197', color: 'هافان / مينا أبيض', hex: '#ddb089', images: ['img/watches/270197.jpg'] }
        ]
    },
    'rolex-boxed': {
        title: 'ساعة رولكس بالعلبة', type: 'men',
        price: 280, oldPrice: null,
        description: 'ساعة رولكس بأستيك ستانلس ستيل فضي، تيجي في العلبة الخضرا.',
        variants: [
            { id: '270363', color: 'مينا أبيض', hex: '#f3f4f6', images: ['img/watches/270363.jpg'] },
            { id: '270368', color: 'مينا أسود', hex: '#111827', images: ['img/watches/270368.jpg'] }
        ]
    },
    'rolex-day-date': {
        title: 'ساعة رولكس داي ديت', type: 'men',
        price: 300, oldPrice: null,
        description: 'ساعة رولكس بأستيك ستانلس ستيل فضي، مع بيان اليوم والتاريخ.',
        variants: [
            { id: '270373', color: 'مينا أسود', hex: '#111827', images: ['img/watches/270373.jpg'] },
            { id: '270374', color: 'مينا فضي', hex: '#e5e7eb', images: ['img/watches/270374.jpg'] }
        ]
    }
};

// Helpers
// كل لون ككارت لوحده (للصفحة والقسم)
window.WATCH_CARDS = Object.entries(window.WATCHES).flatMap(([key, w]) =>
    w.variants.map(v => ({
        key, id: v.id, type: w.type, price: w.price, oldPrice: w.oldPrice,
        title: w.variants.length > 1 ? `${w.title} - ${v.color}` : w.title,
        image: v.images[0]
    }))
);
