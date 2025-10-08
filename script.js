// O Algoritmo da Aventura (Mapa do Jogo)
const story = {
    // Passo 0 (Início)
    'start': {
        text: "Você acorda no meio de uma floresta escura. Você não tem memória de como chegou aqui, apenas uma sensação urgente de que precisa encontrar o Templo Perdido. O que você faz?",
        options: [
            { text: "Seguir um caminho estreito à esquerda.", next: 'path_left' },
            { text: "Ir em direção a uma luz fraca à direita.", next: 'path_right' }
        ]
    },

    // Passo 1 (Caminho da Esquerda)
    'path_left': {
        text: "O caminho da esquerda está cheio de espinhos, mas você ouve o som de água corrente. Você arrisca a mão, mas é mordido por uma cobra peçonhenta.",
        options: [
            { text: "Tentar curar a ferida com ervas próximas.", next: 'heal' },
            { text: "Ignorar a ferida e correr em direção à água.", next: 'water' }
        ]
    },

    // Passo 2 (Caminho da Direita)
    'path_right': {
        text: "A luz fraca te guia a uma clareira onde há uma estátua antiga e uma velha fogueira. Você vê um mapa quase queimado ao lado da fogueira.",
        options: [
            { text: "Pegar o mapa e seguir a direção indicada.", next: 'map_follow' },
            { text: "Acender a fogueira para se aquecer.", next: 'campfire' }
        ]
    },

    // Finais de Jogo
    'heal': {
        text: "Você usa as ervas, mas a peçonha era muito forte. Seu corpo enfraquece, e você falha na sua busca. Fim de jogo.",
        options: [
            { text: "Recomeçar a Aventura", next: 'start' }
        ]
    },
    'water': {
        text: "Você corre até a água. Ela é mágica! Cura seu ferimento e te dá uma visão do templo! Você o alcança e completa sua busca! **Vitória!**",
        options: [
            { text: "Recomeçar a Aventura", next: 'start' }
        ]
    },
    'map_follow': {
        text: "O mapa te leva diretamente para uma armadilha. Uma rocha gigante cai sobre você. Fim de jogo.",
        options: [
            { text: "Recomeçar a Aventura", next: 'start' }
        ]
    },
    'campfire': {
        text: "O calor da fogueira faz você dormir. Quando acorda, o mapa e a estátua sumiram. Você está perdido novamente. Fim de jogo.",
        options: [
            { text: "Recomeçar a Aventura", next: 'start' }
        ]
    }
};

let currentStep = 'start'; // Define o passo inicial do jogo

// --- Funções de Manipulação do Jogo (Algoritmos) ---

function showStep(stepKey) {
    const step = story[stepKey]; // Busca a informação do passo
    
    // 1. Atualiza o texto da história (DOM Manipulation)
    document.getElementById('story-text').textContent = step.text;

    // 2. Limpa e recria os botões (DOM Manipulation/Lógica de Decisão)
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Verifica se há opções para mostrar
    if (step.options && step.options.length > 0) {
        // Itera sobre as opções e cria um botão para cada
        step.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            
            // Adiciona a função para avançar no jogo ao clicar (Evento/Algoritmo)
            button.onclick = () => {
                chooseOption(option.next);
            };
            
            optionsContainer.appendChild(button);
        });
        // Esconde o botão de Recomeçar (se estiver visível)
        document.getElementById('restart-button').style.display = 'none';
        
    } else {
        // Se não houver opções (é um final), mostra o botão de Recomeçar
        document.getElementById('restart-button').style.display = 'block';
    }
}

function chooseOption(nextStep) {
    // Atualiza o estado atual do jogo
    currentStep = nextStep; 
    
    // Move para o próximo passo
    showStep(currentStep);
}

function startGame() {
    // Reinicia o jogo no passo inicial
    currentStep = 'start';
    showStep(currentStep);
}

// Inicia o jogo quando a página carrega
startGame();
