$ = function(el){
  return document.querySelector(el);
}

var createTreeUI = (function(){

  function TreeUI(outputId, rootContent){
    
    this.output = $('#' + outputId);
    this.rootContent = rootContent;

    this.init = function(){
      this.createSearchField();
    };

    this.createSearchField = function(){
      let searchField = document.createElement('div');
      searchField.className += ' search-field';

      let input = document.createElement('input');
      input.setAttribute('placeholder', 'search here...');

      let button = document.createElement('button');
      button.textContent = 'Search';
      
      searchField.appendChild(input);
      searchField.appendChild(button);
      
      this.output.appendChild(searchField);
    };

    this.createTreeField = function(){
      let rootNode = document.createElement('div');
      rootNode.className += ' root';

      let label = document.createElement('label');

      let overlapIcon = document.createElement('i');
      overlapIcon.className = 'fa fa-angle-right';
      overlapIcon.setAttribute('arial-hidden', 'true');

      let span = document.createElement('span');
      span.textContent = this.rootContent;

      let addIcon = document.createElement('i');
      addIcon.className = 'fa fa-plus';
      addIcon.setAttribute('arial-hidden', 'true');

      label.appendChild(overlapIcon);
      label.appendChild(span);
      label.appendChild(addIcon);

      rootNode.appendChild(label);

      this.output.appendChild(rootNode);
    }
    

    this.init = function(){
      this.createSearchField();
      this.createTreeField();
    };

    this.init();

  }

  return TreeUI;

})();

const treeUI = new createTreeUI('tree-panel', 'Programmers');