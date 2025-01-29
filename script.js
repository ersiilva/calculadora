function formatWeight(input) {
    let value = input.value.replace(',', '.'); // Troca vírgula por ponto
    value = value.replace(/[^0-9.]/g, ''); // Permite apenas números e ponto

    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('');
    }

    input.value = value; // Mantém o valor digitado sem truncar
}

// Função para formatar a data
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Função para gerar e imprimir as informações
function printInfo() {
    const productName = document.getElementById('productName').value;
    const manufactureDate = formatDate(document.getElementById('manufactureDate').value);
    const expiryDate = formatDate(document.getElementById('expiryDate').value);
    const productWeight = parseFloat(document.getElementById('productWeight').value || 0).toFixed(3);

    const printContent = `
        <div style="text-align: center;">
            <h1>88 SMASH</h1>
        </div>
        <div style="text-align: center;">   
            <p><strong></strong> ${productName}</p>
        </div>
        <div style="text-align: center;">
            <p><strong>DATA:</strong> ${manufactureDate}</p>
        </div>
        <div style="text-align: center;">   
            <p><strong>VAL:</strong> ${expiryDate}</p>
        </div>
        <div style="text-align: center;">
            <p><strong>Peso:</strong> ${productWeight} Kg </p>
        </div>
        <div style="text-align: center;font-size: 15px;justify-content: center">
            <p>Deus é Bom!</p>
        </div>
    `;

    const printDiv = document.getElementById('printContent');
    printDiv.innerHTML = printContent;
    printDiv.style.display = 'block';

    window.print();

    // Ocultar novamente após a impressão
    printDiv.style.display = 'none';
}
