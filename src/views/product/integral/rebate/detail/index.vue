<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500;color: #333;">积分返利阶梯规则</div>
    <div class="toolbar-box activity-toolbar-box detail-toolbar">
      <div>
        <div class="label" style="width: 300px;">积分返利规则结算周期时间</div>
        <div class="content">
          <el-input v-model="form.settlementCycle" placeholder="结算周期时间" disabled></el-input>
          <div style="width: 200px;padding-left: 10px;">个月</div>
        </div>
      </div>
    </div>
    <div class="range-whole">
      <div class="range" v-for="(item, index) in form.ladderRuleDetails" :key="index">
        <div class="font">第{{changeNumToHan(index + 1)}}阶梯等级范围</div>
        <div class="content">
          <div class="left-content">
            <div class="top" >
              <div class="content-range">
                入库数量下限：{{ item.lowerLimit4In }}
              </div>
              <div class="content-range">
                入库数量上限：{{ item.upperLimit4In }}
              </div>
              <div class="content-range">
                <el-select clearable v-model="item.rbRuleNo4In" placeholder="暂无入库返利规则">
                  <el-option
                          v-for="item in toolBar.rbRules4In.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="content-range">
                <el-select clearable v-model="item.itRuleNo4In" placeholder="暂无入库积分规则">
                  <el-option
                          v-for="item in toolBar.itRules4In.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="content-range">
                出库数量下限：{{ item.lowerLimit4Out }}
              </div>
              <div class="content-range">
                出库数量上限：{{ item.upperLimit4Out }}
              </div>
              <div class="content-range">
                <el-select clearable v-model="item.rbRuleNo4Out" placeholder="暂无出库返利规则">
                  <el-option
                          v-for="item in toolBar.rbRules4Out.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="content-range">
                <el-select clearable v-model="item.itRuleNo4Out" placeholder="暂无出库积分规则">
                  <el-option
                          v-for="item in toolBar.itRules4Out.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="activity-btn-box">
      <div>备注</div>
    </div>
    <div class="activity-btn-box">
      <el-input type="textarea" v-model="form.remark" resize="none" rows="5" placeholder="备注" disabled></el-input>
    </div>
    <div class="btn-box">
      <el-button type="primary" size="small" @click="toAdjust">调整</el-button>
      <el-button type="primary" size="small" plain @click="getLadderRuleDetail" :loading="loading">刷新</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>