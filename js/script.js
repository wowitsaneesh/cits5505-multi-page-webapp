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

function showCareerGoal() {
    let careerGoal = "My career goal is to become a skilled web developer who builds useful and user-friendly websites.";
    document.getElementById("cv-output").innerHTML = careerGoal;
    console.log("Career goal displayed.");
}

// Loads one quiz question from a local JSON file using XMLHttpRequest.
function loadQuizQuestion() {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let questions = JSON.parse(this.responseText);
            let question = questions[0];

            let questionHtml = "";
            questionHtml += "<fieldset>";
            questionHtml += "<legend>" + question.title + "</legend>";
            questionHtml += "<p>" + question.question + "</p>";

            for (let index = 0; index < question.options.length; index++) {
                let option = question.options[index];
                questionHtml += '<input type="radio" id="q1' + option.value + '" name="q1" value="' + option.value + '">';
                questionHtml += '<label for="q1' + option.value + '">' + option.text + "</label><br>";
            }

            questionHtml += "</fieldset>";

            document.getElementById("quiz-container").innerHTML = questionHtml;
            console.log("Quiz question loaded from local file.");
        }
    };

    request.open("GET", "data/questions.json", true);
    request.send();
}

// Checks the loaded quiz answer, shows the result, and stores a simple attempt.
function gradeSampleQuiz() {
    let selectedAnswer = "";
    let options = document.getElementsByName("q1");

    for (let index = 0; index < options.length; index++) {
        if (options[index].checked) {
            selectedAnswer = options[index].value;
        }
    }

    if (selectedAnswer === "") {
        document.getElementById("quiz-result").innerHTML = "Please select an answer before checking.";
        return;
    }

    let score = 0;

    if (selectedAnswer === "a") {
        score = 1;
        document.getElementById("quiz-result").innerHTML = "Correct! Your score is 1 out of 1.";
    } else {
        document.getElementById("quiz-result").innerHTML = "Incorrect. Your score is 0 out of 1.";
    }

    localStorage.setItem("latestQuizScore", score);
    showQuizHistory();
}

// Displays the latest stored quiz attempt.
function showQuizHistory() {
    let savedScore = localStorage.getItem("latestQuizScore");

    if (savedScore === null) {
        document.getElementById("quiz-history").innerHTML = "No attempts saved yet.";
    } else {
        document.getElementById("quiz-history").innerHTML = "Latest saved attempt: " + savedScore + " out of 1.";
    }
}