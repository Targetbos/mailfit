import "./_weekday-slider.scss";
import Swiper from "../__slider-participants/swiper/swiper-bundle";
import "../__slider-participants/swiper/swiper-bundle.css";
var swiper = new Swiper(".weekday-slider__container", {
  spaceBetween: 30,
  slidesPerView: 2,
  navigation: {
    nextEl: ".weekday-slider__navigation--next",
    prevEl: ".weekday-slider__navigation--prev",
  },
});

class ViewImageSlider {
  constructor(container) {
    this.container = container;
    this.arrWrapImages = this.container.querySelectorAll(".js__wrap-image");
    this.previousContainerImage = this.container.firstElementChild.firstElementChild;
    this.nextContainerImage = this.container.lastElementChild.previousElementSibling.firstElementChild;
  }

  init() {
    this.arrWrapImages.forEach((el) => {
      el.onmouseover = () => {
        this.setImages(el);
      };
      this.setImages(el);
    });
  }
  setImages(el) {
    let previousImage = !el.previousElementSibling
      ? this.lastUrlImage()
      : el.previousElementSibling;
    let nextImage = !el.nextElementSibling
      ? this.firstUrlImage()
      : el.nextElementSibling;
    let previousUrlImage = this.getUrlImage(previousImage);
    let activeUrlImage = this.getUrlImage(el);
    let nextUrlImage = this.getUrlImage(nextImage);
    this.showPreviousImage(previousUrlImage);
    this.showNextImage(nextUrlImage);
  }
  showPreviousImage(image) {
    console.log("previous", image);
    this.previousContainerImage.src = image;
  }
  showNextImage(image) {
    this.nextContainerImage.src = image;
  }
  getUrlImage(container) {
    console.log("src: ", container.firstElementChild.firstElementChild.src);
    return container.firstElementChild.firstElementChild.src;
  }
  firstUrlImage() {
    return this.arrWrapImages[0];
  }
  lastUrlImage() {
    let maxLength = this.arrWrapImages.length - 1;
    return this.arrWrapImages[maxLength];
  }
}
document.querySelectorAll(".js__slide").forEach((el) => {
  var slider = new ViewImageSlider(el);
  slider.init();
});
