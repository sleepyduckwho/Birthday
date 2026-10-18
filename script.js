
// MAAKRIII ARCHIVE — interactive features

const $ = (selector) => document.querySelector(selector);

// Show a small message at the bottom of the page.
let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// 1. Welcome button and birthday popup

const popup = $("#birthdayPopup");

$("#enterButton").addEventListener("click", () => {
  $("#casefile").scrollIntoView({ behavior: "smooth" });

  if (typeof popup.showModal === "function") {
    popup.showModal();
  } else {
    showToast("Birthday protocol activated. Welcome to the archive!");
  }
});

$("#popupContinue").addEventListener("click", () => {
  popup.close();

  $("#casefile").scrollIntoView({ behavior: "smooth" });

  showToast("Investigation resumed. Good luck, maakriii.");
});

// 2. Dismiss the warning

$("#dismissAlert").addEventListener("click", () => {
  const alert = $("#alert");

  alert.style.transition = "opacity .3s";
  alert.style.opacity = "0";

  setTimeout(() => alert.remove(), 300);
});

// 3. Clickable notes
// Edit these messages to make them more personal.

const notes = [
  {
    label: "NOTE 01 · READ WHENEVER",
    title: "The little things",
    text: "I hope you know that you don't have to do something extraordinary to be appreciated. Sometimes it's just the way you talk, the random things you say, or the fact that a conversation with you can make a regular day a little less regular."
  },
  {
    label: "NOTE 02 · A SMALL REMINDER",
    title: "On difficult days",
    text: "You don't have to have everything figured out all the time. I hope this year gives you more reasons to feel proud of yourself, more peace in your head, and more moments where you realise that you're doing better than you think."
  },
  {
    label: "NOTE 03 · UNNECESSARY SENTIMENTALITY",
    title: "The actual point of this website",
    text: "I could've sent you a birthday message like a normal person. But apparently I chose to make an entire website instead. So, yes, you matter. Unfortunately for both of us, I have evidence."
  }
];

document.querySelectorAll("[data-note]").forEach(button => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.note);
    const note = notes[index];

    $("#noteLabel").textContent = note.label;
    $("#noteTitle").textContent = note.title;
    $("#noteText").textContent = note.text;

    const reveal = $("#noteReveal");
    reveal.hidden = false;

    reveal.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});

$("#closeReveal").addEventListener("click", () => {
  $("#noteReveal").hidden = true;
});

// 4. Bucket-list progress

const tasks = document.querySelectorAll(
  '.task input[type="checkbox"]'
);

function updateProgress() {
  const completed = [...tasks].filter(
    task => task.checked
  ).length;

  const total = tasks.length;

  $("#progressBar").style.width =
    `${(completed / total) * 100}%`;

  $("#progressText").textContent =
    `${completed} OF ${total} ADVENTURES UNLOCKED`;

  if (completed === total) {
    showToast(
      "All adventures unlocked! Go make some stories, maakriii ✦"
    );
  }
}

tasks.forEach(task => {
  task.addEventListener("change", updateProgress);
});

// 5. Birthday awards carousel

const awards = [
  {
    title: "Lifetime Achievement in Being Anirudhh",
    description:
      "A category created exclusively because no existing award could adequately capture the situation."
  },
  {
    title: "Distinguished Taste in Music",
    description:
      "For maintaining a soundtrack that apparently deserves its own corner of this website."
  },
  {
    title: "Main Character With a Side Quest",
    description:
      "For the ongoing commitment to living life like there might be a cinematic montage later."
  },
  {
    title: "Actually a Good Human",
    description:
      "For the real stuff: being someone worth knowing, talking to, and cheering for. This one is not a joke."
  }
];

let awardIndex = 0;

function displayAward() {
  const award = awards[awardIndex];

  $("#awardNumber").textContent =
    `AWARD ${String(awardIndex + 1).padStart(2, "0")} / ${String(awards.length).padStart(2, "0")}`;

  $("#awardTitle").textContent = award.title;
  $("#awardDescription").textContent = award.description;
}

$("#nextAward").addEventListener("click", () => {
  awardIndex = (awardIndex + 1) % awards.length;
  displayAward();
});

$("#prevAward").addEventListener("click", () => {
  awardIndex =
    (awardIndex - 1 + awards.length) % awards.length;

  displayAward();
});

// 6. Confetti celebration

