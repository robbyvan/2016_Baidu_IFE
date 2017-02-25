$ = function(el){
  return document.querySelector(el);
}


function TreeNode(nodeConfig, outputId){
  if (outputId !== undefined){
    this.output = $('#' + outputId);
  }
  this.children = nodeConfig.children || [];
  this.parent = nodeConfig.parent;
  this.nodeContent = nodeConfig.nodeContent || "";
  this.domElement = nodeConfig.domElement || null;
  if (this.domElement){
    this.domElement.TreeNode = this;  
  }
}

TreeNode.prototype = {

  init: function(rootName){
    let self = this;
    this.createSearchField();
    this.createTreeField(rootName); // return root TreeNode
  },

  createSearchField: function(){
    let searchField = document.createElement('div');
      searchField.className = 'tree-search';

      let input = document.createElement('input');
      input.className = 'tree-search-input';
      input.setAttribute('placeholder', 'search here...');

      let button = document.createElement('button');
      button.className = 'tree-search-btn';
      button.textContent = 'Search';

      searchField.appendChild(input);
      searchField.appendChild(button);

      this.output.appendChild(searchField);
  },

  createTreeField: function(rootContent){
    let root = document.createElement('div');
    root.className = 'root';

    let label = document.createElement('label');

    let expandIcon = document.createElement('label');
    expandIcon.className = 'expand-icon valid-click';

    let nodeContent = document.createElement('span');
    nodeContent.className = 'node-content valid-click';
    nodeContent.textContent = rootContent;

    let addIcon = document.createElement('i');
    addIcon.className = 'add-icon valid-click';

    label.appendChild(expandIcon);
    label.appendChild(nodeContent);
    label.appendChild(addIcon);
    root.appendChild(label);

    this.output.appendChild(root);
    this.domElement =  root;
    this.domElement.TreeNode = this;
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
    expandIcon.className = 'expand-icon valid-click';

    let nodeContent = document.createElement('span');
    nodeContent.className = 'node-content valid-click';
    nodeContent.textContent = text;

    let addIcon = document.createElement('i');
    addIcon.className = 'add-icon valid-click';

    let delIcon = document.createElement('i');
    addIcon.className = 'del-icon valid-click';

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
    if (this.domElement.className.indexOf('expand') !== -1){
      this.domElement.classList.remove('expand');
    }else{
      this.domElement.className += ' expand';
    }
    return this;
  }

};

var root = new TreeNode({parent: null, nodeContent: 'Programmers'}, 'tree-panel');
root.init(root.nodeContent);
root.addTreeNode('Web Developer');
root.addTreeNode('Software Engineer');
root.children[0].addTreeNode('Front-End Developer');
// root.children[1].delTreeNode();
root.toggleNode();
