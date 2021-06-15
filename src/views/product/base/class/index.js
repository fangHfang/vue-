import dialogForm from "./component/dialogForm/index.vue";
import { listItemCategoryPage, listCategoryNextLevel, delCategoryItem, transferStatus, update } from "@/api/product/base/class";
export default {
  "name": "goodsBasicManagementClass",
  "components": {
    dialogForm
  },
  data() {
    return {
      "toolBar": {
        "class": "",
        "date": "",
        "relatedProducts": {
          "value": "",
          "options": [
            { "label": "是", "value": "1" },
            { "label": "否", "value": "0" }
          ]
        },
        "status": {
          "value": "",
          "options": [
            { "label": "禁用", "value": "0" },
            { "label": "启用", "value": "1" }
          ]
        }
      },
      // 用于列表显示
      "tableData": [],
      // 数结构 用于数据处理
      "tableDataTree": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400,
        "pages": 40
      },
      "dialogVisible": false,
      // 该数组中的值 都会在列表中进行隐藏
      "foldList": [],
      "categoryName": "",
      "parentNo": "",
      "tableLoading": false,
      "categoryLevel": 0,
      "currentRow": {}
    };
  },
  "computed": {
    // 记录属性结构的首层节点
    foldAllList() {
      return this.tableData.map(x => x.__identity);
    },
    permission() {
      return this.$store.state.container.permission;
    }
  },
  created() {
    const postData = {
      "pageNum": this.pagination.current,
      "pageSize": this.pagination.size,
      "categoryType": 2
    };
    this.listItemCategoryPage(postData);
  },
  mounted() {

  },
  "methods": {
    /**
       * 分页查询
       */
    listItemCategoryPage(program) {
      // console.log("program", program, JSON.stringify(program));
      const postData = this.$jsonFormat(program);
      this.tableLoading = true;
      listItemCategoryPage(postData).then((res) => {
        const { records, pages, total } = res.data;
        const list = records.map((item) => {
          return {
            ...item,
            "children": [],
            "show": true,
            "edit": false
          };
        });
        this.tableData = this.formatConversion([], list);
        this.tableDataTree = this.tableData;
        this.foldList = this.foldAllList;
        this.pagination = {
          ...this.pagination,
          pages,
          total
        };
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
        console.log("加载商品分类数据失败");
      });
    },
    /**
     * 新建分类后刷新
     */
    refreshRowData() {
      if (this.currentRow) {
        this.listCategoryNextLevel(this.currentRow, "expand");
      } else {
        this.searchCategoryItem();
      }
    },
    /**
       * 查询下一层级
       */
    listCategoryNextLevel(row, mark) {
      const _this = this;
      let payload = {
        "categoryNo": row.categoryNo,
        "categoryType": 2
      };
      payload = this.$jsonFormat(payload);
      listCategoryNextLevel(payload).then((res) => {
        const indexList = row.__identity.split("-");
        indexList.shift();
        if (mark !== "expand") {
          _this.foldList.includes(row.__identity)
            ? _this.foldList.splice(_this.foldList.indexOf(row.__identity), 1)
            : _this.foldList.push(row.__identity);
        }

        const data = res.data.map((item, index) => {
          _this.foldList.push(row.__identity + "-" + index);
          return {
            ...item,
            "children": [],
            "show": true,
            "edit": false
          };
        });
        const list = _this.formatList(_this.tableDataTree, indexList, data, 0);
        _this.tableDataTree = list;
        _this.tableData = _this.formatConversion([], list);
      }).catch(() => {
        console.log("加载商品分类数据失败");
      });
    },

    formatList(dataList, indexList, records, i) {
      const list = dataList.map((item, index) => {
        if (index === Number(indexList[i])) {
          if (indexList.length === (i + 1)) {
            if (records.length === 0) {
              item.show = false;
            }
            item.children = records;
          } else {
            this.formatList(item.children, indexList, records, i + 1);
          }
        }
        return item;
      });
      if (i === 0) {
        return list;
      }
    },

    /**
       * 分页器每页数量变化处理
       * @param val
       */
    handleSizeChange(val) {
      this.pagination.size = val;
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "categoryType": 2,
        "categoryName": this.toolBar.class,
        "status": this.toolBar.status.value,
        "isRelationItem": this.toolBar.relatedProducts.value
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        postData.startTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.endTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      this.listItemCategoryPage(postData);
    },

    /**
       * 分页器当前页码变化处理
       * @param val
       */
    handleCurrentChange(val) {
      this.pagination.current = val;
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "categoryType": 2,
        "categoryName": this.toolBar.class,
        "status": this.toolBar.status.value,
        "isRelationItem": this.toolBar.relatedProducts.value
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        postData.startTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.endTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      this.listItemCategoryPage(postData);
    },

    /**
       * 切换展开 还是折叠
       * @param:params  当前点击行的数据
       */
    toggleFoldingStatus(params) {
      this.listCategoryNextLevel(params);
    },

    /**
       * 该方法会对每一行数据都做判断 如果foldList 列表中的元素 也存在与当前行的 __family列表中  则该行不展示
       */
    toggleDisplayTr({ row, index }) {
      const stylejson = {};
      for (let i = 0;i < this.foldList.length;i++) {
        const item = this.foldList[i];
        // 如果foldList中元素存在于 row.__family中，则该行隐藏。  如果该行的自身标识等于隐藏元素，则代表该元素就是折叠点
        if (row.__family.includes(item) && row.__identity !== item) {
          stylejson.display = "none";
          return stylejson;
        }
      }
      return "background:#ff0000";
    },

    /**
       *  如果子集长度为0，则不返回字体图标。
       *  如果子集长度为不为0，根据foldList是否存在当前节点的标识返回相应的折叠或展开图标
       *  关于class说明：permission_placeholder返回一个占位符，具体查看class
       * @param: params 当前行的数据对象
       */
    toggleFoldingClass(params) {
      // return !params.show ? "permission_placeholder" : (this.foldList.indexOf(params.__identity) === -1 ? "iconfont jianshao" : "iconfont jiashu");
      return this.foldList.indexOf(params.__identity) === -1 ? "iconfont jianshao" : "iconfont jiashu";
    },

    /**
       * 将树形接口数据扁平化
       * @param: parent 为当前累计的数组  也是最后返回的数组
       * @param: children 为当前节点仍需继续扁平子节点的数据
       * @param: index 默认等于0， 用于在递归中进行累计叠加 用于层级标识
       * @param: family 装有当前包含元素自身的所有父级 身份标识
       * @param: elderIdentity 父级的  唯一身份标识
       */
    formatConversion(parent, children, index = 0, family = [], elderIdentity = "") {
      // children如果长度等于0，则代表已经到了最低层
      // let page = (this.startPage - 1) * 10
      if (children.length > 0) {
        children.map((x, i) => {
          // 设置 __level 标志位 用于展示区分层级
          this.$set(x, "__level", index);
          this.$set(x, "__index", i);
          // 设置 __family 为家族关系 为所有父级，包含本身在内
          this.$set(x, "__family", [ ...family, elderIdentity + "-" + i ]);
          // 本身的唯一标识  可以理解为个人的身份证咯 一定唯一。
          this.$set(x, "__identity", elderIdentity + "-" + i);
          parent.push(x);
          // 如果仍有子集，则进行递归
          if (x.children.length > 0) this.formatConversion(parent, x.children, index + 1, [ ...family, elderIdentity + "-" + i ], elderIdentity + "-" + i);
        });
      }
      return parent;
    },

    /**
       * 删除分类
       */
    delCategoryItem(categoryNo) {
      this.$confirm("确认删除？")
        .then(_ => {
          let postData = {
            "categoryNo": categoryNo,
            "categoryType": 2
          };
          postData = this.$jsonFormat(postData);
          delCategoryItem(postData).then((res) => {
            if (res.code === 200) {
              const index = this.tableData.findIndex(x => x.categoryNo === categoryNo);
              this.tableData.splice(index, 1);
              this.$message.success("删除成功");
            }
          }).catch((error) => {
            console.info(error.msg);
          });
        });
    },

    /**
       * 查找分类
       */
    searchCategoryItem() {
      this.pagination.current = 1;
      const postData = {
        "pageNum": 1,
        "pageSize": this.pagination.size,
        "categoryType": 2,
        "categoryName": this.toolBar.class,
        "status": this.toolBar.status.value,
        "isRelationItem": this.toolBar.relatedProducts.value
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        postData.startTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.endTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      this.listItemCategoryPage(postData);
    },

    /**
       * 重置
       */
    resetCategoryName() {
      this.toolBar.class = "";
      this.toolBar.status.value = "";
      this.toolBar.relatedProducts.value = "";
      this.toolBar.date = "";
      this.pagination.current = 1;
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "categoryType": 2
      };
      this.listItemCategoryPage(postData);
    },

    /**
       * 修改状态
       */
    transferStatus(state, categoryNo, row) {
      let postData = {
        "categoryNo": categoryNo,
        "categoryType": 2,
        "status": state
      };
      postData = this.$jsonFormat(postData);
      transferStatus(postData).then((res) => {
        if (res.code === 200) {
          this.$message.success(state === 0 ? "停用成功" : "启用成功");
          row.status = state;
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
      * 修改名称
      * @param {object} row 行数据
      */
    editName(row) {
      row.edit = false;
      row.categoryType = 2;
      update(row).then((res) => {
        this.$message.success("修改成功");
      });
    },

    /**
     * 调取新建方法
     */
    createCategoryType(categoryName, categoryLevel, categoryNo, row) {
      if (categoryLevel === 3) {
        this.$message({
          "message": "分类等级最高3级！",
          "type": "warning"
        });
        return;
      }
      this.categoryLevel = categoryLevel + 1;
      this.parentNo = categoryNo;
      this.categoryName = categoryName;
      this.dialogVisible = true;
      this.currentRow = row;
    }
  }
};
