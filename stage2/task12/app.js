$ = function(el){
  return document.querySelector(el);
}

const page = {
  visitSeq: [],
  root: $('#root'),
  currentFocus: undefined
};

function DFS(node){
  if (!node){
    return;
  }
  page.visitSeq.push(node);
  // console.log(node);
  for  (let i = 0; i < node.children.length; ++i){
    DFS(node.children[i]);    
  }
}

function BFS(node){
  let queue = [];
  if (node){
    queue.push(node);
  }
  while (queue.length !== 0){
    let currNode = queue.shift();
    for (let i = 0; i < currNode.children.length; ++i){
      queue.push(currNode.children[i]);
    }
    page.visitSeq.push(currNode);
  }
}

function render(){
  let i = 0;
  let searchField = $('#user-input').value;
  let match = searchField.trim().toLowerCase();
  page.lightOn = setInterval(() => {
    let currNode = page.visitSeq[i];
    currNode.className += ' light-on';
    page.lightOff = setTimeout(() => {
      if (searchField !== "" && match === page.visitSeq[i].firstChild.nodeValue.trim().toLowerCase()){
        clearInterval(page.lightOn);
        clearTimeout(page.lightOff);
        currNode.classList.remove('light-on');
        currNode.className += ' found';
        alert('node Found.');
      }
      currNode.classList.remove('light-on');
      i += 1;
      if (i === page.visitSeq.length){
        alert('Sorry, no match found.');
        clearInterval(page.lightOn);
        clearTimeout(page.lightOff);
      }
    }, 250);
  }, 500);
}

function resetTimers(){
  clearInterval(page.lightOn);
  clearTimeout(page.lightOff);
}

function addHandler(){
  resetTimers();
  if (!page.currentFocus){
    console.log('Too add a child, yout need to choose a parent node first.');
    return;
  }
  let newChildText = $('#insert-item').value.trim();
  if (newChildText !== ""){
    let newChild = document.createElement('div');
    newChild.textContent = newChildText;
    page.currentFocus.appendChild(newChild);
    //clear current focus after adding the child
    page.currentFocus.classList.remove('focus');
    page.currentFocus = undefined;
  }
}

function delHandler(e){
  resetTimers();
  if (!page.currentFocus){
    console.log('You need to choose a node first then delete it.');
    return;
  }

  if (page.currentFocus == $('#root')){
    let userAnswer = confirm('Are you sure you want to remove the root of this tree?');
    if (!userAnswer){
      return;
    }
  }

  let parent = page.currentFocus.parentNode;
  parent.removeChild(page.currentFocus);

  page.currentFocus = undefined;
}

function nodeClickHandler(e){
  e.stopPropagation();
  resetTimers();
  if (page.currentFocus && page !== e.target){
    page.currentFocus.classList.remove('focus');
  }
  page.currentFocus = e.target;
  page.currentFocus.className += ' focus';
}


function init(){
  $('#s-dfs').addEventListener('click', () => {
    resetTimers();
    page.visitSeq = [];
    DFS(page.root);
    render();
  }, false);

  $('#s-bfs').addEventListener('click', () => {
    resetTimers();
    page.visitSeq = [];
    BFS(page.root);
    render();
  }, false);

  let treeNodes = document.querySelectorAll('div');

  for (let i = 0; i < treeNodes.length; ++i){
    treeNodes[i].addEventListener('click', nodeClickHandler, false);
  }

  $('#add-btn').addEventListener('click', addHandler, false);
  $('#del-btn').addEventListener('click', delHandler, false);
}

window.onload = () => {
  init();
}
