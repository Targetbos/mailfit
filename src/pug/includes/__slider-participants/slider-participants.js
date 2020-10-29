import "./_slider-participants.scss";
import Swiper from './swiper/swiper-bundle';
import './swiper/swiper-bundle.css';
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 6,
  slidesPerColumn: 2,
  slidesPerColumnFill: "row",
  slidesPerGroup: 3,
  spaceBetween: 14,
  navigation: {
    nextEl: '.card-participants__pagintaion--next',
    prevEl: '.card-participants__pagintaion--prev'
  },
});