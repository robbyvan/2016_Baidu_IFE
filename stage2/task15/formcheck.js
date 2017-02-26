/*
* Shorthand for querySelctor
*/
const $ = (el) => document.querySelector(el);

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
*   Validation Form
*/
function VForm(config, parentDomId){
  if (!parentDomId){
    throw '(@param: parentDomId) and (@param: buttonId) can not be empty.';
  }
  this.parentDom = $('#' + parentDomId);
  this.button = this.parentDom.getElementsByTagName('button')[0];
  this.fieldName = config.fieldName || "username";
  this.placeholder = config.placeholder || "username";
  this.checkType = config.checkType || 'username';  // username, password, email, phone
  this.rule = config.rule || 'Username shoud be no longer than 20';
  this.minLength = config.minLength || 1;
  this.maxLength = config.maxLength || 20;
  this.parentId = parentDomId;
  
  // this.siblings = config.siblings || [];
  this.domElement = config.domElement || null;
  this.data = config.data || "";
  this.dirty = false;
  if (this.domElement){
    this.domElement.VForm = this;
  }
  this.valid = false;

  this.init();

}

VForm.prototype = {
  constructor: VForm,

  bindedZone: {},//hash map to save which DOMs have binded eventListener
  buttonBind: false,

  init: function(){
    this.createField();
    this.bindEvent();
    this.bindButton();
  },

  bindEvent: function(){
     //bind event to parent Element, if the new VForm's parent has binded Listener, no need to bind again.
      if (this.bindedZone[this.parentId]){
      console.log('already binded click event to parent');
      return;
      }

      this.bindedZone[this.parentId] = true;

      addEvent(this.parentDom, 'click', (e) => {
        e.stopPropagation();
        let clickedElement = e.target || e.srcElement;

        if (clickedElement.className.indexOf('valid-check') === -1){
          return;
        }
        // console.log('check validation');
        clickedElement.parentNode.VForm.validateDirty();
      });
  },

  bindButton: function(){
    if (this.buttonBind){
      return;
    }

    addEvent(this.button, 'click', () => {
      this.parentDom.children[1].VForm.validateAll();
    });
  },

  createField: function(){
    let wrap = document.createElement('div');
    wrap.className = 'VForm-item';

    let input = document.createElement('input');
    input.className = 'VForm-input valid-check';
    input.setAttribute('name', this.fieldName);
    input.setAttribute('placeholder', this.placeholder);

    // let button = document.createElement('button');
    let p = document.createElement('p');
    p.className = 'VForm-msg';
    // p.textContent = this.rule;

    wrap.appendChild(input);
    wrap.appendChild(p);

    this.domElement = wrap;
    this.domElement.VForm = this;
    this.parentDom.appendChild(wrap);

    //return parent to allow chain
    return this.parent;
  },

  validateDirty: function(){
    console.log('focusing: ')
    console.log(this);
    let self = this;
    let zone = this.parentDom;
    for (let i = 0; i < zone.children.length; ++i){
      let currentChild = zone.children[i];
      
      //only dirty Sibling VForms
      if (currentChild.VForm){

        //if is self
        if (currentChild.VForm === self){
          //show rules
          currentChild.getElementsByClassName('VForm-msg')[0].className = 'VForm-msg show-rule';
          // currentChild.getElementsByClassName('VForm-msg')[0].textContent = currentChild.VForm.rule;
          currentChild.VForm.dirty = true;
          this.render();
          continue;
        }
        
        //set if dirty
        if (currentChild.getElementsByClassName('VForm-input')[0].value !== ""){
          currentChild.VForm.dirty = true;
        }

        //set this VFrom.data
        currentChild.VForm.data = currentChild.getElementsByClassName('VForm-input')[0].value;

        
        if(currentChild.VForm.dirty){

          //if dirty, check and show check result

          // currentChild.getElementsByClassName('VForm-msg')[0].className += ' show-hint';
          currentChild.VForm.validateCurrentField();  

        }
        
      }

    }
  },

  validateAll: function(){
    for (let i = 0; i < this.parentDom.children.length; ++i){
      let currentChild = this.parentDom.children[i];
      if (currentChild.VForm){
        currentChild.VForm.data = currentChild.getElementsByClassName('VForm-input')[0].value;
        currentChild.VForm.validateCurrentField();
      }
    }
  },

  validateCurrentField: function(){
    console.log('checking: ');
    console.log(this);
    let msgP = this.domElement.getElementsByClassName('VForm-msg')[0];

    // General length check
    // if (this.checkType !== 'password2'){
      if (!this.data || this.data.length > this.maxLength || this.data.length < this.minLength){
        msgP.className = 'VForm-msg show-err-length';
        // msgP.textContent = 'Sorry, the length of ' + this.fieldName + ' should be within ' + this.minLength + ' to ' + this.maxLength;
        this.render();
        return;
      }
    // }
    

    // Special Check
    switch(this.checkType){

      case 'password2':{
        for (let i = 0; i < this.parentDom.children.length; ++i){
          let current = this.parentDom.children[i];

          if (current.VForm && current.VForm.checkType === 'password'){
            let pass1 = current.getElementsByClassName('VForm-input')[0].value;
            if (pass1 === this.data){
              this.valid = true;
              // msgP.textContent = 'Correct';
              msgP.className = 'VForm-msg show-correct';
            }else{
              this.valid = false;
              // msgP.textContent = 'Password does not match';
              msgP.className = 'VForm-msg show-err-pass2';
            }
          }

        }
        break;
      }

      case 'email': {
        if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.data)){
          this.valid = true;
          // msgP.textContent = 'Correct';
          msgP.className = 'VForm-msg show-correct';
        }else{
          this.valid = false;
          // msgP.textContent = 'Email is not valid';
          msgP.className = 'VForm-msg show-err-email';
        }
        break;
      }

      case 'telephone':{
        if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(this.data)){
          this.valid = true;
          // msgP.textContent = 'Correct';
          msgP.className = 'VForm-msg show-correct';
        }else{
          this.valid = false;
          // msgP.textContent = 'Phone number is not valid';
          msgP.className = 'VForm-msg show-err-phone';
        }
        break;
      }

      default://username 
        this.valid = true;
        // msgP.textContent = 'Correct';
        msgP.className = 'VForm-msg show-correct';
    }
    this.render();

  },

  render: function(){
    if(document.getElementsByClassName('show-rule')){
      Array.from(document.getElementsByClassName('show-rule'))
            .forEach((elem) => elem.textContent = elem.parentNode.VForm.rule);
    }

    if (document.getElementsByClassName('show-correct')){
      Array.from(document.getElementsByClassName('show-correct'))
            .forEach((elem) => elem.textContent = 'Correct');
    }

    if (document.getElementsByClassName('show-err-length')){
      Array.from(document.getElementsByClassName('show-err-length'))
          .forEach((elem) => elem.textContent = ('The length of ' + elem.parentNode.VForm.fieldName + ' shoud be within ' + elem.parentNode.VForm.minLength + ' to ' + elem.parentNode.VForm.maxLength));
    } 

    if(document.getElementsByClassName('show-err-pass2')) {
      Array.from(document.getElementsByClassName('show-err-pass2'))
            .forEach((elem) => elem.textContent = 'Sorry, password does not match');
    }

    if (document.getElementsByClassName('show-err-email')) {
      Array.from(document.getElementsByClassName('show-err-email'))
            .forEach((elem) => elem.textContent = 'Sorry, email is not valid');
    } 

    if(document.getElementsByClassName('show-err-phone')) {
      Array.from(document.getElementsByClassName('show-err-phone'))
          .forEach((elem) => elem.textContent = 'Sorry, phone number is not valid');
    } 
  }

}

const VF1 = new VForm({}, 'validation-form');
const VF2 = new VForm({fieldName: 'password', placeholder: 'password', checkType: 'password'}, 'validation-form');
const VF3 = new VForm({fieldName: 'password2', placeholder: 'password again', checkType:'password2'}, 'validation-form');
const VF4 = new VForm({fieldName: 'email', placeholder: 'email', checkType:'email'}, 'validation-form');
const VF5 = new VForm({fieldName: 'telephone', placeholder: 'telephone', checkType:'telephone'}, 'validation-form');





