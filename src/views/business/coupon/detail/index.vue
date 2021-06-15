<template>
  <div class="page">
    <div class="detail-box">
      <span class="title">兑换商品订单详情</span>
      <div class="detail-item">
        <span class="title">积分信息</span>
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>兑换单号</span>
                <span>{{detail.orderNo}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>发生时间</span>
                <span>{{detail.orderTime}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>快递单号</span>
                <span>{{detail.courierNo}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>门店编号</span>
                <span>{{detail.storeNo}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>门店名称</span>
                <span>{{detail.storeName}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>花费兑换点</span>
                <span>{{detail.consumeExchangeAmount}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>状态</span>
                <span >
                  {{detail.orderReceiveStatus}}
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-item">
        <span class="title">兑换商品</span>
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>商品名称</span>
                <span>{{detail.orderDetailList[0].itemName}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>商品品牌</span>

                <span>{{detail.orderDetailList[0].itemBrand}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>商品分类</span>
                <span>{{detail.orderDetailList[0].itemCategoryBackend}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>商品规格</span>
                <span>{{detail.orderDetailList[0].itemSpecDetail}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>兑换点单价</span>
                <span>{{detail.orderDetailList[0].itemPrice}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>兑换数量</span>
                <span>{{detail.orderDetailList[0].itemQuantity}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col" style="flex-direction: column;align-items: self-start;">
                <span style="margin-bottom: 10px;">商品介绍</span>
                <img class="img" :src="detail.orderDetailList[0].itemImageUrl" alt="">
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button @click="back">{{ $text.cancel }}</el-button>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "index";
</style>
