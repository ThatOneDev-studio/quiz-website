// Quiz data
const quiz = [
  {
    type: "multiple",
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris"
  },
  {
    type: "truefalse",
    question: "The sky is blue.",
    answer: true
  },
  {
    type: "spelling",
    question: "Spell the word for a large body of water.",
    answer: "ocean"
  },
  {
    type: "fillblank",
    question: "The chemical symbol for water is ___ .",
    answer: "H2O"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const submitBtn = document.getElementById('submit-btn');
const answerInput = document.getElementById('answer-input');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  feedbackEl.textContent = "";
  answerInput.style.display = "none";
  optionsEl.innerHTML = "";

  if (currentQuestion >= quiz.length) {
    questionEl.textContent = "Quiz finished!";
    submitBtn.style.display = "none";
    scoreEl.textContent = `Your score: ${score}/${quiz.length}`;
    return;
  }

  const q = quiz[currentQuestion];
  questionEl.textContent = q.question;

  if (q.type === "multiple") {
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt);
      optionsEl.appendChild(btn);
    });
  } else if (q.type === "truefalse") {
    ["True", "False"].forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt === "True");
      optionsEl.appendChild(btn);
    });
  } else if (q.type === "spelling" || q.type === "fillblank") {
    answerInput.style.display = "block";
    answerInput.value = "";
  }
}

function checkAnswer(answer) {
  const correct = quiz[currentQuestion].answer;
  if (answer.toString().toLowerCase() === correct.toString().toLowerCase()) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
  }
  currentQuestion++;
  setTimeout(loadQuestion, 1500);
}

submitBtn.onclick = () => {
  if (quiz[currentQuestion].type === "spelling" || quiz[currentQuestion].type === "fillblank") {
    checkAnswer(answerInput.value);
  }
};

// Start quiz
loadQuestion();
