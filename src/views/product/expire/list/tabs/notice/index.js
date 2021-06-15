import { integralPageNotify, integralNotifyAgain } from "@/api/product/integral/store";
import dialogNotice from "@/components/dialogNotice/index.vue";

export default {
  "name": "ProductExpireList",
  "components": {
    dialogNotice
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        "storeName": "",
        "type": {
          "value": "",
          "options": [
            { "label": "积分", "value": "1" },
            { "label": "返利", "value": "2" }
          ]
        },
        "searchTime": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": [],
      "notifyNo": ""
    };
  },
  mounted() {
    this.listIntegralNotifyByPage();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listIntegralNotifyByPage();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listIntegralNotifyByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listIntegralNotifyByPage();
    },

    /**
     * 分页查询积分清零记录分页列表
     */
    listIntegralNotifyByPage() {
      this.tableLoading = true;
      // 通知类型，1积分，当前页面为积分通知页面
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&type=1";
      if (this.toolBar.customerNo) {
        params += "&customerNo=" + this.toolBar.customerNo;
      }
      // 过期时间
      if (this.toolBar.searchTime) {
        params = params + "&beginTime=" + this.toolBar.searchTime[0] + "&endTime=" + this.toolBar.searchTime[1];
      }
      integralPageNotify(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
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
     * 重置按钮
     */
    resetNotifyByPage() {
      this.toolBar.customerNo = "";
      this.$refs.store.cleanStore();
      this.toolBar.searchTime = "";
      this.pagination.current = 1;
      this.listIntegralNotifyByPage();
    },

    /**
     * 再次通知
     */
    noticeAgain(notifyNo) {
      this.$confirm("确认再次发起通知吗？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "success"
      }).then(() => {
        const params = {
          "notifyNo": notifyNo
        };
        integralNotifyAgain(params).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          this.$message.error(error);
        });
      }).catch(() => {
      });
    },
    /**
     * 跳转通知记录详情
     */
    noticeDetail(row) {
      this.$store.commit("productExpireListDetail/productExpireListDetailSet", {
        "notifyNo": row.notifyNo,
        "created": row.created,
        "createBy": row.createBy
      });
      this.$router.push({ "path": "/product/expire/detail" });
    },

    storeChange(val) {
      this.toolBar.customerNo = val;
    }
  }
};