import "./_events-slider.scss";
import Swiper from '../__slider-participants/swiper/swiper-bundle';
import '../__slider-participants/swiper/swiper-bundle.css';
var swiper = new Swiper('.events-slider__container', {
  slidesPerView: 4,
  slidesPerGroup: 4,
  spaceBetween: 30,
  pagination: {
    el: '.events-slider__pagination',
    clickable: true,

    renderBullet: function (index, className) {
      var dates = new Date();
      var year = dates.getFullYear();
      var numMonth = index >= 12 ? index - 12 : index;
      var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
      var resStr = months[dates.getMonth() + numMonth];
      var result = `
      <div class="events-slider__wrap-bullet">
        <hr>
        <span class = "${className}">
          <span class= "month"> ${resStr + " " + year}</span>
        </span>
      </div>
                    `;
      return result;
    }
  },
  navigation: {
    nextEl: '.events-slider__pagination--next',
    prevEl: '.events-slider__pagination--prev'
  },
});