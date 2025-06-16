const questions = [
    {
        question: "Algoritmos podem reproduzir preconceitos raciais?",
        options: ["Sim", "Não", "Apenas se forem programados para isso"],
        answer: 0
    },
    {
        question: "O que é viés algorítmico?",
        options: [
            "Quando o algoritmo se adapta a diferentes culturas",
            "Quando há erro proposital nos cálculos",
            "Quando decisões refletem preconceitos nos dados ou lógica"
        ],
        answer: 2
    },
    {
        question: "O que pode causar viés em um algoritmo?",
        options: ["Falta de dados", "Dados enviesados", "Código malicioso"],
        answer: 1
    },
    {
        question: "Qual é um exemplo real de viés algorítmico?",
        options: [
            "Busca do Google funcionando offline",
            "Reconhecimento facial com menor precisão em pessoas negras",
            "Apps de clima errando a previsão"
        ],
        answer: 1
    },
    {
        question: "Qual área é mais afetada por vieses algorítmicos?",
        options: ["Jogos", "Redes sociais", "Justiça criminal"],
        answer: 2
    },
    {
        question: "Como evitar vieses em IA?",
        options: [
            "Ignorar dados históricos",
            "Treinar com dados diversos e revisar resultados",
            "Evitar usar IA em decisões"
        ],
        answer: 1
    },
    {
        question: "O viés algorítmico é sempre intencional?",
        options: ["Sim", "Não", "Depende da linguagem de programação"],
        answer: 1
    },
    {
        question: "Por que diversidade na equipe de desenvolvimento é importante?",
        options: [
            "Para dividir tarefas",
            "Para evitar preconceitos nos sistemas",
            "Para reduzir custos"
        ],
        answer: 1
    },
    {
        question: "O que significa 'transparência algorítmica'?",
        options: [
            "Deixar o código visível",
            "Entender como decisões são tomadas por algoritmos",
            "Mostrar os resultados finais"
        ],
        answer: 1
    },
    {
        question: "O que é machine learning?",
        options: [
            "IA que aprende com dados",
            "Robôs que fazem café",
            "Computadores com sentimentos"
        ],
        answer: 0
    },
    {
        question: "Por que os dados são importantes para IA?",
        options: [
            "Porque são bonitos",
            "Porque alimentam o aprendizado da máquina",
            "Porque substituem o código"
        ],
        answer: 1
    },
    {
        question: "O que é auditoria algorítmica?",
        options: [
            "Inspeção de códigos por bugs",
            "Análise dos algoritmos para identificar injustiças",
            "Atualização do sistema"
        ],
        answer: 1
    },
    {
        question: "O que é uma base de dados enviesada?",
        options: [
            "Contém erros de digitação",
            "Possui dados que representam apenas um grupo",
            "Está fora do ar"
        ],
        answer: 1
    },
    {
        question: "O que pode acontecer se uma IA for treinada com dados racistas?",
        options: [
            "Ela ficará mais rápida",
            "Ela poderá tomar decisões injustas",
            "Ela ignorará esses dados"
        ],
        answer: 1
    },
    {
        question: "Qual profissão é crucial para reduzir vieses em IA?",
        options: ["Engenheiro de IA", "Médico", "Piloto"],
        answer: 0
    },
    {
        question: "IA pode ser usada para promover igualdade?",
        options: ["Sim, se for bem projetada", "Não", "Apenas em jogos"],
        answer: 0
    },
    {
        question: "É possível detectar viés antes de lançar um algoritmo?",
        options: ["Sim, com testes e auditoria", "Não", "Somente após denúncias"],
        answer: 0
    },
    {
        question: "Como as redes neurais aprendem?",
        options: [
            "Por tentativa e erro com dados",
            "Lendo livros",
            "Copiando outros sistemas"
        ],
        answer: 0
    },
    {
        question: "O que significa 'injustiça algorítmica'?",
        options: [
            "Erro de código",
            "Resultado injusto causado por um algoritmo",
            "Problema de interface"
        ],
        answer: 1
    },
    {
        question: "Por que é importante questionar a neutralidade dos algoritmos?",
        options: [
            "Porque todos são imparciais",
            "Porque podem reforçar desigualdades",
            "Porque atrapalham os desenvolvedores"
        ],
        answer: 1
    }
];

let selectedQuestions = [];
let answeredCount = 0;

