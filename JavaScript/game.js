const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion= {}
let acceptingAnswers= true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions =[
  {
    question: 'Who is the Wakandan God that Black Panther is based from',
    choice1: 'Bast',
    choice2: 'Thoth',
    choice3: 'Ra',
    choice4: 'Ares',
    answer: 1,
  },
  {
    question: 'What is the name of Peter Parkers High School',
    choice1: 'Howard Stark High School',
    choice2: 'P.S 121',
    choice3: 'Midtown High School of Science and Technology',
    choice4: 'Albert Einstein Science Academy ',
    answer: 3,
  },
  {
    question: 'What war did Captian America Fight in',
    choice1: 'World War 1',
    choice2: 'Civil War',
    choice3: 'Gulf War',
    choice4: 'World War 2',
    answer: 4,
  },
  {
    question: 'What is the name of the device that Ton Stark uses to power the Iron Man suit',
    choice1: 'Sun Battery',
    choice2: 'Arc Reactor',
    choice3: '5G Plate',
    choice4: 'Gamma Stone',
    answer: 2,
  },
  {
    question: 'Where did the Black Widow Train?',
    choice1: 'The Red Room',
    choice2: 'Wakanda',
    choice3: 'Hydra Base',
    choice4: 'CIA',
    answer: 1,
  },
  {
    question: 'Thor is the god of?',
    choice1: 'Fire',
    choice2: 'Space',
    choice3: 'Good Looks',
    choice4: 'Thunder',
    answer: 4,
  },
  {
    question: 'Bruce Banner turns into ',
    choice1: ' Blue Beast',
    choice2: 'A Skrull',
    choice3: 'The Hulk',
    choice4: 'The Thing',
    answer: 3,
  },
  {
    question: 'Where is Thanos from',
    choice1: 'Earth',
    choice2: 'Titan',
    choice3: 'Asgard',
    choice4: 'Mars',
    answer: 2,
  },
  {
    question: 'The X-Men Are?',
    choice1: 'Inhumans',
    choice2: 'Aliens',
    choice3: 'Eternals',
    choice4: 'Mutants',
    answer: 4,
  },
  {
    question: 'Spider-Man And Daredevil both share this Villian',
    choice1: 'Dr.Doom',
    choice2: 'Bushmaster',
    choice3: 'Kingpin',
    choice4: 'Venom',
    answer: 3,
  }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame =() => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () =>{
  if(availableQuestions.length === 0 || questionCounter> MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/HTML/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.getElementsByClassName.witdth = `${(questionCounter/MAX_QUESTIONS)*100}%`
  
  const questionIndex = Math.floor(Math.random()* availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach( choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice'+ number]
  })

  availableQuestions.splice(questionIndex,1)

  acceptingAnswers = true

}

choices.forEach( choice =>{
  choice.addEventListener('click', e =>{
    if(!acceptingAnswers) return
    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
    'incorrect'

    if(classToApply === 'correct') {

      incrementScore(SCORE_POINTS)
    }
    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout( () =>{
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion() 
    }, 1000)
    
  })
})

incrementScore = num =>{
  score +=num
  scoreText.innerText = score
}
startGame();

console.log(score)