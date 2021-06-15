// src/views/downstream/store/info/add/index
import { createStore, modifyStore, detailStore, searchStoreLevelList, dealerRegion } from "@/api/downstream/store/info";
import { pageSearchDealerList } from "@/api/downstream/dealer/info";
import { queryRegionDictDetail } from "@/api/system/area/city";
import { pageSearchcategoriesLabel } from "@/api/system/other/tag";
export default {
  "name": "storeInfoAdd",
  data() {
    return {
      "form": {
        // 门店名称
        "name": "",
        // 门店编号
        "storeNo": "",
        "outRefNo": "",
        // 经销商名称
        "dealerNames": {
          "value": "",
          "options": [ ]
        },
        // 经销商编号
        "dealerNo": "",
        "level": "",
        // 门店等级,取自字典dict_code
        "levels": {
          "value": "",
          "options": []
        },
        // 联系人
        "contact": "",
        // 联系人手机号
        "contactPhone": "",
        // 联系人邮箱
        "contactEmail": "",
        // 负责人身份证照url
        "contactUrl": "",
        // 门店备注
        "remarks": "",
        // 门店创建时间
        "created": "",
        // 门店状态
        "status": 1,
        // 门店状态
        "statusList": {
          "value": "",
          "options": [
            { "label": "禁用", "value": "1" },
            { "label": "启用", "value": "0" }
          ]
        },
        // 所属区域
        "regionNo": "",
        // 所属区域
        "region": {
          "value": "",
          "options": [ ]
        },
        // 省
        "provinceCode": "",
        // 省
        "province": {
          "value": "",
          "options": []
        },
        // 市
        "cityCode": "",
        // 市
        "city": {
          "value": "",
          "options": []
        },
        // 区
        "areaCode": "",
        // 区
        "area": {
          "value": "",
          "options": [

          ]
        },
        // 具体地址
        "address": "",
        // 营业执照url
        "license": "",
        // 门头照url
        "doorUrl": "",
        // 标签
        "tags": {
          "value": "",
          "options": []
        },

        // 经度
        "longitude": "",
        // 纬度
        "dimension": "",
        // 地区名称：xx省/xx市/xx区
        "districtName": ""
      },
      "files": {
        "license": {
          "url": "",
          "dialogVisible": false,
          "disabled": false,
          "files": []
        },
        "contactUrl": {
          "url": "",
          "dialogVisible": false,
          "disabled": false,
          "files": []
        },
        "doorUrl": {
          "url": "",
          "dialogVisible": false,
          "disabled": false,
          "files": []
        }
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
      "btnLoading": false,
      "isLook": false
    };
  },
  "components": {
  },
  "computed": {
    isModify() {
      return this.$store.state.storeInfo.modify;
    },
    isDetail() {
      return this.$store.state.storeInfo.isDetail;
    },
    customerNo() {
      return this.$store.state.storeInfo.customerNo;
    },
    tenantNo() {
      return this.$store.state.storeInfo.tenantNo;
    },
    token() {
      const token = { "Authorization": "bearer " + this.$store.state.token };
      return token;
    }
  },
  mounted() {
    this.initStoreTagList();
    if (this.isModify) {
      this.getStoreDetail();
    } else {
      this.initSearchStoreLevelList();
      this.initProvinceList();
      this.initDealerNameSearch();
    }
  },
  "methods": {

    /**
     * 上传图片成功后钩子
     */
    handleAvatarSuccess4License(res) {
      if (res.code === 200) {
        this.form.license = res.data.objectUrl;
      } else {
        this.$message.error(res.msg);
      }
    },
    handleRemoveLicense(file) {
      this.$confirm("确定删除吗", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": null,
        "showClose": false,
        "type": "warning"
      }).then(() => {
        file.license = "";
      }).catch(() => {});
    },
    /**
     * 上传之前
     * @param file
     * @returns {boolean|boolean}
     */
    beforeImageUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.$message.error("请上传 JPG 或者 PNG 格式的图片!");
      }
      return isJPG;
    },
    /**
     * 上传图片成功后钩子
     */
    onListPictureUploadContactSuccess(res) {
      if (res.code === 200) {
        this.form.contactUrl = res.data.objectUrl;
      } else {
        this.$message.error(res.msg);
      }
    },

    /**
     * 上传图片成功后钩子
     */
    handleAvatarSuccess4DoorUrl(res) {
      if (res.code === 200) {
        this.form.doorUrl = res.data.objectUrl;
      } else {
        this.$message.error(res.msg);
      }
    },

    /**
     * 返回
     */
    back() {
      this.$router.back();
    },

    /**
     * 点击减少
     */
    toReduce(key) {
      const labelNos = [];
      this.labels.forEach((element, i) => {
        if (element.key !== key) {
          labelNos.push(element);
        }
      });
      this.labels = labelNos;
    },

    /**
     * 点击新增
     */
    toAdd() {
      this.labels.push(
        { "key": this.labels.length, "value": "" }
      );
    },

    /**
     * 查询用户数据
     */
    getStoreDetail() {
      const that = this;
      const params = "customerNo=" + that.customerNo + "&tenantNo=" + that.tenantNo;
      detailStore(params).then(res => {
        if (res.code === 200) {
          that.form = { ...that.form, ...res.data };
          that.form.created = this.formatTime(that.form.created);
          that.form.region.value = res.data.regionNo;
          that.form.levels.value = res.data.level;
          that.files.license.url = res.data.license;
          that.files.license.files = [ { "url": res.data.license } ];
          that.form.tags.value = that.form.labelNos;
          that.form.dealerNames.value = res.data.dealerName;
          this.dealerRegion(res.data.dealerNo);
        } else {
          that.$message.error(res.msg);
        }
        this.initSearchStoreLevelList();
        this.initProvinceList();
        this.initDealerNameSearch();
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
      let provinceLabel = "";
      this.form.province.options.map(element => {
        if (element.value === this.form.province.value) {
          provinceLabel = element.label;
        }
      });
      let cityLabel = "";
      this.form.city.options.map(element => {
        if (element.value === this.form.city.value) {
          cityLabel = element.label;
        }
      });
      let areaLabel = "";
      this.form.area.options.map(element => {
        if (element.value === this.form.area.value) {
          areaLabel = element.label;
        }
      });
      this.form.districtName = provinceLabel + "/" + cityLabel + "/" + areaLabel;
    },

    /**
     * 创建门店信息
     */
    addStoreInfo() {
      if (this.form.provinceCode === "") {
        this.btnLoading = false;
        return this.$message.info("省级不能为空");
      }
      if (this.form.cityCode === "") {
        this.btnLoading = false;
        return this.$message.info("市级不能为空");
      }
      if (this.form.areaCode === "") {
        this.btnLoading = false;
        return this.$message.info("区级不能为空");
      }
      if (this.form.region.value === "") {
        this.btnLoading = false;
        return this.$message.info("所属区域不能为空");
      }
      if (this.form.address === "") {
        this.btnLoading = false;
        return this.$message.info("详细地址不能为空");
      }
      if (this.form.labelNos === "") {
        this.btnLoading = false;
        return this.$message.info("门店标签不能为空");
      }
      const params = {
        "customerNo": this.customerNo,
        "address": this.form.address,
        "areaCode": this.form.area.value,
        "cityCode": this.form.city.value,
        "contact": this.form.contact,
        "contactEmail": this.form.contactEmail,
        "contactPhone": this.form.contactPhone,
        "dealerNo": this.form.dealerNames.value,
        "districtName": this.form.districtName,
        "labelNos": this.form.tags.value,
        "level": this.form.levels.value,
        "longitude": this.form.longitude,
        "dimension": this.form.dimension,
        "license": this.form.license,
        "contactUrl": this.form.contactUrl,
        "doorUrl": this.form.doorUrl,
        "name": this.form.name,
        "provinceCode": this.form.province.value,
        "regionNo": this.form.region.value,
        "remarks": this.form.remarks,
        "outRefNo": this.form.outRefNo
      };
      if (!this.form.dealerNames.value) {
        this.$message.error("请选择经销商!");
        this.btnLoading = false;
        return;
      }
      createStore(params).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功!");
          this.$router.back();
        } else {
          this.btnLoading = false;
          this.$message.info(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    },

    /**
     * 修改门店信息
     */
    modifyStoreInfo() {
      if (this.form.provinceCode === "") {
        this.btnLoading = false;
        return this.$message.info("省级不能为空");
      }
      if (this.form.cityCode === "") {
        this.btnLoading = false;
        return this.$message.info("市级不能为空");
      }
      if (this.form.areaCode === "") {
        this.btnLoading = false;
        return this.$message.info("区级不能为空");
      }
      if (this.form.region.value === "") {
        this.btnLoading = false;
        return this.$message.info("所属区域不能为空");
      }
      if (this.form.address === "") {
        this.btnLoading = false;
        return this.$message.info("详细地址不能为空");
      }
      if (this.form.labelNos === "") {
        this.btnLoading = false;
        return this.$message.info("门店标签不能为空");
      }
      const params = {
        "customerNo": this.customerNo,
        "address": this.form.address,
        "areaCode": this.form.area.value,
        "cityCode": this.form.city.value,
        "contact": this.form.contact,
        "contactEmail": this.form.contactEmail,
        "contactPhone": this.form.contactPhone,
        "dealerNo": this.form.dealerNames.value,
        "districtName": this.form.districtName,
        "labelNos": this.form.tags.value,
        "level": this.form.levels.value,
        "longitude": this.form.longitude,
        "dimension": this.form.dimension,
        "license": this.form.license,
        "contactUrl": this.form.contactUrl,
        "doorUrl": this.form.doorUrl,
        "name": this.form.name,
        "provinceCode": this.form.province.value,
        "regionNo": this.form.region.value,
        "remarks": this.form.remarks,
        "storeRefNo": this.form.outRefNo
      };
      modifyStore(params).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功!");
          this.$router.back();
        } else {
          this.btnLoading = false;
          this.$message.info(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    },

    dealerRegion(dealerNo, flag) {
      if (flag === 0) {
        this.form.region.options = "";
        this.form.region.value = "";
      }
      const params = "?dealerNo=" + dealerNo;
      dealerRegion(params).then(res => {
        if (res.code === 200) {
          this.form.region.options = res.data.map(element => {
            return { "label": element.name, "value": element.regionNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      }).catch((error) => {
        console.error(error.msg);
      });
    },

    /**
     * 分页查询所属经销商
     * @param query 输入的值
     */
    dealerNameSearch(query) {
      if (query !== "") {
        this.dealerLoading = true;
        let params = "page.pageNum=1&page.pageSize=10&status=0&name=" + query;
        if (this.form.dealerNo !== "") {
          params += "&dealerNo=" + this.form.dealerNo;
        }
        pageSearchDealerList(params).then(res => {
          if (res.code === 200) {
            this.form.dealerNames.options = res.data.records.map(element => {
              return { "label": element.name, "value": element.dealerNo };
            });
          } else {
            this.$message.error(res.msg);
          }
          this.dealerLoading = false;
        }).catch((error) => {
          console.info(error);
          this.dealerLoading = false;
        });
      } else {
        this.form.dealerNames.options = [];
      }
    },

    /**
     * 分页查询所属经销商
     */
    initDealerNameSearch() {
      this.dealerLoading = true;
      const params = "page.pageNum=1&page.pageSize=20&status=0";
      pageSearchDealerList(params).then(res => {
        if (res.code === 200) {
          this.form.dealerNames.options = res.data.records.map(element => {
            return { "label": element.name, "value": element.dealerNo };
          });
          // this.form.dealerNames.value = this.form.dealerNo;
        } else {
          this.$message.error(res.msg);
        }
        this.dealerLoading = false;
      }).catch((error) => {
        console.info(error);
        this.dealerLoading = false;
      });
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
     * 初始化查询省
     */
    initProvinceList() {
      const params = {
        "level": 0
      };
      queryRegionDictDetail(params).then(res => {
        if (res.code === 200) {
          this.form.province.options = res.data.map(element => {
            return { "label": element.name, "value": element.code };
          });
          this.form.province.value = this.form.provinceCode;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.form.province.options = [];
      });
      if (this.form.provinceCode !== "") {
        const params2 = {
          "level": 1,
          "code": this.form.provinceCode
        };
        queryRegionDictDetail(params2).then(res => {
          if (res.code === 200) {
            this.form.city.options = res.data.map(element => {
              return { "label": element.name, "value": element.code };
            });
            this.form.city.value = this.form.cityCode;
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
          this.form.city.options = [];
        });
      }
      if (this.form.cityCode !== "") {
        const params3 = {
          "level": 2,
          "code": this.form.cityCode
        };
        queryRegionDictDetail(params3).then(res => {
          if (res.code === 200) {
            this.form.area.options = res.data.map(element => {
              return { "label": element.name, "value": element.code };
            });
            this.form.area.value = this.form.areaCode;
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
          this.form.area.options = [];
        });
      }
    },

    /**
     * 初始化门店标签
     */
    initStoreTagList() {
      const params = {
        "labelType": 1
      };
      pageSearchcategoriesLabel(params).then(res => {
        if (res.code === 200) {
          this.form.tags.options = res.data.map(element => {
            return { "label": element.labelName, "value": element.labelNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 省选择变化
     */
    changeProvince(query) {
      this.form.provinceCode = query;
      this.form.city.value = "";
      this.form.city.options = [];
      this.form.area.value = "";
      this.form.area.options = [];
      const params = {
        "level": 1,
        "code": query
      };
      queryRegionDictDetail(params).then(res => {
        if (res.code === 200) {
          this.form.city.options = res.data.map(element => {
            return { "label": element.name, "value": element.code };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.form.city.options = [];
      });
    },
    /**
     * 市选择变化
     */
    changeCity(query) {
      this.form.cityCode = query;
      this.form.area.value = "";
      this.form.area.options = [];
      const params = {
        "level": 2,
        "code": query
      };
      queryRegionDictDetail(params).then(res => {
        if (res.code === 200) {
          this.form.area.options = res.data.map(element => {
            return { "label": element.name, "value": element.code };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.form.area.options = [];
      });
    },
    /**
     * 区域选择变化
     */
    changeArea(query) {
      this.form.areaCode = query;
    }
  }
};