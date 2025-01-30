function atualizarRelogio() {
    const options = {
        timeZone: 'America/Sao_Paulo',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    const dataAtual = new Date().toLocaleTimeString('pt-BR', options);
    const [tempo, periodo] = dataAtual.split(' ');

    const [horas, minutos, segundos] = tempo.split(':');

    document.getElementById('horas').textContent = horas.padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.padStart(2, '0');
    document.getElementById('periodo').textContent = periodo.toUpperCase();
}

// Atualizar a cada segundo
setInterval(atualizarRelogio, 1000);

// Executar imediatamente ao carregar
atualizarRelogio();