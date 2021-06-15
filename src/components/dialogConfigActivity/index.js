import { pageSearchPromotion } from "@/api/product/activity/promotion";
export default {
  "name": "dialogConfigActivity",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.listConfigActivityByPage();
        }
      },
      "immediate": true
    }
  },
  data() {
    return {
      "searchData": {
        "page.pageNum": 1,
        "page.pageSize": 10,
        "promotionName": "",
        // 活动类别
        "categoryType": 0,
        // 销售状态(0:下架,1:上架)
        "saleStatus": 1
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false
    };
  },
  "methods": {
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.searchData["page.pageSize"] = val;
      this.listConfigActivityByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData["page.pageNum"] = val;
      this.listConfigActivityByPage();
    },

    /**
     * 查询
     */
    search() {
      this.searchData["page.pageNum"] = 1;
      this.listConfigActivityByPage();
    },

    /**
     * 切换活动类型
     */
    categoryTypeChange() {
      this.listConfigActivityByPage();
    },

    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 根据类型分页查询活动
     * 活动类型(0:秒杀活动,1:限时抢购活动,2:商品组合活动)
     */
    listConfigActivityByPage() {
      const that = this;
      this.tableLoading = true;
      const postData = JSON.parse(JSON.stringify(this.searchData));
      if (postData.name) {
        postData.promotionName = postData.name;
        postData.promotionNo = postData.name;
      }
      const payload = this.$jsonFormat(postData);
      pageSearchPromotion(payload).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element, i) => {
            element.created = that.formatTime(element.created);
          });
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },

    /**
     * 行双击事件
     */
    rowDblclick(row, column, event) {
      this.getSelectInfo(row);
    },

    /**
     * 复制链接
     */
    getSelectInfo(row) {
      const { promotionNo, promotionName, categoryType } = row;
      let text = "";
      switch (categoryType) {
      // 秒杀活动
      case 0:
        text = "/pages/deadline/seckill/detail/seckill-detail";
        break;
        // 限时抢购活动
      case 1:
        text = "/pages/deadline/seckill/other-detail/snap-up-detail";
        break;
        // 商品分组活动
      case 2:
        text = "/pages/deadline/seckill/combination/combination-detail";
        break;
      default:
        text = "/pages/deadline/seckill/detail/seckill-detail";
        break;
      }
      text += "?promotionNo=" + promotionNo + "&name=" + promotionName;
      const data = {
        "url": text,
        "no": promotionNo,
        "name": promotionName,
        "type": categoryType
      };
      this.$emit("setSelectInfo", data);
      this.handleClose();
    }
  }
};