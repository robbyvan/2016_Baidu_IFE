

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
    this.container = $('#' + config.dest);
    this.gallery = config.gallery || [];

    //private props
    this.currentImg = 0;
    this.galleryDom;
    this.navDom;

    //bind methods
    this.createGallery = this.createGallery.bind(this);
    this.init = this.init.bind(this);

    //call init
    this.init();
  }

  init() {
    this.createGallery().createNav();
  }

  createGallery() {
    if (this.gallery.length < 1) {
      throw 'Gallery should should have one image at least';
    }else {
      let section = document.createElement('section');
      section.className = 'gallery';

      for (let i = 0; i < this.gallery.length; ++i) {
        let img = document.createElement('img');
        img.setAttribute('src', this.gallery[i]);
        img.setAttribute('data-key', i);

        section.appendChild(img);
      }

      this.galleryDom = section;
      this.container.appendChild(section);

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

      ul.appendChild(li);
    }

    this.navDom = ul;
    this.container.appendChild(ul);

    return this;
  }

}

// <section class="gallery">
//       <img src="./img/1.jpg" data-key="0" />
//       <img src="./img/1.jpg" data-key="1" />
//       <img src="./img/1.jpg" data-key="2" />
//       <img src="./img/1.jpg" data-key="3" />
//       <img src="./img/1.jpg" data-key="4" />
//</section>
//<ul class="nav-bar">
//       <li data-key="0"></li>
//       <li data-key="1"></li>
//       <li data-key="2"></li>
//       <li data-key="3"></li>
//       <li data-key="4"></li>
// </ul>


var  config1 = {
  gallery: ['./img/1.jpg', './img/2.jpg'],
  dest: 'image-carousel'
}

var IC1 = new Carousel(config1);