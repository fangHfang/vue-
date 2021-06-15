import { pageSearchDealerOrgList, searchDealerNameList, enableDealerOrg, disableDealerOrg, changeDealerOrg } from "@/api/downstream/dealer/info";
import { enableStoreOrg, disableStoreOrg } from "@/api/downstream/store/info";

export default {
  "name": "structureList",
  "components": {},
  data() {
    return {
      "toolBar": {
        // 经销商名称
        "dealerName": "",
        // 经销商编码
        "dealerNo": "",
        // 门店名称
        "storeName": "",
        // 门店编码
        "storeNo": "",
        // 状态
        "status": ""
      },
      "condition": {
        // 状态
        "statusOptions": [
          { "label": "启用", "value": 0 },
          { "label": "关闭", "value": 1 }

        ]
      },
      "tableData": [],
      "form": {
        "name": "",
        "code": "",
        "customerNo": "",
        "dealerNo": ""
      },
      "dealerNameList": [],
      "rules": {
        "dealerNo": [
          { "required": true, "message": "请选择直属上级", "trigger": "change" }
        ]
      },
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      // 该数组中的值 都会在列表中进行隐藏
      "foldList": [],
      // 弹窗是否显示
      "dialogVisible": false,
      "tableLoading": false,
      "parentSelection": [],
      "childSelection": []
    };
  },
  "computed": {
    // 记录属性结构的首层节点
    foldAllList() {
      return this.tableData.map(x => x.__identity);
    },
    multipleSelection() {
      return [ ...this.parentSelection, ...this.childSelection ];
    },
    permission() {
      return this.$store.state.container.permission;
    }
  },
  created() {

  },
  mounted() {
    this.listDealerOrgByPage();
    this.initDealerNameList();
  },
  "methods": {
    /**
     * 初始化经销商下拉列表
     */
    initDealerNameList() {
      searchDealerNameList().then(res => {
        if (res.code === 200) {
          this.dealerNameList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 查询方法
     */
    searchDealerOrgListByPage() {
      this.pagination.current = 1;
      this.listDealerOrgByPage();
    },

    /**
     * 重置方法
     */
    resetSearchDealerOrgListByPage() {
      this.pagination.current = 1;
      this.toolBar.dealerName = "";
      this.toolBar.storeNo = "";
      this.toolBar.status = "";
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.listDealerOrgByPage();
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.parentSelection = val;
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleChildSelectionChange(val) {
      this.childSelection = val;
    },
    /**
     * 父级表格控制子级表格
     * @param val
     */
    selectAll(val) {
      if (val.length > 0) {
        Array.from({ "length": this.pagination.size }).fill(1).forEach((x, i) => {
          this.$refs["tableChildRef" + i] && this.$refs["tableChildRef" + i].clearSelection();
          this.$refs["tableChildRef" + i] && this.$refs["tableChildRef" + i].toggleAllSelection();
        });
      } else {
        Array.from({ "length": this.pagination.size }).fill(1).forEach((x, i) => {
          this.$refs["tableChildRef" + i] && this.$refs["tableChildRef" + i].clearSelection();
        });
      }
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listDealerOrgByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listDealerOrgByPage();
    },

    /**
      * 切换展开 还是折叠
      * @param:params  当前点击行的数据
    */
    toggleFoldingStatus(params) {
      this.foldList.includes(params.__identity) ? this.foldList.splice(this.foldList.indexOf(params.__identity), 1) : this.foldList.push(params.__identity);
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
      return params.storeList.length === 0 ? "permission_placeholder" : (this.foldList.indexOf(params.__identity) === -1 ? "iconfont jianshao" : "iconfont jiashu");
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
      console.log(parent);
      // children如果长度等于0，则代表已经到了最低层
      // let page = (this.startPage - 1) * 10
      if (children.length > 0) {
        for (let i = 0;i < children.length;i++) {
          const x = children[i];
          // 设置 __level 标志位 用于展示区分层级
          this.$set(x, "__level", index);
          this.$set(x, "__index", i);
          // 设置 __family 为家族关系 为所有父级，包含本身在内
          this.$set(x, "__family", [ ...family, elderIdentity + "-" + i ]);
          // 本身的唯一标识  可以理解为个人的身份证咯 一定唯一。
          this.$set(x, "__identity", elderIdentity + "-" + i);
          // parent.push(x)
          parent[parent.length] = x;
          // 如果没有子集，创建一个
          if (!x.storeList) x.storeList = [];
          // 如果仍有子集，则进行递归
          setTimeout(() => {
            if (x.storeList.length > 0) this.formatConversion(parent, x.storeList.slice(0, 100), index + 1, [ ...family, elderIdentity + "-" + i ], elderIdentity + "-" + i);
          }, 0);
        }
      } return parent;
    },
    /**
     * 切换展示与否
     * @param row
     */
    toggleExpand(row) {
      const $table = this.$refs.tableRef;
      row.expanded = !row.expanded;
      $table.toggleRowExpansion(row);
    },
    /**
     * 分页查询组织结构数据
     */
    listDealerOrgByPage() {
      if ((this.toolBar.storeNo || this.toolBar.status !== "") && !this.toolBar.dealerName) {
        return this.$message.info("请输入所要查询的经销商");
      }
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.dealerName) {
        params += "&dealerName=" + this.toolBar.dealerName;
      }
      if (this.toolBar.storeNo) {
        params += "&storeNo=" + this.toolBar.storeNo;
      }
      if (this.toolBar.status !== "") {
        params += "&status=" + this.toolBar.status;
      }
      pageSearchDealerOrgList(params).then(res => {
        if (res.code === 200) {
          // 这边暂时这么处理，后续要放到接口请求成功后执行
          // this.tableData = this.formatConversion([], res.data.records);
          this.tableData = res.data.records.map(x => {
            return {
              ...x,
              "expanded": false
            };
          });
          this.foldList = this.foldAllList;

          // 接口请求成功后执行 如果列表没有数据，弹出提示框 [请前往下游管理导入经销商门店信息]
          if (this.tableData.length === 0) {
            this.$confirm("请前往下游管理导入经销商门店信息", "提示", {
              "confirmButtonText": "确定",
              "cancelButtonText": "取消",
              "title": "提示",
              "showClose": false,
              "type": "warning"
            }).then(() => {
              // 确定
              this.$router.push({ "path": "/downstream/dealer/info/list" });
            }).catch(() => {
              // 取消
            });
          }
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
     * 停用组织
     * @param row
     */
    orgStopUsing(row) {
      if (row.type === 1) {
        const params = {
          "customerNo": row.customerNo,
          "dealerNo": row.dealerNo
        };
        disableDealerOrg(params).then(res => {
          this.$message.success("停用成功");
          row.status = 1;
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      } else {
        const params = {
          "customerNo": row.customerNo,
          "storeNo": row.storeNo
        };
        disableStoreOrg(params).then(res => {
          this.$message.success("停用成功");
          row.status = 1;
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      }
    },

    /**
     * 启用组织
     * @param row
     */
    orgBeginUsing(row) {
      if (row.type === 1) {
        const params = {
          "customerNo": row.customerNo,
          "dealerNo": row.dealerNo
        };
        enableDealerOrg(params).then(res => {
          this.$message.success("启用成功");
          row.status = 0;
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      } else {
        const params = {
          "customerNo": row.customerNo,
          "storeNo": row.storeNo
        };
        enableStoreOrg(params).then(res => {
          this.$message.success("启用成功");
          row.status = 0;
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      }
    },

    /**
     * 批量停用组织
     */
    batchStopUsing() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.warning("请选择需要停用的组织");
        return;
      }
      const length = multipleSelection.length - 1;
      multipleSelection.forEach((row, index) => {
        if (row.type === 1) {
          const params = {
            "customerNo": row.customerNo,
            "dealerNo": row.dealerNo
          };
          disableDealerOrg(params).then(res => {
            if (length === index) {
              this.$message.success("停用成功");
              this.listDealerOrgByPage();
            }
          }).catch((error) => {
            console.info(error);
            this.$message.error(error);
          });
        } else {
          const params = {
            "customerNo": row.customerNo,
            "storeNo": row.storeNo
          };
          disableStoreOrg(params).then(res => {
            if (length === index) {
              this.$message.success("停用成功");
              this.listDealerOrgByPage();
            }
          }).catch((error) => {
            console.info(error);
            this.$message.error(error);
          });
        }
      });
    },

    /**
     * 批量启用组织
     */
    batchBeginUsing() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.warning("请选择需要启用的组织");
        return;
      }
      const length = multipleSelection.length - 1;
      multipleSelection.forEach((row, index) => {
        if (row.type === 1) {
          const params = {
            "customerNo": row.customerNo,
            "dealerNo": row.dealerNo
          };
          enableDealerOrg(params).then(res => {
            if (length === index) {
              this.$message.success("启用成功");
              this.listDealerOrgByPage();
            }
          }).catch((error) => {
            console.info(error);
            this.$message.error(error);
          });
        } else {
          const params = {
            "customerNo": row.customerNo,
            "storeNo": row.storeNo
          };
          enableStoreOrg(params).then(res => {
            if (length === index) {
              this.$message.success("启用成功");
              this.listDealerOrgByPage();
            }
          }).catch((error) => {
            console.info(error);
            this.$message.error(error);
          });
        }
      });
    },

    /**
     * 组织变更
     * @param row 行数据
     */
    organizationChange(row) {
      if (row.type === 1) {
        this.$message.warning("只能变更类型为门店的组织");
        return;
      }
      this.form.name = row.name;
      this.form.code = row.storeNo;
      this.form.customerNo = row.customerNo;
      this.form.dealerNo = row.dealerNo;
      this.dialogVisible = true;
    },

    /**
     * 打开弹窗
     */
    openSelectedChangeDialog() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length === 0) {
        this.$message.warning("请选择需要变更的组织");
        return;
      }
      const row = multipleSelection[0];
      if (row.type === 1) {
        this.$message.warning("只能变更类型为门店的组织");
        return;
      }
      this.form.name = row.name;
      this.form.code = row.storeNo;
      this.form.customerNo = row.customerNo;
      this.form.dealerNo = row.dealerNo;
      this.dialogVisible = true;
    },

    /**
     * 关闭弹窗
     */
    handleClose() {
      this.dialogVisible = false;
    },

    /**
     * 保存
     */
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            "customerNo": this.form.customerNo,
            "dealerNo": this.form.dealerNo
          };
          changeDealerOrg(params).then(res => {
            this.listDealerOrgByPage();
            this.dialogVisible = false;
          }).catch((error) => {
            console.info(error);
            this.$message.error(error);
            this.dialogVisible = false;
          });
        } else {
          return false;
        }
      });
    },

    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.form.resetFields();
    },

    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    dealerChange(val) {
      this.toolBar.dealerName = val.name;
    }
  }
};