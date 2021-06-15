<template>
  <div class="page-content">
      <h3 class="page-name">商品组合活动订单详情</h3>
      <el-form :model="form" ref="form" label-width="80px">
      <div class="item-box">
        <h4 class="item-title">基础信息</h4>
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店code">
                <div class="el-font">M312321312</div>
              </el-form-item>
              <el-form-item label="门店名称">
                 <div class="el-font">小型乘用车轮胎</div>
              </el-form-item>
              <el-form-item label="经销商名称">
                <div class="el-font">玛吉斯</div>
              </el-form-item>
              <el-form-item label="经销商编号">
                <div class="el-font">2131231212312321</div>
              </el-form-item>
              <el-form-item label="订单编号">
                <div class="el-font">56456</div>
              </el-form-item>
              <el-form-item label="订单状态">
                <div class="el-font"> <span class="point"></span> 已完成</div>
              </el-form-item>
              <el-form-item label="订货时间">
                <div class="el-font">2020-11-12 13:31:12</div>
              </el-form-item>
               <el-form-item label="支付状态">
                <div class="el-font"> <span class="point"></span> 已支付</div>
              </el-form-item>
              <el-form-item label="门店地址">
                <div class="el-font">上海市杨浦区江湾路2223</div>
              </el-form-item>
            </div>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">支付信息</h4>
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="支付总额">
                <div class="el-font">399.00元</div>
              </el-form-item>
              <el-form-item label="优惠卷总优惠额">
                 <div class="el-font">-30.00元</div>
              </el-form-item>
              <el-form-item label="返利总金额">
                <div class="el-font">-10.00元</div>
              </el-form-item>
              <el-form-item label="支付金额">
                <div class="el-font">389.00元</div>
              </el-form-item>
              <el-form-item label="支付方式">
                <div class="el-font">微信</div>
              </el-form-item>
            </div>
            <div class="pay-inform">
              <el-form-item label="使用优惠劵" style="width:100%">
                <div class="el-font">
                  <span>A活动优惠劵</span>
                  <span>3871298379</span>
                  <span>优惠金额</span>
                  <span>10.00元 </span>
                </div>
                <div class="el-font">
                  <span>A活动优惠劵</span>
                  <span>3871298379</span>
                  <span>优惠金额</span>
                  <span>10.00元 </span>
                </div>
                <div class="el-font">
                  <span>A活动优惠劵</span>
                  <span>3871298379</span>
                  <span>优惠金额</span>
                  <span>10.00元 </span>
                </div>
              </el-form-item>
            </div>
        </div>
      </div>
      <div class="item-box">
         <div class="actionbar">
            <h4 class="item-title">固定商品信息</h4>
            <div class="select" @click="isShow">
              <span v-if="openSelect">收起</span>
              <span v-else>展开</span>
              <i class="el-icon-arrow-up" v-if="open"></i>
              <i class="el-icon-arrow-down" v-else></i>
            </div>
          </div>
        <div class="table-main" v-if="open">
          <div class="table">
              <el-table
                :data="form.couponTableData"
                header-cell-class-name="table-header-item"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="商品名称"
                  width="300"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="info"
                  label="数量"
                  width="60"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="抢购价格（元）"
                  width="140"
                  show-overflow-tooltip
                >
                </el-table-column>
                 <el-table-column
                  prop="classification"
                  label="商品分类"
                  width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="brand"
                  label="品牌"
                  width="130"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="spec"
                  label="规格"
                  width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="入库状态"
                  width="120"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <div>
                      <i-status :type="['error', 'success'][scope.row.state]" :message="['未入库', '已入库'][scope.row.state]" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="returnPrice"
                  label="返利金额（元）"
                  width="140"
                  show-overflow-tooltip
                >
                </el-table-column> <el-table-column
                  prop="income"
                  label="实收金额（元）"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
          </div>
        </div>
      </div>
      <div class="item-box">
         <div class="actionbar">
            <h4 class="item-title">自选商品信息</h4>
            <div class="select" @click="isShowSelect">
              <span v-if="openSelect">收起</span>
              <span v-else>展开</span>
              <i class="el-icon-arrow-up" v-if="openSelect"></i>
              <i class="el-icon-arrow-down" v-else></i>
            </div>
          </div>
        <div class="table-main" v-if="openSelect">
          <div class="table">
              <el-table
                :data="form.couponTableData"
                header-cell-class-name="table-header-item"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="商品名称"
                  width="300"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="info"
                  label="数量"
                  width="60"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="抢购价格（元）"
                  width="140"
                  show-overflow-tooltip
                >
                </el-table-column>
                 <el-table-column
                  prop="classification"
                  label="商品分类"
                  width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="brand"
                  label="品牌"
                  width="130"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="spec"
                  label="规格"
                  width="120"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="入库状态"
                  width="120"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <div>
                      <i-status :type="['error', 'success'][scope.row.state]" :message="['未入库', '已入库'][scope.row.state]" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="returnPrice"
                  label="返利金额（元）"
                  width="140"
                  show-overflow-tooltip
                >
                </el-table-column> <el-table-column
                  prop="income"
                  label="实收金额（元）"
                  show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
          </div>
        </div>
      </div>
      </el-form>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>