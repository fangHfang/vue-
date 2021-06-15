<template>
  <div>
    <div class="inline-btn-box">
      <el-button v-if="showImport" type="primary" @click="showImportDialog">{{ importText }}</el-button>
      <el-button v-if="showExport" type="primary" @click="handleExport">{{ exportText }}</el-button>
    </div>
    <el-dialog
      title="数据导入"
      :visible.sync="dialogVisible"
      width="800px"
      destroy-on-close
      :before-close="handleClose">
      <div class="export-box">
        <i class="icon el-icon-circle-close" @click="handleClose"></i>
        <div class="first-row">
          <p>数据导入</p>
          <el-button style="margin-left:15px;" type="primary" @click="downloadTemplate">下载模板</el-button>
        </div>
        <div class="second-row">
          <p>说明：</p>
          <p>1、当导入大量数据时（一次导入数据不要过多，最好少于3000条），需要等待较长时间，请不要关闭或刷新窗口;</p>
        </div>
        <div class="third-row">
          <p>选择上传文件：</p>
          <el-button type="primary" @click="handleImport">选择文件</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { systemFileImport, systemFileExport } from "@/api/system/import";
export default {
  "name": "importExport",
  "props": {
    // 导入文字
    "importText": {
      "type": String,
      "default"() {
        return this.$text.import;
      }
    },
    // 导出文字
    "exportText": {
      "type": String,
      "default"() {
        return this.$text.export;
      }
    },
    // 是否展示导入按钮
    "showImport": {
      "type": Boolean,
      // 考虑到权限控制，按钮还是默认设置不显示吧
      "default": false
    },
    // 是否展示导出按钮
    "showExport": {
      "type": Boolean,
      // 考虑到权限控制，按钮还是默认设置不显示吧
      "default": false
    },
    // 导入请求链接
    "importUrl": {
      "type": String,
      "default": ""
    },
    // 导出请求链接
    "exportUrl": {
      "type": String,
      "default": ""
    },
    // 导出的文件名
    "exportFileName": {
      "type": String,
      "default": ""
    },
    // 导出的入参
    "exportGetData": {
      "type": [ Object, String ],
      "default"() {
        return {};
      }
    },
    // 导出的入参
    "exportPostData": {
      "type": Object,
      "default"() {
        return {};
      }
    },
    // 导出的请求方式
    "postMethod": {
      "type": String,
      "default"() {
        return "post";
      }
    },
    // 模板地址
    "templateUrl": {
      "type": String,
      "default"() {
        return "";
      }
    },
    // 是否是动态模板
    "isDynamicTemplate": {
      "type": Boolean,
      "default"() {
        return false;
      }
    }
  },
  data() {
    return {
      // 是否显示购物车弹窗
      "dialogVisible": false
    };
  },
  mounted() {
  },
  "methods": {
    /**
     * 导入
     */
    handleImport() {
      if (!this.importUrl) return;
      const that = this;
      const input = document.createElement("input");
      input.type = "file";
      input.click();
      input.onchange = () => {
        const file = input.files[0];
        // loading效果
        const loading = that.$loading({
          "lock": true,
          "text": "数据导入中···",
          "target": document.querySelector(".table-main .table")
        });
        // 第一步文件上传
        systemFileImport(this.importUrl, file).then((res) => {
          if (res.code === 200) {
            this.$message.success("导入成功");
            this.$emit("refreshTableData");
          } else {
            this.$message.error(res.msg || "导入失败");
          }
        }).finally(() => {
          loading.close();
        });
      };
    },
    /**
     * 显示导出弹窗
     */
    showImportDialog() {
      this.dialogVisible = true;
    },
    /**
     * 关闭导出弹窗
     */
    handleClose() {
      this.dialogVisible = false;
    },
    /**
     * 下载模板
     * 动态模板则调用接口
     */
    downloadTemplate() {
      if (this.templateUrl) {
        if (this.isDynamicTemplate) {
          systemFileExport(this.templateUrl, {}, "get").then((res) => {
            debugger;
            // res 为后台返回数据
            const blob = new Blob([ res ], {
              /*
              * 导出数据生成excel的格式设置
              * xlsx: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
              * xls: application/vnd.ms-excel
              */
              "type": "application/vnd.ms-excel;charset=UTF-8"
            });
            const eLink = document.createElement("a");
            const fileName = this.exportFileName.replace("导出", "模板");
            eLink.style.display = "none";
            eLink.download = fileName + ".xlsx";
            eLink.target = "_blank";
            eLink.href = window.URL.createObjectURL(blob);
            document.body.appendChild(eLink);
            eLink.click();
          }).catch((err) => {
            this.$message.error(err.msg || "下载模板失败");
            console.log(err, "err");
          });
        } else {
          const a = document.createElement("a");
          a.style.display = "none";
          a.target = "_blank";
          a.href = this.templateUrl;
          document.body.appendChild(a);
          a.click();
        }
      } else {
        this.$message.error("模板地址错误");
      }
    },
    /**
     * 导出
     */
    handleExport() {
      if (!this.exportUrl) return;
      // 开启遮罩
      const loading = this.$loading({
        "lock": true,
        "text": "正在导出，请稍后...",
        "target": document.querySelector(".table-main .table")
      });
      const suffix = typeof this.exportGetData === "string" ? this.exportGetData : this.$jsonFormat(this.exportGetData);
      const postUrl = this.exportUrl + suffix;
      systemFileExport(postUrl, this.exportPostData, this.postMethod).then((res) => {
        try {
          // res 为后台返回数据
          const blob = new Blob([ res ], {
            /*
             * 导出数据生成excel的格式设置
             * xlsx: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
             * xls: application/vnd.ms-excel
             */
            "type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          });
          const eLink = document.createElement("a");
          const now = this.$moment(new Date()).format("yyyyMMDDHHmmss");
          const fileName = this.exportFileName + "-" + now;
          eLink.style.display = "none";
          eLink.download = fileName + ".xlsx";
          eLink.target = "_blank";
          eLink.href = window.URL.createObjectURL(blob);
          document.body.appendChild(eLink);
          eLink.click();
        } catch (err) {
          this.$message.error(err.msg || "导出失败");
        }
      }).finally(() => {
        loading.close();
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .inline-btn-box{
    display:inline-block;
  }
  ::v-deep{
    .el-dialog__header{
      display: none;
    }
    .el-dialog__body{
      padding: 10px 20px 15px;
    }
  }
  .export-box{
    .first-row{
      display: flex;
      align-items: center;
      border-bottom: 2px solid #dadada;
      padding-bottom: 5px;
      >p{
        font-size: 18px;
        font-weight: 600;
        color: #000;
      }
    }
    .second-row{
      margin: 10px 0;
      color: #fb7373;
      border-bottom: 2px solid #dadada;
      padding-bottom: 10px;
    }
    .third-row{
      >p{
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }
      ::v-deep{
        .el-button{
          margin: 5px 0 0 0;
        }
      }
    }
    .el-icon-circle-close{
      position: absolute;
      font-size: 20px;
      padding: 10px;
      right: 10px;
      top:0;
      cursor: pointer;
    }
  }
</style>
