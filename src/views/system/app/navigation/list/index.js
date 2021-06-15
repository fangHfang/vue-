// src/views/system/app/navigation/list/index
import { queryNavigationByPage, disableStateNavigation, enableStateNavigation, createNavigation, modifyNavigation } from "@/api/system/app/navigation";
export default {
  "name": "AppPageWindowList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "status": {
          "value": "",
          "options": [
            { "label": "下架", "value": "0" },
            { "label": "上架", "value": "1" }
          ]
        }
      },
      "tableData": [
        // {
        //   "name": "xxx名称",
        //   "linkType": "xxx分类",
        //   "creatPeople": "张三",
        //   "created": "2021-01-01 09:00",
        //   "status": 0,
        //   "desc": "备注信息..."
        // }, {
        //   "name": "xxx名称",
        //   "linkType": "xxx分类",
        //   "creatPeople": "张三",
        //   "created": "2021-01-01 09:00",
        //   "status": 1,
        //   "desc": "备注信息..."
        // }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "display": true,
      "form": {
        "name": "",
        "priorityLevel": 1
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入子导航名称", "trigger": "blur" },
          { "min": 2, "max": 50, "message": "长度在 2 到 50 个字符", "trigger": "blur" }
        ],
        "priorityLevel": [
          { "required": true, "message": "请输入优先级", "trigger": "blur" }
        ]
      },
      "dialogaddVisible": false,
      "tableLoading": false,
      "dialogVisible": false,
      "multipleSelection": []
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
      this.listNavigationByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listNavigationByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listNavigationByPage();
    },
    /**
     * 跳转门店权限配置
     * @param row
     */
    toStore(row) {
      this.$router.push({ "path": "/system/app/store/list/" + row.pictureNo, "query": { "mark": "navigation" } });
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
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 新增
     */
    add() {
      this.$router.push("/system/app/navigation/add");
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },
    // /**
    //  * 删除导航
    //  */
    // deleteNavigation() {
    //   const multipleSelection = this.multipleSelection;
    //   if (multipleSelection.length < 1) {
    //     this.$message.error("请选中一条数据进行删除!");
    //     return;
    //   }
    //   this.$confirm("是否确定删除？", "提示", {
    //     "confirmButtonText": "确定",
    //     "cancelButtonText": "取消",
    //     "title": "提示",
    //     "showClose": false,
    //     "type": "warning"
    //   })
    //     .then(() => {
    //       multipleSelection.forEach(element => {
    //         const params = {
    //           "pictureNo": element.pictureNo
    //         };
    //         deleteNavigation(params)
    //           .then(res => {
    //             this.listNavigationByPage();
    //           })
    //           .catch(error => {
    //             console.info(error);
    //             this.$message.error(error);
    //           });
    //       });
    //     }).catch(() => {
    //       this.$message({
    //         "type": "info",
    //         "message": "已取消"
    //       });
    //     });
    // },
    /**
     * 分页查询子导航数据
     */
    listNavigationByPage() {
      this.tableLoading = true;
      const params = {
        "name": this.toolBar.name,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "status": this.toolBar.status.value
      };
      const totalIndex = this.pagination.size * (this.pagination.current - 1) + 1;
      queryNavigationByPage(params).then(res => {
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
    /** 关闭新增弹窗 */
    addHandleClose() {
      this.form.name = "";
      this.form.priorityLevel = 1;
      this.dialogaddVisible = false;
      this.display = true;
    },
    /**
     * 新增
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogaddVisible = false;
          // 保存
          const params = {
            ...this.form
          };
          console.log("params", JSON.stringify(params));
          createNavigation(params)
            .then(res => {
              this.$message.success("新增成功");
              this.form.name = "";
              this.form.priorityLevel = 1;
              this.listNavigationByPage();
            })
            .catch(error => {
              console.info(error);
              this.$message.error(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 保存
          const params = {
            "name": this.form.name,
            "pictureNo": this.form.pictureNo,
            "priorityLevel": this.form.priorityLevel
          };
          console.log("params", JSON.stringify(params));
          modifyNavigation(params).then(res => {
            this.dialogaddVisible = false;
            this.$message.success("修改成功");
            this.form.name = "";
            this.display = true;
            this.listNavigationByPage();
          })
            .catch(error => {
              console.info(error);
              this.$message.error(error);
            });
          // this.$router.push("/system/app/navigation/add/" + this.form.name);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 跳转到修改子导航页面
     */
    editToNavigation(pictureNo) {
      this.$router.push("/system/app/navigation/add/" + pictureNo);
    },
    /**
     * 修改导航
     */
    editModify(item) {
      // console.log("item", item);
      this.display = false;
      this.dialogaddVisible = true;
      this.form.pictureNo = item.pictureNo;
      this.form.name = item.name;
      this.form.priorityLevel = item.priorityLevel;
    },
    /**
     * 下架子导航
     * @param pictureNo
     * @param name
     */
    disableStateNavigation(pictureNo, name) {
      this.$confirm("是否确定该操作", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      })
        .then(() => {
          const params = {
            "pictureNo": pictureNo,
            "name": name
          };
          disableStateNavigation(params)
            .then(res => {
              this.listNavigationByPage();
            })
            .catch(error => {
              console.info(error);
              this.$message.error(error);
              this.tableLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            "type": "info",
            "message": "已取消"
          });
        });
    },
    /**
     * 上架子导航
     * @param pictureNo
     * @param name
     */
    enableStateNavigation(pictureNo, name) {
      this.$confirm("是否确定该操作", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      })
        .then(() => {
          const params = {
            "pictureNo": pictureNo,
            "name": name
          };
          enableStateNavigation(params)
            .then(res => {
              this.listNavigationByPage();
            })
            .catch(error => {
              console.info(error);
              this.$message.error(error);
              this.tableLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            "type": "info",
            "message": "已取消"
          });
        });
    }
  }
};
