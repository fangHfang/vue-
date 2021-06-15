// src/views/downstream/dealer/account/role/index
import { pageSearchRole } from "@/api/system/account/role";
export default {
  "name": "dealerAccountManageConfig",
  "components": {
  },
  "props": {
    "roles": {
      "type": Array,
      "default": () => []
    }
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "启用", "value": 0 },
            { "label": "关闭", "value": 1 }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {},
  mounted() {
    // 分页查询角色管理列表
    this.getRemoteTableData();
  },
  "methods": {
    searchRoleListByPage() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 分页查询角色管理列表
     */
    getRemoteTableData() {
      const that = this;
      this.tableLoading = true;
      const params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&name=" + this.toolBar.name +
       "&status=" + this.toolBar.class.value + "&appType=" + 1;
      pageSearchRole(params).then(res => {
        if (res.code === 200) {
          that.tableData = res.data.records;
          that.pagination.total = (res.data && res.data.total) || 0;
          that.tableLoading = false;
          if (that.roles && that.roles.length > 0) {
            that.$nextTick(() => {
              that.tableData.forEach((element) => {
                if (that.roles.indexOf(element.roleNo) >= 0) {
                  that.$refs.multipleRoleTable.toggleRowSelection(element);
                }
              });
            });
          }
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getRemoteTableData();
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 点击确定方法
     */
    confirmSelection() {
      this.$emit("confirmRolesFnc", this.multipleSelection);
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
    }
  }
};