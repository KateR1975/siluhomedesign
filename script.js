document.getElementById("y").textContent = new Date().getFullYear();

// Ręczna animacja płynnego przewijania
function smoothScrollTo(targetY, duration) {
    var startY = window.pageYOffset;
    var diff = targetY - startY;
    var startTime = null;

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        var progress = Math.min((currentTime - startTime) / duration, 1);
        // easeInOutCubic — ładna, płynna krzywa
        var ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startY + diff * ease);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Obsługa kliknięć w linki z # w href
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href").substring(1);
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
            e.preventDefault();
            // Offset na sticky header (~60px)
            var headerHeight = document.querySelector("header").offsetHeight || 60;
            var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            smoothScrollTo(targetPosition, 800);
            // Zaktualizuj URL bez skoku
            history.pushState(null, "", "#" + targetId);
        }
    });
});
