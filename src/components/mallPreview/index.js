import { delDisplay } from "@/api/system/app/window";
export default {
  "name": "mallPreview",
  "filters": {
    // 格式化span 布局
    formartSpan(value, index) {
      let spanSize = 24;
      switch (value) {
      case 1:
        spanSize = 24;
        break;
      case 3:
        // index = 0,3,6,9 是否被3整除
        if (index % 3 === 0) {
          spanSize = 24;
          break;
        }
        spanSize = 12;
        break;
      case 4:
        spanSize = 12;
        break;
      case 6:
        spanSize = 8;
        break;
      }
      return spanSize;
    }
  },
  "props": {
    // 数据
    "list": {
      "type": Array,
      "default": () => []
    }

  },
  data() {
    return {
      "windowActive": 0
    };
  },
  "computed": {

  },
  mounted() {

  },
  "methods": {
    /**
     *  选中某块
     */
    checkItem(index) {
      this.windowActive = index;
      this.$emit("checkAction", index);
    },
    /**
     *  新增或者查询成功回调默认选中行
     */
    addSuccess(type) {
      this.checkItem(0);
    },
    /**
     *  删除某块
     * */
    del(index, displayNo) {
      this.$confirm("是否确认删除？")
        .then(_ => {
          this.list.splice(index, 1);
          this.$emit("update:list", this.list);
          const params = {
            "displayNos": [ displayNo ],
            "pictureNo": this.$route.query.pictureNo
          };
          delDisplay(params).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");

              if (!this.list.length) {
                this.checkItem(-1);
              }

              if (this.list.length > 0) {
                this.checkItem(0);
              }
            } else {
              this.$message.error(res.msg);
            }
          }).catch((error) => {
            console.info(error);
            this.tableLoading = false;
          });
        })
        .catch(_ => { });
    }
  }
};