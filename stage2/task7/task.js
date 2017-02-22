function DoubleQueue(){
  this.dataQueue = [];
}
DoubleQueue.prototype = {
  joinFromLeft: function(item){
    this.dataQueue.unshift(item);
  },
  joinFromRight: function(item){
    this.dataQueue.push(item);
  },
  leaveFromLeft: function(){
    return this.dataQueue.shift();
  },
  leaveFromRight: function(){
    return this.dataQueue.pop();
  }
}

var myQueue = new DoubleQueue();

$ = function(el){
  return document.querySelector(el);
}

function checkInput(callback){
  var userInput = $('#user-input').value;
  var myExp = new RegExp(/^[0-9]*$/, 'i');
  if (userInput.length > 1 && userInput.length < 3 && myExp.test(userInput)){
    callback.apply(myQueue, [userInput]);
  }else{
    alert('Sorry, only numbers in range 11 to 99 are allowed.');
  }
}

function liHandler(e){
  if (myQueue.dataQueue.length === 60){
    alert('Sorry, you can only add 60 numbers at most, please delete some numbers');
  }else{
    checkInput(myQueue.joinFromLeft);
    renderGraph();
  }
}
function riHandler(e){
  if (myQueue.dataQueue.length === 59){
    alert('Sorry, you can only add 60 numbers at most, please delete some numbers');
  }else{
    checkInput(myQueue.joinFromRight);
    renderGraph();
  }
}
function loHandler(e){
  myQueue.leaveFromLeft();
  renderGraph();
}
function roHandler(e){
  myQueue.leaveFromRight();
  renderGraph();
}

function btnInit(){
  $('#left-in').addEventListener('click', liHandler, false);
  $('#right-in').addEventListener('click', riHandler, false);
  $('#left-out').addEventListener('click', loHandler, false);
  $('#right-out').addEventListener('click', roHandler, false);
}

function renderGraph(){
  myQueue.dataQueue.sort((a, b) => a - b);
  let queueArea = $('#queueArea');
  let content = "";
  for (let i = 0; i < myQueue.dataQueue.length; ++i){
    let height = Math.floor(myQueue.dataQueue[i] * 3);
    content += '<div class="boxes" title="' + myQueue.dataQueue[i] + '" style="height: ' + height + 'px; left:' + (35 + i * 14) + 'px">' + /*myQueue.dataQueue[i] +*/ '</div>';
  }
  console.log(content);
  queueArea.innerHTML = content;
}

function init(){
  btnInit();
}

window.onload = function(){
  init();
}