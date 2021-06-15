import { save, searchList, modify } from "@/api/business/news/notice";
export default {
  "name": "businessNewsNoticeAdd",
  "components": {
  },
  data() {
    return {
      "input": "",
      "time": "",
      "toolBar": {
        "title": "",
        "noticeContent": "",
        "pushTime": "",
        "pushPlatform": {
          "value": "",
          "options": [
            { "label": "总部pc", "value": 0 },
            { "label": "经销商app", "value": 1 },
            { "label": "门店app", "value": 2 }
          ]
        },
        "createBy": "",
        "created": ""
      },
      "dialogVisible": false,
      "noticeNo": this.$route.query.noticeNo

    };
  },
  "computed": {},
  mounted() {
    if (this.noticeNo != null) {
      this.searchList();
    }
  },
  "methods": {

    /**
     * 返回首页
     */
    returnList() {
      this.$router.push({ "path": "/business/news/notice/list", "query": { "r": this.$getRandomValue() } });
    },

    /**
     * 保存
     */
    save() {
      if (this.toolBar.title === "") {
        return this.$message.info("门户公告标题不能为空 ！！！");
      }
      if (this.toolBar.noticeContent === "") {
        return this.$message.info("门户公告内容不能为空 ！！！");
      }
      if (this.toolBar.pushTime === "") {
        return this.$message.info("推送时间不能为空 ！！！");
      }
      if (this.toolBar.pushPlatform.value === "") {
        return this.$message.info("推送平台不能为空 ！！！");
      }
      const postData = {
        ...this.toolBar,
        "pushPlatform": this.toolBar.pushPlatform.value
      };
      if (this.toolBar.pushTime) {
        postData.pushTime = this.$moment(this.toolBar.pushTime).format("yyyy-MM-DD HH:mm:ss");
      }
      if (this.noticeNo === undefined) {
        save(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              "type": "success",
              "message": "保存成功!"
            });
            this.returnList();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      } else {
        postData.noticeNo = this.noticeNo;
        modify(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              "type": "success",
              "message": "保存成功!"
            });
            this.returnList();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      }
    },

    /**
     * 查询详情
     */

    searchList() {
      searchList(this.noticeNo).then(res => {
        if (res.code === 200) {
          this.toolBar.noticeContent = res.data.noticeContent;
          this.toolBar.pushTime = res.data.pushTime;
          this.toolBar.title = res.data.title;
          this.toolBar.pushPlatform.value = res.data.pushPlatform;
          this.toolBar.createBy = res.data.createBy;
          this.toolBar.created = res.data.created;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    }

  }
};