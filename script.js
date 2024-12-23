const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('progress');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 8;

async function loadQuestion(){
  const APIUrl = 'https://opentdb.com/api.php?amount=12&category=22&difficulty=medium&type=multiple';
  const result = await fetch(`${APIUrl}`)
  const data = await result.json();
  _result.innerHTML = "";
  showQuestion(data.results[0]);
  console.log();
}

function eventListeners(){
  _checkBtn.addEventListener('click', checkAnswer);
  _playAgainBtn.addEventListener('click', restartQuiz);
}
document.addEventListener('DOMContentLoaded', function(){
  loadQuestion();
  eventListeners();
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
});

function showQuestion(data){
  _checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
  // console.log(correctAnswer);

  _question.innerHTML = `${data.question} `;
  _options.innerHTML = `
        ${optionsList.map((option) => `
            <li> <button class="selected">${option}</button> </li>
        `).join('')}
    `;
      
  selectOption();

}

function selectOption(){
  _options.querySelectorAll('li').forEach(function(option){
      option.addEventListener('click', function(){
          if(_options.querySelector('.selected')){
              const activeOption = _options.querySelector('.selected');
              activeOption.classList.remove('selected');
          }
          option.classList.add('selected');
      });
  });
}

function checkAnswer(){
  _checkBtn.disabled = true;
  if(_options.querySelector('.selected')){
      let selectedAnswer = _options.querySelector('.selected button').textContent;
      if(selectedAnswer == HTMLDecode(correctAnswer)){
          correctScore++;
          _result.innerHTML = `<p><i class = "fas fa-check"> </i>Bonne réponse !</p>`;
      } else {
          _result.innerHTML = `<p><i class = "fas fa-times"> </i>Mauvaise réponse !</p> <small><b>Correction : </b>${correctAnswer}</small>`;
      }
      checkCount();
  } else {
      _result.innerHTML = `<p><i class = "fas fa-question"></i>Veuillez sélectionner une réponse !</p>`;
      _checkBtn.disabled = false;
  }
}

function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

function checkCount(){
  askedCount++;
  setCount();
  if(askedCount == totalQuestion){
      setTimeout(function(){
          console.log("");
      }, 5000);

      _result.innerHTML += `<p>Votre score est ${correctScore}.</p>`;
      _playAgainBtn.style.display = "block";
      _checkBtn.style.display = "none";
  } else {
      setTimeout(function(){
          loadQuestion();
      }, 500);
  }
}

function setCount(){
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
}
function restartQuiz(){
  correctScore = askedCount = 0;
  _playAgainBtn.style.display = "none";
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  setCount();
  loadQuestion();
}


























































































































    
