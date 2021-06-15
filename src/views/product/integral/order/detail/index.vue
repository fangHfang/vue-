<template>
  <div class="page">
    <div class="detail-box">
      <span class="title">积分商品订单详情</span>
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
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="content-col">
                <span>门店编号</span>
                <span>{{detail.storeNo}}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="content-col">
                <span>门店名称</span>
                <span>{{detail.storeName}}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="content-col">
                <span>门店标签</span>
                <span>{{detail.storeTag}}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="content-col">
                <span>花费积分</span>
                <span>-{{detail.consumeIntegrationAmount}}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="content-col">
                <span>发货状态</span>
                <span>{{detail.orderReceiveStatus}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <div class="content-col">
                <span>收货地址</span>
                <el-cascader
                  v-if="isModifyAddress === true"
                  size="large"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                  class="cascader"
                >
                </el-cascader>
                <el-autocomplete class="autocomplete" v-if="isModifyAddress === true" v-model="detail.receiveAddress" :fetch-suggestions="querySearch"></el-autocomplete>
                <span v-else>{{detail.receiveAddress}}</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="content-col content-col-btn content-col-save" v-if="isModifyAddress">
                <el-button type="text" size="small" @click="save('address')">&nbsp;确定</el-button>
                <el-button type="text" size="small" @click="close('address')">&nbsp;取消</el-button>
              </div>
              <div class="content-col content-col-btn" v-else>
                <el-button v-if="detail.orderReceiveStatus === '未发货'" type="text" size="small" @click="modify('address')">&nbsp;修改地址</el-button>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="content-col">
                <span>快递单号</span>
                <el-input v-if="isModifyOrder||detail.orderReceiveStatus === '未发货'" v-model="detail.courierNo" :placeholder="detail.courierNo"></el-input>
                <span v-else>{{detail.courierNo}}</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="content-col content-col-btn content-col-save" v-if="isModifyOrder">
                <el-button type="text" size="small" @click="save('order')">&nbsp;确定</el-button>
                <el-button type="text" size="small" @click="close('order')">&nbsp;取消</el-button>
              </div>
              <div class="content-col content-col-btn" v-else>
                <el-button v-if="detail.orderReceiveStatus === '已发货'" type="text" size="small" @click="modify('order')">&nbsp;修改单号</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-item">
        <span class="title">兑换商品</span>
        <div class="merchandise-store-box">
          <div class="table-main">
            <div class="table">
              <el-table
                :data="detail.orderDetailList"
                max-height="500"
                header-cell-class-name="table-header-item"
              >
                <el-table-column
                  fixed="left"
                  type="selection"
                  width="55"
                >
                </el-table-column>
                <el-table-column
                  type="index"
                  label="序号"
                  width="60"
                >
                </el-table-column>
                <el-table-column
                  prop="itemNo"
                  label="商品code"
                  width="180"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="itemName"
                  label="商品名称"
                  width="300"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="itemPrice"
                  label="单个消耗积分"
                  width="250"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="itemQuantity"
                  label="商品数量"
                  width="200"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="consumeIntegrationAmount"
                  label="总消耗积分"
                  width="200"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="bottom-btn">
            <el-button type="primary" v-if="detail.orderReceiveStatus === '未发货' && permission.includes('ZBPCC01080402') " @click="submitDeliver">发货</el-button>
            <el-button @click="$router.back()">{{ $text.cancel }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "index";
</style>
