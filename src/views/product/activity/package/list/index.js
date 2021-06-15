import { listItemInfoByPage, offSale, applySaleStepTwo, itemInfoDel } from "@/api/product/manage";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "PackageProductActivityManage",
  "components": {},
  data() {
    return {
      "toolBar": {
        "name": ""
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
      "priceProductVisible": false,
      "visibilityProductVisible": false,
      "itemNo": "",
      "exportUrl": ITEM_URL + "/admin/itemInfo/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      const params = {
        "itemType": 4,
        // 商品名称
        "itemName": this.toolBar.name,
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size
      };
      return {
        ...params
      };
    }
  },
  mounted() {
    this.getRemoteTableData();
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
        "itemType": 4,
        // 商品名称
        "itemName": this.toolBar.name,
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size
      };
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      listItemInfoByPage(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data && res.data.records.map(item => {
            return {
              ...item,
              "label": item.labelInfos && item.labelInfos.map(x => x.labelName).join("|")
            };
          });
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.name = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.getRemoteTableData();
    },
    /**
     * 搜索按钮
     */
    searchData() {
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
     * 复制商品
     */
    copyItem() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.info("请选中一条数据!");
        return;
      }
      this.$router.push({ "path": "/product/activity/package/copy/" + multipleSelection[0].itemNo });
    },
    /**
     * 删除
     */
    deleteOne(row) {
      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "itemNo": row.itemNo
        };
        itemInfoDel(params).then(res => {
          this.$message.success("删除成功");
          this.getRemoteTableData();
        }).catch(error => {
          this.$message.error(error);
        });
      }).catch(() => {});
    },
    /**
     * 打开详情
     */
    toDetail(row) {
      this.$router.push({ "path": "/product/activity/package/detail/" + row.itemNo });
    },

    /**
     * 打开编辑
     */
    toEdit(row) {
      this.$router.push({ "path": "/product/activity/package/edit/" + row.itemNo });
    },
    /**
     * 下架
     * @param row
     */
    downShelf(row) {
      const params = {
        "itemNos": [ row.itemNo ]
      };
      offSale(params).then(res => {
        if (res.code === 200) {
          this.$message.success("下架成功");
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 批量下架
     */
    batchDownShelf() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      const params = {
        "itemNos": this.multipleSelection.map(x => x.itemNo)
      };
      offSale(params).then(res => {
        if (res.code === 200) {
          this.$message.success("下架成功");
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 上架商品
     */
    upShelf(row) {
      const params = {
        "itemNo": row.itemNo
      };
      applySaleStepTwo(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.$message.success("上架成功");
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 上架商品
     */
    batchUpShelf(row) {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.multipleSelection.forEach((x, index) => {
        const params = {
          "itemNo": x.itemNo
        };
        applySaleStepTwo(this.$jsonFormat(params)).then(res => {
          if (index === this.multipleSelection.length - 1) {
            if (res.code === 200) {
              this.$message.success("上架成功");
              this.getRemoteTableData();
            } else {
              this.$message.error(res.msg);
            }
          }
        });
      });
    },
    /**
     * 新增
     */
    toAdd() {
      this.$router.push({ "path": "/product/activity/package/add", "query": { "r": this.$getRandomValue() } });
    },
    /**
     * 查看价格弹出层
     * @param row
     */
    toPrice(row) {
      this.itemNo = row.itemNo;
      this.priceProductVisible = true;
    },
    /**
     * 查看可见性弹出层
     * @param row
     */
    toVisibility(row) {
      this.itemNo = row.itemNo;
      this.visibilityProductVisible = true;
    }
  }
};
