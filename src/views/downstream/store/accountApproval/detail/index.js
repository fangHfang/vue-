import { storePassed, storeRejected, detailStore, searchStoreLevelList } from "@/api/downstream/store/accountApproval";
import { pageSearchcategoriesLabel } from "@/api/system/other/tag";
export default {
  "name": "storeaccountApprovalDetail",
  data() {
    return {
      "form": {
        // 门店名称
        "name": "",
        // 门店编号
        "storeNo": "",
        // 经销商名称
        "dealerName ": "",
        // 经销商编号
        "dealerNo": "",
        "level": "",
        // 门店等级,取自字典dict_code
        "levels": "",
        // 上级门店
        "superior": "",
        // 联系人
        "contact": "",
        // 联系人手机号
        "contactPhone": "",
        // 门店创建时间
        "created": "",
        // 门店状态
        "status": 1,
        // 门店状态
        "statusList": {
          "value": "",
          "options": [
            { "label": "禁用", "value": "0" },
            { "label": "使用", "value": "1" }
          ]
        },
        "remarks": "",
        // 营业执照url
        "license": "",
        // 标签
        "tags": {
          "value": "",
          "options": []
        },
        // 地区名称：xx省/xx市/xx区
        "districtName": "",
        "srcList": []
      },
      "labels": [],
      "toolBar": {},
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "loading": false,
      "dealerLoading": false,
      "levelLoading": false,
      "customerNo": this.$route.query.customerNo
    };
  },
  "components": {
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.initStoreTagList();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    /**
     * 下载图片
     * @param {*} file
     * @param {*} fileList
     */
    handleDownload(file, fileList) {
      window.open(file.url);
    },

    /**
     * 点击图片浏览
     * @param {*} file
     */
    handlePictureCardPreview4License(file) {
      this.files.license.dialogVisible = true;
    },

    /**
     * 上传图片成功后钩子
     */
    handleAvatarSuccess4License(res, file) {
      this.files.license.url = res.data.objectUrl;
      this.form.license = res.data.objectUrl;
    },

    /**
     * 移除图片
     * @param {*} file
     * @param {*} fileList
     */
    handleRemove4License(file, fileList) {
      this.$confirm("确定删除吗", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": null,
        "showClose": false,
        "type": "warning"
      }).then(() => {
        file.imgUrl = "";
        file.url = "";
        this.files.license.url = "";
        this.files.license.files = [];
        this.form.license = "";
      }).catch(() => {});
    },

    /**
     * 返回
     */
    back() {
      this.$router.back();
    },

    /**
     * 查询用户数据
     */
    getStoreDetail() {
      const that = this;
      const params = "?customerNo=" + that.customerNo;
      detailStore(params).then(res => {
        if (res.code === 200) {
          that.form.name = res.data.name;
          that.form.storeNo = res.data.storeNo;
          that.form = { ...that.form, ...res.data };
          that.form.created = this.formatTime(that.form.created);
          that.form.levels = res.data.level;
          that.form.srcList.push(res.data.license);
          that.form.license = require(res.data.license);
          that.form.tags.value = res.data.labelNos;
        } else {
          that.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
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
     * 保存门店信息
     */
    saveStoreInfo() {
      this.calcDistrictName();
      if (this.isModify) {
        this.modifyStoreInfo();
      } else {
        this.addStoreInfo();
      }
    },

    /**
     * 地区整理
     */
    calcDistrictName() {
      const provinceLabel = this.form.province.options.map(element => {
        if (element.value === this.form.province.value) {
          return element.label;
        }
      });
      const cityLabel = this.form.city.options.map(element => {
        if (element.value === this.form.city.value) {
          return element.label;
        }
      });
      const areaLabel = this.form.area.options.map(element => {
        if (element.value === this.form.area.value) {
          return element.label;
        }
      });
      this.form.districtName = provinceLabel[0] + "/" + cityLabel[0] + "/" + areaLabel[0];
    },

    /**
     * 查询门店等级
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.form.levels.options = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
          this.form.levels.value = this.form.level;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.form.levels.options = [];
      });
    },

    /**
     * 初始化门店标签
     */
    initStoreTagList() {
      const params = {
        "labelType": 1,
        "request": {
          "pageNum": 1,
          "pageSize": 20
        }
      };
      pageSearchcategoriesLabel(params).then(res => {
        if (res.code === 200) {
          this.form.tags.options = res.data.map(element => {
            return { "label": element.labelName, "value": element.labelNo };
          });
          this.getStoreDetail();
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 区域选择变化
     */
    changeArea(query) {
      this.form.areaCode = query;
    },

    /**
     * 通过
     */
    storePassed() {
      const params = {
        "customerNo": this.customerNo
      };
      storePassed(params).then(res => {
        this.$message.success("操作成功");
        this.back();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 驳回
     */
    storeRejected() {
      const params = {
        "customerNo": this.customerNo
      };
      storeRejected(params).then(res => {
        this.$message.success("操作成功");
        this.back();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    }
  }
};