// src/views/system/other/version/list/index
import { newVersion, queryVersionDetailById, pageSearchVersion } from "@/api/system/other/version";
export default {
  "name": "SystemOtherVersionAdd",
  "components": {
  },
  data() {
    return {
      "form": {
        "createBy": "",
        "editionNo": "",
        "updateContent": "",
        "updateNum": "",
        "updateType": "",
        "forceUpdate": "0",
        "status": 0,
        "startImgUrl": ""
      },
      "toolBar": {
        "updateType": {
          "options": [
            { "label": "总部", "value": "0" },
            { "label": "经销商Android-APP", "value": "1" },
            { "label": "经销商IOS-APP", "value": "2" },
            { "label": "门店Android-APP", "value": "7" },
            { "label": "门店IOS-APP", "value": "9" }
          ]
        }
      },
      "dialogImageUrl": "",
      "dialogVisible": false,
      "disabled": false,
      "startImgUrlList": [],
      "startImgUrlShowList": [],
      "rules": {
        "editionNo": [
          { "required": true, "message": "请输入版本号", "trigger": "blur" }
        ],
        "updateType": [
          { "required": true, "message": "请选择更新类型", "trigger": "change" }
        ]
        // "updateNum": [
        //   { "required": true, "message": "请输入APP上架更新号", "trigger": "change" }
        // ]
      }
    };
  },
  "computed": {
    versionId() {
      return this.$store.state.systemOtherVersion.versionId;
    },
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  mounted() {
    if (this.versionId) {
      this.getVersionDetail();
    }
  },
  "methods": {
    /**
     * 查询版本数据
     */
    getVersionDetail() {
      const params = {
        "id": this.versionId
      };
      queryVersionDetailById(params).then(res => {
        if (res.code === 200) {
          // 标签类型
          this.form = { ...this.form, ...res.data };
          if (this.form.updateType !== null) {
            this.form.updateType = this.form.updateType + "";
          }
          const startImgUrlStr = res.data.startImgUrl;
          const startImgUrlShowList = JSON.parse(startImgUrlStr).map(element => {
            return { "url": element.img ? element.img : element.url };
          });
          this.startImgUrlShowList = startImgUrlShowList.reverse();
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
    },

    /**
     * 创建版本数据
     * @param status 上架状态：1-上架，0-下架
     */
    addNewVersion(status, form) {
      console.log(this.form.updateNum);
      if (this.form.updateType !== 0 && this.form.updateNum === "") {
        return this.$message.info("请输入APP上架更新号");
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          const startImgUrlArray = [];
          if (this.startImgUrlList && this.startImgUrlList.length > 0) {
            this.startImgUrlList.forEach((element, index) => {
              startImgUrlArray.push({
                "url": element,
                "sort": index
              });
            });
          }
          this.form.startImgUrl = JSON.stringify(startImgUrlArray);
          const params = {
            "createBy": this.form.createBy,
            "editionNo": this.form.editionNo,
            "forceUpdate": this.form.forceUpdate,
            "startImgUrl": this.form.startImgUrl,
            "status": status,
            "updateContent": this.form.updateContent,
            "updateNum": this.form.updateNum,
            "updateType": this.form.updateType
          };
          newVersion(params).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.$router.back();
            } else {
              this.$message.error(res.msg);
            }
          }).catch((error) => {
            console.log(error);
          });
        } else {
          return false;
        }
      });
    },

    /**
     * 返回
    */
    back() {
      this.$router.back();
    },
    /**
     * 删除图片
     * @param file
     */
    handleRemove(file) {
      console.log(file);
      const startImgUrlList2 = [];
      this.startImgUrlList.forEach(element => {
        if (file.url !== element) {
          startImgUrlList2.push(element);
        }
      });
      this.startImgUrlList = startImgUrlList2;
    },
    /**
     * 图片预览
     * @param file
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 图片下载
     * @param file
     */
    handleDownload(file) {
      console.log(file);
    },
    /**
     * 商品图片上传成功钩子
     */
    handleAvatarSuccess(res, file) {
      this.startImgUrlList.push(res.data.objectUrl);
    }
  }
};
