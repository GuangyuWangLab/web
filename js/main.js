// Wait for window load event
window.addEventListener('load', function () {
    // Select the preloader element
    const preloader = document.getElementById('preloader');

    // Add 'loaded' class to body to trigger transitions
    document.body.classList.add('loaded');

    // Fade out preloader
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 500); // Wait for transition to finish
    }

    // Navbar Toggle Logic
    const toggleBtn = document.querySelector('.navbar-toggle');
    const collapseMenu = document.querySelector('.navbar-collapse');

    if (toggleBtn && collapseMenu) {
        toggleBtn.addEventListener('click', function () {
            collapseMenu.classList.toggle('show');
            // Optional: Toggle icon between bars and times (X)
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (collapseMenu.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    // Hero Parallax Effect
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        hero.addEventListener('mousemove', function (e) {
            // Get dimensions relative to viewport since hero is full screenish
            // Or better, relative to element if it wasn't full screen, but tracking clientX/Y is fine for logic
            const width = window.innerWidth;
            const height = window.innerHeight;
            const x = e.clientX;
            const y = e.clientY;

            // Calculate percentage from center (-1 to 1)
            const xPct = (x / width - 0.5) * 2;
            const yPct = (y / height - 0.5) * 2;

            // Max rotation degrees
            const maxTilt = 10;

            // Calculate rotation
            // RotateY: Mouse Right (x>0) -> Right side moves Away (Positive) -> Looks to Left? 
            // Let's try standard "follow" tilt: Mouse Right -> Tilt Right (Right side Down/Close). 
            // Right Side Close = Negative RotateY in CSS (if Y-axis up)?? No.
            // Standard CSS: RotateY(pos) = Right Side Away. RotateY(neg) = Right Side Close.
            // If I want "Apple TV" (Mouse Right -> Card tilts Right edge DOWN/CLOSE), need NEGATIVE RotateY.
            const rotateY = xPct * maxTilt;
            const rotateX = -yPct * maxTilt;

            heroContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        hero.addEventListener('mouseleave', function () {
            heroContent.style.transform = 'rotateX(0) rotateY(0)';
        });
    }
});
