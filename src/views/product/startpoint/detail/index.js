// /views/product/startpoint/detail/index
import { searchStartPointItemList, updateStartPoint, queryStartPointDetail } from "@/api/product/startPoint";
import { listItemCategory, listItemBrand, listSpecTemplate } from "@/api/product/manage";

export default {
  "name": "ActivityClassDetail",
  "components": {
  },
  data() {
    return {
      "form": {
        "startPointName": "起订分规则测试_001",
        "baseNumber": 100,
        "status": 0,
        "remark": "起订分测试"
      },
      "toolBar": {
        "itemName": "",
        "categoryNo": "",
        "specDetail": "",
        "brandNo": ""
      },
      "condition": {
        "category": [],
        "spec": [],
        "brand": []
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
      "dialogVisible": false,
      "btnLoading": false
    };
  },
  "computed": {
    startPointId() {
      return this.$store.state.productStartPoint.startPointId;
    },
    startPointNo() {
      return this.$store.state.productStartPoint.startPointNo;
    },
    needEdited() {
      return this.$store.state.productStartPoint.needEdited;
    }
  },
  mounted() {
    console.info(this.startPointNo);
    this.getStartPointDetail();
    this.listStartPointByPage();
    this.initPageOptions();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listStartPointByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStartPointByPage();
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
     * 查询起订分数据
     */
    getStartPointDetail() {
      const params = "startPointNo=" + this.startPointNo;
      queryStartPointDetail(params).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.form.created = this.formatTime(this.form.created);
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
      // this.form = {
      //   "startPointName": "起订分规则测试_001",
      //   "baseNumber": 100,
      //   "status": 0,
      //   "remark": "起订分测试",
      //   "createBy": "内部使用总部",
      //   "created": "2021-02-25 15:52:56",
      //   "id": 29
      // };
    },

    /**
     * 分页查询分类列表
     */
    listStartPointByPage() {
      this.tableLoading = true;
      // 请求参数
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size +
        "&startPointNo=" + this.startPointNo;
      // 商品名称
      if (this.toolBar.itemName) {
        param = param + "&itemName=" + this.toolBar.itemName;
      }
      // 商品品类
      if (this.toolBar.categoryNo) {
        param = param + "&categoryNo=" + this.toolBar.categoryNo;
      }
      // 商品规格
      if (this.toolBar.specDetail) {
        param = param + "&specDetail=" + this.toolBar.specDetail;
      }
      // 商品品牌
      if (this.toolBar.brandNo) {
        param = param + "&brandNo=" + this.toolBar.brandNo;
      }
      searchStartPointItemList(param).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 搜索按钮
     */
    searchStartPoint() {
      this.pagination.current = 1;
      this.listStartPointByPage();
    },

    /**
     * 重置活动查询条件
     */
    resetStartPoint() {
      this.toolBar = {
        "itemName": "",
        "categoryNo": "",
        "specDetail": "",
        "brandNo": ""
      };
      this.listStartPointByPage();
    },

    /**
     * 初始化所有下拉框
     * @returns {Promise<void>}
     */
    async initPageOptions() {
      await this.getItemCategoryOptions();
      await this.getItemBrandOptions();
      await this.getSpecTemplateOptions();
    },

    /**
     * 获取商品分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategory(this.$jsonFormat({
        "categoryType": "2",
        "keyword": ""
      }));
      if (result.code === 200) {
        this.condition.category = result.data;
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
        this.condition.brand = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },

    /**
     * 获取商品规格下拉框选项
     * @returns {Promise<void>}
     */
    async getSpecTemplateOptions() {
      const result = await listSpecTemplate();
      if (result.code === 200) {
        this.condition.spec = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },

    /**
     * 保存起订分修改
     */
    saveStartPointUpdate() {
      const params = {
        ...this.form,
        "startPointNo": this.startPointNo,
        "id": this.startPointId
      };
      updateStartPoint(params).then(res => {
        this.$message.info(res.msg);
        this.$router.back();
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    }
  }
};