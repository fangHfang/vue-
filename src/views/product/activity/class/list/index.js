// /views/product/activity/class/list/index
import { pageSearchPromotionCategory, updatePromotionCategoryStatus, deletePromotionCategory } from "@/api/product/activity/class";
import activityClassAdd from "../add/index.vue";

export default {
  "name": "ActivityClassList",
  "components": {
    activityClassAdd
  },
  data() {
    return {
      "toolBar": {
        "categoryName": "",
        "created": [],
        "categoryType": {
          "value": "",
          "options": [
            { "label": "秒杀活动", "value": 0 },
            { "label": "限时抢购活动", "value": 1 },
            { "label": "商品组合活动", "value": 2 }
          ]
        },
        "status": {
          "value": "",
          "options": [
            { "label": "禁用", "value": 0 },
            { "label": "启用", "value": 1 }
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
      "tableLoading": false,
      "multipleSelection": [],
      "dialogVisible": false,
      "dialogTitle": "新增活动分类",
      "needSave": false,
      "categoryNo": "",
      "listDialogVisible": false,
      "currentRow": {}
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },

  mounted() {
    this.listPromotionCategoryByPage();
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listPromotionCategoryByPage();
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
    listPromotionCategoryByPage() {
      const that = this;
      this.tableLoading = true;
      // 请求参数
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&page.order=desc&page.field=created";
      // 规则名称
      if (this.toolBar.categoryName) {
        param = param + "&categoryName=" + this.toolBar.categoryName;
      }
      // 创建时间
      if (this.toolBar.created && this.toolBar.created.length !== 0) {
        param = param + "&createdFrom=" + this.toolBar.created[0] + "&createdTo=" + this.toolBar.created[1];
      }
      // 分类状态(0：禁用；1：启用)
      if (this.toolBar.status.value !== "") {
        param = param + "&status=" + this.toolBar.status.value;
      }
      // 分类类型 0:秒杀活动,1:限时抢购活动,2:商品组合活动
      if (this.toolBar.categoryType.value !== "") {
        param = param + "&categoryType=" + this.toolBar.categoryType.value;
      }
      pageSearchPromotionCategory(param).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element) => {
            element.created = that.formatTime(element.created);
          });
          this.tableData = res.data.records;
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
      this.toolBar.categoryName = "";
      this.toolBar.created = "";
      this.toolBar.categoryType.value = "";
      this.toolBar.status.value = "";
      this.pagination.current = 1;
      this.listPromotionCategoryByPage();
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
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listPromotionCategoryByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listPromotionCategoryByPage();
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.$refs.activityClassRef && this.$refs.activityClassRef.resetData();
        })
        .catch(_ => {});
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.activityClassRef && this.$refs.activityClassRef.resetData();
    },
    /**
     * 打开弹出层
     */
    openAddDetail() {
      this.categoryNo = "";
      this.dialogTitle = "新增活动分类";
      this.dialogVisible = true;
    },
    /**
     * 跳转到分类详情
     */
    openEditDetail(categoryNo) {
      // // 跳转到分类详情
      // this.$store.commit("activityClass/activityClassListSet", {
      //   "categoryNo": categoryNo
      // });
      // this.$router.push({ "path": "/product/activity/class/edit" });
      this.categoryNo = categoryNo;
      this.dialogTitle = "编辑活动分类";
      this.dialogVisible = true;
    },
    /**
     * 跳转到分类详情
     */
    openDetail(categoryNo) {
      // 跳转到分类详情
      this.$store.commit("activityClass/activityClassListSet", {
        "categoryNo": categoryNo
      });
      this.$router.push({ "path": "/product/activity/class/detail" });
    },
    /**
     * 单条删除
     * @param categoryNo
     */
    deleteCategory(categoryNo) {
      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "categoryNo": categoryNo
        };
        deletePromotionCategory(params).then(res => {
          this.listPromotionCategoryByPage();
        }).catch(error => {
          console.info(error);
          this.$message.error(error);
        });
      }).catch(() => {
        this.$message({
          "type": "info",
          "message": "已取消"
        });
      });
    },
    /**
     * 启用单条
     */
    enableCategory(categoryNo) {
      const data = {
        "categoryNo": categoryNo,
        "status": 1
      };
      updatePromotionCategoryStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listPromotionCategoryByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    },

    /**
     * 禁用单条
     */
    disableCategory(categoryNo) {
      const data = {
        "categoryNo": categoryNo,
        "status": 0
      };
      updatePromotionCategoryStatus(data).then(res => {
        if (res.code === 200) {
          // 查询
          this.listPromotionCategoryByPage();
        } else {
          this.$message.error("操作失败");
        }
      });
    },
    /**
     * 批量删除
     */
    deleteCategoryMulti() {
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
            "categoryNo": element.categoryNo
          };
          deletePromotionCategory(params).then(res => {
            this.listPromotionCategoryByPage();
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
     * 触发保存方法
     */
    saveActivityCategory() {
      this.$refs.activityClassRef && this.$refs.activityClassRef.saveActivityCategoryForm();
    },

    /**
     * 校验失败
     */
    validateFailed() {
      this.needSave = false;
    },
    /**
     * 保存后方法
     */
    afterSave(payload) {
      this.listPromotionCategoryByPage();
      this.dialogVisible = false;
    },

    /**
     * 复制链接
     */
    copyCategoryLink(categoryNo) {
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
    },
    getCountDialog(row) {
      console.log(row);
      this.currentRow = row;
      this.listDialogVisible = true;
    }
  }
};