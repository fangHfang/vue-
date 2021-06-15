// /views/product/activity/class/detail/index
import { promotionCategoryDetail } from "@/api/product/activity/class";
import { pageSearchPromotion } from "@/api/product/activity/promotion";
export default {
  "name": "ActivityClassDetail",
  "components": {
  },
  data() {
    return {
      "form": {
        "categoryName": "",
        "categoryType": "",
        "status": 1,
        "remark": "",
        "iconUrl": ""
      },
      "toolBar": {
        "promotionName": "",
        "promotionRule": "",
        // 活动类型(0:秒杀活动,1:限时抢购活动,2:商品组合活动)
        "categoryType": {
          "value": "",
          "options": [
            { "label": "秒杀活动", "value": 0 },
            { "label": "限时抢购活动", "value": 1 },
            { "label": "商品组合活动", "value": 2 }
          ]
        },
        // 活动状态(0:未开始,1:进行中,2:已结束)
        "promotionStatus": {
          "value": "",
          "options": [
            { "label": "未开始", "value": 0 },
            { "label": "进行中", "value": 1 },
            { "label": "已结束", "value": 2 }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableDetailShow": true,
      "tableLoading": false,
      "dialogVisible": false
    };
  },
  "computed": {
    categoryNo() {
      return this.$store.state.activityClass.categoryNo;
    }
  },
  mounted() {
    this.getCategoryDetail();
    this.listSearchPromotionByPage();
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
     * 控制表格显示
     */
    tableFontClick() {
      this.tableDetailShow = !this.tableDetailShow;
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
     * 查询用户数据
     */
    getCategoryDetail() {
      this.tableLoading = true;
      const params = "categoryNo=" + this.categoryNo;
      promotionCategoryDetail(params).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.form.created = this.formatTime(this.form.created);
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
     * 分页查询分类列表
     */
    listSearchPromotionByPage() {
      const that = this;
      const indexBegin = this.pagination.size * (this.pagination.current - 1);
      this.tableLoading = true;
      // 请求参数
      let param = "?page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&categoryNo=" + this.categoryNo;
      // 活动名称
      if (this.toolBar.promotionName) {
        param = param + "&promotionName=" + this.toolBar.promotionName;
      }
      // 活动规则名称
      if (this.toolBar.promotionRule) {
        param = param + "&promotionRule=" + this.toolBar.promotionRule;
      }
      // 活动状态(0:终止,1:启用)
      if (this.toolBar.promotionStatus.value !== "") {
        param = param + "&promotionStatus=" + this.toolBar.promotionStatus.value;
      }
      param += "&page.field=created&page.order=desc";
      pageSearchPromotion(param).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element, i) => {
            element.index = indexBegin + i + 1;
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
     * 重置活动查询条件
     */
    resetPromotionSearchCondition() {
      this.toolBar.promotionName = "";
      this.toolBar.promotionRule = "";
      this.toolBar.promotionStatus.value = "";
      this.listSearchPromotionByPage();
    }
  }
};