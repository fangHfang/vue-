import { queryAdvertisementByPage, enableAdvertisement, disableAdvertisement, modifyAdvertisement, createAdvertisement } from "@/api/system/app/advertisement";
export default {
  "name": "advertisementList",
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
        //   "id": "1",
        //   "name": "XXX分类",
        //   "number": "3",
        //   "date": "2020-11-12 13:21:12",
        //   "prople": "张三",
        //   "status": "1",
        //   "remarks": "备注"
        // },
        // {
        //   "id": "2",
        //   "name": "XXX分类",
        //   "number": "5",
        //   "date": "2020-11-12 13:21:12",
        //   "prople": "张三丰",
        //   "status": "0",
        //   "remarks": "备注"
        // }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "form": {
        "name": "",
        "pictureNo": "",
        "priorityLevel": 1
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入广告位名称", "trigger": "blur" },
          { "min": 2, "max": 50, "message": "长度在 2 到 50 个字符", "trigger": "blur" }
        ]
      },
      "display": true,
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
      this.listAdvertisementByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listAdvertisementByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listAdvertisementByPage();
    },
    /**
     * 跳转门店权限配置
     * @param row
     */
    toStore(row) {
      this.$router.push({ "path": "/system/app/store/list/" + row.pictureNo, "query": { "mark": "advertisement" } });
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 分页查询广告页
     */
    listAdvertisementByPage() {
      const that = this;
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
      queryAdvertisementByPage(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element, index) => {
            element.index = totalIndex + index;
            element.created = that.formatTime(element.created);
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
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },
    // /**
    //  * 删除广告位名称
    //  */
    // deleteAdvertisement() {
    //   const multipleSelection = this.multipleSelection;
    //   if (multipleSelection.length < 1) {
    //     this.$message.error("请选中一条数据!");
    //     return;
    //   }
    //   this.$confirm("是否确定删除？", "提示", {
    //     "confirmButtonText": "确定",
    //     "cancelButtonText": "取消",
    //     "title": "提示",
    //     "showClose": false,
    //     "type": "warning"
    //   }).then(() => {
    //     multipleSelection.forEach(element => {
    //       const params = {
    //         "pictureNo": element.pictureNo
    //       };
    //       deleteAdvertisement(params).then(res => {
    //         this.listAdvertisementByPage();
    //       }).catch(error => {
    //         console.info(error);
    //         this.$message.error(error);
    //       });
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       "type": "info",
    //       "message": "已取消"
    //     });
    //   });
    // },

    /**
     * 修改导航
     */
    editModify(row) {
      const { pictureNo, name, priorityLevel } = row;
      this.display = false;
      this.form = {
        pictureNo,
        name,
        priorityLevel
      };
      this.dialogaddVisible = true;
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
          createAdvertisement(params)
            .then(res => {
              this.$message.success("新增成功");
              this.form.name = "";
              this.form.pictureNo = "";
              this.form.priorityLevel = 1;
              this.listAdvertisementByPage();
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
    /**
     * 修改广告位名称
     */
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogaddVisible = false;
          // 保存
          const params = {
            ...this.form
          };
          modifyAdvertisement(params).then(res => {
            this.$message.success("修改成功");
            this.form.name = "";
            this.form.pictureNo = "";
            this.form.priorityLevel = 1;
            this.display = true;
            this.listAdvertisementByPage();
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

    /**
     * 下架广告
     * @param pictureNo
     * @param name
     */
    disableStatusAdvertisement(pictureNo, name) {
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
          disableAdvertisement(params)
            .then(res => {
              this.listAdvertisementByPage();
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
    enableStatusAdvertisement(pictureNo, name) {
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
          enableAdvertisement(params)
            .then(res => {
              this.listAdvertisementByPage();
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
    /** 关闭新增弹窗 */
    addHandleClose() {
      this.form.name = "";
      this.dialogaddVisible = false;
      this.display = true;
    },
    /**
     * 跳转到广告页修改页面
     */
    editToAdvertisement(pictureNo) {
      this.$router.push("/system/app/advertisement/add/" + pictureNo);
    }
  }
};