<template>
  <el-dialog
    title="添加门店"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    :before-close="handleClose"
  >
    <div class="border-content">
      <div class="toolbar-box" style="border: none;background: none">
                <div>
                  <div class="label">返利规则</div>
                  <div class="content">
                    <el-select
                      filterable
                      remote
                      clearable
                      v-model="toolBar.rebate.value"
                      :placeholder="$text.selectPlaceholder"
                      :remote-method="listSearchRbRuleType"
                      @focus="listSearchRbRuleType('')"
                      value-key="value"
                    >
                      <el-option
                        v-for="item in toolBar.rebate.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div>
                  <div class="label">积分规则</div>
                  <div class="content">
                    <el-select
                      filterable
                      remote
                      clearable
                      v-model="toolBar.integral.value"
                      :placeholder="$text.selectPlaceholder"
                      :remote-method="listSearchItRuleType"
                      @focus="listSearchItRuleType('')"
                      value-key="value"
                    >
                      <el-option
                        v-for="item in toolBar.integral.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div>
                  <div class="label">兑换点规则</div>
                  <div class="content">
                    <el-select
                      filterable
                      remote
                      clearable
                      v-model="toolBar.exchange.value"
                      :placeholder="$text.selectPlaceholder"
                      :remote-method="listSearchEpRuleType"
                      @focus="listSearchEpRuleType('')"
                      value-key="value"
                    >
                      <el-option
                        v-for="item in toolBar.exchange.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>
        <div>
          <div class="label">优惠券</div>
          <div class="content">
            <el-select
              filterable
              remote
              clearable
              v-model="toolBar.coupon.value"
              :placeholder="$text.selectPlaceholder"
              :remote-method="listSearchCpTemplateType"
              @focus="listSearchCpTemplateType('')"
              value-key="value"

            >
              <el-option
                v-for="item in toolBar.coupon.options"
                :key="item.value"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div style="width: 15%;padding-left: 15px">
          <div class="content" style="width: 100%">
            <el-input
                    clearable
                    v-model="searchData.couponNum"
                    placeholder="填写券数量"
            ></el-input>
          </div>
        </div>
        <div style="width: 15%;padding-left: 15px">
          <div class="content" style="width: 100%">
            <el-input
                    clearable
                    v-model="searchData.upLimit"
                    placeholder="请输入上限"
            ></el-input>
          </div>
        </div>
        <div style="width: 15%;padding-left: 15px">
          <div class="content" style="width: 100%">
            <el-input
                    clearable
                    v-model="searchData.lowerLimit"
                    placeholder="请输入下限"
            ></el-input>
          </div>
        </div>
        <el-button type="primary" :loading="loading" @click="batch">批量设置上下限</el-button>
      </div>
      <div class="toolbar-box">
        <div>
          <div class="label">经销商名称</div>
          <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
          </div>
        </div>

        <div>
          <div class="label">门店名称</div>
          <div class="content">
            <storeSelect @change="storeChange"/>
          </div>
        </div>
        <el-button type="primary" @click="searchTableData" :loading="loading">{{$text.search}}</el-button>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            v-loading="loading"
            :data="tableData"
            max-height="330"
            @selection-change="handleSelectionChange"
            header-cell-class-name="table-header-item"
          >
            <el-table-column fixed="left" type="selection" width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
                width="150"
                prop="dealerNo"
                label="内部经销商号"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                width="150"
                prop="dealerRefNo"
                label="经销商编号"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="dealerName"
              label="所属经销商名称"
              width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="storeNo"
                width="150"
                label="内部门店号"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="storeRefNo"
                width="150"
                label="门店编号"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="门店名称"
              width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="lowerLimit"
              label="入库下限"
              width="100"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
              <el-input style="height:32px" v-model="scope.row.lowerLimit" placeholder="请填写入库下限"></el-input>
            </template>
            </el-table-column>
            <el-table-column
              prop="upperLimit"
              label="入库上限"
              min-width="100"
              show-overflow-tooltip
            >
             <template slot-scope="scope">
              <el-input style="height:32px" v-model="scope.row.upperLimit" placeholder="请填写入库下限"></el-input>
            </template>
            </el-table-column>

            <el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchData['page.pageNum']"
            :page-sizes="[10, 20, 50, 100, 200]"
            :page-size="searchData['page.pageSize']"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{
            $text.paginationGo
          }}</el-button>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="handleAdd" :loading="btnLoading">{{ $text.add }}</el-button>
      <el-button @click="handleClose">{{ $text.cancel }}</el-button>
    </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
