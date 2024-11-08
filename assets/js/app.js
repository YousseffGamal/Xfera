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
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;

    // Apply parallax effect to the background
    const parallaxBackground = document.querySelector('.parallax-background');
    parallaxBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;

    // Apply parallax effect to the world image (move it upwards)
    const worldImg = document.querySelector('.world-img');
    worldImg.style.transform = `translate(-50%, calc(-50% - ${scrollPosition * 0.6}px))`; // Moving upwards

    // Apply parallax effect to the center image (move it upwards)
    const centerImg = document.querySelector('.center-img');
    centerImg.style.transform = `translateY(-${scrollPosition * 0.3}px)`; // Moving upwards

    // Parallax effect for the bottom cloud images
    const cloudsImgs = document.querySelectorAll('.parallax-bottom-img img');
    cloudsImgs[0].style.transform = `translateY(${-scrollPosition * 0.5}px)`; // Left cloud
    cloudsImgs[1].style.transform = `translateY(${-scrollPosition * 0.3}px)`; // Right cloud moves faster
});


// Detect scroll event and apply the fade effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    
    // If scrolled more than 50px, add the scrolled class
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});
