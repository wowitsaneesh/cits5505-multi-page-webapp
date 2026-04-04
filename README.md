# CITS5505 Multi-Page Web Application

A multi-page interactive web application for CITS5505 featuring web development tutorials, a dynamic quiz, an AI reflection log, and a personalised CV.

## Project Overview

This project is designed as part of the CITS5505 assignment requirements. It demonstrates the use of **HTML**, **CSS**, **JavaScript**, and **AJAX** to build a coherent and interactive front-end web application.

The website includes four main pages:

- **Tutorial Page**  
  Explains the fundamentals of HTML, CSS, and JavaScript using structured content, examples, code snippets, and interactive demonstrations.

- **Quiz Page**  
  Presents a dynamically loaded quiz based on the tutorial content. Questions are loaded from a local data file, randomised on each load, and rendered using JavaScript. Quiz attempts are saved using local storage, and reward content is fetched dynamically from a public API when the user passes.

- **AI Reflection Log Page**  
  Documents and critically evaluates the use of AI tools during the development of this project, including prompts used, outputs received, corrections made, and reflections on reliability, risks, and ethics.

- **Personalised CV Page**  
  Introduces the author through a personalised curriculum vitae with a brief biography, picture, and references section.

## Features

- Multi-page website with consistent navigation and visual identity
- Responsive design using HTML5, CSS, and JavaScript
- Dynamic quiz rendering using AJAX
- Randomised quiz questions loaded from a local data file
- Quiz scoring with pass/fail result display
- Reward content fetched from a public API upon passing
- Local storage support for quiz attempt history
- Navigation warning if the user tries to leave before submitting the quiz
- AI reflection and references included as part of the assignment requirements

## Technologies Used

- HTML5
- CSS3
- JavaScript
- AJAX
- JSON / XML / text file for quiz data
- Public API for reward content

## Project Structure

```text
cits5505-multi-page-webapp/
│
├── index.html
├── tutorial.html
├── quiz.html
├── ai-reflection.html
├── cv.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   ├── quiz.js
│   └── storage.js
│
├── data/
│   └── questions.json
│
├── images/
│   └── profile-placeholder.jpg
│
└── README.md
