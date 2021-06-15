import { createRegionDict } from "@/api/system/area/area";
import { queryCityDictTree } from "@/api/system/area/city";
export default {
  "name": "AreaRegionPlus",
  "components": {
  },
  data() {
    return {
      "title": "新增区域",
      "toolBar": {
        "name": "",
        "description": ""
      },
      "treeData": [
        {
          "code": "",
          "isSelected": 2,
          "level": 1,
          "disabled": false,
          "name": "",
          "children": []
        }
      ],
      "defaultProps": {
        "children": "children",
        "label": "name"
      },
      "checkedMenuIds": [],
      "dialogVisible": false,
      "tableLoading": false,
      "regionNo": "",
      "cityDicts": []
    };
  },
  "computed": {},
  mounted() {
    this.initCityDictTree();
  },
  "methods": {
    /**
     * 查询城市字典表
     */
    initCityDictTree() {
      this.tableLoading = true;
      const params = {
        "level": 0
      };
      queryCityDictTree(params).then(res => {
        if (res.code === 200) {
          this.treeData = res.data.map(item => {
            // 选中
            if (item.isSelected === 1) {
              this.checkedMenuIds.push(item.code);
            }
            return {
              "code": item.code,
              "isSelected": item.isSelected,
              "level": item.level ? item.level : 1,
              "disabled": item.isSelected === 3,
              "name": item.name,
              "children": []
            };
          });
          this.tableLoading = false;
          this.$refs.tree.setCheckedKeys(this.checkedMenuIds);
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    /**
     * 点击查询下级
     * @param node
     */
    clickNode(node) {
      if (node.level !== null) {
        const params = {
          "level": node.level,
          "code": node.code
        };
        queryCityDictTree(params).then(res => {
          if (res.code === 200) {
            res.data = res.data.map(item => {
              if (item.isSelected === 1) {
                this.checkedMenuIds.push(item.code);
              }
              return {
                "code": item.code,
                "isSelected": item.isSelected,
                "level": item.level,
                "disabled": item.isSelected === 3,
                "name": item.name,
                "children": []
              };
            });
            this.$refs.tree.setCheckedKeys(this.checkedMenuIds);
            node.children = res.data;
            this.tableLoading = false;
          } else {
            this.$message.error("查询失败");
          }
        });
      } else {
        node.children = null;
      }
    },
    /**
     * 保存数据
     */
    saveAreaData() {
      if (this.checkedMenuIds.length === 0) {
        this.$message.warning("尚未选择区域！");
        return;
      }
      const cityDicts = this.cityDicts;
      const params = {
        "name": this.toolBar.name,
        "description": this.toolBar.description,
        "cityDicts": cityDicts
      };
      console.info(params);
      createRegionDict(params).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.$router.back();
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    /**
     * 节点选中变化处理
     * @param nodeData 节点
     * @param checked 是否选择
     * @param indeterminate 节点的子树中是否有被选中的节点
     */
    nodeChangeCheck(nodeData, checked, indeterminate) {
      if (checked) {
        if (!this.checkedMenuIds.includes(nodeData.code)) {
          this.checkedMenuIds.push(nodeData.code);
          this.cityDicts.push({
            "code": nodeData.code,
            "level": nodeData.level,
            "name": nodeData.name
          });
        }
      } else {
        if (this.checkedMenuIds.includes(nodeData.code)) {
          const checkedMenuIds2 = this.checkedMenuIds.filter(element => {
            return element !== nodeData.code;
          });
          this.checkedMenuIds = checkedMenuIds2;
          const cityDicts2 = this.cityDicts.filter(element => {
            return element.code !== nodeData.code;
          });
          this.cityDicts = cityDicts2;
        }
      }
    },

    /**
     * 取消
     */
    cancel() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    }
  }
};