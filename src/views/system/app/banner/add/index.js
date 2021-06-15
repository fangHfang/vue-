import bannerPreview from "./bannerPreview/index.vue";
import upload from "@/components/upload/index.vue";
import { createItem, searchList } from "@/api/system/app/banner";
import { toUpload } from "../../../../../api/system/app/banner";
export default {
  "name": "systemAppBanner",
  "components": {
    bannerPreview,
    upload
  },
  data() {
    return {
      // true=查看，false=新增/修改
      "isLook": false,
      // 横幅表单
      "form": {
        "horizontalLocation": 0,
        "pictureNo": this.$route.query.no,
        "description": ""
      },
      "bannerForm": [
        {
          "linkType": "",
          "linkName": "",
          "imgUrl": "",
          "linkUrl": "",
          "itemInfo": {
            "name": "",
            "no": "",
            "type": ""
          },
          "sort": 0
        }
      ],
      // 排序字段
      "totalSort": 100,
      // 广告表单选中下标
      "bannerFormIndex": 0,
      // 规则验证
      "bannerRules": {
      },
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
      }
    };
  },
  "computed": {
    token() {
      const token = { "Authorization": "bearer " + this.$store.state.token };
      return token;
    }
  },
  mounted() {
    // 获取横幅详情
    this.getBannerDetail();
  },
  "methods": {

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
          console.log(res);
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    onListPictureUploadSuccess(response, index) {
      if (response.code === 200) {
        this.bannerForm[index].imgUrl = response.data.objectUrl;
      } else {
        this.$message.error(response.msg);
      }
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

    /**
      * 添加横幅项
      */
    addItem() {
      this.bannerForm.push({
        "linkName": "",
        "linkType": "",
        "imgUrl": "",
        "linkUrl": "",
        "itemInfo": {
          "type": "",
          "no": "",
          "name": ""
        },
        "sort": 0
      });
    },

    /**
      * 移除横幅项
      * @param index
      */
    removeItem(index) {
      this.bannerForm.splice(index, 1);
    },

    /**
     * 保存
     */
    submitForm(status) {
      const postData = {
        "horizontalLocation": this.form.horizontalLocation,
        "pictureRelations": this.bannerForm.map((x, i) => {
          return {
            ...x,
            "sort": this.totalSort - i
          };
        }),
        "pictureNo": this.form.pictureNo,
        "description": this.form.description
      };
      createItem(postData).then((res) => {
        this.$message.info(res.msg);
        this.$router.push("/system/app/banner/list");
      }).catch((error) => {
        console.log(error);
      });
    },

    /**
     * 查询详情
     */
    getBannerDetail() {
      const postData = {
        "name": "",
        "pageReq": {
          "field": "",
          "order": "",
          "pageNum": 0,
          "pageSize": 0
        },
        "pictureNo": this.form.pictureNo,
        "status": 0
      };

      searchList(postData).then((res) => {
        if (res.code === 200) {
          const data = res.data;
          this.form = {
            ...this.form,
            ...data,
            "description": data.desc
          };
          if (data.details != null) {
            this.bannerForm = data.details;
          }
        }
      }).catch(() => {
        this.$message.error("查询详情失败");
      });
    },

    /**
     * 重置
     */
    reset() {
      this.form = {
        ...this.form,
        "horizontalLocation": 0,
        "pictureNo": this.$route.query.no,
        "description": ""
      };
      this.bannerForm = [
        {
          "linkType": "",
          "linkName": "",
          "imgUrl": "",
          "linkUrl": "",
          "itemInfo": {
            "name": "",
            "no": "",
            "type": ""
          },
          "sort": 0
        }
      ];
      this.sort = 0;
      this.bannerFormIndex = 0;
      this.$message.success("重置成功");
    },

    /**
     * 选择radio
     */
    checkedRadio(value, index) {
      // 清空之前选中内容
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