function celebrate() {
  const symbols = ["✦", "✳", "♡", "✧", "❋"];

  const colours = [
    "#7c263a",
    "#85866a",
    "#d8a7a0",
    "#b78b39"
  ];

  for (let i = 0; i < 42; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.color = colours[i % colours.length];

    piece.style.setProperty(
      "--duration",
      `${2 + Math.random() * 2.5}s`
    );

    piece.style.setProperty(
      "--drift",
      `${Math.random() * 180 - 90}px`
    );

    piece.style.fontSize =
      `${12 + Math.random() * 16}px`;

    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 4700);
  }

  showToast(
    "Happy birthdayyyy,Anirudhhhh! Go be legendary ✦"
  );
}

$("#celebrateButton").addEventListener("click", celebrate);

// 7. Music button
// This opens a Rex Vijayan search; it does not autoplay music.

$("#musicButton").addEventListener("click", () => {
  window.open(
    "https://www.youtube.com/results?search_query=Rex+Vijayan+songs",
    "_blank",
    "noopener,noreferrer"
  );

  showToast("Your Rex Vijayan soundtrack awaits ♫");
});

// 8. Return to the beginning

$("#replayButton").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  showToast("Reopening the archive... subject still under investigation.");
});

// Initialise the website.

displayAward();
updateProgress();

/* =========================================
   EXHIBIT F — MAAKRIII(kunjan) INVESTIGATION QUIZ
   ========================================= */

