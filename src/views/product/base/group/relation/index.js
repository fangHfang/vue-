import dialogAddProduct from "@/components/dialogAddProduct/index.vue";
import { queryItem, relationItem, removeItem } from "@/api/product/base/relation";
import {
  listItemLabel,
  listSpecTemplate
} from "@/api/product/manage";
export default {
  "name": "goodsGroupRelationList",
  "components": {
    dialogAddProduct
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "specDetail": "",
        "spec": {
          "value": "",
          "options": [
            { "label": "规格1", "value": "1" },
            { "label": "规格2", "value": "2" },
            { "label": "规格3", "value": "3" }
          ]
        },
        "brand": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
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
      "dialogVisible": false,
      "tableLoading": false,
      "categoryNo": this.$route.params.id,
      // 商品标签下拉框数据
      "itemLabelRefOptions": []
    };
  },
  "computed": {},
  created() {
    this.getData();
  },
  mounted() {
    this.initPageOptions();
  },
  "methods": {
    /**
     * 获取列表数据
     */
    getData() {
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "categoryNo": this.categoryNo
      };
      this.queryItem(postData);
    },
    async initPageOptions() {
      await this.getItemLabelOptions();
      await this.listSpecTemplate();
    },
    /**
  /**
     *  分页查询
     */
    queryItem(program) {
      const postData = this.$jsonFormat(program);
      this.tableLoading = true;
      queryItem(postData).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          // this.tableData = this.formatConversion([], this.tableData);
        }
        this.tableLoading = false;
      }).catch(() => {
        console.log("加载商品分类数据失败");
        this.tableLoading = false;
      });
    },

    /**
     * 返回
     * @param val
    */
    back() {
      this.$router.back(-1);
    },

    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": val,
        "categoryNo": this.categoryNo
      };
      this.queryItem(postData);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      const postData = {
        "pageNum": val,
        "pageSize": this.pagination.size,
        "categoryNo": this.categoryNo
      };
      this.queryItem(postData);
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
      * 查找分类
      */
    searchQueryItem() {
      this.pagination.current = 1;
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "categoryNo": this.categoryNo,
        "itemName": this.toolBar.name,
        "specDetail": this.toolBar.specDetail,
        "labelNo": this.toolBar.tag.value,
        "brandNo": this.toolBar.brand
      };
      this.queryItem(postData);
    },
    reset() {
      this.toolBar.name = "";
      this.toolBar.specDetail = "";
      this.toolBar.tag.value = "";
      this.toolBar.brand = "";
      this.searchQueryItem();
    },
    /**
     * 获取商品标签下拉框选项
     * @returns {Promise<void>}
     */
    async getItemLabelOptions() {
      const result = await listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 } });
      if (result.code === 200) {
        this.itemLabelRefOptions = result.data.records;
      } else {
        this.$message.error(result.msg);
      }
    },

    /**
      * 获取商品规格下拉框选项
      * @returns {Promise<void>}
      */
    async listSpecTemplate() {
      const result = await listSpecTemplate();
      if (result.code === 200) {
        this.specTemplateOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     *
     */
    specTemplateChange() { },
    specTemplateOptions() { },
    /**
     * 添加商品
     */
    addProduct(data) {
      console.log("data", data);
      const params = {
        "categoryNo": this.categoryNo,
        "itemNos": data.map(item => item.itemNo) // []
        // wholeCategoryNo: data[0].wholeCategoryName
      };
      relationItem(params).then(res => {
        this.getData();
        this.$message.success(res.msg);
      }).catch(this.$message.error);
    },
    /**
     * 删除
     */
    handleDelete(item) {
      const arr = item ? [ item ] : this.$refs["el-table"].selection;
      console.log("arr", arr);
      if (!arr.length) {
        this.$message.error("请选中一条数据");
        return;
      }

      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": "提示",
        "showClose": false,
        "type": "warning"
      })
        .then(_ => {
          const params = {
            "categoryNo": this.categoryNo,
            "itemNos": arr.map(item => item.itemNo) // []
          };
          removeItem(params).then(res => {
            this.getData();
            this.$message.success(res.msg);
          }).catch(this.$message.error);
        });
    }

  }
};