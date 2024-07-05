document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "1. 你更喜歡：",
            options: ["獨處", "和朋友在一起"]
        },
        {
            question: "2. 面對新環境，你通常：",
            options: ["謹慎觀察", "主動探索"]
        },
        {
            question: "3. 做決定時，你更傾向於：",
            options: ["依靠邏輯和分析", "聽從直覺和感受"]
        }
    ];

    let currentQuestion = 0;
    const answers = [];
    
    const startBtn = document.getElementById('startBtn');
    const retakeBtn = document.getElementById('retakeBtn');
    const intro = document.querySelector('.intro');
    const quiz = document.getElementById('quiz');
    const questionEl = document.getElementById('question');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    startBtn.addEventListener('click', startTest);
    retakeBtn.addEventListener('click', retakeTest);

    function startTest() {
        intro.style.display = 'none';
        quiz.style.display = 'block';
        displayQuestion();
    }

    function displayQuestion() {
        const question = questions[currentQuestion];
        let html = `<p>${question.question}</p><div class="options">`;
        question.options.forEach((option, index) => {
            html += `<button class="option" data-index="${index}">${option}</button>`;
        });
        html += '</div>';
        questionEl.innerHTML = html;

        document.querySelectorAll('.option').forEach(button => {
            button.addEventListener('click', selectOption);
        });
    }

    function selectOption(e) {
        const optionIndex = e.target.dataset.index;
        answers.push(parseInt(optionIndex));
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showLoading();
            setTimeout(calculateResult, 1500); // 延遲1.5秒以顯示loading效果
        }
    }

    function showLoading() {
        quiz.style.display = 'none';
        loading.style.display = 'block';
    }

    function calculateResult() {
        const total = answers.reduce((sum, answer) => sum + answer, 0);
        let resultText = "";

        if (total === 0) {
            resultText = "你可能是一個內向、謹慎、理性的人。你喜歡獨處，在新環境中觀察，並依靠邏輯做決定。";
        } else if (total === 1) {
            resultText = "你可能是一個略微內向，但在某些方面開放的人。你在獨處和社交之間保持平衡，並根據情況調整自己的行為。";
        } else if (total === 2) {
            resultText = "你可能是一個較為外向、適應性強的人。你喜歡社交，在新環境中感到舒適，並能平衡邏輯和直覺。";
        } else {
            resultText = "你可能是一個外向、冒險、感性的人。你喜歡與人相處，樂於探索新事物，並常常依靠直覺做決定。";
        }

        loading.style.display = 'none';
        result.innerHTML = resultText;
        retakeBtn.style.display = 'block';
    }

    function retakeTest() {
        currentQuestion = 0;
        answers.length = 0;
        intro.style.display = 'block';
        quiz.style.display = 'none';
        result.innerHTML = '';
        retakeBtn.style.display = 'none';
    }
});
