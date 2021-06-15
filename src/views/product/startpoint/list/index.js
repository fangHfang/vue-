// /views/product/startpoint/list/index
import { pageSearchStartPointList, deleteStartPoint, transferStartPointStatus } from "@/api/product/startPoint";
import { listItemCategory } from "@/api/product/manage";
import StartPointAdd from "../add/index.vue";

export default {
  "name": "ProductStartPointList",
  "components": {
    StartPointAdd
  },
  data() {
    return {
      // 商品分类下拉框数据
      "itemCategoryOptions": [],
      "toolBar": {
        "date": "",
        "name": "",
        "productName": "",
        "category": "",
        "class": {
          "value": "",
          "options": [
            { "label": "已停用", "value": "0" },
            { "label": "已生效", "value": "1" }
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
      "dialogVisible": false
    };
  },
  mounted() {
    this.getItemCategoryOptions();
    this.listStartPointByPage();
  },
  activated() {
    this.listStartPointByPage();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listStartPointByPage();
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 获取商品分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategory(this.$jsonFormat({
        "categoryType": 2,
        "keyword": ""
      }));
      if (result.code === 200) {
        this.itemCategoryOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listStartPointByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStartPointByPage();
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
     * 起订分数量
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     */
    changeCellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.label === "起订分数值") {
        // 修改的样式
        return "color: #ED6D00";
      }
      return "";
    },

    /**
     * 分页查询数据
     */
    listStartPointByPage() {
      this.tableLoading = true;
      let params = "pageNum=" + this.pagination.current + "&pageSize=" + this.pagination.size;
      if (this.toolBar.name) {
        params += "&startPointName=" + this.toolBar.name;
      }
      if (this.toolBar.date) {
        params += "&startTime=" + this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        params += "&endTime=" + this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      if (this.toolBar.category) {
        params += "&categoryNo=" + this.toolBar.category;
      }
      if (this.toolBar.class.value !== "") {
        params += "&status=" + this.toolBar.class.value;
      }
      const totalIndex = this.pagination.size * (this.pagination.current - 1) + 1;
      pageSearchStartPointList(params).then(res => {
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
     * 删除
     */
    removeStartPointSingle(startPointNo) {
      const params = "startPointNo=" + startPointNo;
      deleteStartPoint(params).then(res => {
        this.listStartPointByPage();
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 批量选择删除
     */
    removeStartPoint() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.error("请选中至少一条数据删除!");
        return;
      }
      const length = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = "startPointNo=" + element.startPointNo;
        deleteStartPoint(params).then(res => {
          if (length === index) {
            this.listStartPointByPage();
          }
        }).catch((error) => {
          console.info(error);
          this.tableLoading = false;
        });
      });
    },

    /**
     * 跳转到起订分编辑页面
     */
    openEdit(item) {
      // 跳转到起订分编辑页面
      this.$store.commit("productStartPoint/productStartPointListSet", {
        "startPointNo": item.startPointNo,
        "startPointId": item.id,
        "needEdited": true
      });
      this.$router.push({ "path": "/product/startpoint/detail" });
    },

    /**
     * 跳转到起订分详情
     */
    openDetail(item) {
      // 跳转到起订分详情
      this.$store.commit("productStartPoint/productStartPointListSet", {
        "startPointNo": item.startPointNo,
        "startPointId": item.id,
        "needEdited": false
      });
      this.$router.push({ "path": "/product/startpoint/detail" });
    },

    cleanSearch() {
      this.toolBar.date = "";
      this.toolBar.name = "";
      this.toolBar.productName = "";
      this.toolBar.category = "";
      this.toolBar.class.value = "";
      this.pagination.current = 1;
      this.listStartPointByPage();
    },

    transferStatus(status, startPointNo) {
      const params = "status=" + status + "&startPointNo=" + startPointNo;
      transferStartPointStatus(params).then(res => {
        this.listStartPointByPage();
      }).catch((error) => {
        console.info(error);
      });
    }

  }
};