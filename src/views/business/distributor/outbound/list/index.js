import { listInboundByPage } from "@/api/business/distributor/inbound";
import { pageSearchDealerList } from "@/api/downstream/dealer/info";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "businessDistributorOutbound",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "customerNo": {
          "value": "",
          "options": [
            { "label": "经销商1", "value": "1" },
            { "label": "经销商2", "value": "2" },
            { "label": "经销商3", "value": "3" }
          ]
        },
        "dataRange": "",
        "bizNo": "",
        "operatingNo": ""
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "operatingTypeList": {
        "1001": "盘点入库",
        "1003": "手动入库",
        "1004": "自动入库",
        "1005": "扫码入库",
        "2001": "订单出库",
        "2002": "盘点出库",
        "2003": "手动出库",
        "2005": "扫码出库",
        "2006": "退单出库"

      },
      "exportUrl": ITEM_URL + "/admin/stockInfo/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportPostData() {
      const params = {
        "customerNo": this.toolBar.customerNo.value
      };
      return {
        ...params
      };
    }
  },
  mounted() {
    this.listOutboundByPage();
    this.getDistributor();
  },
  "methods": {

    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listOutboundByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listOutboundByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listOutboundByPage();
    },
    /**
     * 打开详情
     */
    toDetail(index) {
      this.$router.push({ "name": "businessDistributorOutboundDetail", "query": { "selectedStock": this.tableData[index] } });
      this.listOutboundByPage();
    },
    /**
     * 新增 手动入库
     */
    newAdd() {
      this.$router.push({ "path": "/business/distributor/outbound/add" });
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listOutboundByPage() {
      const params = {
        "customerNo": this.toolBar.customerNo.value,
        "bizNo": this.toolBar.bizNo,
        "operatingNo": this.toolBar.operatingNo,
        "stockOperatingType": "OUT",
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      if (this.toolBar.dataRange.length > 0) {
        params.startTime = this.$moment(this.toolBar.dataRange[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endTime = this.$moment(this.toolBar.dataRange[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      this.tableLoading = true;
      listInboundByPage(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.tableLoading = false;
        console.info(error);
      });
    },
    /**
     * 查询经销商
     */
    getDistributor() {
      const params = {
        "page.pageNum": 1,
        "page.pageSize": 5000
      };
      const postData = this.$jsonFormat(params);
      pageSearchDealerList(postData).then(res => {
        if (res.code === 200) {
          this.toolBar.customerNo.options = res.data.records.map(x => {
            return {
              "label": x.name,
              "value": x.dealerNo
            };
          });
        } else {
          console.log("查询经销商失败");
        }
      });
    }
  }
};