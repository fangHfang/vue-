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
          "id": "1",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试",
          "children": [ {
            "id": "2-1",
            "name": "玛吉斯VS5 SUV轮胎",
            "class": "二级分类名称",
            "brand": "玛吉斯123",
            "tag": "标签1",
            "spec": "规格1",
            "state": 0,
            "desc": "测试1测试测试",
            "children": [ {
              "id": "3-1",
              "name": "玛吉斯VS5 SUV轮胎",
              "class": "三级分类名称",
              "brand": "玛吉斯123",
              "tag": "标签1",
              "spec": "规格1",
              "state": 0,
              "desc": "测试1测试测试",
              "children": []
            }, {
              "id": "3-2",
              "name": "玛吉斯VS5 SUV轮胎",
              "class": "三级分类名称",
              "brand": "玛吉斯123",
              "tag": "标签1",
              "spec": "规格1",
              "state": 0,
              "desc": "测试1测试测试",
              "children": []
            } ]
          }, {
            "id": "2-2",
            "name": "玛吉斯VS5 SUV轮胎",
            "class": "二级分类名称",
            "brand": "玛吉斯123",
            "tag": "标签1",
            "spec": "规格1",
            "state": 0,
            "desc": "测试1测试测试",
            "children": []
          } ]
        },
        {
          "id": "2",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 1,
          "desc": "测试1测试测试",
          "children": []
        },
        {
          "id": "3",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 2,
          "desc": "测试1测试测试",
          "children": []
        },
        {
          "id": "4",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试",
          "children": []
        },
        {
          "id": "5",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试",
          "children": []
        },
        {
          "id": "6",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试",
          "children": []
        },
        {
          "id": "7",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试",
          "children": []
        },
        {
          "id": "8",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级分类名称",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "state": 0,
          "desc": "测试1测试测试",
          "children": []
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      // 该数组中的值 都会在列表中进行隐藏
      "foldList": []
    };
  },
  "computed": {
    // 记录属性结构的首层节点
    foldAllList() {
      return this.tableData.map(x => x.__identity);
    }
  },
  created() {
    this.tableData = this.formatConversion([], this.tableData);
    console.log(this.tableData);
    this.foldList = this.foldAllList;
  },
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
    },

    /**
      * 切换展开 还是折叠
      * @param:params  当前点击行的数据
    */
    toggleFoldingStatus(params) {
      this.foldList.includes(params.__identity) ? this.foldList.splice(this.foldList.indexOf(params.__identity), 1) : this.foldList.push(params.__identity);
    },

    /**
      * 该方法会对每一行数据都做判断 如果foldList 列表中的元素 也存在与当前行的 __family列表中  则该行不展示
    */
    toggleDisplayTr({ row, index }) {
      const stylejson = {};
      for (let i = 0;i < this.foldList.length;i++) {
        const item = this.foldList[i];
        // 如果foldList中元素存在于 row.__family中，则该行隐藏。  如果该行的自身标识等于隐藏元素，则代表该元素就是折叠点
        if (row.__family.includes(item) && row.__identity !== item) {
          stylejson.display = "none";
          return stylejson;
        }
      }
      return "background:#ff0000";
    },

    /**
      *  如果子集长度为0，则不返回字体图标。
      *  如果子集长度为不为0，根据foldList是否存在当前节点的标识返回相应的折叠或展开图标
      *  关于class说明：permission_placeholder返回一个占位符，具体查看class
      * @param: params 当前行的数据对象
    */
    toggleFoldingClass(params) {
      return params.children.length === 0 ? "permission_placeholder" : (this.foldList.indexOf(params.__identity) === -1 ? "iconfont jianshao" : "iconfont jiashu");
    },

    /**
      * 将树形接口数据扁平化
      * @param: parent 为当前累计的数组  也是最后返回的数组
      * @param: children 为当前节点仍需继续扁平子节点的数据
      * @param: index 默认等于0， 用于在递归中进行累计叠加 用于层级标识
      * @param: family 装有当前包含元素自身的所有父级 身份标识
      * @param: elderIdentity 父级的  唯一身份标识
    */
    formatConversion(parent, children, index = 0, family = [], elderIdentity = "") {
    // children如果长度等于0，则代表已经到了最低层
    // let page = (this.startPage - 1) * 10
      if (children.length > 0) {
        children.map((x, i) => {
        // 设置 __level 标志位 用于展示区分层级
          this.$set(x, "__level", index);
          this.$set(x, "__index", i);
          // 设置 __family 为家族关系 为所有父级，包含本身在内
          this.$set(x, "__family", [ ...family, elderIdentity + "-" + i ]);
          // 本身的唯一标识  可以理解为个人的身份证咯 一定唯一。
          this.$set(x, "__identity", elderIdentity + "-" + i);
          parent.push(x);
          // 如果仍有子集，则进行递归
          if (x.children.length > 0) this.formatConversion(parent, x.children, index + 1, [ ...family, elderIdentity + "-" + i ], elderIdentity + "-" + i);
        });
      } return parent;
    }

  }
};