<template>
  <el-dialog
          class="dialog-choose-box"
          title="玛吉斯基础产品表"
          :visible.sync="dialogVisible"
          width="1200px"
          height="512px"
          :before-close="close">
      <div class="dialog-toolbar">
        <div class="toolbar-box  r-i-l-t-add-store-toolbar r-i-l-t-add-store-toolbar-dialog">
          <div>
            <div class="label">产品代号</div>
            <div class="content">
              <el-select clearable v-model="toolBar.productCode.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.productCode.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">轮胎规格</div>
            <div class="content">
              <el-select clearable v-model="toolBar.tireSpec.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.tireSpec.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">轮胎英寸</div>
            <div class="content">
              <el-select clearable v-model="toolBar.tireInch.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.tireInch.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">同类花纹</div>
            <div class="content">
              <el-select clearable v-model="toolBar.similarPattern.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.similarPattern.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">轮胎标志</div>
            <div class="content">
              <el-select clearable v-model="toolBar.tireSign.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.tireSign.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">轮胎品牌</div>
            <div class="content">
              <el-select clearable v-model="toolBar.tireBrand.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.tireBrand.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">轮胎载重</div>
            <div class="content">
              <el-select clearable v-model="toolBar.tireLoad.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.tireLoad.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">搜索字段</div>
            <div class="content">
              <el-select clearable v-model="toolBar.searchField.value" :placeholder="$text.selectPlaceholder">
                <el-option
                        v-for="item in toolBar.searchField.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="r-i-l-t-add-store-btn">
            <el-button type="primary">{{ $text.search }}</el-button>
          </div>
        </div>
      </div>
      <div class="table-main r-i-l-t-add-store-table">
        <div class="table">
          <el-table
                  :data="tableData"
                  max-height="330"
                  header-cell-class-name="table-header-item"
          >
            <el-table-column
                    fixed
                    type="selection"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="index"
                    label="序号"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="productCode"
                    label="产品代号"
                    width="140"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="specDetail"
                    label="规格明细"
                    width="160"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="spec"
                    label="规格"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="inch"
                    label="英寸"
                    width="100"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="pattern"
                    label="花纹"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="similarPattern"
                    label="同类花纹"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="tireBrand"
                    label="轮胎品牌"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="tireLoad"
                    label="载重"
                    width="100"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="tireSign"
                    label="胎侧标志"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="hierarchy"
                    label="层级"
                    width="100"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="speed"
                    label="荷载/速度"
                    width="120"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="tireType"
                    label="胎别"
                    width="100"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="searchField"
                    label="搜索字段"
                    width="140"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination dialog">
          <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pagination.current"
                  :page-sizes="pagination.sizes"
                  :page-size="pagination.size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pagination.total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
      </div>
      <div class="choose-btn-box">
        <el-button type="primary" @click="save">添加</el-button>
        <el-button type="primary" plain @click="close">取消</el-button>
      </div>
  </el-dialog>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>