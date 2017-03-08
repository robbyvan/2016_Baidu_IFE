//Shorthand for queryselector
const $ = (el) => document.querySelector(el);

//event Listener
const addEvent = (element, type , handler) => {
  (element.addEventListener)?
    element.addEventListener(type, handler, false) :
  (element.attachEvent)?
    element.attachEvent('on' + type, handler) : 
  element['on' + type] = handler;
}

// Class: Carousel
class Carousel {

  constructor(config) {
    //user config
    this.ouput = $('#' + config.dest);
    this.gallery = config.gallery || [];
    this.showButtons = config.showButtons;

    this.props = {};
    this.props.imageWidth = config.imageWidth || 0;
    this.props.imageHeight = config.imageHeight || 0;
    this.props.transTime = config.transTime || 300;
    this.props.waitTime = config.waitTime || 2000;
    this.props.smooth = config.smooth || 10;

    //public props
    this.galleryDom;
    this.navDom;
    this.evtHandler;

    this.props.totalImage = this.gallery.length;
    this.props.galleryMaxWidth = this.props.totalImage * this.props.imageWidth;

    this.status = {
      sliding: false,
      current: 0,
      playType: config.playType || 0 // -1: DSC, 0: STOP, 1: ASC
    };
    
    //bind methods
    this.createGallery = this.createGallery.bind(this);
    this.createNav = this.createNav.bind(this);
    this.init = this.init.bind(this);

    //call init
    this.init();
  }

  init() {
    this.createContainer().createGallery().createNav().createButtons();
    if (!this.showButtons){
      this.autoPlay();
    }
  }

  createContainer() {
    let carouselWrapper = document.createElement('div');
    carouselWrapper.className = 'carousel-wrapper';

    this.container = carouselWrapper;
    this.ouput.appendChild(carouselWrapper);
    return this;
  }

  createGallery() {
    if (this.gallery.length < 1) {
      throw 'Gallery should should have one image at least';
    }else {
      let div = document.createElement('div');
      div.className = "gallery-wrapper";
      div.style.width = this.props.imageWidth + 'px';
      div.style.height = this.props.imageHeight + 'px';

      let section = document.createElement('section');
      section.className = 'gallery';
      section.style.left = (0 - this.props.imageWidth) + 'px';

      for (let i = 0; i < this.gallery.length; ++i) {
        let img = document.createElement('img');
        img.setAttribute('src', this.gallery[i]);
        img.style.width = this.props.imageWidth + 'px';
        img.style.height = this.props.imageHeight + 'px';
        

        section.appendChild(img);
      }

      let lastDup = document.createElement('img');
      lastDup.setAttribute('src', this.gallery[this.props.totalImage - 1]);
      lastDup.style.width = this.props.imageWidth + 'px';
      lastDup.style.height = this.props.imageHeight + 'px';
      section.insertBefore(lastDup, section.children[0]);

      let firstDup = document.createElement('img');
      firstDup.setAttribute('src', this.gallery[0]);
      firstDup.style.width = this.props.imageWidth + 'px';
      firstDup.style.height = this.props.imageHeight + 'px';
      section.appendChild(firstDup);

      // let goLeft = document.createElement('a');
      // goLeft.className = 'go-left';
      // let leftIcon = document.createElement('i');
      // leftIcon.className = 'fa fa-chevron-left';
      // leftIcon.setAttribute = 'true';
      // goLeft.appendChild(leftIcon);
      // section.insertBefore(goLeft, section.children[0]);

      // let goRight = document.createElement('a');
      // goRight.className = 'go-right';
      // let rightIcon = document.createElement('i');
      // rightIcon.className = 'fa fa-chevron-right';
      // rightIcon.setAttribute = 'true';
      // goRight.appendChild(rightIcon);
      // section.appendChild(goRight);

      this.galleryDom = section;

      div.appendChild(section);
      this.container.appendChild(div);

      return this;
    }
  }

  createNav() {
    //no need to check length since gallery was created first.
    let ul = document.createElement('ul');
    ul.className = 'carousel-nav';

    for (let i = 0; i < this.gallery.length; ++i) {
      let li = document.createElement('li');
      li.setAttribute('data-key', i);

      if (i === 0){
        li.className = "selected";
      }
      ul.appendChild(li);
    }

    //bind click listener
    addEvent(ul, 'click', (e) => {
      if (e.target.nodeName === "LI"){
        //Force change are allowed only when image is not currently sliding
        if (!this.status.sliding){
          //stop auto-change timer
          clearInterval(this.evtHandler); 
          //force change
          this.forceChange(parseInt(e.target.dataset.key));
        }
      }
    });

    this.navDom = ul;
    this.container.appendChild(ul);

    return this;
  }

