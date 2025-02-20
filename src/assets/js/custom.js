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
