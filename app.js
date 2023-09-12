const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hypertext Markup Language", correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "Highly Typed Machine Learning", correct: false },
            { text: "Hypertext Transfer Language", correct: false },
        ],
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "variable", correct: false },
            { text: "v", correct: false },
            { text: "let", correct: false },
        ],
    },
    {
        question: "What symbol is used for single-line comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "/*", correct: false },
            { text: "--", correct: false },
            { text: "#", correct: false },
        ],
    },
    {
        question: "Which of the following is not a data type in JavaScript?",
        answers: [
            { text: "String", correct: false },
            { text: "Boolean", correct: false },
            { text: "Undefined", correct: false },
            { text: "Integer", correct: true },
        ],
    },
    {
        question: "What is the result of 2 + '2' in JavaScript?",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: true },
            { text: "Error", correct: false },
            { text: "NaN", correct: false },
        ],
    },
    {
        question: "Which function is used to print something to the console in JavaScript?",
        answers: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "log()", correct: false },
            { text: "printToConsole()", correct: false },
        ],
    },
    {
        question: "What does DOM stand for in web development?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Model", correct: false },
            { text: "Document Object Manipulation", correct: false },
            { text: "Dynamic Object Model", correct: false },
        ],
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        answers: [
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "=", correct: false },
            { text: "!=", correct: false },
        ],
    },
    {
        question: "What is the purpose of the 'return' statement in a JavaScript function?",
        answers: [
            { text: "To declare a variable", correct: false },
            { text: "To exit the loop", correct: false },
            { text: "To return a value from the function", correct: true },
            { text: "To print a message to the console", correct: false },
        ],
    },
    {
        question: "Which built-in object can be used to represent a date and time in JavaScript?",
        answers: [
            { text: "Timer", correct: false },
            { text: "Date", correct: true },
            { text: "Clock", correct: false },
            { text: "Time", correct: false },
        ],
    },
];


const timerElement = document.getElementById("time-left");
let timer;
let timerDuration = 10; // Set the initial timer duration in seconds

const startTimer = () => {
    let time = timerDuration;
    timer = setInterval(() => {
        timerElement.textContent = time;
        if (time === 0) {
            clearInterval(timer);
            // Handle when time is up (e.g., mark the answer as incorrect and move to the next question)
            handleNextButton();
        }
        time--;
    }, 1000);
};

const resetTimer = () => {
    clearInterval(timer);
    timerElement.textContent = timerDuration; // Reset the timer to the initial duration
};



const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

const showQuestion = () => {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

    // Start the timer for each question
    startTimer();

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

const resetState = () => {
    resetTimer(); // Reset the timer for each question
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

const selectAnswer = (e) => {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};
const showScore = () => {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
    timerElement.innerHTML = ""; // Clear the timer element
};

const handleNextButton = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
};

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