  createButtons() {
    if (!this.showButtons){
      return this;
    }

    let div = document.createElement('div');
    div.className = 'button-wrapper';
    div.style.width = this.props.imageWidth + 'px';

    let ASC = document.createElement('button');
    ASC.className = 'button-asc';
    ASC.textContent = 'Play';

    let DSC = document.createElement('button');
    DSC.className = 'button-dsc';
    DSC.textContent = 'Inverse';

    let stopButton = document.createElement('button');
    stopButton.className = 'button-stop';
    stopButton.textContent = 'Stop';

    div.appendChild(ASC);
    div.appendChild(DSC);
    div.appendChild(stopButton);

    addEvent(div, 'click', (e) => {
      if (e.target.nodeName === 'BUTTON'){
        switch (e.target.className) {
          case 'button-asc': {
            clearInterval(this.evtHandler);
            this.status.playType = 1;
            this.autoPlay();
            break;
          }
          case 'button-dsc': {
            clearInterval(this.evtHandler);
            this.status.playType = -1;
            this.autoPlay();
            break;
          }
          case 'button-stop': {
            clearInterval(this.evtHandler);
            this.status.playType = 0;
            break;
          }
          default:
            clearInterval(this.evtHandler);
        }
      }
    });

    this.container.appendChild(div);
    return this;
  }

  rotate(destIndex) {
    if (destIndex === this.status.current){
      return;
    }

    this.status.sliding = true;

    let currIndex = this.status.current;

    let offset = (currIndex - destIndex) * this.props.imageWidth;
    let destination = parseInt(this.galleryDom.style.left) + offset;

    let navDest = destIndex;
    if (destIndex === -1){
      navDest = this.gallery.length - 1;
    }else if (destIndex === this.gallery.length){
      navDest = 0;
    }
    this.navDom.children[currIndex].classList.remove("selected");
    this.navDom.children[navDest].className += 'selected';

    /*
    * start:  this.galleryDom.style.left
    * end:    destination
    */

    //px per milisecond
    let pxPerMs = offset / (this.props.transTime);
    //px per time, i.e distance for every 10ms
    let pace = pxPerMs * this.props.smooth;


    const sliding = () => {
      // console.log("dest: " + destIndex);
      // console.log("curr: " + this.status.current);
      if ( pace < 0 && parseInt(this.galleryDom.style.left) > destination
        || pace > 0 && parseInt(this.galleryDom.style.left) < destination){

          this.galleryDom.style.left = parseInt(this.galleryDom.style.left) 
                                        + pace + 'px';
          this.timeoutHandler = setTimeout(sliding , this.props.smooth);
      }else {
        clearTimeout(this.timeoutHandler);
        this.galleryDom.style.left = destination + 'px';
        this.status.sliding = false;
        if (destIndex === -1) {
          this.status.current = this.gallery.length - 1;
          this.galleryDom.style.left = (0 - this.props.galleryMaxWidth) + 'px';
        }else if (destIndex >= this.gallery.length){
          this.status.current = 0;
          this.galleryDom.style.left = (0 - this.props.imageWidth) + 'px';
        }else {
          this.status.current = destIndex;
        }

      }
    };

    sliding();
    return this;
  }

  autoPlay() {
    switch (this.status.playType) {
      case 0 :{
        clearInterval(this.evtHandler);
        break;
      }
      case 1 :{
        this.evtHandler = setInterval( () =>{
          this.rotate(this.status.current + 1);
        }, this.props.waitTime);
        break;
      }
      case -1 :{
        this.evtHandler = setInterval( () =>{
          this.rotate(this.status.current - 1);
        }, this.props.waitTime);
        break;
      }
      default:
       clearInterval(this.evtHandler);
    }
  }

  forceChange(destIndex) {
    switch(this.status.playType) {
      //if not auto playing
      case 0: {
        this.rotate(destIndex);
        this.status.current = destIndex;
        break;
      }
      //auto ASC
      case 1: {
        this.rotate(destIndex);
        this.status.current = destIndex;
        this.evtHandler = setInterval(() => {
          this.rotate(this.status.current + 1);
        }, this.props.waitTime);
        break;
      }
      //auto DSC
      case -1: {
        this.rotate(destIndex);
        this.status.current = destIndex;
        this.evtHandler = setInterval(() => {
          this.rotate(this.status.current - 1);
        }, this.props.waitTime);
        break;
      }
      default: 
        this.rotate(destIndex);
    }
  }

}


var  config2 = {
  gallery: ['./img/slide-1.png', './img/slide-2.png', './img/slide-3.png', './img/slide-4.png', './img/slide-5.png'],
  dest: 'image-carousel',
  imageWidth: 640,
  imageHeight: 400,
  transTime: 300,
  waitTime: 2000,
  smooth:10,
  playType: 1,
  showButtons: true
}

var  config1 = {
  gallery: ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg'],
  dest: 'image-carousel',
  imageWidth: 750,
  imageHeight: 180,
  transTime: 200,
  waitTime: 1500,
  smooth: 5,
  playType: 1,
  showButtons: false
};

var IC1 = new Carousel(config1);
var IC2 = new Carousel(config2);