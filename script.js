let display = document.getElementById('display');
let currentInput = '';

document.addEventListener('keydown', handleKeyboardInput);

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperator(operator) {
    currentInput += ` ${operator} `;
    display.value = currentInput;
}

function calculate() {
    try {
        let expression = currentInput.replace(/,/g, '.').replace(/[^-()\d/*+.\s]/g, '');
        let result = eval(expression);

        currentInput = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        display.value = currentInput;
    } catch {
        display.value = 'Error';
    }
}

function clearDisplay() {
    currentInput = '';
    display.value = currentInput;
}

function printResult() {
    const result = display.value;
    const description = document.getElementById('description').value;
    if (result) {
        const printContent = `\n------88 SMASH------\n\n&nbsp;&nbsp;&nbsp;&nbsp;${description}\n\n\n\n&nbsp;&nbsp;TOTAL: R$ ${result}\n\n\n&nbsp;${new Date().toLocaleString('pt-BR')}\n----------------------`;
        
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
            const printWindow = window.open('', '_blank', 'width=300,height=200');
            const width = screen.availWidth;
            const height = screen.availHeight;
            printWindow.resizeTo(width, height);
            printWindow.document.write(`<pre>${printContent}</pre>`);
            printWindow.document.close();
            printWindow.print();
            printWindow.close();
        } else {
            alert('Impressão diretamente pela web não é suportada no seu navegador.');
        }
    }
}

function handleKeyboardInput(event) {
    const key = event.key;
    if (!isNaN(key) || key === ',') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (event.ctrlKey && (key === 'p' || key === 'P')) {
        printResult();
        event.preventDefault(); // Evita o comportamento padrão de abrir a janela de impressão do navegador
    }
}
