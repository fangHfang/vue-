import { pageSearchPromotion, deletePromotion, updateSaleStatus } from "@/api/product/activity/promotion";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "limitedTimeSaleList",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        "date": [],
        "name": "",
        "status": {
          "value": "",
          "options": [
            { "label": "未开始", "value": 0 },
            { "label": "进行中", "value": 1 },
            { "label": "已结束", "value": 2 }
          ]
        }
      },
      "tableLoading": false,
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "multipleSelection": [],
      "exportUrl": ""
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    exportGetData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "page.field": "created",
        "page.order": "desc",
        "categoryType": 1
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        params.startTimeFrom = this.toolBar.date[0] + " 00:00:00";
        params.endTimeTo = this.toolBar.date[1] + " 23:59:59";
      }
      if (this.toolBar.name) {
        params.promotionName = this.toolBar.name;
      }
      if (this.toolBar.status.value || this.toolBar.status.value === 0) {
        params.promotionStatus = this.toolBar.status.value;
      }
      return {
        ...params
      };
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
      this.getRemoteTableData();
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
     * 分页查询分类列表
     */
    getRemoteTableData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "page.field": "created",
        "page.order": "desc",
        "categoryType": 1
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        params.startTimeFrom = this.toolBar.date[0] + " 00:00:00";
        params.endTimeTo = this.toolBar.date[1] + " 23:59:59";
      }
      if (this.toolBar.name) {
        params.promotionName = this.toolBar.name;
      }
      if (this.toolBar.status.value || this.toolBar.status.value === 0) {
        params.promotionStatus = this.toolBar.status.value;
      }
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      pageSearchPromotion(postData).then(res => {
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
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.date = [];
      this.toolBar.name = "";
      this.toolBar.status.value = "";
      this.pagination.current = 1;
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
        const len = multipleSelection.length - 1;
        multipleSelection.forEach((element, index) => {
          const params = {
            "promotionNo": element.promotionNo
          };
          deletePromotion(params).then(res => {
            if (len === index) {
              this.getRemoteTableData();
            }
          }).catch(error => {
            this.$message.error(error);
          });
        });
      }).catch(() => {});
    },
    /**
     * 打开详情
     */
    toDetail(promotionNo) {
      this.$router.push({ "path": "/product/activity/limitedTimeSale/detail/" + promotionNo });
    },
    /**
     * 打开配置门店权限
     */
    toStore(id) {
      this.$router.push({ "path": "/product/activity/seckill/store/set/" + id });
    },

    /**
     * 编辑限时抢购活动
     */
    showDialog(row) {
      // if (new Date().getTime() > new Date(row.applicationTime).getTime()) {
      //   this.$confirm("活动已结束，请重新编辑活动在上架", "编辑限时抢购活动", {
      //     "cancelButtonText": "编辑",
      //     "confirmButtonText": "取消",
      //     "type": "warning"
      //   });
      // }
    },
    /**
     * 复制活动
     */
    copyActivity() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.info("请选中一条数据!");
        return;
      }
      this.$router.push({ "path": "/product/activity/limitedTimeSale/copy/" + multipleSelection[0].promotionNo });
    },
    /**
     * 打开编辑
     */
    edit(item) {
      const msg = [ "未开始", "进行中", "已结束" ][item.promotionStatus];
      this.$confirm("活动" + msg + "，是否确认编辑?", "编辑限时抢购活动", {
        "confirmButtonText": "编辑",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        this.$router.push({ "path": "/product/activity/limitedTimeSale/edit/" + item.promotionNo });
      }).catch(() => {});
    },
    /**
     * 打开上架
     */
    onShelves(item) {
      const msg = [ "未开始", "进行中", "已结束" ][item.promotionStatus];
      this.$confirm("活动" + msg + "，是否继续上架？", "上架限时抢购活动", {
        "confirmButtonText": "上架",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        const params = {
          "promotionNo": item.promotionNo,
          "saleStatus": 1
        };
        updateSaleStatus(params).then(res => {
          if (res.code === 200) {
            this.$message.success("上架成功");
            this.getRemoteTableData();
          } else {
            this.$message.error(res.msg);
          }
        }).catch(error => {
          this.$message.error(error.msg);
        });
      }).catch(() => {});
    },
    /**
     * 打开下架
     */
    offShelves(item) {
      const msg = [ "未开始", "进行中", "已结束" ][item.promotionStatus];
      this.$confirm("活动" + msg + "，是否继续下架?", "下架限时抢购活动", {
        "confirmButtonText": "下架",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        const params = {
          "promotionNo": item.promotionNo,
          "saleStatus": 0
        };
        updateSaleStatus(params).then(res => {
          if (res.code === 200) {
            this.$message.success("下架成功");
            this.getRemoteTableData();
          } else {
            this.$message.error(res.msg);
          }
        }).catch(error => {
          this.$message.error(error.msg);
        });
      }).catch(() => {});
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
      const filterList = multipleSelection.filter(x => x.promotionStatus !== 2);
      if (filterList.length !== multipleSelection.length) {
        this.$message.warning("请不要选中已结束的活动");
        return;
      }

      const len = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = {
          "promotionNo": element.promotionNo,
          "saleStatus": status
        };
        updateSaleStatus(params).then(res => {
          if (len === index) {
            if (res.code === 200) {
              this.$message.success(status === 1 ? "上架成功" : "下架成功");
              this.getRemoteTableData();
            } else {
              this.$message.error(res.msg);
            }
          }
        }).catch(error => {
          this.$message.error(error.msg);
        });
      });
    },
    /**
     * 新增/编辑跳转
     */
    addOrEdit() {
      this.$router.push({ "path": "/product/activity/limitedTimeSale/add", "query": { "r": this.$getRandomValue() } });
    },

    /**
     * 复制链接
     */
    copyActivityLink(categoryNo) {
      const clipboard = new this.$clipboard(".page", {
        "text": function() {
          return "/pages/deadline/seckill/list/seckill-list?categoryNo=" + categoryNo;
        }
      });
      clipboard.on("success", e => {
        this.$message.success("链接已复制！");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message.error("复制失败！");
        clipboard.destroy();
      });
    }
  }
};