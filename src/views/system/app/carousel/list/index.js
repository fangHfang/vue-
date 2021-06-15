import { queryCarouselByPage, deleteCarousel, disableCarousel, enableCarousel, createCarousel, modifyCarousel } from "@/api/system/app/carousel";
export default {
  "name": "CarouselList",
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
        //   "name": "XX轮播图",
        //   "number": "6",
        //   "date": "2020-11-12 13:21:12",
        //   "prople": "张三",
        //   "status": "1",
        //   "remarks": "备注"
        // },
        // {
        //   "id": "2",
        //   "name": "XX轮播图",
        //   "number": "6",
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
        "total": 400
      },
      "form": {
        "name": "",
        "pictureNo": "",
        "priorityLevel": 1
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入轮播图名称", "trigger": "blur" },
          { "min": 2, "max": 50, "message": "长度在 2 到 50 个字符", "trigger": "blur" }
        ],
        "priorityLevel": [
          { "required": true, "message": "请输入优先级", "trigger": "blur" }
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
      this.listCarouselByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listCarouselByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listCarouselByPage();
    },

    /**
     * 跳转门店权限配置
     * @param row
     */
    toStore(row) {
      this.$router.push({ "path": "/system/app/store/list/" + row.pictureNo, "query": { "mark": "carousel" } });
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 分页查询广告页
     */
    listCarouselByPage() {
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
      queryCarouselByPage(params).then(res => {
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
     * 修改轮播图名称
     */
    editModify(row) {
      const { pictureNo, name, priorityLevel } = row;
      this.form = {
        pictureNo,
        name,
        priorityLevel
      };
      this.display = false;
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
          createCarousel(params)
            .then(res => {
              if (res.code === 200) {
                this.$message.success("新增成功");
                this.listCarouselByPage();
              } else {
                this.$message.error(res.msg);
              }
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
          modifyCarousel(params).then(res => {
            this.$message.success("修改成功");
            this.display = true;
            this.listCarouselByPage();
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
     * 删除轮播图名称
     */
    deleteCarousel() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.error("请选中一条数据!");
        return;
      }
      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        multipleSelection.forEach(element => {
          const params = {
            "pictureNo": element.pictureNo
          };
          deleteCarousel(params).then(res => {
            this.listCarouselByPage();
          }).catch(error => {
            console.info(error);
            this.$message.error(error);
          });
        });
      }).catch(() => {
        this.$message({
          "type": "info",
          "message": "已取消"
        });
      });
    },

    /**
     * 下架轮播图
     * @param pictureNo
     * @param name
     */
    disableStatusCarousel(pictureNo, name) {
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
          disableCarousel(params)
            .then(res => {
              this.listCarouselByPage();
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
     * 上架轮播图
     * @param pictureNo
     * @param name
     */
    enableStatusCarousel(pictureNo, name) {
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
          enableCarousel(params)
            .then(res => {
              this.listCarouselByPage();
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

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /** 关闭新增弹窗 */
    addHandleClose() {
      this.dialogaddVisible = false;
      this.form = {
        "pictureNo": "",
        "name": "",
        "priorityLevel": 1
      };
      this.display = true;
    },

    /**
     * 跳转到轮播图
     */
    editToCarousel(pictureNo) {
      this.$router.push("/system/app/carousel/add/" + pictureNo);
    }
  }
};