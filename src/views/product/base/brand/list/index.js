import CommodityBrandForm from "../add/index.vue";
import { pageSearchBrandList, deleteByBrandNo, changeBrandStatus } from "@/api/product/base/brand";

export default {
  "name": "CommodityBrand",
  "components": {
    CommodityBrandForm
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "dataValue": "",
        "class": {
          "stateValue": "",
          "stateOptions": [
            { "stateLabel": "禁用", "stateValue": "0" },
            { "stateLabel": "启用", "stateValue": "1" }
          ]
        },
        "found": {
          "foundValue": "",
          "foundOptions": [
            { "foundLabel": "任务1", "foundValue": "1" },
            { "foundLabel": "任务2", "foundValue": "2" },
            { "foundLabel": "任务3", "foundValue": "3" }
          ]
        },
        "brand": "",
        "createBy": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "dialogTitle": "新增品牌",
      "editFormData": {},
      "tableLoading": false
    };
    // 初始化新增字段
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 分页查询所有区域列表
    this.getBrandTableData();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getBrandTableData();
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getBrandTableData();
    },
    saveData() {
      this.dialogVisible = false;
      this.getBrandTableData();
    },
    /**
     * 分页查询所有区域列表
     */
    getBrandTableData() {
      const { name, createBy, dataValue } = this.toolBar;
      const { current, size } = this.pagination;
      this.tableLoading = true;
      const postData = {
        "pageNum": current,
        "pageSize": size,
        "brandName": name === undefined ? "" : name,
        "status": this.toolBar.class.stateValue,
        "createBy": createBy === undefined ? "" : createBy
      };
      if (dataValue && dataValue.length > 0) {
        postData.startTime = this.$moment(dataValue[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.endTime = this.$moment(dataValue[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      const payload = this.$jsonFormat(postData);
      pageSearchBrandList(payload).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error("查询失败,请稍后重试");
        }
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    /** *
     * 删除单条数据
     */
    deleteBrandNo(val) {
      let data = {
        "brandNo": val
      };
      data = this.$jsonFormat(data);
      this.$confirm("是否删除本条记录?", "提示", {
        "customClass": "z-index",
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        deleteByBrandNo(data).then(
          (res) => {
            this.$message({
              "type": "success",
              "message": "删除成功!"
            });
            // 完成后执行刷新操作
            // 调用查询
            this.getBrandTableData();
          }
        );
      }).catch(() => {
      });
    },

    /**
     *保存弹窗数据
     */
    saveDialog() {
      // 调用子组件方法
      this.$refs.commodityBrandForm.saveBrandFrom();
      // 关闭弹窗
      this.dialogVisible = false;
      // 重置form表单
      this.$refs.commodityBrandForm.resetForm();
    },
    /**
     * 清除页面数据
     */
    clearData() {
      this.toolBar.dataValue = "";
      this.toolBar.name = "";
      this.toolBar.createBy = "";
      this.toolBar.class.stateValue = "";
      this.pagination.current = 1;
      this.getBrandTableData();
    },
    /**
     * 根据条件查询
     */
    getBrandData() {
      this.pagination.current = 1;
      this.getBrandTableData();
    },

    /**
     * 新增弹窗
     */
    addBrand() {
      this.dialogTitle = "新增品牌";
      this.dialogVisible = true;
    },

    /**
     * 关闭弹窗后触发
     */
    closeDialog() {
      this.dialogVisible = false;
      this.editFormData = {};
      this.$refs.commodityBrandForm.clearData();
    },

    /**
     * 编辑弹窗
     * @param {*} row 行数据
     */
    editForm(row) {
      this.dialogTitle = "编辑品牌";
      this.dialogVisible = true;
      this.editFormData = row;
    },

    /**
     * 启用/顶用
     * @param 编码
     * @param 状态
     */
    editStatus(brandNo, status) {
      const postData = {
        brandNo,
        status
      };
      const payload = this.$jsonFormat(postData);
      changeBrandStatus(payload).then(res => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          // 刷新当前页
          this.getBrandTableData();
        } else {
          this.$message.error("修改失败,请稍后重试");
        }
      }).catch(() => {});
    },

    /**
     * 复制链接
     */
    copyBrandLink(brandNo) {
      const clipboard = new this.$clipboard(".page", {
        "text": function() {
          return "/pages/products/product-search/product-search?brandNo=" + brandNo;
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