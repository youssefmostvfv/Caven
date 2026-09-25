document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Wishlist logic moved to the bottom with the complete Wishlist System

    // Product Color Dots Selection
    const colorOptionsContainer = document.querySelectorAll('.color-options');
    
    colorOptionsContainer.forEach(container => {
        const dots = container.querySelectorAll('.color-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                // Remove active class from siblings
                dots.forEach(d => d.classList.remove('active'));
                // Add to clicked dot
                this.classList.add('active');
            });
        });
    });

    // Hero Slider Dots
    const sliderDots = document.querySelectorAll('.hero .slider-dots .dot');
    if (sliderDots.length > 0) {
        sliderDots.forEach(dot => {
            dot.addEventListener('click', function() {
                sliderDots.forEach(d => d.classList.remove('active'));
                this.classList.add('active');
                // In a real app, this would change the hero image too
            });
        });
    }

    // Link Products to Details Page
    const productLinks = document.querySelectorAll('.product-image-box img, .product-info h3');
    productLinks.forEach(link => {
        link.style.cursor = 'pointer';
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            if (card) {
                const img = card.querySelector('img');
                const title = card.querySelector('h3');
                if (img && title) {
                    let src = img.getAttribute('src');
                    let text = title.innerText;
                    window.location.href = `product-details.html?img=${encodeURIComponent(src)}&title=${encodeURIComponent(text)}`;
                    return;
                }
            }
            window.location.href = 'product-details.html';
        });
    });

    // Filter Accordion Toggles
    const filterHeaders = document.querySelectorAll('.filter-group h4');
    filterHeaders.forEach(header => {
        header.style.cursor = 'pointer';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        
        header.addEventListener('click', function() {
            const list = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (list.style.display === 'none') {
                list.style.display = 'flex';
                if(icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            } else {
                list.style.display = 'none';
                if(icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });

    // Mobile Main Filter Toggle
    const filterMobileToggle = document.querySelector('.filter-mobile-toggle');
    const filterBody = document.querySelector('.filter-body');
    if (filterMobileToggle && filterBody) {
        // Initially hide on mobile screens (optional, but requested by user to toggle)
        if (window.innerWidth < 992) {
            filterBody.style.display = 'none';
            filterMobileToggle.classList.remove('fa-chevron-down');
            filterMobileToggle.classList.add('fa-sliders-h');
        }

        filterMobileToggle.addEventListener('click', () => {
            if (filterBody.style.display === 'none') {
                filterBody.style.display = 'block';
                filterMobileToggle.classList.remove('fa-sliders-h');
                filterMobileToggle.classList.add('fa-times');
            } else {
                filterBody.style.display = 'none';
                filterMobileToggle.classList.remove('fa-times');
                filterMobileToggle.classList.add('fa-sliders-h');
            }
        });
    }

    /* =========================================
       CART SYSTEM & CHECKOUT LOGIC
    ========================================= */
    const cartHTML = `
    <!-- Cart Sidebar -->
    <div class="cart-sidebar" id="cart-sidebar">
        <div class="cart-header">
            <h3>سلة المشتريات (<span id="cart-count-header">0</span>)</h3>
            <i class="fas fa-times close-cart" id="close-cart"></i>
        </div>
        <div class="cart-items" id="cart-items">
            <!-- Items will be injected here -->
        </div>
        <div class="cart-footer">
            <div class="cart-summary">
                <div class="summary-line">
                    <span>المجموع الفرعي:</span>
                    <span id="cart-subtotal">0 ج.م</span>
                </div>
                <div class="summary-line discount-line" id="cart-discount-line" style="display:none;">
                    <span>خصم (20%):</span>
                    <span id="cart-discount-amount">-0 ج.م</span>
                </div>
                <div class="summary-line total">
                    <span>الإجمالي:</span>
                    <span id="cart-total">0 ج.م</span>
                </div>
            </div>
            
            <form id="global-checkout-form" style="display:none;">
                <h4 style="margin-bottom:10px; font-size:1rem;">بيانات التوصيل:</h4>
                <div class="form-group">
                    <input type="text" id="c-name" required placeholder="الاسم بالكامل">
                </div>
                <div class="form-group">
                    <input type="tel" id="c-phone" required placeholder="رقم الهاتف">
                </div>
                <div class="form-group">
                    <textarea id="c-address" rows="2" required placeholder="العنوان بالتفصيل"></textarea>
                </div>
                <button type="submit" class="btn-primary" id="checkout-submit-btn" style="width:100%;">تأكيد الطلب</button>
            </form>
            <button class="btn-primary" id="show-checkout-btn" style="width:100%;">إتمام الطلب</button>
        </div>
    </div>
    <div class="modal-overlay" id="cart-overlay"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', cartHTML);

    let cart = JSON.parse(localStorage.getItem('caven_cart')) || [];
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    
    // Add cart badges to icons
    const cartIcons = document.querySelectorAll('.fa-shopping-bag');
    cartIcons.forEach(icon => {
        if(!icon.closest('.add-to-cart-btn')) { // ignore buttons
            icon.style.cursor = 'pointer';
            icon.innerHTML = `<span class="cart-badge" id="badge-${Math.random()}">0</span>`;
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                openCart();
            });
        }
    });

    function saveCart() {
        localStorage.setItem('caven_cart', JSON.stringify(cart));
        renderCart();
    }

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
        renderCart();
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
        document.getElementById('global-checkout-form').style.display = 'none';
        document.getElementById('show-checkout-btn').style.display = 'block';
    }

    if(closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCart);

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        let totalQty = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.qty;
            totalQty += item.qty;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.price} ج.م</div>
                        <div class="cart-item-qty">
                            <button onclick="updateQty(${index}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button onclick="updateQty(${index}, 1)">+</button>
                            <span class="cart-item-remove" onclick="removeFromCart(${index})">حذف</span>
                        </div>
                    </div>
                </div>
            `;
        });

        // Update Badges
        document.querySelectorAll('.cart-badge').forEach(b => b.innerText = totalQty);
        document.getElementById('cart-count-header').innerText = totalQty;

        document.getElementById('cart-subtotal').innerText = subtotal + ' ج.م';

        // Discount Logic (20% off if >= 2 items)
        let discount = 0;
        if (totalQty >= 2) {
            discount = subtotal * 0.20;
            document.getElementById('cart-discount-line').style.display = 'flex';
            document.getElementById('cart-discount-amount').innerText = '-' + discount + ' ج.م';
        } else {
            document.getElementById('cart-discount-line').style.display = 'none';
        }

        let finalTotal = subtotal - discount;
        document.getElementById('cart-total').innerText = finalTotal + ' ج.م';

        if(cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; margin-top:2rem;">السلة فارغة</p>';
            document.getElementById('show-checkout-btn').disabled = true;
        } else {
            document.getElementById('show-checkout-btn').disabled = false;
        }
    }

    window.updateQty = function(index, change) {
        if(cart[index].qty + change > 0) {
            cart[index].qty += change;
        } else {
            cart.splice(index, 1);
        }
        saveCart();
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        saveCart();
    }

    // Initial render
    renderCart();

    // Hook Add to cart buttons globally
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        // Remove old inline listeners by cloning (if needed) but we can just use event listener
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Get data based on context
            let title = 'كاب';
            let price = 250;
            let img = 'img/caven-cap-black.webp';
            let qty = 1;

            // If on product details
            const titleEl = document.querySelector('.product-title');
            if(titleEl) {
                title = titleEl.innerText;
                const qtyInput = document.querySelector('.qty-input');
                if(qtyInput) qty = parseInt(qtyInput.value);
                const mainImg = document.getElementById('main-product-img');
                if(mainImg) img = mainImg.getAttribute('src');
            } else {
                // If on products list (cards)
                const card = btn.closest('.product-card');
                if(card) {
                    title = card.querySelector('h3').innerText;
                    img = card.querySelector('img').getAttribute('src');
                }
            }

            // Check if exists
            const existingIndex = cart.findIndex(i => i.title === title);
            if(existingIndex >= 0) {
                cart[existingIndex].qty += qty;
            } else {
                cart.push({ title, price, img, qty });
            }
            saveCart();
            openCart();
            
            // Close old modal if it opens
            const oldModal = document.getElementById('checkout-modal');
            if(oldModal) oldModal.classList.remove('active');
        }, { capture: true }); // Use capture to override other events
    });

    // Checkout UI toggle
    const showCheckoutBtn = document.getElementById('show-checkout-btn');
    const globalCheckoutForm = document.getElementById('global-checkout-form');
    if(showCheckoutBtn) {
        showCheckoutBtn.addEventListener('click', () => {
            showCheckoutBtn.style.display = 'none';
            globalCheckoutForm.style.display = 'block';
        });
    }

    // Checkout Submit Logic
    if(globalCheckoutForm) {
        globalCheckoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if(cart.length === 0) return;

            const submitBtn = document.getElementById('checkout-submit-btn');
            submitBtn.innerText = 'جاري إرسال الطلب...';
            submitBtn.disabled = true;

            // Format cart items for Google Sheets
            let productString = cart.map(i => `${i.title} (x${i.qty})`).join(' + ');
            let totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
            
            let subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
            let totalVal = totalQty >= 2 ? (subtotal * 0.8) : subtotal;

            const formData = new FormData();
            formData.append('Product', productString);
            formData.append('Quantity', totalQty);
            formData.append('Total', totalVal + ' ج.م');
            formData.append('Name', document.getElementById('c-name').value);
            formData.append('Phone', document.getElementById('c-phone').value);
            formData.append('Address', document.getElementById('c-address').value);

            const scriptURL = 'https://script.google.com/macros/s/AKfycbwot93789MT4NUFXBaxvGtmK3GSc-sJ2loUFJ5UWqwVcS01hnrAbzWhHBr2ezbJPu6j/exec';

            fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                alert('تم تأكيد طلبك بنجاح! سنتواصل معك قريباً.');
                cart = [];
                saveCart();
                closeCart();
                globalCheckoutForm.reset();
                submitBtn.innerText = 'تأكيد الطلب';
                submitBtn.disabled = false;
            })
            .catch(error => {
                alert('حدث خطأ أثناء إرسال الطلب، حاول مرة أخرى.');
                submitBtn.innerText = 'تأكيد الطلب';
                submitBtn.disabled = false;
            });
        });
    }

    /* =========================================
       WISHLIST SYSTEM
    ========================================= */
    const wishlistHTML = `
    <div class="wishlist-sidebar" id="wishlist-sidebar">
        <div class="wishlist-header">
            <h3>المفضلة (<span id="wishlist-count-header">0</span>)</h3>
            <i class="fas fa-times close-wishlist" id="close-wishlist"></i>
        </div>
        <div class="wishlist-items" id="wishlist-items">
            <!-- Items will be injected here -->
        </div>
    </div>
    <div class="modal-overlay" id="wishlist-overlay"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', wishlistHTML);

    let wishlist = JSON.parse(localStorage.getItem('caven_wishlist')) || [];
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    const closeWishlistBtn = document.getElementById('close-wishlist');
    const wishlistItemsContainer = document.getElementById('wishlist-items');

    // Add badges to heart icons in header
    const wishlistHeaderIcons = document.querySelectorAll('.header-icons .fa-heart, .mobile-menu .fa-heart');
    wishlistHeaderIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.innerHTML = `<span class="wishlist-badge">0</span>`;
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            openWishlist();
        });
    });

    function saveWishlist() {
        localStorage.setItem('caven_wishlist', JSON.stringify(wishlist));
        renderWishlist();
    }

    function openWishlist() {
        wishlistSidebar.classList.add('open');
        wishlistOverlay.classList.add('active');
        renderWishlist();
    }

    function closeWishlist() {
        wishlistSidebar.classList.remove('open');
        wishlistOverlay.classList.remove('active');
    }

    if(closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlist);
    if(wishlistOverlay) wishlistOverlay.addEventListener('click', closeWishlist);

    function renderWishlist() {
        wishlistItemsContainer.innerHTML = '';
        
        wishlist.forEach((item, index) => {
            wishlistItemsContainer.innerHTML += `
                <div class="wishlist-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.price} ج.م</div>
                        <div style="display:flex; gap:10px; margin-top:5px;">
                            <button class="btn-primary" style="padding: 5px 10px; font-size:0.8rem;" onclick="moveToCart(${index})">إضافة للسلة</button>
                            <span class="cart-item-remove" onclick="removeFromWishlist(${index})" style="line-height:2.5;">حذف</span>
                        </div>
                    </div>
                </div>
            `;
        });

        // Update Badges
        document.querySelectorAll('.wishlist-badge').forEach(b => b.innerText = wishlist.length);
        document.getElementById('wishlist-count-header').innerText = wishlist.length;

        if(wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = '<p style="text-align:center; margin-top:2rem;">المفضلة فارغة</p>';
        }

        // Update heart icons on product cards
        document.querySelectorAll('.wishlist-btn, .wishlist-btn-large').forEach(btn => {
            let title = 'كاب';
            const titleEl = document.querySelector('.product-title');
            if(btn.closest('.product-card')) {
                title = btn.closest('.product-card').querySelector('h3').innerText;
            } else if(titleEl) {
                title = titleEl.innerText;
            }

            const icon = btn.querySelector('i');
            if(icon) {
                if(wishlist.find(i => i.title === title)) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#e74c3c';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            }
        });
    }

    window.removeFromWishlist = function(index) {
        wishlist.splice(index, 1);
        saveWishlist();
    }

    window.moveToCart = function(index) {
        const item = wishlist[index];
        // Add to cart
        const existingIndex = cart.findIndex(i => i.title === item.title);
        if(existingIndex >= 0) {
            cart[existingIndex].qty += 1;
        } else {
            cart.push({ title: item.title, price: item.price, img: item.img, qty: 1 });
        }
        localStorage.setItem('caven_cart', JSON.stringify(cart));
        renderCart();
        
        // Remove from wishlist
        wishlist.splice(index, 1);
        saveWishlist();
        
        // Open Cart
        closeWishlist();
        openCart();
    }

    // Initial render
    renderWishlist();

    // Hook Wishlist buttons on cards and product details
    const wishlistBtnsList = document.querySelectorAll('.wishlist-btn, .wishlist-btn-large');
    wishlistBtnsList.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            let title = 'كاب';
            let price = 250;
            let img = 'img/caven-cap-black.webp';

            // If on product details
            const titleEl = document.querySelector('.product-title');
            if(btn.closest('.product-card')) {
                const card = btn.closest('.product-card');
                title = card.querySelector('h3').innerText;
                img = card.querySelector('img').getAttribute('src');
            } else if(titleEl) {
                title = titleEl.innerText;
                const mainImg = document.getElementById('main-product-img');
                if(mainImg) img = mainImg.getAttribute('src');
            }

            const existingIndex = wishlist.findIndex(i => i.title === title);
            if(existingIndex >= 0) {
                wishlist.splice(existingIndex, 1); // toggle off
            } else {
                wishlist.push({ title, price, img }); // toggle on
                
                // Animation
                const icon = btn.querySelector('i');
                if(icon) {
                    icon.style.transform = 'scale(1.3)';
                    setTimeout(() => icon.style.transform = 'scale(1)', 200);
                }
            }
            saveWishlist();
        });
    });

});
