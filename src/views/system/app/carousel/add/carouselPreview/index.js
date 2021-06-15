import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  "name": "carouselPreview",
  "components": {
    Swiper,
    SwiperSlide
  },
  "props": {
    // 数据
    "list": {
      "type": Array,
      "default": () => []
    }

  },
  data() {
    return {
      "imgSrc": require("@/assets/image/carousel-img.png"),
      "swiperOptions": {
        "slidesPerView": 1.1,
        "spaceBetween": 5,
        "centeredSlides": true,
        "loop": true
      }
    };
  },
  "computed": {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  mounted() {

  },
  "methods": {
  }
};