function startQuiz() {
    const name = document.getElementById('player-name').value.trim();
    if (!name) {
        alert('Digite seu nome para começar.');
        return;
    }

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('display-name').textContent = name;

    answeredCount = 0;
    updateProgress();
    generateQuiz();
}

function showInfo() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('info-screen').classList.remove('hidden');
}

function hideInfo() {
    document.getElementById('info-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

function generateQuiz() {
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    selectedQuestions.forEach((q, i) => {
        const div = document.createElement('div');
        div.classList.add('question-box');
        div.innerHTML = `<p>${i + 1}. ${q.question}</p>` +
            q.options.map((opt, idx) => `
                <label>
                    <input type="radio" name="q${i}" value="${idx}" onchange="updateAnswerCount()">
                    ${opt}
                </label>`).join('');
        container.appendChild(div);
    });

    document.getElementById('check-answers-btn').disabled = true;
}

function updateAnswerCount() {
    answeredCount = 0;
    selectedQuestions.forEach((q, i) => {
        if (document.querySelector(`input[name="q${i}"]:checked`)) {
            answeredCount++;
        }
    });

    updateProgress();

    const checkBtn = document.getElementById('check-answers-btn');
    checkBtn.disabled = answeredCount !== selectedQuestions.length;

    // Adiciona animação à questão respondida
    const checkedInput = event.target.closest('.question-box');
    if (checkedInput) {
        checkedInput.classList.add('answered');
        setTimeout(() => {
            checkedInput.classList.remove('answered');
        }, 500);
    }
}

function updateProgress() {
    document.getElementById('progress-text').textContent =
        `${answeredCount}/${selectedQuestions.length} respondidas`;
}

function checkAnswers() {
    if (answeredCount < selectedQuestions.length) {
        alert('Responda todas as questões antes de verificar as respostas!');
        return;
    }

    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');

    const container = document.getElementById('results-container');
    container.innerHTML = '';

    let correctCount = 0;
    let wrongCount = 0;

    selectedQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        const value = selected ? parseInt(selected.value) : -1;
        const isCorrect = value === q.answer;

        if (isCorrect) correctCount++;
        else wrongCount++;

        const div = document.createElement('div');
        div.classList.add('question-box');
        div.classList.add(isCorrect ? 'correct' : 'wrong');

        div.innerHTML = `<p>${i + 1}. ${q.question}</p>` +
            q.options.map((opt, idx) => {
                const isChecked = idx === value;
                const isRightAnswer = idx === q.answer;
                let highlightClass = '';

                if (isRightAnswer && !isCorrect) {
                    highlightClass = 'highlight-correct';
                }

                return `<label class="${highlightClass}">
                    <input type="radio" disabled ${isChecked ? 'checked' : ''}>
                    ${opt}
                </label>`;
            }).join('');

        container.appendChild(div);
    });

    // Atualiza contagem de acertos/erros
    document.querySelector('.correct-score').textContent = correctCount;
    document.querySelector('.wrong-score').textContent = wrongCount;
}

function showCredits() {
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('credits-screen').classList.remove('hidden');

    const list = document.getElementById('credits-list');
    list.innerHTML = '';

    const members = [
        { name: "Ana Caroline Gomes de Lima e Silva", photo: "Imagens/photo.png" },
        { name: "Erisvaldo Cleiton de Almeida Lima", photo: "Imagens/Eu02.jpg" },
        { name: "Ially Lohrany Ramos Lima", photo: "Imagens/photo.png" },
        { name: "Igor Enrique Pereira de Lima", photo: "Imagens/photo.png" },
        { name: "João Lucas Gomes Nogueira", photo: "Imagens/photo.png" },
        { name: "Jonas Pereira da Silva", photo: "Imagens/photo.png" },
        { name: "José Vitor da Silva Lima", photo: "Imagens/photo.png" },
        { name: "Lyan Kael Bezerra Martins", photo: "Imagens/photo.png" },
        { name: "Rodrigo dos Santos Bezerra", photo: "Imagens/photo.png" },
        { name: "Vinícius Diniz Aquino", photo: "Imagens/photo.png" },
    ];

    members.forEach(m => {
        const div = document.createElement('div');
        div.classList.add('credit-item');
        div.innerHTML = `
            <img src="${m.photo}" class="credit-photo" alt="${m.name}">
            <span>${m.name}</span>
        `;
        list.appendChild(div);
    });
}

function restartQuiz() {
    document.getElementById('credits-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('player-name').value = '';
}