<template>
  <div class="page-content" v-loading="detailLoading">
      <h3 class="page-name">{{pageTitle}}</h3>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
      <div class="item-box">
        <h4 class="item-title">礼包信息</h4>
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="礼包名称" prop="pkgName">
                <el-input :disabled="identity==='detail'" v-model="form.pkgName" placeholder="输入礼包名称不超过10个字"></el-input>
              </el-form-item>
              <el-form-item label="优先级" prop="priority">
                <el-input :disabled="identity==='detail'" type="number" v-model="form.priority" placeholder="输入数字，数字越大优先级越高"></el-input>
              </el-form-item>
              <el-form-item label="活动时间" prop="activeDate">
                  <el-date-picker
                      v-model="form.activeDate"
                      :disabled="identity==='detail'"
                      range-separator="-"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="备注" prop="promotionRule">
                <el-input :disabled="identity==='detail'" v-model="form.remarks" placeholder="请输入备注信息"></el-input>
              </el-form-item>
            </div>
        </div>
      </div>
       <div class="item-box">
        <h4 class="item-title has-right-button">
          礼包内卡券
          <div class="actionbar" v-if="identity!=='detail'">
            <el-button type="primary" @click="couponDialogVisible=true">添加</el-button>
            <el-button type="primary" @click="deleteCoupon">移除</el-button>
          </div>
        </h4>
        <div class="table-main">
          <div class="table">
              <el-table
                :data="couponTableData"
                @selection-change="handleSelectionChange"
                header-cell-class-name="table-header-item"
              >

                <el-table-column
                    fixed="left"
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    fixed="left"
                    label="操作"
                    width="80"
                >
                  <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="selectCouponDetail(scope.row.ruleNo)"
                    >
                      查看明细
                    </el-button>
                  </template>
                </el-table-column>

                <el-table-column
                    label="序号"
                    width="50"
                    type="index"
                >
                </el-table-column>
                <el-table-column
                    prop="ruleName"
                    label="卡券名称"
                    width="160"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="creatTime"
                    label="卡券有效时间"
                    width="300"
                >
                  <template slot-scope="scope" >
                    {{scope.row.startTime}}-{{scope.row.endTime}}
                  </template>
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="赠送数量"
                    width="120"
                >
                  <template slot-scope="scope" >
                    <div class="tl-input-box">
                      <el-input :disabled="identity==='detail'" size="small" v-model="scope.row.quantity" placeholder="请输入" type="number"></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="卡券状态"
                    width="100"
                >
                  <template slot-scope="scope">
                    <div>
                      <i-status :type="['error','success'][scope.row.status]" :message="['停用', '启用'][scope.row.status]" />
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                    prop="created"
                    label="卡券创建时间"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="createBy"
                    width="100"
                    label="创建人"
                >
                </el-table-column>
                <el-table-column
                    prop="couponClass"
                    label="卡券类型"
                    width="100"
                >
                  <template slot-scope="scope">
                    <div>
                      {{['消费券', '兑换券'][scope.row.couponClass]}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    min-width="140"
                    show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button v-if="identity!=='detail'" type="primary" @click="btnLoading = true;$throttle(toSave)" :loading='btnLoading'>{{ $text.confirm }}</el-button>
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </el-form>
    <dialogCoupon :isMultiSelect="true" :dialogVisible.sync="couponDialogVisible" @selectCoupon="getSelectCoupon"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>