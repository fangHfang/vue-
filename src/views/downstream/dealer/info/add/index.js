// src/views/downstream/dealer/info/add/index
import { createDealer, modifyDealer, detailDealer, nameList } from "@/api/downstream/dealer/info";
import { pageSearchRegionList } from "@/api/system/area/area";
import { pageSearchcategoriesLabel } from "@/api/system/other/tag";

export default {
  "name": "dealerInfoAdd",
  data() {
    return {
      "form": {
        // 经销商名称
        "name": "",
        // 经销商地址
        "address": "",
        // 联系电话
        "contactPhone": "",
        // 经销商编号
        "dealerNo": "",
        // 商户编号
        "merchNo": "",
        // 支付开通状态
        "payStatus": 1,
        "payStatusArray": {
          "value": 1,
          "options": [
            { "label": "已开通", "value": 0 },
            { "label": "未开通", "value": 1 }
          ]
        },
        // 支付功能
        "payFun": 1,
        "payFunArray": {
          "value": "",
          "options": [
            { "label": "开启", "value": 0 },
            { "label": "关闭", "value": 1 }
          ]
        },
        // 支付方式
        "payChannelNos": [],
        "payChannelNoList": [],
        // 账户性质
        "accountNature": "",
        // 开户名称
        "accountName": "",
        // 开户支行
        "bankBranch": "",
        // 银行账号
        "bankCardNumber": "",
        // 开户银行
        "bankOpen": "",
        // 联系人
        "contact": "",
        // 创建时间
        "created": "",
        // 客户编号
        "customerNo": "",
        // 经销商描述
        "describe": "",
        // 外部关联号
        "outRefNo": "",
        // 备注
        "remarks": "",
        // 状态：0有效，1失效
        "status": 0,
        // 租户编号
        "tenantNo": "",
        // 所属区域
        "regionNo": "",
        // 所属区域
        "region": {
          "value": [],
          "options": [ ]
        },
        // 关联标签
        "labelNo": {
          "value": "",
          "options": []
        },
        // 标签编号集合
        "labelNoList": []
      },
      "toolBar": {},
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "loading": false,
      "btnLoading": false
    };
  },
  "components": {

  },
  "watch": {
    "form.outRefNo": function() {
      this.form.outRefNo = this.form.outRefNo.replace(/[\W]/g, "");
    }

  },

  "computed": {
    isModify() {
      return this.$store.state.dealerInfo.modify;
    },
    // 客户编号
    customerNo() {
      return this.$store.state.dealerInfo.customerNo;
    },
    // 经销商编号
    dealerNo() {
      return this.$store.state.dealerInfo.dealerNo;
    },
    // 租户编号
    tenantNo() {
      return this.$store.state.dealerInfo.tenantNo;
    },
    // 是否详情
    isDetail() {
      return this.$store.state.dealerInfo.detail;
    }
  },
  mounted() {
    this.getNameList();
    this.pageSearchRegionList();
    this.pageSearchcategoriesLabel();

    if (this.isModify) {
      this.getDealerDetail();
    }
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
     * 移除图片
     * @param {*} file
     * @param {*} fileList
     */
    handleRemove(file, fileList) {
    },

    /**
     * 下载图片
     * @param {*} file
     * @param {*} fileList
     */
    handleDownload(file, fileList) {
    },

    /**
     * 点击图片浏览
     * @param {*} file
     * @param {*} fileList
     */
    handlePictureCardPreview(file, fileList) {
    },

    /**
     * 返回
     */
    back() {
      this.$router.back();
    },

    /**
     * 查询支付渠道字典
     */
    getNameList() {
      const that = this;
      nameList().then(res => {
        if (res.code === 200) {
          that.form.payChannelNoList = res.data;
        } else {
          that.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 分类查询标签下拉列表
     */
    pageSearchcategoriesLabel() {
      const params = {
        "labelType": 0
      };
      pageSearchcategoriesLabel(params).then(res => {
        if (res.code === 200) {
          this.form.labelNo.options = res.data.map(element => {
            return { "label": element.labelName, "value": element.labelNo };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 查询供应商明细
     */
    getDealerDetail() {
      const that = this;
      const params = "customerNo=" + that.customerNo + "&tenantNo=" + that.tenantNo + "&dealerNo=" + that.dealerNo;
      detailDealer(params).then(res => {
        if (res.code === 200) {
          that.form = { ...that.form, ...res.data };
          // that.form.created = this.formatTime(that.form.created);
          that.form.payStatusArray.value = res.data.payStatus;
          that.form.payFunArray.value = res.data.payFun;
          that.form.region.value = res.data.regionNos;
        } else {
          that.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 保存门店信息
     */
    saveDealerInfo() {
      if (this.isModify) {
        this.modifyDealerInfo();
      } else {
        this.addDealerInfo();
      }
    },

    /**
     * 创建门店信息
     */
    addDealerInfo() {
      if (!this.form.outRefNo) {
        this.$message.warning("外部经销商编码不能为空");
        this.btnLoading = false;
        return;
      }
      if (this.form.outRefNo) {
        const outRefNoArr = this.form.outRefNo.split("");
        if (outRefNoArr.length < 6) {
          this.$message.warning("外部经销商编码应为a-z,A-Z,0-9的6-32位");
          this.btnLoading = false;
          return;
        }
      }
      if (!this.form.accountNature) {
        this.$message.warning("账户性质不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.contactPhone) {
        this.$message.warning("联系电话不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.bankOpen) {
        this.$message.warning("开户银行不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.address) {
        this.$message.warning("地址不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.bankCardNumber) {
        this.$message.warning("银行账号不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.accountName) {
        this.$message.warning("开户名称不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.merchNo) {
        this.$message.warning("商户编号不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.name) {
        this.$message.warning("经销商名称不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.payFun) {
        this.$message.warning("支付功能不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.bankBranch) {
        this.$message.warning("开户支行不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.payChannelNos) {
        this.$message.warning("支付方式不能为空");
        this.btnLoading = false;
        return;
      }
      const params = {
        "accountName": this.form.accountName,
        "accountNature": this.form.accountNature,
        "address": this.form.address,
        "bankBranch": this.form.bankBranch,
        "bankCardNumber": this.form.bankCardNumber,
        "bankOpen": this.form.bankOpen,
        // 先写死联系人=经销商名称
        "contact": this.form.name,
        "contactPhone": this.form.contactPhone,
        "describes": this.form.describes,
        "labelNos": this.form.labelNoList,
        "merchNo": this.form.merchNo,
        "name": this.form.name,
        "outRefNo": this.form.outRefNo,
        "payChannelNos": this.form.payChannelNos,
        "payFun": this.form.payFunArray.value,
        "payStatus": this.form.payStatusArray.value,
        // 先写死密码等于123456
        "pwd": "123456",
        "regionNos": this.form.region.value
      };
      createDealer(params).then(res => {
        if (res.success) {
          this.$message.success(res.msg);
          this.$router.back();
        } else {
          this.$message.info(res.msg);
          this.btnLoading = false;
        }
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    },

    /**
     * 修改门店信息
     */
    modifyDealerInfo() {
      if (!this.form.accountNature) {
        this.$message.warning("账户性质不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.contactPhone) {
        this.$message.warning("联系电话不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.bankOpen) {
        this.$message.warning("开户银行不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.address) {
        this.$message.warning("地址不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.bankCardNumber) {
        this.$message.warning("银行账号不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.accountName) {
        this.$message.warning("开户名称不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.merchNo) {
        this.$message.warning("商户编号不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.name) {
        this.$message.warning("经销商名称不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.payFunArray) {
        this.$message.warning("支付功能不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.bankBranch) {
        this.$message.warning("开户支行不能为空");
        this.btnLoading = false;
        return;
      }
      if (!this.form.payChannelNos) {
        this.$message.warning("支付方式不能为空");
        this.btnLoading = false;
        return;
      }
      const params = {
        "customerNo": this.customerNo,
        "accountName": this.form.accountName,
        "accountNature": this.form.accountNature,
        "address": this.form.address,
        "bankBranch": this.form.bankBranch,
        "bankCardNumber": this.form.bankCardNumber,
        "bankOpen": this.form.bankOpen,
        // 先写死联系人=经销商名称
        "contact": this.form.name,
        "contactPhone": this.form.contactPhone,
        "describes": this.form.describes,
        "labelNos": this.form.labelNoList,
        "merchNo": this.form.merchNo,
        "name": this.form.name,
        "outRefNo": this.form.outRefNo,
        "payChannelNos": this.form.payChannelNos,
        "payFun": this.form.payFunArray.value,
        "payStatus": this.form.payStatusArray.value,
        // 先写死密码等于123456
        "pwd": "123456",
        "userName": this.form.contactPhone,
        "regionNos": this.form.region.value
      };
      modifyDealer(params).then(res => {
        this.$message.info(res.msg);
        this.$router.back();
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    },

    /**
     * 分页查询所属区域列表
     */
    pageSearchRegionList() {
      const params = {
        "status": 1,
        "request": {
          "pageNum": 1,
          "pageSize": 2000
        }
      };
      pageSearchRegionList(params).then(res => {
        if (res.code === 200) {
          this.form.region.options = res.data.records.map(element => {
            return { "label": element.name, "value": element.regionNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      }).catch((error) => {
        console.error(error.msg);
      });
    }
  }
};