<template>
  <div class="page-content">
    <h3 class="page-name">新增卡券</h3>
    <div class="del-form">
      <div class="item-box">
        <h4 class="item-title">卡券基础信息</h4>
        <div class="item-row">
          <div>
            <div class="label">卡券类别</div>
            <div class="content">
              <el-select
                      v-model="toolBar.category.value"
                      placeholder="" >
                <el-option v-for="item in toolBar.category.options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="item-row">
          <div>
            <div class="label">卡券名称</div>
            <el-input v-model="toolBar.name"
                      placeholder=""></el-input>
          </div>
          <div>
            <div class="label"
                 style="margin-left:16px">卡券生效时间</div>
            <div class="input">
              <el-radio v-model="radio"
                        label="0">时间段</el-radio>
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
            <div class="input">
              <el-radio v-model="radio"
                        label="1" >失效时间</el-radio>
              <el-input v-model="toolBar.time"
                        placeholder="自领取后xx天失效"></el-input>
            </div>
          </div>
        </div>
        <div class="item-row">
          <div v-if="toolBar.category.value == '0'">
            <div class="label">现金优惠金额</div>
            <el-input
                      v-model.number="toolBar.money"
                      type="number"
                      oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 2):value"
                      placeholder=""></el-input>
            <div style="margin-left:10px">元</div>
          </div>
        </div>
        <div class="item-row" v-if="toolBar.category.value == '1'" >
          <div >
            <div class="label" ><em style="color:#FF0000;">*</em>  可兑换商品</div>
            <div class="content">
              <el-select filterable v-model="toolBar.goods.value" clearable
                         placeholder="请选择商品">
                <el-option v-for="item in toolBar.goods.options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="explain">（此处选择商城商品范围为所有状态商品）</div>
          </div>
        </div>
        <div class="item-row" v-if="toolBar.category.value == '0'" >

         <div>
            <div class="label" >卡券使用条件</div>
            <el-radio v-model="limitType" label="0">通用券</el-radio>
            <el-radio v-model="limitType" label="1">玛吉斯通用券</el-radio>
            <el-radio v-model="limitType" label="2">分类券</el-radio>
            <div class="content">
                <el-select filterable v-model="toolBar.classification.value" placeholder="请选择分类">
                  <el-option v-for="item in toolBar.classification.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
            </div>
            <el-radio v-model="limitType" label="3">单品券</el-radio>
            <div class="content">
            <el-select filterable v-model="toolBar.goods.value" placeholder="请选择商品">
              <el-option v-for="item in toolBar.goods.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
         </div>

          </div>
        </div>
        <div class="item-row" v-if="toolBar.category.value == '0'">

          <div>
            <div class="label">订单金额限制</div>
            <el-radio v-model="order"
                      label="0">不限制</el-radio>
            <el-radio v-model="order"
                      label="1">限制</el-radio>
            <el-input style="width:25%"
                      v-model="toolBar.orderLimitAmount"
                      min="0"
                      oninput="value=value.indexOf('.') > -1?value.replace(/-/g,'').slice(0, value.indexOf('.') + 3):value.replace(/-/g,'')"
                      placeholder="满×元可使用"></el-input>
          </div>
          <div>
            <div class="label">卡券叠加限制</div>
            <el-radio v-model="superposition"
                      label="0">可与其他叠加</el-radio>
            <el-radio v-model="superposition"
                      label="1">不可与其他卡券叠加</el-radio>
          </div>
        </div>
        <div class="item-row">
          <div>
            <div class="label">卡券备注</div>
            <el-input v-model="toolBar.notice"
                      placeholder=""></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button type="primary"
                  :loading='btnLoading'
                  v-if="permission.includes('ZBPCC01070102')"
                 @click="btnLoading = true;$throttle(add)">保存</el-button>
      <el-button @click="$router.back()">{{ $text.cancel }}</el-button>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index";
</style>