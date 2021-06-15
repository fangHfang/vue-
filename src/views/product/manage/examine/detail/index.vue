<template>
  <div class="page" v-loading="detailLoading">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">审核详情</h3>
      <el-form ref="addForm" label-width="100px">
        <div class="item-box status">
          <span class="title mr">状态</span>
          <div v-if="detail.auditStatus <2">
            <img src="@/assets/image/pending.png" class="img" alt="">
            <span class="status-text">待审核</span>
          </div>
          <div v-if="detail.auditStatus === 2">
            <img src="@/assets/image/shelf.png" class="img" alt="">
            <span class="status-text green">已通过</span>
          </div>
          <div v-if="detail.auditStatus === 3">
            <img src="@/assets/image/refuse.png" class="img" alt="">
            <span class="status-text red">已拒绝</span>
          </div>
        </div>
        <div class="detail-item item-box">
          <h4 class="item-title">申请信息</h4>
          <div class="detail-content">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="content-col">
                  <span class="mr">申请时间</span>
                  <span>{{detail.applyTime}}</span>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="content-col">
                  <span class="mr">申请人</span>
                  <span>{{detail.applyName}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="item-box">
          <div class="maxxis-add-title-btm-box">
            <h4 class="item-title">商品基础信息</h4>
          </div>
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="商品编号" prop="itemName">
                <span>{{itemNo}}</span>
              </el-form-item>
              <el-form-item label="商品名称" prop="itemName">
                <span>{{addForm.itemName}}</span>
              </el-form-item>
              <el-form-item label="商品标签" prop="labelNos">
                <el-tooltip placement="top">
                  <div slot="content">{{labelName}}</div>
                  <div class="ellipsis">{{labelName}}</div>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="后端分类" prop="backCategory">
                <el-tooltip placement="top">
                  <div slot="content">{{backCategoryName}}</div>
                  <div class="ellipsis">{{backCategoryName}}</div>
                </el-tooltip>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="商品品牌" prop="brandNo">
                <span>{{brandName}}</span>
              </el-form-item>
              <el-form-item label="商品分组" style="height: 32px;width:auto;">
                <el-tooltip placement="top">
                  <div slot="content">{{addForm.group}}</div>
                  <div class="ellipsis">{{addForm.group}}</div>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="商品规格" style="width:auto;height: 32px;">
                <el-tooltip placement="top">
                  <div slot="content">{{addForm.specDetail}}</div>
                  <div class="ellipsis">{{addForm.specDetail}}</div>
                </el-tooltip>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">商品图片</h4>
          <div class="del-form">
            <div class="item-row">
              <el-form-item prop="listImg" class="form-item-upload">
                <div slot="label" class="form-label">
                  <div>列表展示</div>
                </div>
                <el-upload
                    ref="listPictureUpload"
                    :disabled="identity === 'detail'"
                    accept="image/jpeg, image/png, application/pdf"
                    :action="$uploadUrl"
                    :data="{ target: 'item' }"
                    :limit="1"
                    :headers="token"
                    :file-list="imgDialog.fileList.listPicture"
                    :on-success="handleAvatarSuccess"
                    list-type="picture-card"
                >
                  <i class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file, 'listPicture')" >
                        <i class="el-icon-zoom-in" />
                      </span>
                      <span v-if="identity !== 'detail'" class="el-upload-list__item-delete" @click="handleRemove(file, 'listPicture', undefined)" >
                        <i class="el-icon-delete" />
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="imgDialog.dialogVisible.listPicture">
                  <img width="100%" :src="imgDialog.dialogImageUrl.listPicture" alt="">
                </el-dialog>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item prop="listImg" class="form-item-upload">
                <div slot="label" class="form-label">
                  <div>商品详情轮播图</div>
                </div>
                <el-upload
                    ref="bannerPictureUpload"
                    accept="image/jpeg, image/png, application/pdf"
                    list-type="picture-card"
                    :action="$uploadUrl"
                    :data="{ target: 'item' }"
                    :headers="token"
                    :disabled="identity === 'detail'"
                    :on-success="handleAvatarbannerSuccess"
                    :file-list="imgDialog.fileList.bannerPicture"
                    :limit="5"
                >
                  <i class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file, 'bannerPicture')">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="identity !== 'detail'" class="el-upload-list__item-delete" @click="handleRemove(file, 'bannerPicture', 'bannerPictureUrlList')">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="imgDialog.dialogVisible.bannerPicture">
                  <img width="100%" :src="imgDialog.dialogImageUrl.bannerPicture" alt="">
                </el-dialog>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item prop="listImg" class="form-item-upload">
                <div slot="label" class="form-label">
                  <div>详情介绍图</div>
                </div>
                <el-upload
                    ref="detailPictureUpload"
                    accept="image/jpeg, image/png, application/pdf"
                    :action="$uploadUrl"
                    :file-list="imgDialog.fileList.detailPicture"
                    :data="{ target: 'item' }"
                    :limit="5"
                    :disabled="identity === 'detail'"
                    :headers="token"
                    :on-success="handleAvatarDetailPictureSuccess"
                    list-type="picture-card"
                    class="upload-detail"
                >
                  <i class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file, 'detailPicture')">
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span v-if="identity !== 'detail'" class="el-upload-list__item-delete" @click="handleRemove(file, 'detailPicture', 'detailPictureUrlList')">
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="imgDialog.dialogVisible.detailPicture">
                  <img width="100%" :src="imgDialog.dialogImageUrl.detailPicture" alt="">
                </el-dialog>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">
            返利规则
          </h4>
          <div class="del-form">
            <el-form-item label="返利规则" prop="rebateRule.value">
              <el-select
                  :disabled="!addForm.rebateRule.status || identity === 'detail' "
                  v-model="addForm.rebateRule.value"
                  placeholder=""
                  class="detail-no-border"
              >
                <el-option
                    v-for="item in addForm.rebateRule.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">
            积分规则
          </h4>
          <div class="del-form">
            <el-form-item label="积分规则" prop="integralRole.value">
              <el-select
                  :disabled="!addForm.integralRole.status || identity === 'detail'"
                  v-model="addForm.integralRole.value"
                  placeholder=""
                  class="detail-no-border"
              >
                <el-option
                    v-for="item in addForm.integralRole.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div v-if="identity === 'detail'">

          <div class="item-box">
            <h4 class="item-title spec">
              经销商价格
            </h4>
            <div class="table-main">
              <div class="table">
                <el-table
                    :data="dealer.tableData"
                    v-loading="dealer.tableLoading"
                    header-cell-class-name="table-header-item"
                >
                  <el-table-column
                      type="index"
                      label="序号"
                      width="100"
                      align="center"
                  >
                  </el-table-column>
                  <el-table-column
                      prop="name"
                      label="经销商名称"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="customerNo"
                      label="内部经销商号"
                      min-width="200"
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
                      prop="price"
                      label="商品价格"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column/>
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleDealerSizeChange"
                    @current-change="handleDealerCurrentChange"
                    :current-page="dealer.pagination.current"
                    :page-sizes="dealer.pagination.sizes"
                    :page-size="dealer.pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dealer.pagination.total"
                >
                </el-pagination>
                <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
              </div>
            </div>
          </div>
          <div class="item-box">
            <h4 class="item-title spec">特殊价格门店
            </h4>
            <div class="toolbar-box">
              <div>
                <div class="label" style="width: 100px;">经销商名称</div>
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
              <el-button type="primary" @click="getRemoteSpecStoreTableData">{{ $text.search }}</el-button>
            </div>
            <div class="table-main">
              <div class="table">
                <el-table
                    :data="specWhitelist.tableData"
                    v-loading="specWhitelist.tableLoading"
                    header-cell-class-name="table-header-item"
                >
                  <el-table-column
                      type="index"
                      label="序号"
                      width="100"
                      align="center"
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
                      label="经销商名称"
                      min-width="200"
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
                      prop="storeName"
                      label="门店名称"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="storeLevel"
                      label="门店性质"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="storeNo"
                      label="门店id"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="price"
                      label="特殊价格"
                      width="240"
                      show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div class="table-color-rule-add">{{ scope.row.price }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column/>
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSpecWhitelistSizeChange"
                    @current-change="handleSpecWhitelistCurrentChange"
                    :current-page="specWhitelist.pagination.current"
                    :page-sizes="specWhitelist.pagination.sizes"
                    :page-size="specWhitelist.pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="specWhitelist.pagination.total"
                >
                </el-pagination>
                <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
              </div>
            </div>
          </div>
          <div class="item-box">
            <h4 class="item-title spec">
              <span>商品可见性  <span :class="visibility.checked?'checked circle':'circle'"><i/> 全部可见</span></span>
            </h4>
            <div class="table-main">
              <div v-for="(item,index) in visibility.tableData" :key="index" class="visible-box">
                <div class="border-box">
                  <p>{{item.areaName}}</p>
                  <p class="p">
                    <span v-for="(v,k) in item.storeLevel" :key="k">{{v}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="item-box">
            <h4 class="item-title">门店白名单</h4>
            <div class="toolbar-box">
              <div>
                <div class="label" style="width: 100px;">经销商名称</div>
                <div class="content">
                  <dealerSelect @change="dealerChange2" ref="dealer"/>
                </div>
              </div>

              <div>
                <div class="label">门店名称</div>
                <div class="content">
                  <storeSelect @change="storeChange2"/>
                </div>
              </div>
              <el-button type="primary" @click="getRemoteStoreTableData">{{ $text.search }}</el-button>
            </div>
            <div class="table-main">
              <div class="table">
                <el-table
                    :data="whitelist.tableData"
                    header-cell-class-name="table-header-item"
                >
                  <el-table-column
                      type="selection"
                      width="55"
                  >
                  </el-table-column>
                  <el-table-column
                      type="index"
                      label="序号"
                      width="100"
                      align="center"
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
                      label="经销商名称"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="storeCustomerNo"
                      label="内部门店号"
                      min-width="200"
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
                      prop="storeName"
                      label="门店名称"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="level"
                      label="门店性质"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="storeCustomerNo"
                      label="门店id"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column/>
                </el-table>
              </div>
              <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleWhitelistSizeChange"
                    @current-change="handleWhitelistCurrentChange"
                    :current-page="whitelist.pagination.current"
                    :page-sizes="whitelist.pagination.sizes"
                    :page-size="whitelist.pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="whitelist.pagination.total"
                >
                </el-pagination>
                <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="toolbar-box">
      <div class="btn-box" style="padding-bottom: 30px;">
        <el-button v-if="detail.auditStatus <2" type="primary" @click="toVerify('pass')">通过</el-button>
        <el-button v-if="detail.auditStatus <2" type="primary" @click="toVerify('refuse')">拒绝</el-button>
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </div>
    <el-dialog
        title="拒绝理由"
        :visible.sync="refuseDialog"
        :close-on-click-modal="false"
        @close="closedDialog"
        width="520px">
      <el-input type="textarea" v-model="refuseReason" rows="10" placeholder="请输入拒绝理由" resize="none"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="refuseDialog = false">取 消</el-button>
          <el-button type="primary" @click="doRefusing">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
