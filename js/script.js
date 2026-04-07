// Stores the loaded quiz questions for use during grading.
let loadedQuestions = [];

// Tracks whether the user has started the quiz.
let quizStarted = false;

// Tracks whether the quiz has been successfully submitted.
let quizSubmitted = false;

// Displays a simple message to the user.
function showWelcomeMessage() {
    alert("Welcome! JavaScript can respond to button clicks and interact with the user.");
    console.log("Welcome message shown.");
}

// Asks the visitor for their name and updates the page text.
function askVisitorName() {
    let visitorName = prompt("What is your name?");

    if (visitorName !== null && visitorName !== "") {
        document.getElementById("demo-output").innerHTML = "Hello, " + visitorName + "! Welcome to the JavaScript demo.";
        console.log("Visitor entered name: " + visitorName);
    } else {
        document.getElementById("demo-output").innerHTML = "You did not enter a name.";
        console.log("No name entered.");
    }
}

// Performs a very simple calculation and shows the result.
function showAdditionResult() {
    let firstNumber = 5;
    let secondNumber = 7;
    let total = firstNumber + secondNumber;

    document.getElementById("demo-output").innerHTML = "The result of 5 + 7 is " + total + ".";
    console.log("Calculation result shown: " + total);
}

// Displays a simple career goal message on the CV page.
function showCareerGoal() {
    let careerGoal = "My career goal is to become a skilled web developer who builds useful and user-friendly websites.";
    document.getElementById("cv-output").innerHTML = careerGoal;
    console.log("Career goal displayed.");
}

// Randomises the order of questions in the array.
function shuffleQuestions(questionArray) {
    for (let index = questionArray.length - 1; index > 0; index--) {
        let randomIndex = Math.floor(Math.random() * (index + 1));
        let temporaryValue = questionArray[index];
        questionArray[index] = questionArray[randomIndex];
        questionArray[randomIndex] = temporaryValue;
    }
}

// Marks the quiz as started once the user selects an answer.
function markQuizStarted() {
    if (!quizSubmitted) {
        quizStarted = true;
    }
}

// Warns the user if they try to leave after starting but before submitting.
window.onbeforeunload = function () {
    if (quizStarted && !quizSubmitted) {
        return "You have started the quiz but not submitted it yet.";
    }
};

// Loads all quiz questions from the local JSON file using XMLHttpRequest.
function loadQuizQuestion() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);

            shuffleQuestions(questions);
            loadedQuestions = questions;

            let questionHtml = "";

            for (let questionIndex = 0; questionIndex < loadedQuestions.length; questionIndex++) {
                let question = loadedQuestions[questionIndex];
                let questionNumber = questionIndex + 1;

                questionHtml += "<fieldset>";
                questionHtml += "<legend>Question " + questionNumber + "</legend>";
                questionHtml += "<p>" + question.question + "</p>";

                for (let optionIndex = 0; optionIndex < question.options.length; optionIndex++) {
                    let option = question.options[optionIndex];
                    let inputId = "q" + questionNumber + option.value;

                    questionHtml += '<input type="radio" id="' + inputId + '" name="q' + questionNumber + '" value="' + option.value + '" onclick="markQuizStarted()">';

                    let optionText = option.text;

                    if (
                        (optionText.indexOf("&lt;") !== -1 && optionText.indexOf("&gt;") !== -1) ||
                        optionText.indexOf(".") !== -1 ||
                        optionText.indexOf("#") !== -1 ||
                        optionText.indexOf("(") !== -1 ||
                        optionText === "localStorage" ||
                        optionText === "innerHTML" ||
                        optionText === "navigator"
                    ) {
                        optionText = "<code>" + optionText + "</code>";
                    }

                    questionHtml += '<label for="' + inputId + '">' + optionText + "</label><br>";
                }

                questionHtml += "</fieldset><br>";
            }

            document.getElementById("quiz-container").innerHTML = questionHtml;
            console.log("Quiz questions loaded from local file.");
        }
    };

    request.open("GET", "data/questions.json", true);
    request.send();
}

