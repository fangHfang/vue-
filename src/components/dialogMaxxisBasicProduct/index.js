import { listQueryNewestProductByPage } from "@/api/system/base/product";
import { searchStoreLevelList } from "@/api/downstream/store/info";
export default {
  "name": "dialogMaxxisBasicProduct",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "mark": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "natureAllList": [],
      "selectNature": [],
      // 返利数值
      "rebateValue": "",
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      // 初始化查询条件
      "searchData": {
        // 成品代号
        "productCode": "",
        // 规格
        "spec": "",
        // 英寸
        "size": "",
        // 同类花纹
        "similarTread": "",
        // 胎侧标志
        "blackWhiteLine": "",
        // 品牌
        "brandName": "",
        // 载重
        "carryingCapacity": "",
        // 搜索字段
        "searchField": "",
        "pageNum": 1,
        "pageSize": 10
      },
      "total": 0,
      // 选中数据
      "multipleSelection": "",
      // 产品编号对应成品代号弹窗 所用到的查询条件
      "dialogProductNoVisible": false,
      "productNo": "",
      "tableLoading": false,
      "btnLoading": false
    };
  },
  "watch": {
    "dialogVisible": {
      "handler"(val) {
        if (val) {
          this.btnLoading = false;
        }
      },
      "immediate": true
    }
  },
  mounted() {
    // 初始化分查询
    this.tableProductList();
    // 添加门店性质
    this.initSearchStoreLevelList();
  },
  "methods": {
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.tableProductList();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.tableProductList();
    },

    /**
     * 查询
     * @param {} done
     */
    search() {
      this.searchData.pageNum = 1;
      this.tableProductList();
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 分页查询列表
     */
    tableProductList() {
      this.tableLoading = true;
      listQueryNewestProductByPage(this.$jsonFormat(this.searchData)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error("查询失败,请稍后重试");
        }
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 获取选中数据
     */
    selectData() {
      this.btnLoading = true;
      if (this.multipleSelection.length === 0) {
        this.$message.info("请选择产品！");
        this.btnLoading = false;
        return;
      }
      if (this.mark === "runEase") {
        this.$emit("productCode", this.multipleSelection);
        this.btnLoading = false;
        return;
      }
      if (this.selectNature.length === 0) {
        this.$message.info("请选择门店性质！");
        this.btnLoading = false;
        return;
      }
      const returnArray = [];
      this.selectNature.map((nature) => {
        this.multipleSelection.forEach(element => {
          returnArray.push({
            ...element,
            "rebateValue": this.rebateValue ? this.rebateValue : 0,
            "storeLevelNo": nature
          });
        });
      });
      this.$emit("productCode", returnArray);
      if (this.mark !== "rebateRule") {
        this.$emit("update:dialogVisible", false);
        this.multipleSelection = [];
      }
    },
    /**
     * 多选数据事件
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 移除门店性质
     * @param tag
     * @param i
     */
    handleTagClose(tag, i) {
      this.selectNature.splice(i, 1);
    },

    /**
     * 查询门店等级
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.natureAllList = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.form.levels.options = [];
      });
    },

    /**
     * 打开产品编号对应成品代号弹窗
     */
    openProductCodeByNoDialog(productNo) {
      this.productNo = productNo;
      this.dialogProductNoVisible = true;
    }
  }
};