function mascaraPlacaVeiculo(elemento) {
    let valor = elemento.value;

   
    valor = valor.replace(/[^a-zA-Z0-9]/g, "");

 
    if (valor.length > 3) {
        valor = valor.substring(0, 3) + '-' + valor.substring(3);
    }
    if (valor.length > 7) {
        valor = valor.substring(0, 7) + valor.substring(7, 8).toUpperCase() + valor.substring(8);
    }

   
    valor = valor.substring(0, 8);

    elemento.value = valor.toUpperCase(); 
}
const DISTANCIA = 120; 
const VALOR_PEDAGIO = 20.00; 

let velocidades = [];
let totalValores = 0;
let inicioProcesso = null;
let finalProcesso = null;

function calcularPedagio() {
    const placa = document.getElementById('placa').value;
    const horaEntrada = document.getElementById('horaEntrada').value;
    const horaSaida = document.getElementById('horaSaida').value;

    if (!placa || !horaEntrada || !horaSaida) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const tempoGasto = calcularTempo(horaEntrada, horaSaida);
    const velocidade = DISTANCIA / (tempoGasto / 60); 
    const desconto = calcularDesconto(velocidade);
    const valorPago = VALOR_PEDAGIO * (1 - desconto);

    velocidades.push(velocidade);
    totalValores += valorPago;

    if (!inicioProcesso) inicioProcesso = horaEntrada;
    finalProcesso = horaSaida;

    exibirTicket(placa, horaEntrada, horaSaida, tempoGasto, velocidade, valorPago);
    exibirRelatorio();
}

function calcularTempo(horaEntrada, horaSaida) {
    const [h1, m1] = horaEntrada.split(':').map(Number);
    const [h2, m2] = horaSaida.split(':').map(Number);
    return (h2 * 60 + m2) - (h1 * 60 + m1);
}

function calcularDesconto(velocidade) {
    if (velocidade <= 60) return 0.15;
    if (velocidade <= 100) return 0.10;
    return 0.00;
}

function exibirTicket(placa, horaEntrada, horaSaida, tempo, velocidade, valorPago) {
    const ticketElement = document.getElementById('ticket');
    ticketElement.innerHTML = `
        <h3>Ticket de Cobrança</h3>
        <p>Placa do Veículo: ${placa}</p>
        <p>Hora de Entrada: ${horaEntrada}</p>
        <p>Hora de Saída: ${horaSaida}</p>
        <p>Tempo Gasto: ${tempo} minutos</p>
        <p>Velocidade Média: ${velocidade.toFixed(2)} km/h</p>
        <p>Valor a Pagar: R$ ${valorPago.toFixed(2)}</p>
    `;
}

function exibirRelatorio() {
    const menorVelocidade = Math.min(...velocidades);
    const maiorVelocidade = Math.max(...velocidades);
    const mediaVelocidade = velocidades.reduce((acc, v) => acc + v, 0) / velocidades.length;

    const reportElement = document.getElementById('report');
    reportElement.innerHTML = `
        <h3>Relatório do Turno</h3>
        <p>Menor Velocidade Registrada: ${menorVelocidade.toFixed(2)} km/h</p>
        <p>Maior Velocidade Registrada: ${maiorVelocidade.toFixed(2)} km/h</p>
        <p>Média das Velocidades Registradas: ${mediaVelocidade.toFixed(2)} km/h</p>
        <p>Total dos Valores Cobrados: R$ ${totalValores.toFixed(2)}</p>
        <p>Hora de Início do Processamento: ${inicioProcesso}</p>
        <p>Hora do Final do Processamento: ${finalProcesso}</p>
    `;
}

function openImage() {
    window.open('images/837.jpg', '_blank');
}


document.getElementById('celular').addEventListener('input', function () {
    mascaraTelefoneFixo(this);
});
