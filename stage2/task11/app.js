$ = function(el){
  return document.querySelector(el);
}

const page = {
  visitSeq: [],
  root: $('#root')
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
        // currNode.classList.remove('light-on');
        currNode.className += ' found';
      }
      currNode.classList.remove('light-on');
      i += 1;
      if (i === page.visitSeq.length){
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

  // $(#'f-dfs').addEventListener('click', () => {
  //   resetTimers();

  // }, false)
}

window.onload = () => {
  init();
}