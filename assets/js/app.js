document.addEventListener("DOMContentLoaded", function () {
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const countUp = (element, countTo) => {
        let countFrom = 0;
        const duration = 2000; // duration of the animation in milliseconds
        const stepTime = Math.abs(Math.floor(duration / countTo));
        const startTime = new Date().getTime();

        const updateCounter = () => {
            const now = new Date().getTime();
            const elapsedTime = now - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentCount = Math.floor(progress * countTo);

            element.textContent = currentCount.toLocaleString('ar-EG'); // Format for Arabic numerals

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true; // Ensure the animation only happens once
                statNumbers.forEach(stat => {
                    const countTo = parseInt(stat.getAttribute('data-count'));
                    countUp(stat, countTo);
                });
            }
        });
    }, { threshold: 0.1 });

    observer.observe(statsSection);
});
