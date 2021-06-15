import ruleRange from "../rule/index.vue";
import { MARKET_URL } from "@/utils/system-constant";
import {
  pageAxpProductRelation,
  removeAxpProductRelation,
  createAxpProductRelation,
  listAxpRule,
  detailAxpRule,
  createAxpRule
} from "@/api/business/reassure/order";
export default {
  "name": "reassureRangeList",
  "components": {
    ruleRange
  },
  data() {
    return {
      "toolBar": {
        "productCode": "",
        "specDetail": "",
        "brandCode": "",
        "size": "",
        "tread": ""
      },
      "ruleData": [],
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "maxxisAddProductVisible": false,
      "tableLoading": false,
      "multipleSelection": [],
      "dialogRuleVisible": false,
      "ruleRange": {},
      "ruleTitle": "",
      "exportUrl": MARKET_URL + "/admin/axpProductRelation/export",
      "importUrl": MARKET_URL + "/admin/itRule/import",
      "templateUrl": "https://maxxisprodsa.blob.core.chinacloudapi.cn/microcloud-mall/upload/template/积分规则导入模板.xlsx"

    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      let param = "?page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      const activity = this.toolBar;
      // 产品编号
      if (activity.productCode) {
        param = param + "&productCode=" + activity.productCode;
      }
      // 产品规格
      if (activity.specDetail) {
        param = param + "&specDetail=" + encodeURIComponent(activity.specDetail);
      }
      // 产品品牌
      if (activity.brandCode) {
        param = param + "&brandCode=" + activity.brandCode;
      }
      // 产品尺寸
      if (activity.size) {
        param = param + "&size=" + activity.size;
      }
      // 产品胎纹
      if (activity.tread) {
        param = param + "&tread=" + activity.tread;
      }
      return param;
    }
  },
  mounted() {
    this.listRemoteDataByPage();
    this.listRuleData();
  },
  "methods": {

    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listRemoteDataByPage();
    },
    /**
     * 重置
     */
    resetTableData() {
      this.toolBar = {
        "productCode": "",
        "specDetail": "",
        "brandCode": "",
        "size": "",
        "tread": ""
      };
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.listRemoteDataByPage();
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listRemoteDataByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRemoteDataByPage();
    },

    /**
     * 分页查询列表数据
     */
    listRemoteDataByPage() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "productCode": this.toolBar.productCode,
        "specDetail": this.toolBar.specDetail,
        "brandCode": this.toolBar.brandCode,
        "size": this.toolBar.size,
        "tread": this.toolBar.tread
      };
      this.tableLoading = true;
      pageAxpProductRelation(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 添加安心跑
     */
    addRunEase() {
      if (this.ruleData.length < 1) {
        return this.$message.info("请先添加安心跑获利规则");
      }
      this.maxxisAddProductVisible = true;
    },
    /**
     * 批量删除
     */
    deleteBatch() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选数据?", "删除", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "productNo": this.multipleSelection.map(x => x.productNo)
        };
        removeAxpProductRelation(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.listRemoteDataByPage();
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(() => {});
    },
    /**
     * 删除一条
     * @param row
     */
    deleteOne(row) {
      this.$confirm("是否确定要删除所选数据?", "删除", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "productNo": [ row.productNo ]
        };
        removeAxpProductRelation(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.listRemoteDataByPage();
          } else {
            this.$message.error("删除失败");
          }
        });
      }).catch(() => {});
    },
    /**
     * 获取选择的产品
     * @param list
     */
    getProductCode(list) {
      const axpProductInfos = list.map(x => {
        return {
          "brandCode": x.brandCode,
          "brandName": x.brandName,
          "productCode": x.productCode,
          "productNo": x.productNo,
          "similarTread": x.similarTread,
          "size": x.size,
          "spec": x.spec,
          "specDetail": x.specDetail,
          "tread": x.tread
        };
      });
      const params = {
        axpProductInfos,
        "axpRuleNo": this.ruleData[0].ruleNo
      };
      createAxpProductRelation(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.maxxisAddProductVisible = false;
          this.listRemoteDataByPage();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
       * 选择规则
       * @param title
       */
    selectRule() {
      this.dialogRuleVisible = true;
    },
    /**
     * 获取选择的规则
     * @param val
     */
    getSelectRule(val) {
      createAxpRule(val).then((res) => {
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.dialogRuleVisible = false;
          this.listRuleData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 获取规则列表
     */
    listRuleData() {
      listAxpRule().then(res => {
        if (res.code === 200) {
          this.ruleData = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};