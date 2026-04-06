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