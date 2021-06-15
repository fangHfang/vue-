import upload from "@/components/upload/index.vue";
import { saveNavigation, queryNavigationDetail, toUpload } from "@/api/system/app/navigation";
import navigationPreview from "./navigationPreview/index.vue";
export default {
  "name": "systemAppWindowAdd",
  "components": {
    upload,
    navigationPreview
  },
  "filters": {
    // 格式化活动类型
    formartStatus(value) {
      let statusName = "--";
      switch (value) {
      case 0:
        statusName = "正常";
        break;
      case 1:
        statusName = "异常";
        break;
      }
      return statusName;
    }
  },
  data() {
    return {
      // 图例
      "phoneExample": require("@/assets/image/phone-example.png"),
      // true=查看，false=新增/修改
      "isLook": false,
      // 表单
      "form": {
        "details": [ {
          "linkName": "",
          "linkUrl": "",
          "linkType": "0",
          "imgUrl": "",
          "imgList": [],
          "itemInfo": {
            "name": "",
            "no": "",
            "type": ""
          },
          "sort": 0
        } ],
        "creatName": "",
        "createDate": "",
        "displayDetails": null,
        "horizontalLocation": null,
        "name": "",
        "navigaType": null,
        "pictureNo": "",
        "pictureType": null,
        "description": null
      },
      // 广告表单选中下标
      "detailsIndex": 0,
      // 规则验证
      "rules": {
        "linkName": [
          { "required": true, "message": "请输入导航名称", "trigger": "blur" },
          { "max": 20, "message": "不可超过20个字符", "trigger": "blur" }
        ]
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
    // 查询子导航详情
    this.getNavigationDetail();
  },
  "methods": {
    /**
     * 上移
     */
    toUpSort(index) {
      const arr = this.form.details;
      const x = arr.splice(index, 1);
      arr.splice(index - 1, 0, x[0]);
    },
    /**
     * 下移
     */
    toDownSort(index) {
      const arr = this.form.details;
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
          console.log(res.data.objectUrl);
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
        this.form.details[index].imgUrl = response.data.objectUrl;
      } else {
        this.$message.error(response.msg);
      }
    },
    /**
     * 初始化数据
     * @param pictureNo
     */
    getNavigationDetail() {
      const params = {
        "name": "",
        "pageReq": {
          "field": "",
          "order": "",
          "pageNum": 0,
          "pageSize": 0
        },
        "pictureNo": this.$route.params.pictureNo,
        "status": 0
      };
      queryNavigationDetail(params).then(res => {
        const data = res.data;
        this.form = {
          ...this.form,
          ...data,
          "details": data.details ? data.details : [ {
            "linkName": "",
            "linkUrl": "",
            "linkType": "0",
            "imgUrl": "",
            "imgList": [],
            "itemInfo": {
              "name": "",
              "no": "",
              "type": ""
            },
            "sort": 0
          } ]
        };
      });
    },
    /**
     * 添加一个item
     */
    addLinkItem() {
      this.form.details.push({
        "linkName": "",
        "linkType": "",
        "imgUrl": "",
        "linkUrl": "",
        "itemInfo": {
          "type": "",
          "no": "",
          "name": ""
        }
      });
    },

    /**
     * 删除一个item
     */
    removeLinkItem(index) {
      const array = this.form.details.splice(index, 1);
      this.$set(array, index);
    },

    /**
   * 关闭弹窗
   * @param done
   */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    /**
     * 重置
     */
    reset() {
      this.form = {
        ...this.form,
        "details": [
          {
            "linkName": "",
            "linkUrl": "",
            "linkType": "0",
            "imgUrl": "",
            "imgList": [],
            "itemInfo": {
              "name": "",
              "no": "",
              "type": ""
            },
            "sort": 0
          }
        ],
        "creatName": "",
        "createDate": "",
        "displayDetails": null,
        "horizontalLocation": null,
        "navigaType": null,
        "pictureType": null,
        "description": null
      };
      console.log(this.form, "this.form");
      this.$message.success("重置成功");
    },
    /**
     * 添加子导航
     */
    saveNavigation() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.details = this.form.details.map((item, index) => {
            return {
              ...item,
              "sort": this.totalSort - index
            };
          });
          const params = {
            "description": this.form.description,
            "pictureNo": this.form.pictureNo,
            "navigaType": 0,
            "pictureRelations": this.form.details
          };
          saveNavigation(params).then(res => {
            this.$message.info(res.msg);
            this.$router.push("/system/app/navigation/list");
          }).catch((error) => {
            console.info(error);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    /**
     * 选择radio
     */
    checkedRadio(value, index) {
      this.clearInput(index);
      this.detailsIndex = index;
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
      this.form.details[this.detailsIndex].linkUrl = url;
      this.form.details[this.detailsIndex].itemInfo.name = name;
      this.form.details[this.detailsIndex].itemInfo.no = no;
      // 活动类型才有
      this.form.details[this.detailsIndex].itemInfo.type = type;
    },

    /**
     * 清空输入框
     */
    clearInput(index) {
      // 切换时清空输入框
      this.form.details[index].linkUrl = "";
      this.form.details[index].itemInfo.name = "";
      this.form.details[index].itemInfo.no = "";
      // 活动类型才有
      this.form.details[index].itemInfo.type = "";
    }
  }
};
