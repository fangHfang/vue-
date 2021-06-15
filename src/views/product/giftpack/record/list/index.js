import { pageRegPkgRecord } from "@/api/product/giftpack";
export default {
  "name": "seckillList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "date": [],
        "regPkgName": "",
        "storeNo": "",
        "dealerNo": ""
      },
      "tableLoading": false,
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "multipleSelection": []
    };
  },
  mounted() {
    this.getRemoteTableData();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {

    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },
    /**
     * 分页查询分类列表
     */
    getRemoteTableData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        params.beginDrawTime = this.toolBar.date[0] + " 00:00:00";
        params.endDrawTime = this.toolBar.date[1] + " 23:59:59";
      }
      if (this.toolBar.regPkgName) {
        params.regPkgName = this.toolBar.regPkgName;
      }
      if (this.toolBar.storeNo) {
        params.storeNo = this.toolBar.storeNo;
      }
      if (this.toolBar.dealerNo) {
        params.dealerNo = this.toolBar.dealerNo;
      }
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      pageRegPkgRecord(postData).then(res => {
        if (res.code === 200) {
          this.tableData = (res.data && res.data.records) || [];
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    /**
     * 搜索按钮
     */
    searchTableData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.date = [];
      this.toolBar.regPkgName = "";
      this.toolBar.storeNo = "";
      this.toolBar.dealerNo = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.getRemoteTableData();
    },

    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
     * 批量删除
     */
    deleteMulti() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
      }).catch(() => {});
    },
    /**
     * 打开详情
     */
    toDetail(row) {
      this.$router.push({ "path": "/product/giftpack/register/detail/" + row.regPkgNo });
    },
    /**
     * 打开配置领取范围
     */
    toStore(row) {
      this.$router.push({ "path": "/product/giftpack/register/range/" + row.regPkgNo });
    },
    /**
     * 新增跳转
     */
    toAdd() {
      this.$router.push({ "path": "/product/giftpack/register/add" });
    },
    /**
     * 打开编辑
     */
    toEdit(row) {
      this.$router.push({ "path": "/product/giftpack/register/edit/" + row.regPkgNo });
    },
    /**
     * 打开上架
     */
    onShelves(item) {
      const params = {
        "regPkgNo": item.regPkgNo
      };
      upShelfRegPkg(params).then(res => {
        if (res.code === 200) {
          this.$message.success("上架成功");
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      }).catch(error => {
        this.$message.error(error.msg);
      });
    },
    /**
     * 打开下架
     */
    offShelves(item) {
      const params = {
        "regPkgNo": item.regPkgNo
      };
      downShelfRegPkg(params).then(res => {
        if (res.code === 200) {
          this.$message.success("下架成功");
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      }).catch(error => {
        this.$message.error(error.msg);
      });
    },
    /**
     * 变更上下架状态
     * @param status 需要上下架状态 0下架 1上架
     */
    modifySaleStatus(status) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      const len = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = {
          "regPkgNo": element.regPkgNo
        };
        if (status === 1) {
          upShelfRegPkg(params).then(res => {
            if (len === index) {
              if (res.code === 200) {
                this.$message.success("上架成功");
                this.getRemoteTableData();
              } else {
                this.$message.error(res.msg);
              }
            }
          }).catch(error => {
            this.$message.error(error.msg);
          });
        } else {
          downShelfRegPkg(params).then(res => {
            if (len === index) {
              if (res.code === 200) {
                this.$message.success("下架成功");
                this.getRemoteTableData();
              } else {
                this.$message.error(res.msg);
              }
            }
          }).catch(error => {
            this.$message.error(error.msg);
          });
        }
      });
    },
    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};