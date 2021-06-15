import { pageSearchWindowList, pictureDisplayCreate, enableWindowPicture, disableWindowPicture, pictureDisplayModify } from "@/api/system/app/window";
export default {
  "name": "AppPageWindowList",
  "components": {
  },
  data() {
    return {
      "display": true,
      "multipleSelection": [],
      "tableLoading": false,
      "toolBar": {
        "pageType": 3,
        "name": "",
        "status": {
          "value": "",
          "options": [
            { "label": "下架", "value": "0" },
            { "label": "上架", "value": "1" }
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
      "form": {
        "name": "",
        "priorityLevel": 1
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入橱窗名称", "trigger": "blur" },
          { "min": 3, "max": 20, "message": "长度在 3 到 20 个字符", "trigger": "blur" }
        ],
        "priorityLevel": [
          { "required": true, "message": "请输入优先级", "trigger": "blur" }
        ]
      },
      "dialogaddVisible": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.searchDataPage();
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listWindowByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listWindowByPage();
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listWindowByPage();
    },
    // 删除弹窗
    delClick() {
      this.$confirm("是否确定要删除所选择门店", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.$message({
          "type": "success",
          "message": "删除成功!"
        });
      }).catch(() => {
        this.$message({
          "type": "info",
          "message": "已取消删除"
        });
      });
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
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },

    /** 关闭新增弹窗 */
    addHandleClose(down) {
      console.log("关闭弹窗", down);
      this.form.name = "";
      this.form.priorityLevel = 1;
      this.form.pictureNo = "";
      this.display = true;
      // down ? down() : (this.dialogaddVisible = false);
    },
    /** 修改 */
    edit(pictureNo, name) {
      // 确认编辑-跳转到编辑页面
      this.$router.push({ "name": "windowAdd", "query": { "name": name, "pictureNo": pictureNo } });
    },
    /**
     * 新增
     */
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogaddVisible = false;
          const postData = {
            ...this.form
          };
          pictureDisplayCreate(postData).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.form.name = "";
              this.form.priorityLevel = 1;
              this.$router.push({ "name": "windowAdd", "query": { "name": postData.name, "pictureNo": res.data } });
            } else {
              this.$message.error(res.msg);
            }
          }).catch((error) => {
            console.info(error);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 编辑橱窗名称
     */
    submitEditForm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        const params = {
          "name": this.form.name,
          "pictureNo": this.form.pictureNo,
          "priorityLevel": this.form.priorityLevel
        };
        console.log("params", params);
        pictureDisplayModify(params).then(res => {
          this.dialogaddVisible = false;
          this.$message.success(res.msg);
          this.listWindowByPage();
        }).catch(this.$message.error);
      });
    },
    /**
     * 跳转门店权限配置
     * @param row
     */
    toStore(row) {
      this.$router.push({ "path": "/system/app/store/list/" + row.pictureNo, "query": { "mark": "window" } });
    },
    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listWindowByPage() {
      this.tableLoading = true;
      const params = {
        ...this.toolBar,
        "status": this.toolBar.status.value,
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size
      };
      const totalIndex = this.pagination.size * (this.pagination.current - 1) + 1;
      pageSearchWindowList(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element, index) => {
            element.index = totalIndex + index;
          });
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
     * 启用
     */
    enableWindowFunc(row) {
      const params = {
        "pictureNo": row.pictureNo,
        "name": row.name
      };
      enableWindowPicture(params).then(res => {
        this.listWindowByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 禁用
     */
    disableWindowFunc(row) {
      const params = {
        "pictureNo": row.pictureNo,
        "name": row.name
      };
      disableWindowPicture(params).then(res => {
        this.listWindowByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 启用
     */
    enableWindowMulti() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行启用操作");
        return;
      }
      this.tableLoading = true;
      const row = multipleSelection[0];
      const params = {
        "pictureNo": row.pictureNo,
        "name": row.name
      };
      enableWindowPicture(params).then(res => {
        this.listWindowByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 禁用
     */
    disableWindowMulti() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行禁用操作");
        return;
      }
      this.tableLoading = true;
      const row = multipleSelection[0];
      const params = {
        "pictureNo": row.pictureNo,
        "name": row.name
      };
      disableWindowPicture(params).then(res => {
        this.listWindowByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },
    /**
     * 编辑橱窗名称
     */
    handleEditName(row) {
      console.log("row", row);
      this.dialogaddVisible = true;
      this.display = false;
      this.form.name = row.name;
      this.form.priorityLevel = row.priorityLevel;
      this.form.pictureNo = row.pictureNo;
    }
  }
};