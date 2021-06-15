import { pageSearchBannerList, create, disable, enable, modify } from "@/api/system/app/banner";
export default {
  "name": "AppPageWBannerList",
  "components": {
  },
  data() {
    return {
      // 新增 编辑 横幅名称弹出的标题
      "display": true,
      "tableLoading": false,
      "toolBar": {
        "pageType": 7,
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
        "priorityLevel": 1,
        "pictureNo": ""
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入橱窗名称", "trigger": "blur" }
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
      this.listBannerByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listBannerByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listBannerByPage();
    },
    /**
     * 跳转门店权限配置
     * @param row
     */
    toStore(row) {
      this.$router.push({ "path": "/system/app/store/list/" + row.pictureNo, "query": { "mark": "banner" } });
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
     * 新增
     */
    add() {
      this.$router.push("/system/app/banner/add");
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listBannerByPage() {
      this.tableLoading = true;
      const params = {
        ...this.toolBar,
        "status": this.toolBar.status.value,
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size
      };
      const totalIndex = this.pagination.size * (this.pagination.current - 1) + 1;
      pageSearchBannerList(params).then(res => {
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
     * 新增
     */
    submitForm() {
      const postData = {
        ...this.form
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          create(postData).then((res) => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.dialogaddVisible = false;
              this.listBannerByPage();
              this.$router.push({ "name": "systemAppBanner", "query": { "name": postData.name, "no": res.data } });
            } else {
              this.$message({
                "message": res.msg,
                "type": "warning"
              });
            }
          }).catch((error) => {
            this.$message({
              "message": error,
              "type": "warning"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 编辑横幅名称
     */
    editName(item = {}) {
      console.log("item", item);
      this.display = false;
      this.dialogaddVisible = true;
      this.form.name = item.name;
      this.form.pictureNo = item.pictureNo;
      this.form.priorityLevel = item.priorityLevel;
    },
    /**
     * 编辑横幅名称
     */
    updateForm() {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        const params = {
          ...this.form
          // "name": this.form.name,
          // "pictureNo": this.form.pictureNo,
          // "priorityLevel": this.form.priorityLevel
        };
        modify(params).then(res => {
          this.$message.success("修改成功");
          this.addHandleClose();
          this.listBannerByPage();
        }).catch(err => {
          this.$message.error(err);
        });
      });
    },
    /**
     * 编辑
     */
    edit(name, no) {
      this.$router.push({ "name": "systemAppBanner", "query": { "name": name, "no": no } });
    },
    /**
     * 下架
     */
    disable(name, no) {
      const postData = {
        "name": name,
        "pictureNo": no
      };
      disable(postData).then((res) => {
        if (res.code === 200) {
          this.listBannerByPage();
        } else {
          this.$message({
            "message": res.msg,
            "type": "warning"
          });
        }
      }).catch((error) => {
        this.$message({
          "message": error.msg,
          "type": "warning"
        });
      });
    },

    /** 关闭新增弹窗 */
    addHandleClose() {
      this.form.name = "";
      this.form.priorityLevel = 1;
      this.display = true;
      this.dialogaddVisible = false;
    },

    /**
      * 上架
      */
    enable(name, no) {
      const postData = {
        "name": name,
        "pictureNo": no
      };
      enable(postData).then((res) => {
        if (res.code === 200) {
          this.listBannerByPage();
        } else {
          this.$message({
            "message": res.msg,
            "type": "warning"
          });
        }
      }).catch((error) => {
        this.$message({
          "message": error.msg,
          "type": "warning"
        });
      });
    }

  }
};