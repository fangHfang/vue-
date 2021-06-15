import CommoditySpecificationsAdd from "../add/index.vue";
import CommoditySpecificationsEdit from "../edit/index.vue";
import { listItemSpecTemplatePage, deleteItemSpecTemplate, listCreateBy, transferStatus } from "@/api/product/base/spec";
export default {
  "name": "CommoditySpecificationsList",
  "components": {
    CommoditySpecificationsAdd,
    CommoditySpecificationsEdit
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "filed": "",
        "dataValue": "",
        "class": {
          "stateValue": "",
          "stateOptions": [
            { "stateLabel": "是", "stateValue": "1" },
            { "stateLabel": "否", "stateValue": "0" }
          ]
        },
        "found": {
          "foundValue": "",
          "foundOptions": []
        },
        "brand": ""
      },
      // 商品规格数据
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "createBy": [],
      "dialogVisible": false,
      "editVisible": false,
      "tableLoading": false,
      "btnLoading": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  created() {
    this.listItemSpecTemplatePage();
    this.listCreateBy();
  },
  mounted() {

  },
  "methods": {
    searchButtonClick() {
      this.pagination.current = 1;
      this.listItemSpecTemplatePage();
    },
    /**
     * 分页查询
     */
    listItemSpecTemplatePage() {
      this.tableLoading = true;
      const postData = {
        "specName": this.toolBar.name,
        "specFiled": this.toolBar.filed,
        "status": this.toolBar.class.stateValue,
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size
      };
      if (this.toolBar.found.foundValue !== "") {
        postData.createBy = this.toolBar.found.foundOptions[this.toolBar.found.foundValue].foundLabel;
      }
      if (this.toolBar.dataValue && this.toolBar.dataValue.length > 0) {
        postData.startTime = this.$moment(this.toolBar.dataValue[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.endTime = this.$moment(this.toolBar.dataValue[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      // postData = this.$jsonFormat(postData);
      listItemSpecTemplatePage(postData).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).finally(() => { this.tableLoading = false; });
    },

    async listCreateBy() {
      const result = await listCreateBy();
      if (result.code === 200) {
        for (let i = 0;i < result.data.length;i++) {
          const createBy = { "foundLabel": "", "foundValue": "" };
          createBy.foundLabel = result.data[i];
          createBy.foundValue = i;
          this.toolBar.found.foundOptions.push(createBy);
        }
      }
    },
    clear() {
      this.toolBar.name = "";
      this.toolBar.filed = "";
      this.toolBar.class.stateValue = "";
      this.toolBar.found.foundValue = "";
      this.toolBar.dataValue = "";
      this.pagination.current = 1;
      this.listItemSpecTemplatePage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listItemSpecTemplatePage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listItemSpecTemplatePage();
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
     * 删除商品规格
     */
    deleteItemSpec(specNo) {
      this.$confirm("确认删除？")
        .then(_ => {
          let postData = {
            "specNo": specNo
          };
          postData = this.$jsonFormat(postData);
          deleteItemSpecTemplate(postData).then((res) => {
            if (res.code === 200) {
              this.listItemSpecTemplatePage();
            }
          }).catch(() => {
            console.log("删除商品规格失败");
          });
        });
    },
    /**
     * 保存
     */
    save() {
      this.$refs.CommoditySpecificationsAdd.saveItemSpec();
    },
    /**
     * 保存
     */
    update() {
      this.$refs.CommoditySpecificationsEdit.updateItemSpec();
    },
    close() {
      this.dialogVisible = false;
      this.editVisible = false;
    },
    /**
     * 启用规格
     */
    enableItemSpec(specNo) {
      this.$confirm("确认启用此规格？")
        .then(_ => {
          let postData = {
            "specNo": specNo,
            "status": 1
          };
          postData = this.$jsonFormat(postData);
          transferStatus(postData).then((res) => {
            if (res.code === 200) {
              this.listItemSpecTemplatePage();
            }
          }).catch(() => {
            console.log("转换商品规格状态失败");
          });
        });
    },
    /**
     * 停用规格
     */
    stopUsingItemSpec(specNo) {
      this.$confirm("确认停用此规格？")
        .then(_ => {
          let postData = {
            "specNo": specNo,
            "status": 0
          };
          postData = this.$jsonFormat(postData);
          transferStatus(postData).then((res) => {
            if (res.code === 200) {
              this.listItemSpecTemplatePage();
            }
          }).catch(() => {
            console.log("转换商品规格状态失败");
          });
        });
    },
    /**
     * 编辑商品规格
     * @param row
     */
    edit(row) {
      this.editVisible = true;
      setTimeout(() => {
        this.$refs.CommoditySpecificationsEdit.editItemSpec(row);
      }, 50);
    }
  }
};
