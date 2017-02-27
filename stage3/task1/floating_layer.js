
const $ = (el) => document.querySelector(el);

const addEvent = function(element, type, handler){
  if (element.addEventListener){
    element.addEventListener(type, handler, false);
  }else if (element.attachEvent){
    element.attachEvent('on' + type, handler);
  }else{
    element['on' + type] = handler;
  }
}

const FloatingLayer = function(config){
  this.title = config.title || "Sign In";
  this.input1 = config.input1 || "Username";
  this.input2 = config.input2 || "Password";
  this.buttonContent = config.buttonContent || "Sign In";
  this.bodyDom = $('body') || null;
  this.maskDom = null;
  this.floatDom = null;
  if (this.maskDom && this.floatDom){
    this.maskDom.FL = this;
    this.floatDom.FL = this;
  }
  
  this.init();
};

FloatingLayer.prototype = {
  constructor: FloatingLayer,

  init: function(){
    this.createMask().createFloat();
  },

  createMask: function(){
    let mask = document.createElement('div');
    mask.className = 'FL-mask';

    this.bodyDom.appendChild(mask);
    this.maskDom = mask;
    this.maskDom.FL = this;

    return this;
  },

  createFloat: function(){
    let float = document.createElement('div');
    float.className = 'FL-float';

    let closeBtn = document.createElement('i');
    closeBtn.className = 'FL-float-closebtn fa fa-times-circle';
    closeBtn.setAttribute('aria-hidden', 'true');

    let title = document.createElement('h3');
    title.className = 'FL-float-title';
    title.textContent = this.title;

    let username = document.createElement('input');
    username.className = 'FL-float-input1';
    username.setAttribute('name', this.input1);
    username.setAttribute('placeholder', this.input1);
    

    let password = document.createElement('input');
    password.className = 'FL-float-input2';
    password.setAttribute('name', this.input2);
    password.setAttribute('type', this.input2);
    password.setAttribute('placeholder', this.input2);

    let button = document.createElement('button');
    button.className = 'FL-float-button';
    button.textContent = this.buttonContent;

    float.appendChild(closeBtn);
    float.appendChild(title)
    float.appendChild(username);
    float.appendChild(password);
    float.appendChild(button);
    this.maskDom.appendChild(float);

    this.floatDom = float;
    this.floatDom.FL = this;

    addEvent(float, 'click', (e) => {
      e.stopPropagation();
      // console.log(e);
      if (e.target.className.indexOf('FL-float-closebtn') !== -1){
        this.bodyDom.removeChild(this.maskDom);
      }
    });

    return this;
  },

  


};