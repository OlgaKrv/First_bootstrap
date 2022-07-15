// (function() {
//   "use strict";
// })();

function Carousel(setting) {
  if(document.querySelector(setting.wrap) === null) {
    console.error(`Carousel not fount selector ${setting.wrap}`);
    return;
  }

  /* Scope privates methods and properties */
  let privates = {};


  /* Public methods */
  // Prev slide
  this.prev_slide = () => {
    --privates.opt.position;

    if(privates.opt.position < 0) {
      privates.sel.wrap.classList.add('s-notransition');
      privates.opt.position = privates.opt.max_position - 1;
    }

    privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
  };

  // Next slide
  this.next_slide = () => {
    ++privates.opt.position;

    if(privates.opt.position >= privates.opt.max_position) {
      privates.opt.position = 0;
    }

    privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
  };

  // One slide
  this.one_slide = () => {
    privates.opt.position = 0;
    privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
  };

  // Two slide
  this.two_slide = () => {
    privates.opt.position = 1;
    privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
  };

  // Three slide
  this.three_slide = () => {
    privates.opt.position = 2;
    privates.sel.wrap.style["transform"] = `translateX(-${privates.opt.position}00%)`;
  };
  

  /* Privates properties */
  privates.setting = setting;

  privates.sel = {
    "main": document.querySelector(privates.setting.main),
    "wrap": document.querySelector(privates.setting.wrap),
    "children": document.querySelector(privates.setting.wrap).children,
    "prev": document.querySelector(privates.setting.prev),
    "next": document.querySelector(privates.setting.next),
    "one": document.querySelector(privates.setting.one),
    "two": document.querySelector(privates.setting.two),
    "three": document.querySelector(privates.setting.three),
  };

  privates.opt = {
    "position": 0,
    "max_position": document.querySelector(privates.setting.wrap).children.length
  };

  // Control
  if(privates.sel.prev !== null) {
    privates.sel.prev.addEventListener('click', () => {
      this.prev_slide();
    });
  }

  if(privates.sel.next !== null) {
    privates.sel.next.addEventListener('click', () => {
      this.next_slide();
    });
  }

  if(privates.sel.one !== null) {
    privates.sel.one.addEventListener('click', () => {
      this.one_slide();
    });
  }

  if(privates.sel.two !== null) {
    privates.sel.two.addEventListener('click', () => {
      this.two_slide();
    });
  }

  if(privates.sel.three !== null) {
    privates.sel.three.addEventListener('click', () => {
      this.three_slide();
    });
  }
}


let a = new Carousel({
  "main": ".js-carousel",
  "wrap": ".js-carousel__wrap",
  "prev": ".js-carousel__prev",
  "next": ".js-carousel__next",
  "one": ".js-carousel__one",
  "two": ".js-carousel__two",
  "three": ".js-carousel__three",
});

ymaps = window.ymaps;
ymaps.ready(init); 
function init(){
  var myMap = new ymaps.Map("map",{center: [55.85,37.45],zoom: 13});
  
  // Элементы управления картой
  //myMap.controls.add("zoomControl").add("typeSelector").add("mapTools");
  
  ymaps.geocode("г. Москва, Тверская 7").then(function (res) {
    var coord = res.geoObjects.get(0).geometry.getCoordinates();
    var myPlacemark = new ymaps.Placemark(coord, {}, {
      iconImageHref: "/img/map.png",
      iconImageSize: [54, 74],
      iconImageOffset: [-27, -74]
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.setCenter(coord);	
      
    // Сдвиг центра карты вправо
    var newcoord = myMap.getGlobalPixelCenter();
    newcoord[0] -= 150;
    myMap.setGlobalPixelCenter(newcoord);				
  });
}