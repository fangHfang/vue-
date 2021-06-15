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
      "imgSrc": require("@/assets/image/adv-img.jpg"),
      "swiperOptions": {

      }
    };
  },
  "computed": {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    }
  },
  "watch": {

  },
  mounted() {

  },
  "methods": {
  }
};