import { updateRegionDict, getRegionDictByRegionNo, updateRegionDictStatus } from "@/api/system/area/area";
import { queryCityDictTree } from "@/api/system/area/city";
export default {
  "name": "AreaRegionEdit",
  "components": {
  },
  data() {
    return {
      "title": "编辑区域",
      "toolBar": {
        "name": "",
        "description": "",
        "class": {
          "value": 0
        }
      },
      "treeData": [
        {
          "code": "1",
          "isSelected": 1,
          "level": 1,
          "disabled": false,
          "name": "",
          "children": []
        },
        {
          "code": "2",
          "isSelected": 1,
          "level": 1,
          "disabled": false,
          "name": "",
          "children": []
        },
        {
          "code": "3",
          "isSelected": 1,
          "level": 1,
          "disabled": false,
          "name": "",
          "children": []
        },
        {
          "code": "4",
          "isSelected": 1,
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
      "treeLoading": false,
      "cityDicts": []
    };
  },
  "computed": {
    regionNo() {
      return this.$store.state.systemAreaRegion.regionNo;
    },
    // 是否新增后跳过来的
    isNewAdd() {
      return this.$store.state.systemAreaRegion.isNewAdd;
    },
    // 是否详情
    isDetailView() {
      return this.$store.state.systemAreaRegion.isDetailView;
    }
  },
  mounted() {
    // console.info(this.isDetailView);
    this.initCityDictTree();
  },
  "methods": {
    /**
     * 查询城市字典表
     */
    initCityDictTree() {
      this.treeLoading = true;
      const params = {
        "regionNo": this.regionNo
      };
      queryCityDictTree(params).then(res => {
        if (res.code === 200) {
          const { areaDicts, name, description, relations } = res.data;
          this.toolBar.name = name;
          this.toolBar.description = description;
          const selectList = relations.filter((item) => { return item.isSeleted === 1; }).map((item) => { return item.code; });
          this.treeData = this.setDisabled(areaDicts);
          this.$refs.tree.setCheckedKeys(selectList);
          this.treeLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * @param areaList 全量的地区数据
     * @param disabledList 需要禁用的地区数据集合
     */
    setDisabled(areaList) {
      // debugger;
      areaList.map((area) => {
        area.children.map((child) => {
          const disabledList = child.children.filter((item) => { return item.disabled; });
          if (disabledList.length > 0) {
            area.disabled = true;
            child.disabled = true;
          }
        });
      });
      return areaList;
    },

    /**
     * 保存数据-修改方法
     */
    saveAreaData() {
      if (this.$refs.tree.getCheckedNodes().length === 0) {
        this.$message.warning("尚未选择区域！");
        return;
      }
      const { name, description } = this.toolBar;
      const list = this.$refs.tree.getCheckedNodes().filter((item) => { return !item.children || item.children.length === 0; }).map((item) => {
        return {
          "code": item.code,
          "name": item.name,
          "level": item.level
        };
      });
      const params = {
        "regionNo": this.regionNo,
        "cityDicts": list,
        name,
        description
      };
      console.info(params);
      updateRegionDict(params).then(async res => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          if (this.isNewAdd) {
            this.$store.commit("systemAreaRegion/areaRegionListSet", { "isNewAdd": false });
            // 新增的数据保存完之后 状态 改为 1启用状态
            const params = {
              "regionNo": this.regionNo,
              "status": 1
            };
            await updateRegionDictStatus(params);
          }

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
      const code = Number(nodeData.code);
      if (checked) {
        if (!this.checkedMenuIds.includes(code)) {
          this.checkedMenuIds.push(code);
          this.cityDicts.push({
            "code": code,
            "level": nodeData.level,
            "name": nodeData.name
          });
        }
      } else {
        if (this.checkedMenuIds.includes(code)) {
          const checkedMenuIds2 = this.checkedMenuIds.filter(element => {
            return element !== code;
          });
          this.checkedMenuIds = checkedMenuIds2;
          const cityDicts2 = this.cityDicts.filter(element => {
            return element.code !== code;
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
