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


function checkInput(callback){
  var userInput = document.getElementById('user-input').value;
  document.getElementById('user-input').value = "";
  var myExp = new RegExp(/^[0-9]*$/, 'i');
  if (myExp.test(userInput)){
    console.log(this);
    callback.apply(myQueue, [userInput]);
  }else{
    alert('Sorry, only numbers are allowed.');
  }
}

function liHandler(e){
  checkInput(myQueue.joinFromLeft);
  renderGraph();
}
function riHandler(e){
  checkInput(myQueue.joinFromRight);
  renderGraph();
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
  document.getElementById('left-in').addEventListener('click', liHandler, false);
  document.getElementById('right-in').addEventListener('click', riHandler, false);
  document.getElementById('left-out').addEventListener('click', loHandler, false);
  document.getElementById('right-out').addEventListener('click', roHandler, false);
}

function renderGraph(){
  var queueArea = document.getElementById('queueArea');
  var content = "";
  for (var i = 0; i < myQueue.dataQueue.length; ++i){
    content += '<div class="boxes">' + myQueue.dataQueue[i] + '</div>';
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