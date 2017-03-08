var  config1 = {
  gallery: ['./img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg'],
  output: 'image-carousel',
  imageWidth: 750,
  imageHeight: 180,
  slidingTime: 200,
  waitTime: 1500,
  smooth: 5,
  playType: 1,
  showButtons: false
};
var  config2 = {
  gallery: ['./img/slide-1.png', './img/slide-2.png', './img/slide-3.png', './img/slide-4.png', './img/slide-5.png'],
  output: 'image-carousel',
  imageWidth: 640,
  imageHeight: 400,
  slidingTime: 300,
  waitTime: 2000,
  smooth:10,
  playType: 1,
  showButtons: true
};

var IC1 = new Carousel(config1);
var IC2 = new Carousel(config2);