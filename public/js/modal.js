document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('hashrateModal');
    const btn = document.querySelector('.protocol-btn');
    const closeBtn = document.querySelector('.close-btn');
    const deployBtn = document.querySelector('.modal-deploy-btn');
    const sliders = document.querySelectorAll('.crypto-slider');

    // Open modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close if clicked outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Update slider values
    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;
        slider.oninput = function() {
            valueDisplay.textContent = this.value + '%';
        }
    });

    // Deploy button click effect
    deployBtn.onclick = function() {
        this.textContent = 'DEPLOYING...';
        this.style.background = 'rgba(0, 255, 0, 0.3)';
        
        setTimeout(() => {
            this.textContent = 'DEPLOYED';
            setTimeout(() => {
                this.textContent = 'DEPLOY';
                this.style.background = '';
                modal.style.display = "none";
            }, 1000);
        }, 2000);
    }
}); 