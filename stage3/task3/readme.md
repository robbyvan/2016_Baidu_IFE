# Image Carousel
An Image Slider based on plain JavaScript<br />
[Demo: Image Carousel](https://robbyvan.github.io/2016_Baidu_IFE/stage3/task3/index.html)<br />

## Syntax
  ```js
    /*
    *   @param {Object} config
    */

    var Carousel = new Carousel(config);

    config = {
      gallery: ['src1', 'src2', ...]// {Array}, store image source
      output: 'image-carousel',     // {String}, output field's DOM Id
      imageWidth: 750,              // {Integer}, image width
      imageHeight: 180,             // {Integer}, image height
      slidingTime: 200,             // {Integer}, sliding time for each image(ms)
      waitTime: 1500,               // {Integer}, time the current image keep static(ms)
      smooth: 5,                    // {Integer}, smoothness of sliding
      playType: 1,                  // {Integer}, 0-Stop; 1-slide in from right; -1-slide in from left
      showButtons: false            // {Boolean}, button panel on/off
    }
  ```

## Example
   ```js
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
   ```

