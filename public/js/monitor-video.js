document.addEventListener('DOMContentLoaded', function() {
    const monitorVideo = document.querySelector('.monitor-status');
    
    // Function to handle the loop
    function loopSection() {
        // Reset to start if we're past 6 seconds
        if (monitorVideo.currentTime >= 6) {
            monitorVideo.currentTime = 0;
        }
    }

    // Add timeupdate event listener to check current time
    monitorVideo.addEventListener('timeupdate', loopSection);
    
    // Start playing
    monitorVideo.play();
}); 