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

    // Add this to your existing modal.js
    document.querySelector('.modal-deploy-btn').addEventListener('click', function() {
        this.textContent = 'AI TRADING ACTIVE';
        this.style.background = 'rgba(0, 255, 0, 0.2)';
        this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.4)';
        
        // Add pulsing animation
        this.style.animation = 'pulse 2s infinite';
        
        // Show activation message
        const modalContent = document.querySelector('.modal-content');
        const statusMsg = document.createElement('div');
        statusMsg.className = 'activation-status';
        statusMsg.innerHTML = `
            <div class="status-line">Neural Network Initialized</div>
            <div class="status-line">Pattern Recognition Active</div>
            <div class="status-line">Market Analysis Running</div>
        `;
        modalContent.appendChild(statusMsg);
    });
}); 