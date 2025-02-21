// FAQ

const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
    const onClick = () => {
        item.classList.toggle('active')
    }
    item.addEventListener('click', onClick)
}

document.addEventListener('DOMContentLoaded', function() {
    const allAccordion = document.querySelectorAll('.cs-accordion')
    const windowMatcher = window.matchMedia("(max-width: 48rem)");

    if (allAccordion.length === 0 || !windowMatcher.matches) return // return if there is no accordion parent 

    document.querySelectorAll('button[data-trigger]').forEach(button => {
        button.addEventListener('click', function() {
            // Toggle the 'accordion-show' class on the parent .cs-accordion
            const accordion = this.closest('.cs-accordion');
            accordion.classList.toggle('accordion-show');
        });
    });

})

// Coupon functionality - wrapped in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', function() {
    // Performance optimization: Cache the coupon container
    const couponContainer = document.getElementById('coupons');
    if (!couponContainer) return; // Exit if no coupon section exists

    // Use event delegation instead of multiple event listeners
    couponContainer.addEventListener('click', function(e) {
        const target = e.target;

        // Handle print button clicks
        if (target.classList.contains('print-btn')) {
            e.preventDefault();
            handlePrint(target.closest('.coupon'));
        }

        // Handle save button clicks
        if (target.classList.contains('save-btn')) {
            e.preventDefault();
            handleSave(target.closest('.coupon'));
        }
    });
});

// Separate functions for better organization and reusability
function handlePrint(coupon) {
    if (!coupon) return;

    // Remove any existing print classes
    const printingCoupons = document.querySelectorAll('.printing-coupon');
    printingCoupons.forEach(c => c.classList.remove('printing-coupon'));

    // Add print class to current coupon
    coupon.classList.add('printing-coupon');
    console.log("Printing class added:", coupon); // ADD THIS LINE

    // Small delay to ensure styles are applied
    setTimeout(() => {
        window.print();

        // Cleanup after print dialog closes
        requestAnimationFrame(() => {
            coupon.classList.remove('printing-coupon');
            console.log("Printing class removed:", coupon); // ADD THIS LINE
        });
    }, 100);
}

function handleSave(coupon) {
    if (!coupon) return;

    // Show loading state
    coupon.style.opacity = '0.7';

    // --- NEW: Hide the buttons using visibility: hidden instead of display: none ---
    const buttons = coupon.querySelector('.buttons');
    if (buttons) {
        buttons.style.visibility = 'hidden'; // Use visibility: hidden
    }

    // Create a filename based on the coupon title and date
    const couponTitle = coupon.querySelector('.coupon-header').textContent;
    const filename = `${couponTitle.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;

    // Try to use modern file system API first (for supported browsers)
    if ('showSaveFilePicker' in window) {
        html2canvas(coupon, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(async (canvas) => {
            // --- NEW: Restore button visibility after capture (even on error) ---
            if (buttons) {
                buttons.style.visibility = ''; // Revert to original visibility (likely 'visible' or 'inherit')
            }
            coupon.style.opacity = ''; // Remove loading state

            try {
                const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

                const opts = {
                    suggestedName: filename,
                    types: [{
                        description: 'PNG file',
                        accept: { 'image/png': ['.png'] },
                    }],
                };

                const handle = await window.showSaveFilePicker(opts);
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();


            } catch (err) {
                // Fallback to traditional download if user cancels or API fails
                fallbackSave(canvas, filename);
            }
        });
    } else {
        // Fallback for browsers that don't support File System API
        html2canvas(coupon, {
            scale: 2,
            logging: false,
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            // --- NEW: Restore button visibility after capture (even on error) ---
            if (buttons) {
                buttons.style.visibility = ''; // Revert to original visibility
            }
            coupon.style.opacity = ''; // Remove loading state
            fallbackSave(canvas, filename);
        });
    }
}

// Fallback save function using traditional download
function fallbackSave(canvas, filename) {
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/png');
}

// Optional: Add lazy loading for QR codes
function lazyLoadQRCodes() {
    const qrCodes = document.querySelectorAll('.qr-code img[data-src]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        qrCodes.forEach(qr => observer.observe(qr));
    } else {
        // Fallback for older browsers
        qrCodes.forEach(qr => qr.src = qr.dataset.src);
    }
}

// Initialize QR code lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadQRCodes);
