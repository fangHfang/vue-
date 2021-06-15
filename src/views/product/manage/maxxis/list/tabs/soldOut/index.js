export default {
  "name": "ProductManageSoldOut",
  "components": {
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
        "brand": {
          "value": "",
          "options": [
            { "label": "品牌1", "value": "1" },
            { "label": "品牌2", "value": "2" },
            { "label": "品牌3", "value": "3" }
          ]
        },
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "price": [
            { "label": "标准价", "value": "180" },
            { "label": "非标价", "value": "120" }
          ],
          "group": "促销打折",
          "stock": "30000",
          "return": "********返利规则",
          "integral": "********积分规则",
          "coupon": [ "5元优惠券", "8元优惠券" ],
          "shows": "23家",
          "create": "2021-01-11 16:50",
          "up": "2021-01-11 16:53"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "price": [
            { "label": "标准价", "value": "180" },
            { "label": "非标价", "value": "120" }
          ],
          "group": "促销打折",
          "stock": "30000",
          "return": "********返利规则",
          "integral": "********积分规则",
          "coupon": [ "5元优惠券", "8元优惠券" ],
          "shows": "23家",
          "create": "2021-01-11 16:50",
          "up": "2021-01-11 16:53"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "price": [
            { "label": "标准价", "value": "180" },
            { "label": "非标价", "value": "120" }
          ],
          "group": "促销打折",
          "stock": "30000",
          "return": "********返利规则",
          "integral": "********积分规则",
          "coupon": [ "5元优惠券", "8元优惠券" ],
          "shows": "23家",
          "create": "2021-01-11 16:50",
          "up": "2021-01-11 16:53"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "price": [
            { "label": "标准价", "value": "180" },
            { "label": "非标价", "value": "120" }
          ],
          "group": "促销打折",
          "stock": "30000",
          "return": "********返利规则",
          "integral": "********积分规则",
          "coupon": [ "5元优惠券", "8元优惠券" ],
          "shows": "23家",
          "create": "2021-01-11 16:50",
          "up": "2021-01-11 16:53"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "price": [
            { "label": "标准价", "value": "180" },
            { "label": "非标价", "value": "120" }
          ],
          "group": "促销打折",
          "stock": "30000",
          "return": "********返利规则",
          "integral": "********积分规则",
          "coupon": [ "5元优惠券", "8元优惠券" ],
          "shows": "23家",
          "create": "2021-01-11 16:50",
          "up": "2021-01-11 16:53"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "price": [
            { "label": "标准价", "value": "180" },
            { "label": "非标价", "value": "120" }
          ],
          "group": "促销打折",
          "stock": "30000",
          "return": "********返利规则",
          "integral": "********积分规则",
          "coupon": [ "5元优惠券", "8元优惠券" ],
          "shows": "23家",
          "create": "2021-01-11 16:50",
          "up": "2021-01-11 16:53"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "total": 0,
      "tableHeight": (document.body.clientHeight - 50 - 34 - 145 - 3 - 48 - 62)
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
     * 前往上架
     */
    toUpShelf() {
      this.$router.push({ "path": "/product/manage/maxxis/upShelf" });
    }
  }
};