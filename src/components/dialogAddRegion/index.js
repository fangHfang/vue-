import { pageSearchRegionList } from "@/api/system/area/area";

export default {
  "name": "dialogAddRegion",
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
    },
    "itemNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "multipleSelection": [],
      "tableLoading": false,
      "toolBar": {
        "name": "",
        "class": {
          "value": 1,
          "options": [
            { "label": "启用", "value": 1 },
            { "label": "关闭", "value": 0 }
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
      "btnLoading": false
    };
  },
  "watch": {
    "dialogVisible": {
      "handler"(val) {
        if (val) {
          this.btnLoading = false;
          this.multipleSelection = [];
          this.listTableData();
        }
      },
      "immediate": true
    }
  },
  mounted() {
    // 初始化查询方法
    // this.listTableData();
  },
  "methods": {
    /**
     * 查询
     */
    searchData() {
      this.pagination.current = 1;
      this.listTableData();
    },
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 分页查询数据
     */
    listTableData() {
      const postData = {
        "name": this.toolBar.name,
        "status": this.toolBar.class.value,
        "request": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      pageSearchRegionList(postData).then((res) => {
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
     * 重置数据
     */
    reset() {
      this.toolBar.class.value = "";
      this.toolBar.name = "";
      this.pagination.current = 1;
      this.listTableData();
    },
    /**
     * 获取选中数据
     */
    handleAdd() {
      let selectList = JSON.parse(JSON.stringify(this.multipleSelection));
      if (selectList.length === 0) {
        this.btnLoading = false;
        return this.$message.info("请至少选择一条数据");
      }
      if (this.toolBar.price) {
        selectList = selectList.map((item) => {
          return {
            ...item,
            "adjustPrice": Number(this.toolBar.price)
          };
        });
      }
      this.btnLoading = false;
      this.$emit("selectData", selectList);
      // 配置门店权限使用禁止直接改变弹框状态
      if (this.mark !== "activitySetStore" && this.mark !== "itemUpShelf") {
        this.btnLoading = false;
        this.$emit("update:dialogVisible", false);
      }
    },
    closeBtnLoading() {
      this.btnLoading = false;
    },
    /**
     * 保存一条价格数据
     */
    saveOneDealerPrice(row) {
      this.btnLoading = true;
      this.$emit("selectData", [ row ], "oneRow");
    },
    change() {
      this.$forceUpdate();
    }
  }
};