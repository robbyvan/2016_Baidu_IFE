$ = function(el){
  return document.querySelector(el);
}

const pageState = {
  langs: [],
  hobbies: []
}

function langHandler(e){
  // console.log(typeof e.keyCode); **Number**
  console.log(e.keyCode);
  if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188){
    let text = this.value;
    if (e.keyCode === 13){
      this.value = "";
    }
    let langs = text.split(/[\s+,*，*]/).filter(val => val !== "");
    for (let i = 0; i < langs.length; ++i){

      if (pageState.langs.indexOf(langs[i]) === -1){
       if (pageState.langs.length === 10){
        // console.log(hobbies);
        pageState.langs.shift();
        }
        pageState.langs.push(langs[i]);
      }

    }
    // console.log(pageState.langs);
  }
  renderTags();
}

function hobbyHandler(){
  let text = $('#hobby textarea').value;
  $('#hobby textarea').value = "";
  console.log(text);
  let hobbies = text.split(/[\s+,*，*]/).filter(val => val !== "");
  for (let i = 0; i < hobbies.length; ++i){

    if (pageState.hobbies.indexOf(hobbies[i]) === -1){
      if (pageState.hobbies.length === 10){
        console.log(hobbies);
        pageState.hobbies.shift();
      }
      pageState.hobbies.push(hobbies[i]);
    }

    // if (pageState.hobbies.length === 10){
    //   pageState.langs.shift();
    // }else{
    //   if (pageState.hobbies.indexOf(hobbies[i]) === -1){
    //     pageState.hobbies.push(hobbies[i]);
    //   }
    // }

  }
  renderTags();
}

function inputHandlers(){
  let lang = $('#lang input');
  lang.addEventListener('keyup', langHandler, false);

  let hobby = $('#hobby button');
  hobby.addEventListener('click', hobbyHandler, false);
}

function delHandler(e){
  let delTag = e.target.getAttribute('id').charAt(5);
  if (e.target.getAttribute('class') === 'lang-tag'){
    pageState.langs.splice(delTag, 1);
  }else{
    // pageState.hobbies = pageState.hobbies.filter(val => val !== delTag);
    pageState.hobbies.splice(delTag, 1);
  }
  renderTags();
}

function enterHandler(e){
  let hoverTag = e.target;
  console.log(e);
  hoverTag.textContent = 'Delete ' + hoverTag.textContent;

  /*fired multiple times due to dom rewrite, since hover didnot change the dom, no need to re-render*/
  /*throttle & debounce?*/
  // console.log(e);
  //   if (e.target.getAttribute('class') === 'lang-tag'){
  //     let i = pageState.langs.indexOf(hoverTag);
  //     pageState.langs[i] = "Delete " + hoverTag;
  //   }else{
  //     let i = pageState.hobbies.indexOf(hoverTag);
  //     pageState.hobbies[i] = "Delete " + hoverTag;
  //   }
  //   renderTags();
}

function leaveHandler(e){
  let hoverTag = e.target;
  hoverTag.textContent = hoverTag.textContent.replace(/Delete /, "");
}

function renderTags(){
  //langs
  let content = "";
  for (let i = 0; i < pageState.langs.length; ++i){
    content += '<div class="lang-tag" id="lang-' + i + '">' + pageState.langs[i] + '</div>';
  }
  console.log(content);

  $('#lang-zone').innerHTML = content;
  let langTags = document.querySelectorAll('.lang-tag');
  if (langTags.length !== 0){
    for (let i = 0; i < langTags.length; ++i){
      langTags[i].addEventListener('click', delHandler, false);
      langTags[i].addEventListener('mouseenter', enterHandler, false);
      langTags[i].addEventListener('mouseout', leaveHandler, false);
    }
  }

  //hobbies
  content = "";
  for (let i = 0; i < pageState.hobbies.length; ++i){
    content += '<div class="hobby-tag" id="hobby-' + i + '">' + pageState.hobbies[i] + '</div>';
  }
  // console.log(content);
  $('#hobby-zone').innerHTML = content;
  // $('.hobby-tag').addEventListener('click', delHandler, false);
  let hobbyTags = document.querySelectorAll('.hobby-tag');
  if (hobbyTags.length !== 0){
    for (let i = 0; i < hobbyTags.length; ++i){
      hobbyTags[i].addEventListener('click', delHandler, false);
      hobbyTags[i].addEventListener('mouseenter', enterHandler, false);
      hobbyTags[i].addEventListener('mouseout', leaveHandler, false);
    }
  }

}

function init(){
  inputHandlers();
}

window.onload = function(){
  init();
}