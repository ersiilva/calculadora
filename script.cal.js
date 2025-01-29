let display = document.getElementById('display');
let description = document.getElementById('description');
let currentInput = '';

document.addEventListener('keydown', handleKeyboardInput);
document.getElementById('toggleTheme').addEventListener('click', toggleTheme);

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    currentInput += ` ${operator} `;
    updateDisplay();
}

function calculate() {
    try {
        let expression = currentInput.replace(/,/g, '.').replace(/[^-()\d/*+.\s]/g, '');
        let result = eval(expression);

        currentInput = result.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        updateDisplay();
    } catch {
        display.value = 'Error                      ';
    }
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function printResult() {
    const result = display.value;
    const descriptionText = description.value;
    if (result) {
        const printContent = `\n--------88SMASH-------\n\n&nbsp&nbsp&nbsp&nbsp${descriptionText}\n\n&nbsp&nbsp&nbspTOTAL: R$${result}\n\n&nbsp${new Date().toLocaleString('pt-BR')}\n----------------------`;
        
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
const printDiv = document.getElementById('printContent');
    printDiv.innerHTML = printContent;
    printDiv.style.display = 'block';

    window.print();


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
        updateDisplay();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (event.ctrlKey && (key === 'p' || key === 'P')) {
        printResult();
        event.preventDefault();
    } else if (event.shiftKey && (key === 'w' || key === 'W')) {
        clearDescription();
        event.preventDefault();
    } else if (event.shiftKey && (key === 'd' || key === 'D')) {
        selectDescription();
        event.preventDefault();
    }
}

function updateDisplay() {
    display.value = currentInput;
    display.scrollLeft = display.scrollWidth; // Garante que o último número digitado esteja visível
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function clearDescription() {
    description.value = '';
}

function selectDescription() {
    description.focus();
}