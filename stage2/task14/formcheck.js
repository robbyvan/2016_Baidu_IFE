const $ = function(el){
  return document.querySelector(el);
}

let input = $('input');
let checkMsg = $('#check-msg');

function validate(){
  let userInput = input.value;
  if (countLength(userInput) === 0){
    checkMsg.textContent = 'Username can not be empty';
    checkMsg.style.color = '#ff8b80';
    input.style.border = '1px solid #FF8B80';
  }else if (countLength(userInput) >= 4 && countLength(userInput) <= 16){
    checkMsg.textContent = 'Username format correct';
    checkMsg.style.color = '#a0c282';
    input.style.border = '1px solid #A0C282';
  }else{
    checkMsg.textContent = 'The length of the username shoud be within 4-16';
    checkMsg.style.color = '#ff8b80';
    input.style.border = '1px solid #FF8B80';
  }
}

function countLength(str){
  let inputLength = 0;
  for (let i = 0; i < str.length; ++i){
    let countCode = str.charCodeAt(i);
    if (countCode >= 0 && countCode <= 128){
      inputLength += 1;
    }else{
      inputLength += 2;
    }
  }
  return inputLength;
}

input.addEventListener('keyup', (e) => {
  if (e.keyCode !== 13){
    return;
  }
  validate();
}, false);

$('button').addEventListener('click', (e) => {
  validate();
}, false);