<template>
  <div class="page-container">
    <div class="toolbar-box">
      <div>
        <div class="label">时间段搜索</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.dataRange"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">所在区域</div>
        <div class="content">
          <el-input clearable v-model="toolBar.area" placeholder="请输入所在区域"></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">所在区域</div>
        <div class="content">
          <el-cascader
              :options="areaOptions"
              placeholder="请选择省/市/区"
              v-model="toolBar.selectArea"
              @change="handleAreaChange"
          >
          </el-cascader>
        </div>
      </div>
      <el-button type="primary" class="special" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain class="special" @click="reset">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div id="aMapId" class="a-map" v-loading="mapLoading"></div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>