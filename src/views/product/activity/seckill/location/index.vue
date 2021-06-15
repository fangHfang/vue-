<template>
  <el-dialog
    class="dialog-choose-box"
    title="精确定位设置"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="512px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
            <div class="label">地址信息</div>
            <div class="content">
                <el-cascader
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                >
                </el-cascader>
            </div>
          </div>
          <div>
            <div class="label">详细地址</div>
            <div class="content">
              <el-autocomplete
                v-model="mapLocation.address"
                :fetch-suggestions="querySearch"
                placeholder="请输入详细地址"
                style="width: 100%;height:100%"
                :trigger-on-focus="false"
                @select="handleSelect"
              />
            </div>
          </div>
          <div>
            <div class="label">定位范围</div>
            <div class="content">
<!--              <el-select clearable v-model="mapLocation.range" placeholder="请选择" @change="scaleChange" style="width:200px">-->
<!--                <el-option-->
<!--                    v-for="item in scaleOptions"-->
<!--                    :key="item.value"-->
<!--                    :label="item.label"-->
<!--                    :value="item.label">-->
<!--                </el-option>-->
<!--              </el-select>-->
              <el-input type="number" style="width:200px" v-model="mapLocation.range"/>
              <span class="tips">米</span>
            </div>
          </div>
          <div>
            <div class="label">定位显示</div>
            <div class="content map-content">
              <div id="aMapId" class="a-map" v-loading="mapLoading"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="save">{{ $text.paginationGo }}</el-button>
      <el-button @click="close">{{ $text.cancel }}</el-button>
    </div>
  </el-dialog>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .el-message-box__title > span {
    font-size: 16px;
    font-weight: 600;
  }

  .el-dialog__body .table-main {
    padding: 0 20px;
  }

  .dialog-choose-box .el-dialog__body {
    padding: 20px 0;
  }

</style>