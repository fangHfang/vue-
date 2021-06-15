  <template>
  <div class="page-content">
    <h3 class="page-name">手动入库</h3>
    <el-form :model="form" ref="form" label-width="100px">
      <div class="del-form">
        <div class="item-box">
          <h4 class="item-title">入库产品</h4>
          <div class="table-main">
            <div class="actionbar gray-bg-box">
              <el-button type="primary" @click="dialogVisible=true">添加商品</el-button>
              <el-button type="primary" @click="batchDeleteProduct">{{$text.del}}</el-button>
              <importExport
                  :showImport="true"
              />
            </div>
            <div class="table">
              <el-table
                  :data="currentTableData"
                  header-cell-class-name="table-header-item"
                  @selection-change="handleSelectionChange"
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
                    align="center"
                    width="100"
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
                    prop="itemNo"
                    label="商品编号"
                    width="160"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="入库数量"
                    width="160"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-input
                        size="mini"
                        type="inupt"
                        v-model="scope.row.count"
                        @input="(e)=>changeInput(e,scope.$index)"
                        placeholder="请填写入库数量">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="itemType"
                    label="商品分类"
                    width="120"
                    show-overflow-tooltip
                >
                <template slot-scope="scope">
                  <span>{{ ['玛吉斯商品','非玛商品','积分商品','套餐'][scope.row.itemType - 1] }}</span>
                </template>
                </el-table-column>
                <el-table-column
                    prop="brandName"
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
                <el-table-column/>
              </el-table>
            </div>
          <div class="pagination">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.searchData.pageNum"
              :page-sizes="[10, 20, 50, 100, 200]"
              :page-size="form.searchData.pageSize"
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
      <div class="btn-box">
        <el-button type="primary" :loading='btnLoading' @click="saveDealerTwo">保存</el-button>
      </div>
    </el-form>
    <dialogAddProduct :dialogVisible.sync="dialogVisible" @selectInfos="getSelectProducts" :goodsStatus="-1" :goodsType="1" ></dialogAddProduct>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
