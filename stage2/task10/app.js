$ =  function(el){
  return document.querySelector(el);
}

const tRoot = $('#root');
const pageState = {
  nodeSeq: [],
};

function preOrder(node){
  if (!node){
    return;
  }
  pageState.nodeSeq.push(node);
  preOrder(node.children[0]);
  preOrder(node.children[1]);
}

function inOrder(node){
  if (!node){
    return ;
  }
  inOrder(node.children[0]);
  pageState.nodeSeq.push(node);
  inOrder(node.children[1]);
}

function postOrder(node){
  if (!node){
    return;
  }
  postOrder(node.children[0]);
  postOrder(node.children[1]);
  pageState.nodeSeq.push(node);
}

function init(){
  $('#preorder').addEventListener('click', (e) => {
    resetTimer();
    pageState.nodeSeq = [];
    preOrder(tRoot);
    render();
  }, false);
  $('#inorder').addEventListener('click', (e) => {
    resetTimer();
    pageState.nodeSeq = [];
    inOrder(tRoot);
    render();
  }, false);
  $('#postorder').addEventListener('click', (e) => {
    resetTimer();
    pageState.nodeSeq = [];
    postOrder(tRoot);
    render();
  }, false);
}

function render(){
  let i = 0;
  pageState.lightOn = setInterval(function(){
    let currNode = pageState.nodeSeq[i];
    currNode.className += ' light-on';
    pageState.lightOff = setTimeout(() => {
      currNode.classList.remove('light-on');
      i += 1;
      if (i === pageState.nodeSeq.length){
        clearInterval(pageState.lightOn);
        clearTimeout(pageState.lightOff);
      }
    }, 150);
  }, 350);
}

function resetTimer(){
  clearInterval(pageState.lightOn);
  clearTimeout(pageState.lightOff);
}

init();