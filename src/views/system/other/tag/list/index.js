import { pageSearchLabelList, updateLabelStatus } from "@/api/system/other/tag";
export default {
  "name": "SystemOtherTagList",
  "components": {
  },
  data() {
    return {
      // 日期
      "value1": "",
      "toolBar": {
        "labelName": "",
        "class": {
          "value": "",
          "options": [
            { "label": "经销商", "value": 0 },
            { "label": "门店", "value": 1 },
            { "label": "商品", "value": 2 },
            { "label": "客户", "value": 3 },
            { "label": "地区", "value": 4 }
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
      "tableLoading": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 查询标签分页列表
    this.listLabelByPage();
  },
  beforeRouteEnter(to, from, next) {
    next(_this => {
      // 从 新增/编辑 页返回之后
      if (from.name === "tagAdd") {
        _this.listLabelByPage();
      }
    });
  },
  "methods": {
    /**
     * 搜索按钮方法
     */
    searchLabelListByPage() {
      this.pagination.current = 1;
      this.listLabelByPage();
    },
    /**
     * 分页查询所有省市区列表
     */
    listLabelByPage() {
      this.tableLoading = true;
      const params = {
        "labelName": this.toolBar.labelName,
        "labelType": this.toolBar.class.value,
        "startTime": this.value1 ? this.value1[0] : "",
        "endTime": this.value1 ? this.value1[1] : "",
        "request": {
          "field": "",
          "order": "",
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      pageSearchLabelList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 获取勾选的角色行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 标签状态修改
     * @param status 状态 0：禁用 1：启用
     */
    modifyTagStatus(status) {
      if (!this.multipleSelection || this.multipleSelection.length === 0) {
        this.$message({
          "type": "info",
          "message": "请先勾选要修改状态的标签"
        });
        return;
      }
      // 循环标签
      this.multipleSelection.forEach(element => {
        const data = {
          "labelNo": element.labelNo,
          "status": status
        };
        this.tableLoading = true;
        updateLabelStatus(data).then(res => {
          if (res.code === 200) {
            this.tableLoading = false;
            // 查询标签管理列表
            this.listLabelByPage();
          } else {
            this.$message.error("操作失败");
          }
        });
      });
      this.tableLoading = false;
    },

    /**
     * 标签编辑
     */
    edit(labelNo) {
      this.$router.push({ "path": "/system/other/tag/edit" + labelNo });
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listLabelByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listLabelByPage();
    },

    /**
     * 新增页面
     */
    toAdd() {
      this.$router.push({ "path": "/system/other/tag/add" });
    }
  }
};