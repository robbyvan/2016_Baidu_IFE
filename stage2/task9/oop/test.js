var createTag = (function(){
  function Tag(inputId, outputClass, buttonId){
    //private var
    let number;
    //特权方法
    this.getNumber = function(){
      return number;
    };

    this.setNumber = function(newNumber){
      number = newNumber;
    };

    //public properties
    this.input = document.getElementById(inputId);
    this.output = document.getElementsByClassName(outputClass)[0];
    console.log(outputClass);
    console.log(this.output);
    this.button = document.getElementById(buttonId);

    this.getData = function(){
      let value;
      switch (inputId){
        case 'tag':{
          value = this.input.value.match(/(^[^,\， ]*)/)[0];
          break;
        }
        case 'hobby':
        default:
          value = this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
      }
      return value;
    };

    this.render = function(value){
      if (value === '' || value === ',' || value === '，'){
        return ;
      }
      let wrap = document.createElement('div');
      wrap.textContent = value;
      this.output.appendChild(wrap);
      number += 1;
    };

    this.setNumber(0);
    this.button ? this.init('buttonEvent') : this.init('keyEvent');
  }

  Tag.prototype = {

    repeatData: function(data){
      for (let i = 0; i < this.output.children.length; ++i){
        if (this.output.children[i].textContent.localeCompare(data) === 0){
          this.input.value = '';
          this.setNumber(this.output.children.length);
          return true;
        }else{
          return false;
        }
      }
    },

    delData: function(ele){
      this.output.removeChild(ele);
      this.setNumber(this.output.children.length);
    },

    init: function(type){

      let self = this;

      console.log(this);
      this.output.addEventListener('mouseover', (e) => {
        e.target.textContent = 'Delete: ' + e.target.textContent;
        }, false);

      this.output.addEventListener('mouseout', (e) => {
        e.target.textContent = e.target.textContent.replace(/Delete: /, "");
        }, false);

      this.output.addEventListener('click', (e) => {
        self.delData(e.target);
      }, false);

      switch(type){
        case 'keyEvent':{
          document.addEventListener('keyup', (e) => {
            if (/(,| |\，)$/.test(self.input.value) || e.keyCode === 13){
              console.log(self.getData());
              console.log(self.repeatData(self.getData().trim()));
              self.repeatData(self.getData().trim()) || self.render(self.getData().trim()); 
              self.input.value = '';
              if (self.getNumber() > 10){
                self.delData(self.output.firstChild);
              }
            }
          }, false);
          break;
        }
        case 'buttonEvent': {
          self.button.addEventListener('click', (e) => {
            for (let i = 0; i < self.getData().length; ++i){
              self.repeatData(self.getData()[i]) || self.render(self.getData()[i]);
            }
            self.input.value = '';
          }, false);
          break;
        }
      };
    }
  };

  return Tag;
})();

var tag = new createTag('tag', 'tagContainer');
var hobby = new createTag('hobby', 'hobbyContainer', 'confirm');