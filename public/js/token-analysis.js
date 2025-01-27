document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    const tokenInput = document.getElementById('tokenAddress');

    function formatValue(value) {
        try {
            value = parseFloat(value);
            if (value >= 1_000_000) {
                return `${(value / 1_000_000).toFixed(1)}M`;
            } else if (value >= 1_000) {
                return `${(value / 1_000).toFixed(1)}K`;
            }
            return value.toFixed(2);
        } catch {
            return "N/A";
        }
    }

    function updateValue(elementId, value, prefix = '') {
        const element = document.getElementById(elementId);
        element.textContent = prefix + value;
        element.classList.add('updating');
        setTimeout(() => element.classList.remove('updating'), 300);
    }

    async function analyzeToken(address) {
        try {
            const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
            const data = await response.json();
            
            if (data.pairs && data.pairs[0]) {
                const pair = data.pairs[0];
                
                updateValue('priceUsd', formatValue(pair.priceUsd), '$');
                updateValue('priceChange', (pair.priceChange?.h24 || 'N/A') + '%');
                updateValue('liquidity', formatValue(pair.liquidity?.usd), '$');
                updateValue('marketCap', formatValue(pair.marketCap), '$');
                updateValue('fdv', formatValue(pair.fdv), '$');
                updateValue('volume', formatValue(pair.volume?.h24), '$');
            } else {
                ['priceUsd', 'priceChange', 'liquidity', 'marketCap', 'fdv', 'volume'].forEach(id => {
                    updateValue(id, 'No Data');
                });
            }
        } catch (error) {
            console.error('Error fetching token data:', error);
            ['priceUsd', 'priceChange', 'liquidity', 'marketCap', 'fdv', 'volume'].forEach(id => {
                updateValue(id, 'Error');
            });
        }
    }

    analyzeBtn.addEventListener('click', () => {
        const address = tokenInput.value.trim();
        if (address) {
            analyzeToken(address);
        }
    });

    tokenInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const address = tokenInput.value.trim();
            if (address) {
                analyzeToken(address);
            }
        }
    });

    async function checkDexStatus() {
        const address = document.getElementById('pairAddress').value;
        if (!address) return;

        try {
            const response = await fetch(`https://api.dexscreener.com/orders/v1/solana/${address}`);
            const data = await response.json();

            const statusElement = document.getElementById('pairStatus');

            if (data && Array.isArray(data)) {
                for (const item of data) {
                    if (item.type === "tokenProfile" && item.status === "approved") {
                        statusElement.innerHTML = `✅ Dex Payment Confirmed!<br><span class="status-message">Payment for enhanced token information services has been verified</span>`;
                        statusElement.className = 'value safe';
                        return;
                    }
                }
            }

            statusElement.innerHTML = `❌ Dex Payment Not Found!<br><span class="status-message">No payment detected for enhanced token information services</span>`;
            statusElement.className = 'value danger';

        } catch (error) {
            const statusElement = document.getElementById('pairStatus');
            statusElement.innerHTML = `❌ Error<br><span class="status-message">Failed to check DEX status</span>`;
            statusElement.className = 'value danger';
        }
    }

    document.getElementById('checkPairBtn').addEventListener('click', checkDexStatus);
}); 