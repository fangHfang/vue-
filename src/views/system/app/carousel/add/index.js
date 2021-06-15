import dialogProductList from "@/components/dialogProductList/index.vue";
import dialogActivityClass from "@/components/dialogActivityClass/index.vue";
import dialogProductGrouping from "@/components/dialogProductGrouping/index.vue";
import dialogPackageProduct from "@/components/dialogPackageProduct/index.vue";
import dialogProductClass from "@/components/dialogProductClass/index.vue";
import dialogProductBrand from "@/components/dialogProductBrand/index.vue";
import dialogConfigActivity from "@/components/dialogConfigActivity/index.vue";
import carouselPreview from "./carouselPreview/index.vue";
import { saveCarousel, queryCarouselDetail, toUpload } from "@/api/system/app/carousel";
export default {
  "name": "systemAppCarousel",
  "components": {
    dialogProductList,
    dialogActivityClass,
    dialogProductGrouping,
    dialogPackageProduct,
    dialogProductClass,
    dialogProductBrand,
    dialogConfigActivity,
    carouselPreview
  },
  data() {
    return {
      // true=查看，false=新增/修改
      "isLook": false,
      "form": {
        "pictureNo": "",
        "name": "",
        "creatName": null,
        "createDate": null,
        "status": 0,
        "pictureType": null,
        "details": [],
        "horizontalLocation": null,
        "navigaType": null,
        "popRule": null,
        "displayDetails": null
      },
      // 轮播图表单
      "bannerForm": [
        {
          "linkName": "",
          "linkType": "",
          "imgUrl": "",
          "linkUrl": "",
          "itemInfo": {
            "type": 0,
            "no": "",
            "name": "",
            "enabled": false
          },
          "sort": 0
        }
      ],
      // 广告表单选中下标
      "bannerFormIndex": 0,
      // input
      "toolBar": {
        "date": "2020-10-10",
        "name": "张三",
        "status": "正常"
      },
      // 规则验证
      "bannerRules": {
      },
      //
      "actions": [
        {
          "label": "配置活动",
          "value": 0
        },
        {
          "label": "活动类型",
          "value": 7
        },
        {
          "label": "商品分组",
          "value": 1
        },
        {
          "label": "套餐商品",
          "value": 2
        },
        {
          "label": "商品分类",
          "value": 3
        },
        {
          "label": "商品品牌",
          "value": 4
        },
        {
          "label": "单独商品",
          "value": 5
        },
        {
          "label": "网页链接",
          "value": 6
        }
      ],
      "productVisible": {
        "ConfigActivity": false,
        "ProductList": false,
        "ActivityClass": false,
        "ProductGrouping": false,
        "PackageProduct": false,
        "ProductClass": false,
        "ProductBrand": false
      },
      // 排序字段
      "totalSort": 100
    };
  },
  "computed": {
    token() {
      const token = { "Authorization": "bearer " + this.$store.state.token };
      return token;
    }
  },
  mounted() {
    // 查询广告位详情
    this.getCarouselDetail();
  },
  "methods": {
    /**
     * 查询轮播图详情
     */
    getCarouselDetail() {
      const params = {
        "pictureNo": this.$route.params.pictureNo
      };
      queryCarouselDetail(params).then(res => {
        const data = res.data;
        this.form = {
          ...this.form,
          ...data
        };
        if (data.details != null) {
          this.bannerForm = data.details;
        }
      });
    },

    /**
     * 上移
     */
    toUpSort(index) {
      const arr = this.bannerForm;
      const x = arr.splice(index, 1);
      arr.splice(index - 1, 0, x[0]);
    },
    /**
     * 下移
     */
    toDownSort(index) {
      const arr = this.bannerForm;
      const x = arr.splice(index, 1);
      arr.splice(index + 1, 0, x[0]);
    },
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
    },
    /**
     * 上传图片前验证
     * @param file
     * @param fileList
     * @param item 当前表单item
     */
    uploadImageChange(file, fileList, item) {
      const typeOk = file.raw && (file.raw.type === "image/jpeg" || file.raw.type === "image/png");
      if (!typeOk) {
        this.$message.warning("请上传jpg或png格式的图片");
        return;
      }
      toUpload(file, "basic").then((res) => {
        if (res.code === 200) {
          this.bannerForm.imgUrl = res.data.objectUrl;
          console.log(this.bannerForm.imgUrl);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 删除上传图片
     * @param item
     */
    handleRemoveImage(item) {
      this.$confirm("确定删除吗", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": null,
        "showClose": false,
        "type": "warning"
      }).then(() => {
        item.imgUrl = "";
      }).catch(() => {});
    },

    onListPictureUploadSuccess(response, index) {
      if (response.code === 200) {
        this.bannerForm[index].imgUrl = response.data.objectUrl;
      } else {
        this.$message.error(response.msg);
      }
    },

    /**
     * 重置
     */
    reset() {
      this.form = {
        ...this.form,
        "creatName": null,
        "createDate": null,
        "status": 0,
        "pictureType": null,
        "details": [],
        "horizontalLocation": null,
        "navigaType": null,
        "popRule": null,
        "displayDetails": null
      };
      this.bannerForm = [
        {
          "linkName": "",
          "linkType": "",
          "imgUrl": "",
          "linkUrl": "",
          "itemInfo": {
            "type": 0,
            "no": "",
            "name": "",
            "enabled": false
          },
          "sort": 0
        }
      ];
      this.bannerFormIndex = 0;
      this.$message.success("重置成功");
    },

    /**
     * 保存轮播图
     */
    saveCarousel(status) {
      this.bannerForm = this.bannerForm.map((item, index) => {
        return {
          ...item,
          "sort": this.totalSort - index
        };
      });
      const params = {
        "pictureNo": this.form.pictureNo,
        "pictureRelations": this.bannerForm,
        "description": this.form.description
      };
      saveCarousel(params).then(res => {
        this.$message.info(res.msg);
        this.$router.push("/system/app/carousel/list");
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 添加轮播图
     */
    addItem() {
      this.bannerForm.push({
        "linkName": "",
        "linkType": "",
        "imgUrl": "",
        "linkUrl": "",
        "itemInfo": {
          "no": "",
          "name": ""
        },
        "sort": this.bannerForm.length
      });
    },

    /**
     * 移除轮播图
     * @param index
     */
    removeItem(index) {
      this.bannerForm.splice(index, 1);
    },

    /**
     * 选择radio
     */
    checkedRadio(value, index) {
      this.clearInput(index);
      this.bannerFormIndex = index;
      switch (value) {
      // 配置活动
      case 0:
        this.productVisible.ConfigActivity = true;
        break;
        // 商品分组
      case 1:
        this.productVisible.ProductGrouping = true;
        break;
        // 套餐商品
      case 2:
        this.productVisible.PackageProduct = true;
        break;
        // 商品分类
      case 3:
        this.productVisible.ProductClass = true;
        break;
        // 商品品牌
      case 4:
        this.productVisible.ProductBrand = true;
        break;
        // 单独商品
      case 5:
        this.productVisible.ProductList = true;
        break;
        // 网页链接
      case "6":
        break;
        // 活动类型
      case 7:
        this.productVisible.ActivityClass = true;
        break;
      }
    },

    /**
     * 选择链接回调
     */
    setSelectInfo(data) {
      const { url, no, name, type } = data;
      this.bannerForm[this.bannerFormIndex].linkUrl = url;
      this.bannerForm[this.bannerFormIndex].itemInfo.name = name;
      this.bannerForm[this.bannerFormIndex].itemInfo.no = no;
      // 活动类型才有
      this.bannerForm[this.bannerFormIndex].itemInfo.type = type;
    },

    /**
     * 清空输入框
     */
    clearInput(index) {
      // 切换时清空输入框
      this.bannerForm[index].linkUrl = "";
      this.bannerForm[index].itemInfo.name = "";
      this.bannerForm[index].itemInfo.no = "";
      // 活动类型才有
      this.bannerForm[index].itemInfo.type = "";
    }
  }
};
