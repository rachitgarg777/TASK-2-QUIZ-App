const questions = [
    {
        question: "What is full form of HTML?",
        answers:[
            {  text:"Hyper Text Markup Language", correct: true },
            {  text:"High Tech Modern Language", correct: false }, 
            {  text:"Hyperlink and Text Markup Language", correct: false },
            {  text:"Home Tool Markup Language", correct: false },
        ]
    },
    {
        question: " Which programming language is commonly used for client-side scripting in web development?",
        answers:[
            {  text:"Python", correct: false },
            {  text:" Java", correct: false }, 
            {  text:"JavaScript", correct: true },
            {  text:" C++", correct: false },
        ]
    },
    {
        question: " In web development, what does the cronym 'URL' stand for?",
        answers:[
            {  text:"Uniform Resource Locator", correct: true },
            {  text:"Universal Resource Locator", correct: false }, 
            {  text:"Unified Resource Locator", correct: false },
            {  text:"Universal Rendering Language", correct: false },
        ]
    },
    {
        question: "Which of the following is a server-side scripting language?",
        answers:[
            {  text:"JavaScript", correct: false },
            {  text:"HTML", correct: false }, 
            {  text:"PHP", correct: true },
            {  text:"CSS", correct: false },
        ]
    },
    {
        question: " What is the purpose of the 'DOCTYPE' declaration in HTML?",
        answers:[
            {  text:"Specifying the color scheme of a webpage", correct: false },
            {  text:" Creating a do-not-track directive for web browsers", correct: false }, 
            {  text:"Declaring variables in JavaScript", correct: false },
            {  text:"Defining the document type and version of HTML", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score = 0;
function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();

    let currentQuestion =questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex+1;
    questionElement.innerHTML= "Qs " + questionNo+".  "+ currentQuestion.question; 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display= "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn= e.target;
    const isCorrect= selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML= `KUDOS!!!          You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML=" Wanna Play again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
});
startQuiz();

