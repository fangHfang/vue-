<template>
  <div class="page-content">
    <h3 class="page-name">入库详情单</h3>
      <div class="del-form">
        <div class="item-box">
          <h4 class="item-title">入库信息</h4>
          <div class="item-row">
            <div>
              <div class="label">入库单单号</div>
              <div class="content">{{params.operatingNo}}</div>
            </div>
            <div>
              <div class="label">创建人</div>
              <div class="content">{{params.createBy}}</div>
            </div>
            <div>
              <div class="label">创建时间</div>
              <div class="content">{{params.created}}</div>
            </div>
             <div>
              <div class="label">入库类型</div>
              <div class="content">{{ params.operatingType }}</div>
            </div>
          </div>
          <div class="item-row">
            <div>
              <div class="label">入库经销商</div>
              <div class="content">{{params.customerName}}</div>
            </div>

            <div>
              <div class="label">关联单据类型</div>
              <div class="content">{{params.bizType}}</div>
            </div>
            <div>
              <div class="label">关联单据号</div>
              <div class="content">{{params.bizNo}}</div>
            </div>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">入库记录</h4>
          <div class="toolbar-box">
            <div>
              <div class="label">商品名称</div>
              <div class="content">
                <el-input v-model="detail.toolBar.itemName" placeholder="请输入商品名称"></el-input>
              </div>
            </div>
            <div>
              <div class="label">商品分类</div>
              <div class="content">
                <el-select filterable v-model="detail.toolBar.itemCategoryNo.value" placeholder="请选择商品分类">
                  <el-option
                      v-for="item in detail.toolBar.itemCategoryNo.options"
                      :key="item.categoryNo"
                      :label="item.wholeCategoryName"
                      :value="item.categoryNo">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <div class="label">商品品牌</div>
              <div class="content">
                <el-input filterable v-model="detail.toolBar.itemBrand" placeholder="请输入商品品牌"></el-input>
              </div>
            </div>
            <el-button type="primary" @click="stockOperatingByDealerDetail">{{ $text.search }}</el-button>
          </div>
          <div class="table-main">
            <div class="table">
              <el-table
                  :data="detail.productList"
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
                    prop="itemNo"
                    label="商品编号"
                    width="160"
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
                    prop="changeQuantity"
                    label="入库数量"
                    width="160"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="itemBrand"
                    label="商品品牌"
                    width="160"
                >
                </el-table-column>
                <el-table-column
                    prop="specDetail"
                    label="商品规格"
                    width="180"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="itemCategory"
                    label="商品分类"
                    width="120"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column/>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="detail.pagination.current"
                  :page-sizes="detail.pagination.sizes"
                  :page-size="detail.pagination.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="detail.pagination.total"
              >
              </el-pagination>
              <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="back">{{ $text.return }}</el-button>
      </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>