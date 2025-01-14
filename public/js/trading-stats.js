class TradingStats {
    constructor() {
        this.startMetricUpdates();
    }

    startMetricUpdates() {
        setInterval(() => {
            // Total Trades (incrementing with random jumps)
            const trades = Math.floor(1000 + Math.sin(Date.now() / 10000) * 500 + Math.random() * 100);
            document.getElementById('aiTotalTrades').textContent = trades.toLocaleString();

            // Success Rate (fluctuating between 85-95%)
            const successRate = (90 + Math.sin(Date.now() / 5000) * 5 + Math.random() * 2).toFixed(1);
            document.getElementById('aiSuccessRate').textContent = `${successRate}%`;

            // Profit/Loss (fluctuating with positive/negative values)
            const profit = (50000 + Math.sin(Date.now() / 8000) * 30000 + Math.random() * 5000).toFixed(2);
            const profitElement = document.getElementById('aiProfitLoss');
            profitElement.textContent = `$${profit}`;
            profitElement.style.color = profit > 0 ? '#00ff00' : '#ff4444';
        }, 1000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new TradingStats();
}); 