(() => {
  const intro = document.getElementById("quiz-intro");
  const play = document.getElementById("quiz-play");
  const results = document.getElementById("quiz-results");

  // If the quiz section isn't on this page, do nothing.
  if (!intro || !play || !results) return;

  const startButton = document.getElementById("quiz-start");
  const nextButton = document.getElementById("quiz-next");
  const unlockButton = document.getElementById("quiz-unlock");
  const replayButton = document.getElementById("quiz-replay");

  const counter = document.getElementById("quiz-counter");
  const scoreDisplay = document.getElementById("quiz-score");
  const progress = document.getElementById("quiz-progress");
  const questionTitle = document.getElementById("quiz-question");
  const optionsContainer = document.getElementById("quiz-options");
  const feedback = document.getElementById("quiz-feedback");

  const finalScore = document.getElementById("quiz-final-score");
  const resultTitle = document.getElementById("quiz-result-title");
  const resultDescription = document.getElementById(
    "quiz-result-description"
  );
  const resultDoodle = document.getElementById("quiz-result-doodle");
  const secretMessage = document.getElementById("quiz-secret");

  // Change the questions and answers to match your inside jokes!
  
const questions = [
  {
    question: "An incident happens. Anirudh finally gets some free time. What does his brain do?",
    options: [
      "A. Moves on with life like a normal human being.",
      "B. Replays the incident and analyses every tiny detail.",
      "C. Creates 47 possible explanations, including ones nobody asked for.",
      "D. Combines B and C, then finds an even more complicated theory."
    ],
    correct: 3,
    reactions: [
      "A suspiciously optimistic conclusion.",
      "Correct. The investigation is getting interesting.",
      "You have chosen to respect the classified documents.",
      "EXACTLY. The overthinking department has confirmed your findings."
    ]
  },
  {
    question: "If Anirudh's brain had a Wikipedia page, what would it be about? 😂",
    options: [
      "A. Can turn any normal conversation into a 2-hour debate.",
      "B. Has a PhD in overthinking the simplest things.",
      "C. Remembers the most useless facts but forgets important things.",
      "D. Forget Google. Just ask Maakriii anything about Wake Up Sid."
    ],
    correct: 3,
    reactions: [
      "Respectable, but the cinematic experience is missing.",
      "Correct. Main-character energy detected.",
      "An excellent report. Slightly too professional.",
      "WAKE UP SID EXPERTISE DETECTED. Case file updated."
    ]
  },
  {
    question: "Anirudh gets one whole day to explore like Bunny in YJHD. What's his move?",
    options: [
      "A. Travels somewhere new and collects unforgettable memories.",
      "B. Makes a chaotic itinerary and somehow visits everything.",
      "C. Goes wherever the vibe takes him, plans absolutely nothing.",
      "D. Starts with a normal trip and turns it into a legendary adventure."
    ],
    correct: 0,
    reactions: [
      "Correct. Adventure first, logistics later.",
      "A strong supporting-character performance.",
      "The mountains are calling. He is not answering.",
      "Technology has officially defeated the travel spirit."
    ]
  },
  {
    question: "Anirudh gets accidentally cast as the main character in a movie. What genre does his life become?",
    options: [
      "A. Romantic comedy.",
      "B. Action thriller.",
      "C. Adventure movie.",
      "D. A genre nobody can identify."
    ],
    correct: 0,
    reactions: [
      "That is exactly what a suspicious person would say.",
      "An adult supervisor has declined the assignment.",
      "The archives department approves this decision.",
      "Correct. Every option is evidence. Beautifully suspicious."
    ]
  },
  {
    question: "Final question: What's the most anirudh thing anirudh could possibly do?",
    options: [
      "A. Overthink one tiny incident until it becomes a cinematic universe.",
      "B. Plan an epic adventure, then get distracted by a completely different thought.",
      "C. Turn an ordinary conversation into a debate nobody prepared for.",
      "D. Somehow do all three and still insist he's perfectly normal."
    ],
    correct: 2,
    reactions: [
      "The jury would like to see your evidence.",
      "A strong contender for the title.",
      "Highly qualified, but the committee has more awards.",
      "Correct. The birthday cake budget has been approved."
    ]
  }
];


  const reportCards = [
    {
      min: 0,
      max: 1,
      title: "Certified Mystery Creature",
      emoji: "🛸",
      description:
        "The evidence is inconclusive. Either you barely know the subject, " +
        "or Maakriii has successfully hidden his entire personality."
    },
    {
      min: 2,
      max: 3,
      title: "Suspiciously Familiar Human",
      emoji: "🧐",
      description:
        "You have gathered some useful evidence. The subject is still " +
        "questionable, but your investigative instincts are improving."
    },
    {
      min: 4,
      max: 4,
      title: "Senior Maakriii Analyst",
      emoji: "🕵️",
      description:
        "Impressive work. You understand most of the subject's suspicious " +
        "patterns. Your official detective badge is in the post."
    },
    {
      min: 5,
      max: 5,
      title: "Unfortunately, You Know Him Too Well",
      emoji: "🏆",
      description:
        "Five out of five. This level of knowledge is both impressive " +
        "and mildly concerning. Please accept your honorary detective title."
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let selectedAnswer = null;
  let questionLocked = false;

  function showScreen(screen) {
    intro.hidden = screen !== "intro";
    play.hidden = screen !== "play";
    results.hidden = screen !== "results";
  }

  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    questionLocked = false;

    secretMessage.hidden = true;
    unlockButton.hidden = false;

    showScreen("play");
    renderQuestion();

    play.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function renderQuestion() {
    const question = questions[currentQuestion];

    selectedAnswer = null;
    questionLocked = false;

    counter.textContent =
      `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / 05`;

    scoreDisplay.textContent = `EVIDENCE: ${score}`;
    progress.style.width = `${(currentQuestion / questions.length) * 100}%`;

    questionTitle.textContent = question.question;
    feedback.textContent = "";
    nextButton.disabled = true;
    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "Reveal investigation report →"
        : "Lock in answer →";

    optionsContainer.replaceChildren();

    question.options.forEach((option, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;

      button.addEventListener("click", () => {
        selectAnswer(index);
      });

      optionsContainer.appendChild(button);
    });

    play.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function selectAnswer(index) {
    if (questionLocked) return;

    selectedAnswer = index;

    const buttons = optionsContainer.querySelectorAll(".quiz-option");

    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle(
        "is-selected",
        buttonIndex === selectedAnswer
      );
    });

    nextButton.disabled = false;
    feedback.textContent = "Evidence selected. Ready to submit.";
  }

  function submitAnswer() {
    if (selectedAnswer === null || questionLocked) return;

    questionLocked = true;

    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;

    if (isCorrect) {
      score++;
    }

    const buttons = optionsContainer.querySelectorAll(".quiz-option");

    buttons.forEach((button, index) => {
      button.disabled = true;

      if (index === selectedAnswer) {
        button.classList.add("is-selected");
      }
    });

    scoreDisplay.textContent = `EVIDENCE: ${score}`;
    feedback.textContent = question.reactions[selectedAnswer];

    progress.style.width =
      `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "View final report →"
        : "Next question →";
  }

  function goToNextQuestion() {
    if (!questionLocked) {
      submitAnswer();
      return;
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    const report = reportCards.find(
      (item) => score >= item.min && score <= item.max
    );

    showScreen("results");

    finalScore.textContent = `${score} / ${questions.length}`;
    resultTitle.textContent = report.title;
    resultDoodle.textContent = report.emoji;
    resultDescription.textContent = report.description;

    secretMessage.hidden = true;
    unlockButton.hidden = false;

    results.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function unlockBirthdayMessage() {
    secretMessage.hidden = false;
    unlockButton.hidden = true;

    secretMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  function replayQuiz() {
    secretMessage.hidden = true;
    unlockButton.hidden = false;

    showScreen("intro");

    intro.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", goToNextQuestion);
  unlockButton.addEventListener("click", unlockBirthdayMessage);
  replayButton.addEventListener("click", replayQuiz);

})();
