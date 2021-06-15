<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500;color: #333;">积分返利阶梯规则</div>
    <div class="toolbar-box activity-toolbar-box ">
      <div>
        <div class="label" style="width: 300px;">积分返利规则结算周期时间</div>
        <div class="content">
          <el-input v-model="form.settlementCycle" placeholder="3"></el-input>
          <div style="width: 200px;padding-left: 10px;">个月</div>
        </div>
      </div>
    </div>
    <div class="range-whole">
      <div class="range" v-for="(item, index) in form.ladderRuleDetails" :key="index">
        <div class="font">第{{changeNumToHan(index + 1)}}阶梯范围</div>
        <div class="content">
        <div class="left-content">
          <div class="top" >
            <div class="content-range">
              <el-input v-model="item.lowerLimit4In" placeholder="入库数量下限"></el-input>
            </div>
           <div class="content-range">
               <el-input v-model="item.upperLimit4In" placeholder="入库数量上限"></el-input>
            </div>
           <div class="content-range">
            <el-select clearable v-model="item.rbRuleNo4In" placeholder="选择返利规则">
              <el-option
                v-for="item in toolBar.rbRules4In.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class="content-range">
            <el-select clearable v-model="item.itRuleNo4In" placeholder="选择积分规则">
              <el-option
                v-for="item in toolBar.itRules4In.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class="content-range">
              <el-input v-model="item.lowerLimit4Out" placeholder="出库数量下限"></el-input>
            </div>
           <div class="content-range">
              <el-input v-model="item.upperLimit4Out" placeholder="出库数量上限"></el-input>
            </div>
           <div class="content-range">
            <el-select clearable v-model="item.rbRuleNo4Out" placeholder="选择返利规则">
              <el-option
                v-for="item in toolBar.rbRules4Out.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class="content-range">
            <el-select clearable v-model="item.itRuleNo4Out" placeholder="选择积分规则">
              <el-option
                v-for="item in toolBar.itRules4Out.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
          </div>
          <div class="button" @click="removeLinkItem(index)">
            <i class="el-icon-remove-outline"></i>
          </div>
        </div>
      </div>
      </div>
      <div class="add" @click="addLinkItem">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
    </div>

    <div class="activity-btn-box">
      <div>备注</div>
    </div>
    <div class="activity-btn-box">
      <el-input type="textarea" v-model="form.remark" resize="none" rows="5" placeholder="备注"></el-input>
    </div>
    <div class="btn-box">
      <el-button type="primary" size="small" @click="saveLadderRule">{{ $text.save }}</el-button>
      <el-button type="primary" size="small" plain @click="$router.back()">{{ $text.cancel }}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>