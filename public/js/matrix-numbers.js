function initializeCodeMatrix() {
    const codeLines = document.querySelectorAll('.code-line');
    
    function generateHex() {
        return Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
    }
    
    function generateRange() {
        const start = Math.floor(Math.random() * 26);
        const end = Math.floor(Math.random() * 14);
        return `[${start.toString().padStart(2, '0')}:${end.toString().padStart(2, '0')}]`;
    }
    
    function updateCodeLines() {
        codeLines.forEach(line => {
            const hex = generateHex();
            const range = generateRange();
            const operator = Math.random() < 0.5 ? '>>' : '<<';
            line.textContent = `${hex} ${operator} 0x${generateHex()} >> ${range}`;
            
            // Add brief highlight effect
            line.style.opacity = '1';
            line.style.color = '#fff';
            setTimeout(() => {
                line.style.opacity = '0.8';
                line.style.color = '';
            }, 100);
        });
    }

    // Update each line at slightly different intervals
    codeLines.forEach((line, index) => {
        setInterval(() => {
            if (Math.random() < 0.3) {
                updateCodeLines();
            }
        }, 1000 + (index * 200));
    });
}

document.addEventListener('DOMContentLoaded', initializeCodeMatrix); 