import { save, modify, searchList } from "@/api/business/news/app";

export default {
  "name": "businessNewsAPPAdd",
  "components": {
  },
  data() {
    return {
      "input": "",
      "time": "",
      "radio": "",
      "bannerForm":
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
        },
      "actions": [
        {
          "label": "配置活动",
          "value": 0
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
        },
        {
          "label": "活动类型",
          "value": 7
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
      "toolBar": {
        "title": "",
        "content": "",
        "time": "",
        "link": "",
        "createBy": "",
        "created": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "noticeNo": this.$route.query.noticeNo

    };
  },
  "computed": {},
  mounted() {
    if (this.noticeNo != null) {
      this.searchList();
    }
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        .catch(_ => {});
    },
    /**
     * 返回首页
     */
    returnList() {
      this.$router.push({ "path": "/business/news/APP/list", "query": { "r": this.$getRandomValue() } });
    },

    /**
     * 选择radio
     */
    checkedRadio(value) {
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
      this.toolBar.link = url;
      this.bannerForm.itemInfo.name = name;
      this.bannerForm.itemInfo.no = no;
      // 活动类型才有
      this.bannerForm.itemInfo.type = type;
    },

    /**
     * 保存
     */
    save() {
      if (this.radio === 6) {
        const linkStr = this.toolBar.link;
        const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (!reg.test(linkStr)) {
          return this.$message.warning("请输入正确的网页链接！");
        }
      }
      const postData = {
        "jumpType": this.radio,
        "pushPlatform": 2,
        "jumpUrl": this.toolBar.link,
        "noticeContent": this.toolBar.content,
        "title": this.toolBar.title
      };
      if (this.time) {
        postData.pushTime = this.$moment(this.time).format("yyyy-MM-DD HH:mm:ss");
      }
      if (this.noticeNo === undefined) {
        save(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              "type": "success",
              "message": "保存成功!"
            });
            this.returnList();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      } else {
        postData.noticeNo = this.noticeNo;
        modify(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              "type": "success",
              "message": "保存成功!"
            });
            this.returnList();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      }
    },

    /**
     * 查询详情
     */

    searchList() {
      searchList(this.noticeNo).then(res => {
        if (res.code === 200) {
          this.toolBar.content = res.data.noticeContent;
          this.time = res.data.pushTime;
          this.toolBar.title = res.data.title;
          this.toolBar.link = res.data.jumpUrl;
          this.radio = res.data.jumpType;
          this.toolBar.createBy = res.data.createBy;
          this.toolBar.created = res.data.created;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    }

  }
};