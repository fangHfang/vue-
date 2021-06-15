import { roleDetail, getResourceTree } from "@/api/system/account/role";
export default {
  "name": "SystemStructureRoleAdd",
  "components": {
  },
  "props": {
    "roleNo": {
      "type": String,
      "default": ""
    },
    "mark": {
      "type": String,
      "default": "add"
    }
  },
  data() {
    return {
      "data": [],
      "isShow": true,
      "name": "",
      "configurable": true,
      "toolBar": {
        "name": "",
        "tag": {
          "value": 0,
          "options": [
            { "label": "总部", "value": 0 },
            { "label": "门店", "value": 2 }
          ]
        }
      },
      "roleAdd": [],
      "editRoleNo": "",
      "remark": "",
      "defaultProps": {
        "children": "children",
        "label": "name"
      },
      "loading": false
    };
  },
  "watch": {
    "roleNo": {
      "handler": function(val, oldVal) {
        this.editRoleNo = val;
        this.getRoleDetail(val);
      },
      "immediate": true
    }
  },
  mounted() {
    // 资源树
    if (this.mark === "add") {
      this.toolBar.tag.value = 0;
      this.getTreeData(0);
    }
  },
  "methods": {
    /**
     * 查询资源树
     * @param val 角色应用类型 0总部，1经销商，2门店
     * @param roleResourceDTOList 已保存过的角色应用类型数组
     */
    getTreeData(val, roleResourceDTOList) {
      // 默认appType: 总部
      const param = "appType=" + val;
      this.loading = true;
      getResourceTree(param).then(res => {
        if (res.code === 200) {
          // 原先div结构展示
          this.roleAdd = res.data;
          // 加载树
          this.data = res.data;
          // 校验角色类型是否为空
          const treeData = [];
          if (roleResourceDTOList) {
            roleResourceDTOList.forEach(element => {
              treeData.push(element.resourceNo);
            });
          }
          // 回显已勾选的权限配置
          this.$refs.tree.setCheckedKeys(treeData);
        } else {
          this.$message.error("资源树查询失败");
        }
        this.loading = false;
      });
    },
    /**
     * 当选中父节点时下面所有子节点选中；当选中子节点时，它的父节点选中；
     * 当取消子节点选中时，它的父级不变
     * @param data
     */
    getCurrentNode(data) {
      const node = this.$refs.tree.getNode(data);
      // console.log(data,node)
      this.childNodes(node);
      this.parentNodes(node);
    },
    childNodes(node) {
      const len = node.childNodes.length;
      for (let i = 0;i < len;i++) {
        node.childNodes[i].checked = node.checked;
        this.childNodes(node.childNodes[i]);
      }
    },
    parentNodes(node) {
      if (node.parent) {
        for (const key in node) {
          if (key === "parent") {
            node[key].checked = true;
            this.parentNodes(node[key]);
          }
        }
      }
    },
    /**
     * 根据角色属性查询资源树
     */
    changeAppType() {
      const type = this.toolBar.tag.value;
      this.getTreeData(type, null);
    },

    /**
     * 查询角色信息
     */
    getRoleDetail(roleNo) {
      if (!roleNo) {
        return;
      }
      const param = "roleNo=" + roleNo;
      roleDetail(param).then(res => {
        if (res.code === 200) {
          // 角色名称
          this.name = res.data.roleInfo.name;
          // 角色备注
          this.remark = res.data.roleInfo.remarks;
          // 可配置下级权限（门店）
          this.configurable = res.data.roleInfo.configurable === 0;
          // 角色属性
          this.toolBar.tag.value = res.data.roleInfo.appType;
          // 加载资源树
          this.getTreeData(res.data.roleInfo.appType, res.data.roleResourceDTOList);
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 显示与隐藏
     * @param {*} val
     */
    row(val) {
      if (val === this.isShow) {
        this.isShow = !this.isShow;
      } else {
        this.isShow = val;
      }
    }
  }
};