<template>
  <div class="page">
    <div class="detail-box">
      <span class="title">退货详情</span>
      <div class="detail-item">
        <span class="title">基础信息</span>
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <div>门店编号</div>
                <div>{{ detail.storeRefNo }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <div>门店名称</div>
                <div>{{ detail.storeName }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <div>经销商名称</div>
                <div>{{ detail.dealerName }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <div>经销商编号</div>
                <div>{{ detail.dealerRefNo }}</div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <div>退单编号</div>
                 <el-tooltip class="item" effect="dark" :content="detail.orderRefundNo" placement="top-start">
                  <div>{{ detail.orderRefundNo | orderRefundNoEllipsis }}</div>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <div>退单生成时间</div>
                <div>{{ detail.orderRefundApplyTime }}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <div>门店地址</div>
                <div>{{ detail.orderRefundAddress }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-item">
        <span class="title">退款信息</span>
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>退款金额</span>
                <span>{{ detail.orderRefundAmount }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-item">
        <span class="title">商品信息</span>
        <div class="merchandise-store-box">
          <div class="table-unfold" @click="changeUnfold">
            <span>{{ tableUnfold ? '收起' : '展开' }}</span>
            <span
              class="icon iconfont"
              :class="tableUnfold ? 'up' : 'down'"
            ></span>
          </div>
          <div class="table-main" v-show="tableUnfold">
            <div class="table">
              <el-table
                v-loading="loading"
                :data="tableData"
                max-height="330"
                header-cell-class-name="table-header-item"
              >
                <el-table-column type="index" label="序号" width="60">
                  <template slot-scope="scope">
                    <span>
                      {{
                        (searchData.pageReq.pageNum - 1) *
                          searchData.pageReq.pageSize +
                          scope.$index +
                          1
                      }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="itemName"
                  label="商品名称"
                  width="300"
                  show-overflow-tooltip
                />

                <el-table-column
                  prop="itemBarCode"
                  label="商品条码"
                  width="160"
                />

                <el-table-column
                  prop="itemPrice"
                  label="单价（元）"
                  width="120"
                />

                <el-table-column
                  prop="itemCategoryBackend"
                  label="商品分类"
                  width="160"
                  show-overflow-tooltip
                />

                <el-table-column
                  prop="itemBrand"
                  label="商品品牌"
                  width="120"
                  show-overflow-tooltip
                />

                <el-table-column
                  prop="itemSpecDetail"
                  label="商品规格"
                  width="160"
                  show-overflow-tooltip
                />

                <el-table-column
                  prop="refundAmount"
                  label="退款金额（元）"
                  width="140"
                  show-overflow-tooltip
                />

                <el-table-column
                  prop="orderNo"
                  label="关联订单号"
                  width="160"
                  show-overflow-tooltip
                />
                <el-table-column

                />
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchData.pageReq.pageNum"
                :page-sizes="[10, 20, 50, 100, 200]"
                :page-size="searchData.pageReq.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              >
              </el-pagination>
              <el-button type="primary" size="small">
                {{ $text.paginationGo }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import 'index';
</style>
