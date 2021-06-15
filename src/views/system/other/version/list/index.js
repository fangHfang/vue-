// src/views/system/other/version/list/index
import { pageSearchVersion, updateVersionStatusById } from "@/api/system/other/version";

export default {
  "name": "SystemOtherVersionList",
  "components": {},
  data() {
    return {
      "toolBar": {
        "editionNo": "",
        "createBy": "",
        "dataRange": [],
        "status": {
          "value": "",
          "options": [
            { "label": "上架", "value": "1" },
            { "label": "下架", "value": "0" }
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
      "multipleSelection": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.searchVersionByPage();
  },
  "methods": {
    /**
     * 搜索按钮方法
     */
    searchVersionListByPage() {
      this.pagination.current = 1;
      this.searchVersionByPage();
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
     * 分页查询
     */
    searchVersionByPage() {
      const that = this;
      this.tableLoading = true;
      const params = {
        "createBy": this.toolBar.createBy,
        "editionNo": this.toolBar.editionNo,
        "startTime": this.toolBar.dataRange ? this.toolBar.dataRange[0] : "",
        "endTime": this.toolBar.dataRange ? this.toolBar.dataRange[1] : "",
        "request": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "status": this.toolBar.status.value
      };
      pageSearchVersion(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.created = that.formatTime(element.created);
            // 更新类型 0-总部 1-经销商Android-APP 2-经销商IOS-APP 7-门店Android-APP；9-门店IOS-APP
            if (element.updateType === 0) {
              element.updateTypeShow = "总部";
            } else if (element.updateType === 1) {
              element.updateTypeShow = "经销商Android-APP";
            } else if (element.updateType === 2) {
              element.updateTypeShow = "经销商IOS-APP";
            } else if (element.updateType === 7) {
              element.updateTypeShow = "门店Android-APP";
            } else if (element.updateType === 9) {
              element.updateTypeShow = "门店IOS-APP";
            } else {
              element.updateTypeShow = "--";
            }
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
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.searchVersionByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.searchVersionByPage();
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 新增跳转
     */
    openVersionAddView() {
      this.$store.commit("systemOtherVersion/systemOtherVersionListSet", {
        "versionId": ""
      });
      this.$router.push({ "path": "/system/other/version/add" });
    },

    /**
     * 编辑跳转
     */
    openVersionEditView(id) {
      this.$store.commit("systemOtherVersion/systemOtherVersionListSet", {
        "versionId": id
      });
      this.$router.push({ "path": "/system/other/version/add" });
    },

    /**
     * 上架
     */
    upShelfFunc(id) {
      const params = {
        "id": id,
        "status": 1
      };
      updateVersionStatusById(params).then(res => {
        this.searchVersionByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 下架
     */
    downShelfFunc(id) {
      const params = {
        "id": id,
        "status": 0
      };
      updateVersionStatusById(params).then(res => {
        this.searchVersionByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },
    /**
     * 批量上架/下架
     */
    batchShelfOpt(status) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.error("请选中至少一条数据处理!");
        return;
      }
      this.tableLoading = true;
      const length = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = {
          "id": element.id,
          "status": status
        };
        updateVersionStatusById(params).then(res => {
          if (length === index) {
            this.searchVersionByPage();
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
          if (length === index) {
            this.tableLoading = true;
          }
        });
      });
    }
  }
};