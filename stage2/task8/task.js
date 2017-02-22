$ = function(el){
  return document.querySelector(el);
}


function btnHandler(){
  $('#add-btn').addEventListener('click', addHandler, false);
  $('#search-btn').addEventListener('click', searchHandler, false);
}

function addHandler(){
  let text = $('textarea').value;
  $('textarea').value = "";
  let userInputs = text.split(/\W/);
  // console.log(userInputs);

  // pageState.graphContent = "";
  for (let i = 0; i < userInputs.length; ++i){
    if (userInputs[i] !== ""){
      pageState.graphContent += '<div class="boxes">' + userInputs[i] + '</div>';  
      pageState.pageQueue.push(userInputs[i]);
    }
  }
  // console.log(pageState.graphContent);
  // console.log(pageState.pageQueue);
  renderGraph();
}

function searchHandler(){
  let userSearch = $('#user-search').value;
  pageState.graphContent = "";

  for (let i = 0; i < pageState.pageQueue.length; ++i){
    let currentItem = pageState.pageQueue[i];
    let found = currentItem.indexOf(userSearch)
    if (found !== -1){
      pageState.graphContent += '<div class="boxes">' + currentItem.substring(0, found);
      pageState.graphContent += '<span class="found">' + userSearch + "</span>";
      pageState.graphContent += currentItem.substring(found + userSearch.length) + '</div>';
    }else{
      pageState.graphContent += '<div class="boxes">' + currentItem + '</div>';
    }
  }
  // console.log(pageState.graphContent);
  renderGraph();
}

function renderGraph(){
  $('#queueArea').innerHTML = pageState.graphContent;
}

function init(){
  btnHandler();
}

var pageState = {
  pageQueue: [], //no ""
  graphContent: ""
};

window.onload = function(){
  init();
}
