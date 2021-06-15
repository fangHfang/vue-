export default {
  "name": "addRange",
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "toolBar": {
        "productCode": {
          "value": "",
          "options": [
            { "label": "产品一", "value": "1" },
            { "label": "产品二", "value": "2" },
            { "label": "产品三", "value": "3" }
          ]
        },
        "tireSpec": {
          "value": "",
          "options": [
            { "label": "规格一", "value": "1" },
            { "label": "规格二", "value": "2" },
            { "label": "规格三", "value": "3" }
          ]
        },
        "tireInch": {
          "value": "",
          "options": [
            { "label": "尺寸一", "value": "1" },
            { "label": "尺寸二", "value": "2" },
            { "label": "尺寸三", "value": "3" }
          ]
        },
        "similarPattern": {
          "value": "",
          "options": [
            { "label": "花纹一", "value": "1" },
            { "label": "花纹二", "value": "2" },
            { "label": "花纹三", "value": "3" }
          ]
        },
        "tireSign": {
          "value": "",
          "options": [
            { "label": "标志一", "value": "1" },
            { "label": "标志二", "value": "2" },
            { "label": "标志三", "value": "3" }
          ]
        },
        "tireBrand": {
          "value": "",
          "options": [
            { "label": "品牌一", "value": "1" },
            { "label": "品牌二", "value": "2" },
            { "label": "品牌三", "value": "3" }
          ]
        },
        "tireLoad": {
          "value": "",
          "options": [
            { "label": "载重一", "value": "1" },
            { "label": "载重二", "value": "2" },
            { "label": "载重三", "value": "3" }
          ]
        },
        "searchField": {
          "value": "",
          "options": [
            { "label": "字段一", "value": "1" },
            { "label": "字段二", "value": "2" },
            { "label": "字段三", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "index": "1",
          "productCode": "tp00241100",
          "specDetail": "T135/70 R18 M9...",
          "spec": "T135/70 R18",
          "inch": "17",
          "pattern": "M9500N",
          "similarPattern": "M9500N",
          "tireBrand": "玛吉斯",
          "tireLoad": "10LT",
          "tireSign": "白线字",
          "hierarchy": "M9",
          "speed": "205/122",
          "tireType": "PCR",
          "searchField": "13838383388"
        }, {
          "index": "2",
          "productCode": "tp00241100",
          "specDetail": "T135/70 R18 M9...",
          "spec": "T135/70 R18",
          "inch": "17",
          "pattern": "M9500N",
          "similarPattern": "M9500N",
          "tireBrand": "玛吉斯",
          "tireLoad": "10LT",
          "tireSign": "白线字",
          "hierarchy": "M9",
          "speed": "205/122",
          "tireType": "PCR",
          "searchField": "13838383388"
        }, {
          "index": "3",
          "productCode": "tp00241100",
          "specDetail": "T135/70 R18 M9...",
          "spec": "T135/70 R18",
          "inch": "17",
          "pattern": "M9500N",
          "similarPattern": "M9500N",
          "tireBrand": "玛吉斯",
          "tireLoad": "10LT",
          "tireSign": "白线字",
          "hierarchy": "M9",
          "speed": "205/122",
          "tireType": "PCR",
          "searchField": "13838383388"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  "computed": {},
  mounted() {

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
       * 添加
       */
    save() {
      this.close();
    },
    /**
       * 关闭弹窗
       */
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};