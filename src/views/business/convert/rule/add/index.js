import { epRuleDetail, updateEpRule } from "@/api/business/coupon/exchange";
import dialogAddProduct from "@/components/dialogAddProduct/index.vue";

export default {
  "name": "convertRuleAdd",
  "components": {
    dialogAddProduct
  },
  data() {
    return {
      "form": {
        "id": 0,
        "createBy": "",
        "created": "",
        "exchangeAmount": 0,
        "exchangeStartTime": "",
        "exchangeEndTime": "",
        "exchangeTime": "",
        "exchangeLimit": 0,
        "exchangeTimeType": 0,
        "itemDesc": "",
        "itemNo": "",
        "remark": "",
        "ruleName": "",
        "ruleNo": "",
        "tenantNo": "",
        "type": 0
      },
      // 添加商品信息，只能选一个
      "productInfo": {},
      "imageUrl": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "datarange": false,
      "dialogVisible": false,
      "dialogVisible4Product": false,
      "dialogImageUrl": "",
      "disabled": false,
      "btnLoading": false
    };
  },
  "computed": {
    ruleNo() {
      return this.$store.state.convertRuleListProductOrder.ruleNo;
    },
    token() {
      const token = { "Authorization": "bearer " + this.$store.state.token };
      return token;
    }
  },
  "watch": {
    "form.exchangeTimeType": {
      "handler": function(val) {
        this.datarange = (this.form.exchangeTimeType === 0);
        console.info(this.form.exchangeTimeType, this.datarange);
      },
      "immediate": true
    }
  },
  mounted() {
    // 规则编号不为空-查询规则详细信息
    if (this.ruleNo) {
      this.getEpRuleData();
    }
  },
  "methods": {
    /**
     * 获取选中的商品
     * @param list
     */
    getSelectProducts(list) {
      this.productInfo = list[0];
    },

    /**
     * 查询规则详细信息
     */
    getEpRuleData() {
      const params = "ruleNo=" + this.ruleNo;
      epRuleDetail(params).then(res => {
        if (res.code === 200) {
          // 返利规则名称
          if (res.data.itemDescDTO) {
            this.productInfo = res.data.itemDescDTO;
          }
          this.form = { ...this.form, ...res.data };
          // 0-时间段；1-截止时间
          if (this.form.exchangeStartTime) {
            this.form.exchangeTime = [ this.form.exchangeStartTime, this.form.exchangeEndTime ];
          }
          this.form.exchangeTimeType = Number(this.form.exchangeTimeType);
          this.imageUrl = this.form.itemDescDTO.imageUrl.map((item, index) => {
            return {
              "name": index,
              "url": item
            };
          });
        } else {
          this.$message.error("查询失败");
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    handleRemove(file) {
      this.imageUrl.forEach((item, index) => {
        if (file.name === item.name) {
          this.imageUrl.splice(index, 1);
        }
      });
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    onListPictureUploadSuccess(response, file) {
      if (response.code === 200) {
        this.imageUrl.push(file);
        // const { objectKey, objectUrl } = response.data;
        // this.imageUrl.push({ "name": objectKey, "url": objectUrl });
        console.log(response, file);
      } else {
        this.$message.error(response.msg);
      }
    },

    /**
     * 超出文件限制钩子
     */
    overLimit(files, fileList) {
      const length = fileList.length;
      this.$message.warning("文件超出最大" + length + "个限制");
    },

    handleDownload(file) {
      console.log(file);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        if (rowIndex % 3 === 0) {
          return {
            "rowspan": 3,
            "colspan": 1
          };
        }
        return {
          "rowspan": 0,
          "colspan": 0
        };
      }
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            "rowspan": 3,
            "colspan": 1
          };
        }
        return {
          "rowspan": 0,
          "colspan": 0
        };
      }
    },

    /**
     * 下一步
     * 保存信息并且跳转页面
     */
    next() {
      this.btnLoading = true;
      const postData = JSON.parse(JSON.stringify(this.form));
      if (postData.exchangeTimeType !== 0 && postData.exchangeTimeType !== 1) {
        this.$message.warning("请选择兑换限制时间方式");
        this.btnLoading = false;
        return;
      }
      // 兑换限制时间方式(0-时间段；1-截止时间)
      if (postData.exchangeTimeType) {
        postData.exchangeStartTime = "";
      } else if (postData.exchangeTime && postData.exchangeTime.length > 0) {
        postData.exchangeStartTime = this.$moment(postData.exchangeTime[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.exchangeEndTime = this.$moment(postData.exchangeTime[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      if (this.imageUrl.length === 0) {
        this.$message.warning("请上传图片");
        this.btnLoading = false;
        return;
      }
      postData.itemNo = this.productInfo.itemNo;
      postData.itemDescDTO = this.productInfo;
      postData.itemDescDTO = {
        ...postData.itemDescDTO,
        "imageUrl": this.imageUrl.map((item) => {
          if (item.response) {
            return item.response.data.objectUrl;
          }
          return item.url;
        })
      };
      updateEpRule(postData).then((res) => {
        this.$message.success("修改成功");
        this.$router.push({ "path": "/business/convert/rule/commodity" });
      }).catch((err) => {
        console.log(err);
        this.btnLoading = false;
      });
    }

  }
};