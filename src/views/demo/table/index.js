import Form from "../form/index.vue";
export default {
  "name": "DemoTable",
  "components": {
    Form
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
        "spec": {
          "value": "",
          "options": [
            { "label": "规格1", "value": "1" },
            { "label": "规格2", "value": "2" },
            { "label": "规格3", "value": "3" }
          ]
        },
        "brand": "",
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
          "state": 0,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 1,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 2,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false
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
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};