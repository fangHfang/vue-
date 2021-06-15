<template>
  <div class="page-content">
    <el-form :model="tableBar" :rules="rules" ref="form" label-width="90px">
    <h3 class="page-name">规则名称</h3>
    <div class="del-form">
      <div class="item-row">
      <el-form-item label="规则名称" prop="ruleName">
        <el-input clearable :value="tableBar.ruleName" placeholder="请输入规则名称" style="width: 25%" @input="e=>tableBar.ruleName=$validForbid(e)"></el-input>
      </el-form-item>
      </div>
    </div>
    <div class="item-row item-row-link"></div>
    <h3 class="page-name">商城商品库存显示规则</h3>
    <div class="item-box">
    <div class="del-form">
      <div class="item-row" v-for="(item,index) in tableBar.shopDetails" :key="index">
        <el-form-item label="商品数量" prop="shopDetailsCount" >
        <div class="el-input-flex">
          <el-input @blur="endShopDetailsBlur($event,index)" type="text" v-model="item.startCount" placeholder="起始量"></el-input>
          <span>~</span>
          <el-input @blur="endShopDetailsBlur($event,index)" type="text" v-model="item.endCount" @input="changeInput(index)" placeholder="终止量"></el-input>
        </div>
        </el-form-item>
         <el-form-item label="显示文本" prop="shopDetailsTxt" >
          <div class="el-input-flex">
          <el-input clearable :value="item.displayTxt" placeholder="显示文本" @input="e=>item.displayTxt=$validForbid(e)"></el-input>
          <i @click="removeLinkItem(index)" class="el-icon-remove-outline"></i>
        </div>
        </el-form-item>
      </div>
      <div class="item-row item-row-icon" @click="addLinkItem">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
    </div>
    </div>
  <div class="item-row item-row-link"></div>
  <h3 class="page-name">积分商城商品库存显示规则</h3>
  <div class="item-box">
    <div class="del-form">
      <div class="item-row" v-for="(item,index) in tableBar.pointDetails" :key="index">
        <el-form-item label="商品数量" prop="pointDetailsCount" >
        <div class="el-input-flex">
          <el-input @blur="endPointDetailsBlur($event,index)" type="text" v-model="item.startCount" @input="changepointDetails(index)" placeholder="起始量"></el-input>
          <span>~</span>
          <el-input @blur="endPointDetailsBlur($event,index)" type="text" v-model="item.endCount" @input="changepointDetails(index)" placeholder="终止量"></el-input>
        </div>
        </el-form-item>
         <el-form-item label="显示文本" prop="pointDetailsTxt" >
          <div class="el-input-flex">
          <el-input clearable :value="item.displayTxt" placeholder="显示文本" @input="e=>item.displayTxt=$validForbid(e)"></el-input>
          <i @click="removeLinkItemNum(index)" class="el-icon-remove-outline"></i>
        </div>
        </el-form-item>
      </div>
      <div class="item-row item-row-icon" @click="addLinkItemNum">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
    </div>
    <div class="item-row item-row-link"></div>
    <div class="item-row">
      <el-button type="primary" @click="saveStockDisplay">确认生效</el-button>
      <el-button type="primary" @click="cleanData" plain>{{ $text.reset }}</el-button>
      <el-button @click="back">{{ $text.cancel }}</el-button>
    </div>
  </div>
  </el-form>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>