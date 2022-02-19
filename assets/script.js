const questions = [
    {
      id : 1,
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      id : 2,
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      id : 3,
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      id : 4,
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      id : 5,
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
    },
  ];

  
//  All selectors
// Header Section Selectors
const countdown = document.getElementById('time');
const leaderbordBtn = document.getElementById('leaderboard')

// Start Quiz Section Selectors
const startQuiz = document.querySelector('.startquiz-section')
const startBtn = document.getElementById('start-btn');

// Question Container Section Selectors
const questionContainer = document.querySelector('.question-container')
const result = document.getElementById('result');

// Scoresheet Section Selectors
const scoresheetSection = document.querySelector('.scoresheet-section');
const initial = document.getElementById('initial');
const scoreText = document.getElementById('scoreText');
const submitBtn = document.getElementById('submit-btn');

// Highscore Section Selector
const highscoresSection = document.querySelector('.highscores-section');
const backBtn = document.getElementById('gobackBtn');
const clearBtn = document.getElementById('clearBtn')
const scoreList = document.querySelector('.score-list');
const contentBox = document.querySelectorAll('.content-box')

let score = 0
let count = 50;
countdown.innerHTML = count;
let next = 1;

startBtn.addEventListener('click', (e) => {
  startQuiz.style.display = 'none';
  questionContainer.style.display = 'block';
  nextQuestion(1)
  const myInterval = setInterval(myTimer, 1000);
  function myTimer(){
      count-=1;
      countdown.innerHTML = count;
      if(count <= 0 || next > questions.length){
          clearInterval(myInterval);
         setTimeout(() => {
          questionContainer.style.display = 'none';
          scoresheetSection.style.display = 'block';
          count = 0;
          countdown.innerHTML = count;
         }, 200);
      };
  };
});

function nextQuestion(n){
let questions2 = questions.filter(item => item.id == n)

  questions2.map((item) => {
    const div = createElement('div', '', 'class', 'question-section',)
    div.setAttribute('id', item.id)
   
    const h2 = createElement('h2', item.questionText, 'class', 'content-header',)
  
    const ul = createElement('ul', '', 'class', 'options')
  
    item.options.map((option) => {
      const li = createElement('li', option);
      li.setAttribute('id', item.id)
      ul.appendChild(li);
  
      li.addEventListener('click', (e)=> {
        nextQuestion(next+=1);
        result.parentElement.style.display = 'block';
        if(e.target.id == div.id){
          div.style.display = 'none';
        }
  
        if(e.target.innerHTML ==  item.answer){
          result.innerText = 'Correct!';
          score += 10;
          scoreText.innerText = score;

        }else{
          result.innerText = 'Incorrect!';
          count -= 10;
        }
      })
    });
    div.appendChild(h2);
    div.appendChild(ul);
    questionContainer.appendChild(div);
    questionContainer.insertBefore(div, document.querySelector('.result-box'))
  })
}


submitBtn.addEventListener('click', (e) => {
  let obj = {}
  obj.name = initial.value;
  obj.score = score;
  // allHighscores.push(obj);

  const allHighscores = JSON.parse(localStorage.getItem('highScores') || '[]');

  allHighscores.push(obj)

  localStorage.setItem('highScores', JSON.stringify(allHighscores));

  scoresheetSection.style.display = 'none';
  highscoresSection.style.display = 'block';
  scoreList.innerHTML= ''
  getDataFromLocal()
})
getDataFromLocal()


leaderbordBtn.addEventListener('click', (e) => {
  hideAll()
  highscoresSection.style.display = 'block';
})

backBtn.addEventListener('click', (e) => {
  location.reload()
})

clearBtn.addEventListener('click', (e) => {
  scoreList.innerHTML = '';
  localStorage.clear();
  scoreList.innerHTML = 'No data found';
})

// Reuseabel functions
function getDataFromLocal(){
  if(localStorage.getItem('highScores')){
    const retrieveHS = localStorage.getItem('highScores')
  
    JSON.parse(retrieveHS).map(item => {
        const li = createElement('li', `${item.name} - ${item.score}`);
        scoreList.appendChild(li);
    })
  }else{
    scoreList.innerHTML = 'No data found';
  }
}

function createElement(TagName,innerHTML,attrName, attrValue){
  const tag = document.createElement(TagName);

  tag.setAttribute(attrName, attrValue);

  tag.innerHTML = innerHTML;

  return tag;
}

function hideAll(){
  for(let i = 0; i< contentBox.length; i++){
    contentBox[i].style.display = 'none';
  }
}






