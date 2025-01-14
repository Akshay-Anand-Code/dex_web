class SniperLog {
    constructor() {
        this.logContainer = document.getElementById('logContainer');
        this.startLogging();
    }

    addLog(message, type = 'info') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        
        const time = new Date().toLocaleTimeString();
        entry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-message">${message}</span>
        `;
        
        this.logContainer.insertBefore(entry, this.logContainer.firstChild);
        
        // Keep only last 50 logs
        if (this.logContainer.children.length > 50) {
            this.logContainer.removeChild(this.logContainer.lastChild);
        }
    }

    startLogging() {
        const messages = [
            { msg: "New potential snipe detected: 0x7a2...", type: 'warning' },
            { msg: "Analyzing liquidity patterns...", type: 'info' },
            { msg: "Endpoint hit: Uniswap V2 Router", type: 'info' },
            { msg: "Automating snipe sequence...", type: 'warning' },
            { msg: "Trade executed successfully", type: 'success' },
            { msg: "Monitoring price action...", type: 'info' },
            { msg: "Liquidity check passed", type: 'success' },
            { msg: "MEV protection enabled", type: 'info' },
            { msg: "Slippage optimization in progress", type: 'warning' },
            { msg: "Gas optimization complete", type: 'success' },
            { msg: "Network congestion detected", type: 'error' },
            { msg: "Arbitrage opportunity found", type: 'warning' }
        ];

        // Add initial log
        this.addLog("Sniper system initialized", 'success');

        // Randomly add logs
        setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            this.addLog(randomMsg.msg, randomMsg.type);
        }, 2000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new SniperLog();
}); 