// Fetches reward content from a public API if the user passes.
function fetchRewardContent() {
    fetch("https://api.adviceslip.com/advice?timestamp=" + new Date().getTime())
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let adviceText = data.slip.advice;
            document.getElementById("quiz-reward").innerHTML =
                "Reward unlocked: " + adviceText;
            console.log("Reward content loaded from public API.");
        })
        .catch(function () {
            document.getElementById("quiz-reward").innerHTML =
                "Reward unlocked, but the advice could not be loaded right now.";
            console.log("Reward API request failed.");
        });
}

// Grades all rendered quiz questions, calculates percentage and pass/fail, and stores the attempt.
function gradeSampleQuiz() {
    let score = 0;
    let answeredQuestions = 0;
    let unansweredQuestions = [];

    for (let questionIndex = 0; questionIndex < loadedQuestions.length; questionIndex++) {
        let questionNumber = questionIndex + 1;
        let selectedAnswer = "";
        let options = document.getElementsByName("q" + questionNumber);

        for (let optionIndex = 0; optionIndex < options.length; optionIndex++) {
            if (options[optionIndex].checked) {
                selectedAnswer = options[optionIndex].value;
            }
        }

        if (selectedAnswer !== "") {
            answeredQuestions += 1;
        } else {
            unansweredQuestions.push(questionNumber);
        }

        if (selectedAnswer === loadedQuestions[questionIndex].correctAnswer) {
            score += 1;
        }
    }

    if (unansweredQuestions.length > 0) {
        alert("Please answer all questions before submitting.\nUnanswered questions: " + unansweredQuestions.join(", "));
        document.getElementById("quiz-result").innerHTML =
            "Please complete all questions before submitting the quiz.";
        document.getElementById("quiz-reward").innerHTML =
            "Reward content will appear here if you pass.";
    return;
    }

    let totalQuestions = loadedQuestions.length;
    let percentage = (score / totalQuestions) * 100;
    let passMark = 70;
    let resultText = "";

    if (percentage >= passMark) {
        resultText = "You scored " + score + " out of " + totalQuestions + " (" + percentage.toFixed(0) + "%). You passed!";
        fetchRewardContent();
    } else {
        resultText = "You scored " + score + " out of " + totalQuestions + " (" + percentage.toFixed(0) + "%). You did not pass.";
        document.getElementById("quiz-reward").innerHTML = "No reward this time. Try again to pass the quiz.";
    }

    document.getElementById("quiz-result").innerHTML = resultText;

    let attempts = localStorage.getItem("quizAttempts");
    let attemptList = [];

    if (attempts !== null) {
        attemptList = JSON.parse(attempts);
    }

    let attempt = {
        score: score,
        total: totalQuestions,
        percentage: percentage.toFixed(0),
        date: new Date().toLocaleString()
    };

    attemptList.push(attempt);
    localStorage.setItem("quizAttempts", JSON.stringify(attemptList));

    quizSubmitted = true;
    quizStarted = false;
    window.onbeforeunload = null;

    showQuizHistory();
}

// Displays all saved quiz attempts from local storage.
function showQuizHistory() {
    let savedAttempts = localStorage.getItem("quizAttempts");

    if (savedAttempts === null) {
        document.getElementById("quiz-history").innerHTML = "No attempts saved yet.";
    } else {
        let attemptList = JSON.parse(savedAttempts);
        let historyHtml = "<strong>Previous Attempts:</strong><br>";

        for (let index = 0; index < attemptList.length; index++) {
            let attempt = attemptList[index];
            historyHtml += "Attempt " + (index + 1) + ": ";
            historyHtml += attempt.score + " out of " + attempt.total;
            historyHtml += " (" + attempt.percentage + "%)";
            historyHtml += " - " + attempt.date + "<br>";
        }

        document.getElementById("quiz-history").innerHTML = historyHtml;
    }
}

// Clears all saved quiz attempts from local storage.
function clearQuizHistory() {
    let userConfirmed = confirm("Are you sure you want to clear all previous attempts?");

    if (userConfirmed) {
        localStorage.removeItem("quizAttempts");
        document.getElementById("quiz-history").innerHTML = "No attempts saved yet.";
    }
}