import dialogAddProduct from "@/components/dialogAddProduct/index.vue";
import addActiveItem from "./addActiveItem/index.vue";
import mallPreview from "@/components/mallPreview/index.vue";
import addWindowForm from "./addWindowForm/index.vue";
import { listItemInfoByPage, listItemCategorySelectShow, listItemLabel, listItemBrand, offSale, listSpecTemplate } from "@/api/product/manage";
import { pictureDisplaySave, queryDisplay, displayByNo, createPictureItem, delPictureItem, listPictureItem } from "@/api/system/app/window";
export default {
  "name": "systemAppWindowAdd",
  "components": {
    dialogAddProduct,
    mallPreview,
    addActiveItem,
    addWindowForm
  },
  "filters": {
    // 格式化活动类型
    formatStatus(value) {
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
      "parentName": "window",
      "loading": false,
      // 新增橱窗弹窗
      "dialogaddWindowVisible": false,
      // 橱窗按钮
      "winCheckButton": {
        "checkIndex": 0,
        "list": [
          { "key": "1图橱窗", "value": 1, "data": [] },
          { "key": "3图橱窗", "value": 3, "data": [] },
          { "key": "4图橱窗", "value": 4, "data": [] },
          { "key": "6图橱窗", "value": 6, "data": [] } ]
      },
      // 橱窗列表
      "windowList": [],
      "winIndex": 0,
      // true=查看，false=新增/修改
      "isLook": false,
      // 表单
      "form":
        {
          "title": "",
          "displaySort": 1,
          "desc": "",
          "winStyle": 1,
          "activeTableData": [
            {
              "imgSrc": require("@/assets/image/pd-img.jpg"),
              "type": 0,
              "name": "xxx活动",
              "link": "#"
            },
            {
              "imgSrc": require("@/assets/image/pd-img.jpg"),
              "type": 1,
              "name": "xxx活动",
              "link": "#"
            },
            {
              "imgSrc": require("@/assets/image/pd-img.jpg"),
              "type": 2,
              "name": "xxx活动",
              "link": "#"
            },
            {
              "imgSrc": require("@/assets/image/pd-img.jpg"),
              "type": 3,
              "name": "xxx活动",
              "link": "#"
            }
          ],
          "checked": false,
          "productTableData": [],
          "multipleSelection": [],
          "creatPeople": "张三",
          "creatDate": "2020-01-02 09:00",
          "status": 0
        },
      // 规则验证
      "rules": {
        // "title": [
        //   { "required": true, "message": "请输入前端橱窗名称", "trigger": "blur" }
        // ]
      },
      // 更多商品查询条件
      "searchData": {
        // 名称
        "itemName": "",
        // 橱窗编号
        "displayNo": "",
        // 分类
        "classNo": "",
        // 规格
        "specNo": "",
        // 品牌
        "brandNo": "",
        // 标签
        "tagNo": ""
      },
      // 配置
      "options": {
        // 橱窗名称
        "name": "",
        // 分类选项
        "classOptions": [],
        // 规格选项
        "specOptions": [],
        // 标签选项
        "tagOptions": [],
        // 品牌选项
        "brandOptions": []
      },
      "dialogAddProductVisible": false,
      "dialogAddActiveVisible": false,
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
      // 选择弹窗下标
      "detailsIndex": "",
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "totalSort": 100,
      // 更多商品table 加载中
      "tableLoading": false
    };
  },
  created() {
  },
  mounted() {
    this.queryDisplay();
    // 查询更多商品下拉框选项
    this.getAllSelectOptions();
  },
  "watch": {
    "form.title": {
      "handler": function(newVal, oldVal) {
        this.windowList[this.winIndex].displayName = newVal;
      },
      "deep": true
    },
    "form.displaySort": {
      "handler": function(newVal, oldVal) {
        this.windowList[this.winIndex].displaySort = newVal;
      },
      "deep": true
    }
  },
  "methods": {
    createData() {
      // 初始化创建橱窗详情的data结构
      for (let i = 0;i < this.winCheckButton.list.length;i++) {
        const item = this.winCheckButton.list[i];
        item.data = this.newArrayList(item.value);
      }
    },
    /**
     * 查询橱窗列表
     */
    queryDisplay() {
      const params = {
        "pictureNo": this.$route.query.pictureNo,
        "pageReq.pageNum": 1,
        "pageReq.pageSize": 10
      };
      const that = this;
      queryDisplay(params).then(res => {
        if (res.code === 200) {
          // 新增第一次橱窗情况,左边循环出结构，让详情数据塞入对应位置
          that.windowList = res.data.displayDetails || [];
          that.form.desc = res.data.desc;
          this.newWindowList(this.windowList[0].displayType, true);
          this.$refs.testref.addSuccess();
          console.info(that.windowList);
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 查询橱窗详情
     */
    selectByDisplayNo(displayNo) {
      const params = {
        "pictureNo": this.$route.query.pictureNo,
        "displayNo": displayNo
      };
      const that = this;
      displayByNo(params).then(res => {
        if (res.code === 200) {
          console.log(res.data.displayDetails[0]);
          // 详情橱窗命赋值
          that.form.title = res.data.displayDetails[0].displayName;
          const type = res.data.displayDetails[0].displayType;
          const index = this.getIndex(type);
          // 详情橱窗选择序号
          that.winCheckButton.checkIndex = index;
          // 详情橱窗数量
          that.form.winStyle = type;
          // 橱窗排序
          that.form.displaySort = res.data.displayDetails[0].displaySort;
          // 橱窗no
          that.searchData.displayNo = displayNo;
          // 更多商品按钮
          that.form.checked = res.data.displayDetails[0].showMoreItem === 1;
          if (that.form.checked) {
            this.listPictureItem();
          }
          // 创建新橱窗详情新结构
          that.createData();
          let data = [];
          // 循环赋值橱窗详情内容
          if (res.data.displayDetails) {
            for (let i = 0;i < res.data.displayDetails[0].itemDetails.length;i++) {
              const detail = res.data.displayDetails[0].itemDetails[i];
              data = {
                "itemInfo": detail.itemInfo || {},
                "linkType": detail.linkType,
                "linkUrl": detail.linkUrl || "",
                "activeListImg": detail.imgUrl ? [ { "url": detail.imgUrl } ] : []
              };
              this.$set(that.winCheckButton.list[index].data, i, data);
            }
          }
          console.log("333", that.winCheckButton.list[index].data);
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 更具橱窗数量取排序
     * @param size
     */
    getIndex(size) {
      let index = "";
      if (size === 1) {
        index = 0;
      } else if (size === 3) {
        index = 1;
      } else if (size === 4) {
        index = 2;
      } else if (size === 6) {
        index = 3;
      }
      return index;
    },
    /**
     * 选则橱窗样式
     * @param size
     * @param index
     */
    checkedWinCheckStyle(size, index) {
      // 修改当前详情的选中序
      this.winCheckButton.checkIndex = index;
      // 修改当前详情的橱窗数量
      this.form.winStyle = size;
      // 更具选中样式重新赋予左侧橱窗列表结构
      this.newWindowList(size, false);
    },
    /**
     * 选则橱窗单选回调
     */
    checkAction(index) {
      if (index < 0) {
        this.searchData.displayNo = "";
      } else {
        this.winIndex = index;
        // 查询橱窗详情
        this.selectByDisplayNo(this.windowList[index].displayNo);
      }
    },

    /**
     * 初始化橱窗data
     * @param length 新增集合的长度
     */
    newArrayList(length) {
      return Array.from(Array(length), (v, k) => {
        return {
          "linkUrl": "",
          "linkType": null,
          "activeListImg": [],
          "itemInfo": {}
        };
      });
    },

    /**
     * 初始化橱窗列样式
     * @param length 新增集合的长度
     */
    newWindowList(length, type) {
      for (let i = 0;i < this.windowList.length;i++) {
        const windowOne = Array.from(Array(length), (v, k) => {
          return {
            "imgUrl": "",
            "itemInfo": "",
            "linkName": "",
            "linkType": "",
            "linkUrl": "",
            "sort": ""
          };
        });
        // 不需要替换windowList，只清空
        if (type) {
          for (let j = 0;j < this.windowList[i].itemDetails.length;j++) {
            windowOne[j] = this.windowList[i].itemDetails[j];
          }
        }
        this.windowList[i].itemDetails = windowOne;
      }
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        });
    },
    /**
     * 新增事件
     */
    addOne() {
      // 查询橱窗列表
      this.queryDisplay();
    },
    /**
     * 图片修改事件
     */
    changeUploadSuccess(url, index) {
      // 改变左侧选中行的图片
      this.windowList[this.winIndex].itemDetails[index].imgUrl = url;
      this.loading = false;
      console.log(this.windowList[this.winIndex]);
    },
    /**
     * 上移
     */
    toUpSort(index) {
      // for循环的key值是虚拟dom高效的关键
      // https://blog.csdn.net/deciduous_leaves/article/details/114630664
      // https://blog.csdn.net/qq_26834399/article/details/102504681
      const arr = this.winCheckButton.list[this.winCheckButton.checkIndex].data;
      const x = arr.splice(index, 1);
      arr.splice(index - 1, 0, x[0]);
    },
    /**
     * 下移
     */
    toDownSort(index) {
      const arr = this.winCheckButton.list[this.winCheckButton.checkIndex].data;
      const x = arr.splice(index, 1);
      arr.splice(index + 1, 0, x[0]);
    },
    /**
     * 保存
     */
    toSave() {
      this.loading = true;
      if (this.windowList.length < 1) {
        this.$message.error("请先添加橱窗");
      }
      const postData = {
        "pictureNo": this.$route.query.pictureNo,
        "displayNo": this.searchData.displayNo,
        "displayName": this.windowList[this.winIndex].displayName,
        "displayType": this.form.winStyle,
        "displaySort": this.windowList[this.winIndex].displaySort,
        "itemDetails": [],
        "showMoreItem": !this.form.checked ? 0 : 1,
        "desc": this.form.desc
      };
      const newList = [];
      const list = this.winCheckButton.list[this.winCheckButton.checkIndex];
      for (let i = 0;i < list.data.length;i++) {
        const data = list.data[i];
        const moreDetail = {
          "imgUrl": data.activeListImg && data.activeListImg.length > 0 ? data.activeListImg[0].url : "",
          "linkType": data.linkType,
          "linkUrl": data.linkUrl,
          "sort": this.totalSort - i
        };
        if (data.linkType !== 6) {
          moreDetail.itemInfo = data.itemInfo;
        } else {
          moreDetail.itemInfo = {};
        }
        newList.push(moreDetail);
      }
      postData.itemDetails = newList;
      pictureDisplaySave(postData).then(res => {
        this.loading = false;
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.queryDisplay();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        this.loading = false;
        console.info(error);
      });
    },
    /**
     * 配置更多商品
     *
     */
    selectInfos(itemInfoList) {
      const itemNos = [];
      if (itemInfoList && itemInfoList.length > 0) {
        itemInfoList.map(e => {
          itemNos.push(e.itemNo);
        });
      }
      const { displayNo } = this.searchData;
      const postData = {
        "itemNos": itemNos,
        "pictureNo": this.$route.query.pictureNo,
        "displayNo": displayNo
      };
      createPictureItem(postData).then(res => {
        this.loading = false;
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.listPictureItem();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 批量取消
     *
     */
    selectDelte() {
      if (this.multipleSelection.length === 0) {
        return this.$message.error("请选择商品");
      }
      const itemNos = [];
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.multipleSelection.map(e => {
          itemNos.push(e.itemNo);
        });
      }
      const postData = {
        "itemNos": itemNos,
        "pictureNo": this.$route.query.pictureNo,
        "displayNo": this.searchData.displayNo
      };
      delPictureItem(postData).then(res => {
        this.loading = false;
        if (res.code === 200) {
          this.$message.success("删除成功");
          this.listPictureItem();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      case 6:
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
      const { list, checkIndex } = this.winCheckButton;
      list[checkIndex].data[this.detailsIndex].linkUrl = url;
      list[checkIndex].data[this.detailsIndex].itemInfo.name = name;
      list[checkIndex].data[this.detailsIndex].itemInfo.no = no;
      // 活动类型才有
      list[checkIndex].data[this.detailsIndex].itemInfo.type = type;
    },

    /**
     * 清空输入框
     */
    clearInput(index) {
      // 切换时清空输入框
      const { list, checkIndex } = this.winCheckButton;
      list[checkIndex].data[index].linkUrl = "";
      list[checkIndex].data[index].itemInfo.name = "";
      list[checkIndex].data[index].itemInfo.no = "";
      // 活动类型才有
      list[checkIndex].data[index].itemInfo.type = "";
    },

    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },

    /**
     * 查询所有下拉框选项
     */
    getAllSelectOptions() {
      // 获取商品分类下拉框选项
      this.getItemCategoryOptions();
      // 获取商品标签下拉框选项
      // 暂时没有这个字段所以先注释掉
      // this.getItemLabelOptions();
      // 获取商品品牌下拉框选项
      this.getItemBrandOptions();
      // 获取 商品规格 下拉选项
      // this.getListSpecTemplate();
    },

    /**
     * 获取商品分类下拉框选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategorySelectShow(this.$jsonFormat({
        "categoryType": 2
      }));
      console.log("商品分类选项: ", result);
      if (result.code === 200) {
        this.options.classOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品标签下拉框选项
     * @returns {Promise<void>}
     */
    async getItemLabelOptions() {
      const result = await listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 }, "labelType": 2 });
      console.log("商品标签: ", result);
      if (result.code === 200) {
        this.options.tagOptions = result.data.records;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品品牌下拉框选项
     * @returns {Promise<void>}
     */
    async getItemBrandOptions() {
      const result = await listItemBrand();
      if (result.code === 200) {
        this.options.brandOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取 商品规格 下拉选项
     */
    async getListSpecTemplate() {
      const result = await listSpecTemplate();
      console.log("获取 商品规格 下拉选项", result);
      if (result.code === 200) {
        this.options.specOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listPictureItem();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listPictureItem();
    },

    /**
     * 分页查询配置商品
     * @param clear 是否清空
     */
    listPictureItem() {
      this.tableLoading = true;
      const { displayNo, brandNo, classNo, itemName } = this.searchData;
      const postData = {
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size,
        "pictureNo": this.$route.query.pictureNo,
        "displayNo": displayNo,
        "brandNo": brandNo,
        "classNo": classNo,
        "itemName": itemName
      };
      listPictureItem(postData).then(res => {
        if (res.code === 200) {
          this.pagination.total = (res.data && res.data.total) || 0;
          this.form.productTableData = res.data.records;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },

    /**
     * 清空搜索条件
     */
    clear() {
      this.searchData = {
        ...this.searchData,
        // 名称
        "itemName": "",
        // 分类
        "classNo": "",
        // 规格
        "specNo": "",
        // 品牌
        "brandNo": "",
        // 标签
        "tagNo": ""
      };
      this.handleCurrentChange(1);
    }

  }

};
