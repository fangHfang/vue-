<template>
  <frame-box>
    <div class="window-container flex-center" v-loading="loading">
      <div class="card-left">
        <mallPreview ref="testref" :list.sync="windowList"
                     @checkAction="checkAction"
        />
        <div class="add-btn" @click="dialogaddWindowVisible = true">增加橱窗</div>
      </div>
      <div class="card-right" >
        <p class="card-title">{{options.name}}</p>
        <div class="card-block-wrap" v-if="searchData.displayNo">
          <div
              class="card-block"
          >
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="110px"
                class="window-form">
              <div class="del-form">
                <el-form-item label="前端橱窗名称" prop="title">
                  <el-input v-model="form.title" placeholder="请输入前端橱窗名称"></el-input>
                </el-form-item>
                <el-form-item label="橱窗顺序" prop="displaySort">
                  <el-input v-model="form.displaySort" oninput="value=value.replace(/[^0-9]/g,'')" placeholder="请输入橱窗顺序"></el-input>
                </el-form-item>
                <el-form-item label="橱窗样式">
                  <div class="flex flex-start">
                    <div
                        v-for="(item,index) in winCheckButton.list"
                        :key="index"
                        class="list-btn"
                        :class="{'checked':form.winStyle === item.value}"
                        @click="checkedWinCheckStyle(item.value,index)"
                    >{{item.key}}</div>
                  </div>
                </el-form-item>
                <el-form-item label="添加橱窗活动" class="sepcical">
                  <div class="table-main gray-bg-box" style="padding:0">
                    <addActiveItem
                      @loadingStatus="(res)=>loading = res"
                      @changeUploadSuccess="(data)=>changeUploadSuccess(data,index)"
                      v-for="(item,index) in winCheckButton.list[winCheckButton.checkIndex].data"
                      @setSelectInfo="(val)=>checkedRadio(val,index)"
                      :form.sync="item"
                      :total="winCheckButton.list[winCheckButton.checkIndex].data.length"
                      :index="index"
                      @toUpSort="toUpSort"
                      @toDownSort="toDownSort"
                      :key="index"/>
                  </div>
                </el-form-item>
                <el-form-item label="备注" prop="content" v-if="!isLook">
                  <el-input v-model="form.desc" type="textarea" resize="none" rows="2" maxlength="150" show-word-limit></el-input>
                </el-form-item>
                <div v-if="!isLook" class="btn-box">
                  <el-button type="primary" @click="toSave">{{ $text.save }}</el-button>
                  <el-button @click="back" >{{ $text.cancel }}</el-button>
                </div>
                <div class="item-box" >
                  <div style="margin-bottom:20px;">
                    <el-checkbox v-model="form.checked">更多商品</el-checkbox>
                    <span class="tips" style="margin-left:5px;">(勾选后在前端展示全部商品字样，下方配置的商品来源所有商品以列表展示)</span>
                  </div>
                  <div v-if="form.checked">
                    <div class="toolbar-box">
                      <div>
                        <div class="label">商品名称</div>
                        <div class="content">
                          <el-input v-model="searchData.itemName" placeholder="请输入商品名称"></el-input>
                        </div>
                      </div>
                      <div>
                        <div class="label">商品品牌</div>
                        <div class="content">
                          <el-select clearable v-model="searchData.brandNo" placeholder="请选择">
                            <el-option
                              v-for="item in options.brandOptions"
                              :key="item.brandNo"
                              :label="item.brandName"
                              :value="item.brandNo">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <div>
                        <div class="label">商品分类</div>
                        <div class="content">
                          <el-select clearable v-model="searchData.classNo" placeholder="请输入商品分类">
                            <el-option
                                v-for="item in options.classOptions"
                                :key="item.categoryNo"
                                :label="item.wholeCategoryName"
                                :value="item.categoryNo">
                            </el-option>
                          </el-select>
                        </div>
                      </div>
                      <el-button type="primary" @click="listPictureItem">{{ $text.search }}</el-button>
                      <el-button type="primary" plain @click="clear">{{ $text.reset }}</el-button>
                    </div>
                    <div class="table-main gray-bg-box" style="padding-left:0">
                      <div
                          v-if="!isLook"
                          class="gray-bg-box">
                        <el-button @click="dialogAddProductVisible = true" type="primary">配置商品</el-button>
                        <el-button type="primary" @click="selectDelte">批量取消</el-button>
                      </div>
                      <div class="table" style="height: 540px;">
                        <el-table
                            :data="form.productTableData"
                            height="560px"
                            v-loading="tableLoading"
                            @selection-change="handleSelectionChange"
                            header-cell-class-name="table-header-item"
                        >
                          <el-table-column
                              type="selection"
                              width="60">
                          </el-table-column>
                          <el-table-column
                              type="index"
                              label="序号"
                              align="center"
                              width="60"
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
                              prop="labelInfos"
                              label="商品标签"
                              width="100"
                              show-overflow-tooltip
                          >
                          </el-table-column>
                          <el-table-column
                              prop="brandName"
                              label="商品品牌"
                              width="120"
                              show-overflow-tooltip
                          >
                          </el-table-column>
                          <el-table-column
                              prop="specDetail"
                              label="商品规格"
                              width="160"
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
                              prop="categoryName"
                              label="商品分类"
                              min-width="160"
                              show-overflow-tooltip
                          >
                          </el-table-column>
                        </el-table>
                      </div>
                      <div class="pagination">
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
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="isLook">
                  <div class="item-row" style="margin-top:20px;">
                    <el-form-item label="创建人">
                      <el-input :value="form.creatPeople" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <el-input :value="form.creatDate" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="创建状态">
                      <el-input :value="form.status | formatStatus" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <el-button>{{ $text.cancel }}</el-button>
                </div>
              </div>
            </el-form>
          </div>
        </div>

      </div>
    </div>
    <dialogAddProduct :dialogVisible.sync="dialogAddProductVisible" @selectInfos = "selectInfos" shopwindow="shopwindow"/>
    <!-- 新增橱窗弹窗 -->
    <el-dialog
        title="新增橱窗"
        :visible.sync="dialogaddWindowVisible"
        width="500"
    >
      <addWindowForm @addOne="addOne" :list.sync="windowList" :dialogaddWindowVisible.sync="dialogaddWindowVisible"/>
    </el-dialog>
    <dialogProductList :dialogVisible.sync="productVisible.ProductList" @setSelectInfo="setSelectInfo"/>
    <dialogActivityClass :dialogVisible.sync="productVisible.ActivityClass" @setSelectInfo="setSelectInfo"/>
    <dialogProductGrouping :dialogVisible.sync="productVisible.ProductGrouping" @setSelectInfo="setSelectInfo"/>
    <dialogPackageProduct :dialogVisible.sync="productVisible.PackageProduct" @setSelectInfo="setSelectInfo"/>
    <dialogProductClass :dialogVisible.sync="productVisible.ProductClass" @setSelectInfo="setSelectInfo"/>
    <dialogProductBrand :dialogVisible.sync="productVisible.ProductBrand" @setSelectInfo="setSelectInfo"/>
    <dialogConfigActivity :dialogVisible.sync="productVisible.ConfigActivity" @setSelectInfo="setSelectInfo"/>
  </frame-box>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
