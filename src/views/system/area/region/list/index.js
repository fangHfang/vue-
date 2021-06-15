import { pageSearchRegionList, updateRegionDictStatus, createRegionDict } from "@/api/system/area/area";
import { queryCityDictTree } from "@/api/business/rebate/rebateStore";
export default {
  "name": "AreaRegionList",
  data() {
    return {
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "启用", "value": 1 },
            { "label": "关闭", "value": 0 }
          ]
        }
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输区域名称", "trigger": "blur" }
        ]
      },
      "multipleSelection": [],
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      // 新增弹窗
      "dialogAddVisible": false,
      // 新增表单
      "form": {
        "name": ""
      }
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 分页查询所有区域列表
    this.listRegionByPage();
  },
  "methods": {
    /**
     * 搜索按钮查询
     */
    searchRegionListByPage() {
      this.pagination.current = 1;
      this.listRegionByPage();
    },

    /**
     * 分页查询所有区域列表
     */
    listRegionByPage() {
      this.tableLoading = true;
      const params = {
        "name": this.toolBar.name,
        "status": this.toolBar.class.value,
        "request": {
          "field": "",
          "order": "",
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }

      };
      pageSearchRegionList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
    },
    /**
     * 格式化时间
     * @param str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listRegionByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRegionByPage();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 启用禁用
     */
    enableOrDisable(regionNo, status) {
      this.$confirm("确认执行该操作?", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "regionNo": regionNo,
          "status": status
        };
        updateRegionDictStatus(params).then(res => {
          this.listRegionByPage();
        }).catch(() => {});
      }).catch(() => {});
    },
    /**
     * 打开编辑
     */
    edit(regionNo) {
      this.$confirm("确认重新编辑区域管理?", "提示", {
        "confirmButtonText": "编辑",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.$store.commit("systemAreaRegion/areaRegionListSet", {
          "regionNo": regionNo,
          "isNewAdd": false,
          "isDetailView": false
        });
        // 确认编辑-跳转到编辑页面
        this.$router.push({ "path": "/system/area/region/edit" });
      }).catch(() => {});
    },
    /**
     * 打开详情
     */
    toDetail(regionNo) {
      this.$store.commit("systemAreaRegion/areaRegionListSet", {
        "regionNo": regionNo,
        "isNewAdd": false,
        "isDetailView": true
      });
      // 确认编辑-跳转到编辑页面
      this.$router.push({ "path": "/system/area/region/detail" });
    },

    /**
     * 跳转到新增页
     */
    openAddDialog() {
      this.form.name = "";
      this.dialogAddVisible = true;
    },

    /** 关闭新增弹窗 */
    addHandleClose() {
      this.form.name = "";
      this.dialogAddVisible = false;
    },
    /**
     * 保存新增
     */
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.dialogAddVisible = false;
          // 保存
          const params = {
            ...this.form
          };
          createRegionDict(params)
            .then(res => {
              this.$message.success("新增成功");
              this.form.name = "";
              this.searchRegionListByPage();

              this.$store.commit("systemAreaRegion/areaRegionListSet", {
                "regionNo": res.msg,
                "isNewAdd": true,
                "isDetailView": false
              });
              // 确认编辑-跳转到编辑页面 new=1 表示刚创建的(刚创建的编辑保存后 状态需要改为 启用状态)
              this.$router.push({ "path": "/system/area/region/edit" });
            })
            .catch(error => {
              console.info(error);
              this.$message.error(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 限制输入特殊字符
     * @param e
     */
    btKeyUp(e) {
      e.target.value = e.target.value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, "");
    }
  }
};