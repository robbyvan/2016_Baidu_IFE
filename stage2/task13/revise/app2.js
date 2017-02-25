/*
* Shorthand for querySelctor
*/
const $ = function(el){
  return document.querySelector(el);
}

/*
* Browser Compatibility
*/
const addEvent = function(element, type, handler){
  if (element.addEventListener){
    element.addEventListener(type, handler, false);
  }else if (element.attachEvent){
    element.attachEvent('on' + type, handler);
  }else{
    element['on' + type] = handler;
  }
}

/*
*   =========================== TreeNode Start  ===========================
*   Create a Tree Widget to the output field

*   @param {Object} nodeConfig
*   @param {String} outputId

*   Example:
    const root = new TreeNode({nodeContent: 'Countries'}, 'tree-panel');
*
*/

function TreeNode(nodeConfig, outputId){
  if (outputId !== undefined){
    this.output = $('#' + outputId);
  }
  this.children = nodeConfig.children || [];
  this.parent = nodeConfig.parent || null;
  this.nodeContent = nodeConfig.nodeContent || "";
  this.domElement = nodeConfig.domElement || null;

  if (this.domElement){
    this.domElement.TreeNode = this;  
  }
}

TreeNode.prototype = {
  constructor: TreeNode,

  init: function(rootName){
    let self = this;
    this.createSearchField();
    this.createTreeField(rootName); // return root TreeNode
  },

  createSearchField: function(){
    let searchField = document.createElement('div');
      searchField.className = 'tree-search-field';

      let input = document.createElement('input');
      input.className = 'tree-search-input';
      input.setAttribute('placeholder', 'search here...');

      let button = document.createElement('button');
      button.className = 'tree-search-btn';
      button.textContent = 'Search';

      searchField.appendChild(input);
      searchField.appendChild(button);

      /*
      *  Seach Field Events
      *  Bind click event to button
      */
      addEvent(button, 'click', (e) => {
        e.stopPropagation();

        //clear styles of last search
        for (let i = 0; i < root.matches.length; ++i){
          root.matches[i].domElement.children[0].getElementsByClassName('node-content')[0].classList.remove('found');
        }

        let userInput = $('.tree-search-input').value;
        $('.tree-search-input').value = "";
        if (userInput === ""){
          return;
        }

        root.matches = root.dfsSearch(userInput, []);

        //render
        for (let i = 0; i < root.matches.length; ++i){
          root.matches[i].domElement.children[0].getElementsByClassName('node-content')[0].className += ' found';
        }
      });

      this.output.appendChild(searchField);
  },

  createTreeField: function(rootContent){
    let root = document.createElement('div');
    root.className = 'root';

    let label = document.createElement('label');

    let expandIcon = document.createElement('label');
    expandIcon.className = 'fa fa-angle-down expand-icon valid-click';

    let nodeContent = document.createElement('span');
    nodeContent.className = 'node-content valid-click';
    nodeContent.textContent = rootContent;

    let addIcon = document.createElement('i');
    addIcon.className = 'fa fa-plus add-icon valid-click';

    label.appendChild(expandIcon);
    label.appendChild(nodeContent);
    label.appendChild(addIcon);
    root.appendChild(label);

    this.output.appendChild(root);
    this.domElement = root;
    this.domElement.TreeNode = this;
    this.matches = [];

    /*  
    * Tree Field Events
    * Bind all click Events to root
    */
    addEvent(root, 'click', (e) => {
      e.stopPropagation();
      let clickedElem = e.target || e.srcElement;

      if (clickedElem.className.indexOf('valid-click') === -1){
        console.log('invalid click');
        return;
      }

      //check what is clicked
      console.log('valid-click');
      // console.log(clickedElem);
      if (clickedElem.className.indexOf('add-icon') !== -1){
        //Add
        let text = prompt('Add a node.');
        console.log(text);
        if (text){
          clickedElem.parentNode.parentNode.TreeNode.addTreeNode(text);  
        }
      }else if (clickedElem.className.indexOf('del-icon') !== -1){
        //Delete
        clickedElem.parentNode.parentNode.TreeNode.delTreeNode();
      }else{
        //Toggle
        clickedElem.parentNode.parentNode.TreeNode.toggleNode();
      }
    });

    
    return this;
  },

  addTreeNode: function(text){

    if (!text) {
      return this;
    }

    if (text.trim() === ""){
      console.log('Sorry, node content can not be empty.');
      return this;
    }

    let div = document.createElement('div');
    div.className = "";

    let label = document.createElement('label');

    let expandIcon = document.createElement('i');
    expandIcon.className = 'fa fa-angle-down expand-icon valid-click';

    let nodeContent = document.createElement('span');
    nodeContent.className = 'node-content valid-click';
    nodeContent.textContent = text;

    let addIcon = document.createElement('i');
    addIcon.className = 'fa fa-plus add-icon valid-click';

    let delIcon = document.createElement('i');
    delIcon.className = 'fa fa-minus del-icon valid-click';

    label.appendChild(expandIcon);
    label.appendChild(nodeContent);
    label.appendChild(addIcon);
    label.appendChild(delIcon);
    div.appendChild(label);
    this.domElement.appendChild(div);

    let nodeConfig = {
      parent: this,
      nodeContent: text,
      domElement: div
    };

    this.children.push(new TreeNode(nodeConfig));

    return this;
  },

  delTreeNode: function(){
    self = this;
    let parentDom = self.parent.domElement;
    parentDom.removeChild(self.domElement);

    let delIndice = self.parent.children.indexOf(self);
    console.log(delIndice);
    self.parent.children.splice(delIndice, 1);
    self = null;
    return parentDom.TreeNode;
  },

  toggleNode: function(){
    if (this.domElement.getElementsByClassName('expand-icon')[0].className.indexOf('down') !== -1){
      for (let i = 0; i < this.children.length; ++i){
        this.children[i].domElement.className += ' hide';
      }
      this.domElement.getElementsByClassName('expand-icon')[0].className = this.domElement.getElementsByClassName('expand-icon')[0].className.replace(/down/, 'right');
    }else{
      for (let i = 0; i < this.children.length; ++i){
        this.children[i].domElement.classList.remove('hide');
      }
      this.domElement.getElementsByClassName('expand-icon')[0].className = this.domElement.getElementsByClassName('expand-icon')[0].className.replace(/right/, 'down');
    }
    return this;
  },

  dfsSearch: function(target, found){
    let self = this;
    if (!self){
      return;
    }

    if (self.nodeContent.trim().toLowerCase() === target.trim().toLowerCase()){
      found.push(self);
    }

    for (let i = 0; i < self.children.length; ++i){
      self.children[i].dfsSearch(target, found);
    }
    return found;
  },

};

/*
*   =========================== TreeNode End  ===========================
*/


/* Instantiate root */
const root = new TreeNode({nodeContent: 'Programmers'}, 'tree-panel');
root.init(root.nodeContent);

//Add Initial nodes
root.addTreeNode('Web Developer');
root.addTreeNode('Software Engineer');
root.children[0].addTreeNode('Front-End Developer');

