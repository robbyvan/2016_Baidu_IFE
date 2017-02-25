$ = function(el){
  return document.querySelector(el);
}

var createTreeUI = (function(){

  function TreeUI(outputId, rootContent){

    let self = this;
    
    this.output = $('#' + outputId);
    this.rootContent = rootContent;
    this.found = [];

    this.createSearchField = function(){
      let searchField = document.createElement('div');
      searchField.className = 'search-field';

      let input = document.createElement('input');
      input.setAttribute('placeholder', 'search here...');

      let button = document.createElement('button');
      button.textContent = 'Search';

      button.addEventListener('click', () => {
        for (let i = 0; i < this.found.length; ++i){
          this.found[i].classList.remove('found');
        }
        this.found = [];

        let searching = $('.search-field input').value;
        this.DFS(searching);
        for (let i = 0; i < this.found.length; ++i){
          this.found[i].className += ' found';
        }
      }, false);
      
      searchField.appendChild(input);
      searchField.appendChild(button);

      this.output.appendChild(searchField);
    };

    this.createTreeField = function(){
      let rootNode = document.createElement('div');
      rootNode.className = 'root';

      let label = document.createElement('label');

      let foldIcon = document.createElement('i');
      foldIcon.className = 'fa fa-angle-down fold-icon valid-click';
      foldIcon.setAttribute('arial-hidden', 'true');

      let span = document.createElement('span');
      span.textContent = this.rootContent;
      span.className = 'valid-click';
      
      let addIcon = document.createElement('i');
      addIcon.className = 'fa fa-plus add-icon valid-click';
      addIcon.setAttribute('arial-hidden', 'true');

      label.appendChild(foldIcon);
      label.appendChild(span);
      label.appendChild(addIcon);

      rootNode.appendChild(label);

      //Bind 'click' to root node to handle all click events.
      rootNode.addEventListener('click',(e) => {
        e.stopPropagation();

        let clickedNode = e.target || e.srcElement;

        //check if the click is valid
        if (clickedNode.className.indexOf('valid-click') === -1){
          console.log('invalid click');
          return;
        }
        
        //valid clicks, check which type
        //Clicked Add
        if (clickedNode.className.indexOf('add-icon') !== -1){
          //add-icon
          clickedNode.parentNode.parentNode.appendChild(self.createChildNode(prompt('Add a node').trim()));
        }else if (clickedNode.className.indexOf('del-icon') !== -1){
          //del-icon
          clickedNode.parentNode.parentNode.parentNode.removeChild(clickedNode.parentNode.parentNode);
        }else {
          //fold-icon or text
          let foldIcon = clickedNode.parentNode.querySelector('.fold-icon');
          console.log(foldIcon);
          if (foldIcon.className.indexOf('right') !== -1){
            foldIcon.className = foldIcon.className.replace(/fa-angle-right/, 'fa-angle-down');
          }else{
            // console.log(foldIcon.className);
            foldIcon.className = foldIcon.className.replace(/fa-angle-down/, 'fa-angle-right');
            // console.log(foldIcon.className);
          }
          let children = clickedNode.parentNode.parentNode.children;
          for (let i = 0; i < children.length; ++i){
            if (children[i].localName.toLowerCase() === 'div'){
              if (children[i].className.indexOf('hide') === -1){
                children[i].className += 'hide';
              }else{
                children[i].classList.remove('hide');
              }
            }
          }
        }

      } , false);

      this.output.appendChild(rootNode);
      this.root = rootNode;

    };
    
    this.init();

  }

  TreeUI.prototype = {
    DFS: function(target){
      let currNode = this.root;
      if (!currNode){
        return;
      }
      let children = currNode.getElementsByTagName('div');
      for (let i = 0; i < children.length; ++i){
        children[i].classList.remove('hide');
        let nodeText = children[i].getElementsByTagName('span')[0].textContent;
        if (nodeText.trim().toLowerCase() === target.toLowerCase()){
          this.found.push(children[i].getElementsByTagName('span')[0]);
          console.log('found.');
        }

      }
    },

    createChildNode: function(userInput){
      if (userInput === ""){
        console.log('Sry, category name can not be empty.');
        return;
      }

      let div = document.createElement('div');

      let label = document.createElement('label');

      let foldIcon = document.createElement('i');
      foldIcon.className = 'fa fa-angle-down fold-icon valid-click';
      foldIcon.setAttribute('arial-hidden', 'true');

      let span = document.createElement('span');
      span.textContent = userInput;
      span.className = 'valid-click';

      let addIcon = document.createElement('i');
      addIcon.className = 'fa fa-plus add-icon valid-click';
      addIcon.setAttribute('arial-hidden', 'true');

      let delIcon = document.createElement('i');
      delIcon.className = 'fa fa-minus del-icon valid-click';
      delIcon.setAttribute('arial-hidden', 'true');

      label.appendChild(foldIcon);
      label.appendChild(span);
      label.appendChild(addIcon);
      label.appendChild(delIcon);

      div.appendChild(label);

      return div;
    },

    init: function(){
      this.createSearchField();
      this.createTreeField();
    }

  };


  return TreeUI;

})();

const treeUI = new createTreeUI('tree-panel', 'Programmers');
console.log(treeUI.childs)
