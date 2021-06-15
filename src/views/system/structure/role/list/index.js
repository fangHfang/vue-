import { pageSearchRole, roleDisable, roleEnable, createRole, updateRole } from "@/api/system/account/role";
import roleAdd from "@/views/system/structure/role/add/index.vue";
export default {
  "name": "SystemStructureRoleList",
  "components": {
    roleAdd
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
        },
        "appType": {
          "value": "",
          "options": [
            { "label": "总部", "value": 0 },
            { "label": "经销商", "value": 1 },
            { "label": "门店", "value": 2 }

          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400,
        "pages": 40
      },
      "dialogVisible": false,
      "multipleSelection": [],
      "tableLoading": true,
      "roleNo": "",
      "mark": "add",
      "btnLoading": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 分页查询角色管理列表
    this.listRoleByPage();
  },
  "methods": {

    searchList() {
      this.pagination.current = 1;
      this.listRoleByPage();
    },

    /**
     * 分页查询角色管理列表
     */
    listRoleByPage() {
      this.tableLoading = true;
      const params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size +
       "&name=" + this.toolBar.name + "&status=" + this.toolBar.class.value + "&appType=" + this.toolBar.appType.value;
      pageSearchRole(params).then(res => {
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
     * 获取勾选的角色行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 角色禁用
     */
    roleDisableData() {
      if (!this.multipleSelection || this.multipleSelection.length === 0) {
        this.$message({
          "type": "info",
          "message": "请先勾选要禁用的角色"
        });
        return;
      }
      // 循环禁用角色
      this.multipleSelection.forEach(element => {
        const data = {
          "roleNo": element.roleNo
        };
        this.tableLoading = true;
        roleDisable(data).then(res => {
          if (res.code === 200) {
            this.tableLoading = false;
            // 查询角色管理列表
            this.listRoleByPage();
          } else {
            this.$message.error("禁用失败");
          }
        });
      });
      this.tableLoading = false;
    },

    /**
     * 角色启用
     */
    roleEnableData() {
      if (!this.multipleSelection || this.multipleSelection.length === 0) {
        this.$message({
          "type": "info",
          "message": "请先勾选要启用的角色"
        });
        return;
      }
      // 循环启用角色
      this.multipleSelection.forEach(element => {
        const data = {
          "roleNo": element.roleNo
        };
        this.tableLoading = true;
        roleEnable(data).then(res => {
          if (res.code === 200) {
            this.tableLoading = false;
            // 查询角色管理列表
            this.listRoleByPage();
          } else {
            this.$message.error("启用失败");
          }
        });
      });
      this.tableLoading = false;
    },

    /**
     * 启用单条
     */
    enableRole(roleNo) {
      const data = {
        "roleNo": roleNo
      };
      this.tableLoading = true;
      roleEnable(data).then(res => {
        if (res.code === 200) {
          // 查询角色管理列表
          this.listRoleByPage();
        } else {
          this.$message.error("启用失败");
        }
      });
    },

    /**
     * 禁用单条
     */
    disableRole(roleNo) {
      const data = {
        "roleNo": roleNo
      };
      this.tableLoading = true;
      roleDisable(data).then(res => {
        if (res.code === 200) {
          // 查询角色管理列表
          this.listRoleByPage();
        } else {
          this.$message.error("禁用失败");
        }
      });
    },

    /**
     * 角色新增
     */
    saveRoleData() {
      if (!this.$refs.roleAddRef.name) {
        this.$message({
          "type": "info",
          "message": "请先录入角色名称"
        });
        this.btnLoading = false;
        return;
      }
      // 选中的权限配置
      const resourceNos = this.$refs.roleAddRef.$refs.tree.getCheckedKeys();
      const data = {
        "appType": this.$refs.roleAddRef.toolBar.tag.value,
        "configurable": this.$refs.roleAddRef.configurable ? 0 : 1,
        "name": this.$refs.roleAddRef.name,
        "remarks": this.$refs.roleAddRef.remark,
        "roleNo": this.$refs.roleAddRef.editRoleNo,
        "resourceNos": resourceNos
      };
      createRole(data).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          // 查询角色管理列表
          this.btnLoading = false;
          this.listRoleByPage();
        } else {
          this.$message.error("保存失败");
          this.btnLoading = false;
        }
      }).catch(res => {
        this.btnLoading = false;
      });
      this.dialogVisible = false;
    },

    /**
     * 角色编辑
     */
    edit(roleNo, status) {
      // if (status === 0) {
      //   return this.$message.info("启用状态无法编辑，请先停用!!!");
      // }
      this.roleNo = roleNo;
      this.mark = "edit";
      this.dialogVisible = true;
    },

    /**
     * 角色新增
     */
    addRole() {
      this.roleNo = "";
      if (this.$refs.roleAddRef) {
        this.$refs.roleAddRef.name = "";
        this.$refs.roleAddRef.remark = "";
        this.$refs.roleAddRef.toolBar.tag.value = "";
        this.$refs.roleAddRef.$refs.tree.setCheckedKeys([]);
      }
      this.mark = "add";
      this.dialogVisible = true;
    },

    /**
     * 确认保存角色
     */
    editConfirmRole() {
      if (this.roleNo) {
        // 修改角色
        this.updateRoleData();
      } else {
        // 新增角色
        this.saveRoleData();
      }
    },

    /**
     * 角色修改
     */
    updateRoleData() {
      if (!this.$refs.roleAddRef.editRoleNo) {
        this.$message({
          "type": "info",
          "message": "角色编号不能为空"
        });
        this.btnLoading = false;
        return;
      }
      if (!this.$refs.roleAddRef.name) {
        this.$message({
          "type": "info",
          "message": "角色名称不能为空"
        });
        this.btnLoading = false;
        return;
      }
      // 选中的权限配置
      const resourceNos = this.$refs.roleAddRef.$refs.tree.getCheckedKeys();
      const data = {
        "appType": this.$refs.roleAddRef.toolBar.tag.value,
        "configurable": this.$refs.roleAddRef.configurable ? 0 : 1,
        "name": this.$refs.roleAddRef.name,
        "remarks": this.$refs.roleAddRef.remark,
        "roleNo": this.$refs.roleAddRef.editRoleNo,
        "resourceNos": resourceNos
      };
      updateRole(data).then(res => {
        if (res.code === 200) {
          // 清空角色编号-用于弹框监听
          this.$message.success("修改成功");
          this.btnLoading = false;
          // 查询角色管理列表
          this.listRoleByPage();
        } else {
          this.$message.error("修改失败");
          this.btnLoading = false;
        }
      });
      // 关闭弹出框
      this.dialogVisible = false;
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listRoleByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRoleByPage();
    },

    /**
     * 起订分数量
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     */
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === "角色名称") {
        // 修改的样式
        return "color: #ED6D00";
      }
      return "";
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
        .catch(_ => { });
    }
  }
};