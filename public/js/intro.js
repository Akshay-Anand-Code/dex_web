document.addEventListener('DOMContentLoaded', function() {
    const introOverlay = document.querySelector('.intro-overlay');
    const introVideo = document.getElementById('introVideo');
    const mainContent = document.querySelector('.dashboard-grid');

    // Hide main content initially
    mainContent.style.opacity = '0';

    // Play the intro video
    introVideo.play();

    // Set timeout to fade out after 2.5 seconds instead of waiting for video end
    setTimeout(() => {
        introOverlay.classList.add('fade-out');
        mainContent.style.transition = 'opacity 0.5s ease-in';
        mainContent.style.opacity = '1';
        
        // Remove overlay after animation
        setTimeout(() => {
            introOverlay.remove();
            // Stop the video when overlay is removed
            introVideo.pause();
        }, 500);
    }, 2500); // 2.5 seconds
}); 