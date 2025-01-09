// Seleção de elementos no DOM
const chuteInput = document.getElementById('chute');
const mensagemLabel = document.getElementById('mensagem');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnChutar = document.getElementById('btnChutar');

// Variáveis globais para controle do jogo
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto;
let numeroTentativas;

// Função para exibir mensagens na tela
function exibirMensagem(mensagem, classe = '') {
    mensagemLabel.textContent = mensagem; // Exibe a mensagem no rótulo
    mensagemLabel.className = `container__label__label ${classe}`; // Adiciona classes para estilização
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', { rate: 1.2 }); // Usa síntese de voz
}

// Gera um número aleatório sem repetição
function gerarNumeroAleatorio() {
    if (listaDeNumerosSorteados.length === numeroLimite) {
        listaDeNumerosSorteados = []; // Reseta a lista se todos os números foram sorteados
    }

    let numeroEscolhido;
    do {
        numeroEscolhido = Math.floor(Math.random() * 10 + 1);
        // Gera número entre 1 e 10
    } while (listaDeNumerosSorteados.includes(numeroEscolhido));
    // Evita repetição de números

    listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona à lista de sorteados
    return numeroEscolhido;
}

// Limpa o campo de entrada e a mensagem
function limparCampo() {
    chuteInput.value = ''; // Limpa o input
    exibirMensagem(''); // Limpa a mensagem exibida
}

// Reinicia o jogo para nova rodada
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera novo número secreto
    numeroTentativas = 0; // Reseta tentativas
    limparCampo(); // Limpa interface
    btnReiniciar.disabled = true; // Desativa botão "Novo Jogo"
    btnChutar.disabled = false; // Ativa botão "Chutar"
    chuteInput.focus(); // Foca no campo de entrada
}

// Verifica o número chutado pelo jogador
function verificarChute() {
    const chute = parseInt(chuteInput.value);

    if (isNaN(chute) || chute < 1 || chute > 10) {
        // Valida o input
        exibirMensagem('Digite um número válido entre 1 e 10.', 'label-vermelho');
        setTimeout(() => limparCampo(), 3000); // Limpa após 3 segundos
        chuteInput.focus(); // Foca no campo de entrada novamente
        return;
    }

    numeroTentativas++; // Incrementa tentativas
    if (chute === numeroSecreto) {
        // Verifica se acertou
        const palavraTentativas = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        exibirMensagem(`Parabéns! Você acertou com ${numeroTentativas} ${palavraTentativas}!`, 'label-verde');
        btnChutar.disabled = true; // Desativa botão de chute
        btnReiniciar.disabled = false; // Ativa botão "Novo Jogo"
    } else {
        const dica = chute > numeroSecreto ? 'menor' : 'maior';
        exibirMensagem(`O número secreto é ${dica}.`, 'label-vermelho');
        setTimeout(() => limparCampo(), 3000); // Limpa após 3 segundos
        chuteInput.focus();
    }
}

// Inicializa o jogo
exibirMensagem('Jogo do número secreto. Escolha um número entre 1 e 10');
reiniciarJogo();
