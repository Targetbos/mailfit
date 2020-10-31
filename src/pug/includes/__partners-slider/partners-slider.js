import "./_partners-slider.scss";
var sliderPartners = new Swiper(".partners__slider", {
  slidesPerView: 6,
  slidesPerColumn: 2,
  slidesPerColumnFill: "row",
  slidesPerGroup: 3,
  spaceBetween: 14,
  navigation: {
    nextEl: ".partners__navigation--next",
    prevEl: ".partners__navigation--prev",
  },
});
