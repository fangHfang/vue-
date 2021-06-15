<template>
  <div class="page" v-loading="detailLoading">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">
        <span>{{pageTitle}}</span>
        <div class="select" v-if="identity !== 'detail'">
          <el-button :class="tabSelect===1?'active first':'first'" @click="selectTab(1)">添加商品</el-button>
          <el-button :class="tabSelect===2?'active':''" @click="selectTab(2)">添加优惠劵</el-button>
        </div>
      </h3>
      <el-form ref="addForm" :rules="rules" :model="addForm" label-width="100px">
        <div class="item-box table-main" v-show="tabSelect===1">
          <div class="maxxis-add-title-btm-box">
            <h4 class="item-title">商品基础信息</h4>
            <div>
              <el-button type="primary" :disabled="identity === 'detail'" @click="toAddProduct">添加商品</el-button>
            </div>
          </div>
          <div class="table">
            <el-table
                :data="specTemplateTable"
                header-cell-class-name="table-header-item"
            >
              <el-table-column
                  prop="itemName"
                  show-overflow-tooltip
                  label="商品名称"
                  min-width="300"
              >
                <template slot-scope="scope">
                  <el-input :disabled="identity === 'detail'" class="table-input" size="small" v-model="scope.row.itemName" placeholder="请输入商品名称"/>
                </template>
              </el-table-column>
              <el-table-column
                  prop="wholeCategoryName"
                  label="商品分类"
                  min-width="200"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="brandName"
                  label="商品品牌"
                  min-width="200"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="specDetail"
                  label="商品规格"
                  show-overflow-tooltip
                  min-width="200"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="item-box table-main" v-show="tabSelect===2">
          <div class="maxxis-add-title-btm-box">
            <h4 class="item-title">商品基础信息 <b @click="changeCouponCheck" :class="couponCheck?'checked circle':'circle'"><i/> 勾选后兑换及使用</b></h4>
            <div>
              <el-button type="primary" :disabled="identity === 'detail'" @click="couponDialogVisible=true">添加优惠券</el-button>
            </div>
          </div>
          <div class="table">
            <el-table
                :data="couponTemplateTable"
                header-cell-class-name="table-header-item"
            >
              <el-table-column
                  prop="couponName"
                  show-overflow-tooltip
                  label="卡券名称"
                  min-width="160"
              >
                <template slot-scope="scope">
                  <el-input :disabled="identity === 'detail'" class="table-input" size="small" v-model="scope.row.ruleName" placeholder="请输入卡券名称"/>
                </template>
              </el-table-column>
              <el-table-column
                  prop="time"
                  label="卡券有效时间"
                  min-width="300"
                  show-overflow-tooltip
              >
                <template slot-scope="scope" >
                  {{scope.row.effectiveTime?scope.row.effectiveTime:(scope.row.startTime || '') +'-'+ (scope.row.endTime || '')}}
                </template>
              </el-table-column>
              <el-table-column
                  prop="status"
                  label="卡券状态"
                  show-overflow-tooltip
                  min-width="100"
              >
                <template slot-scope="scope">
                  <div>
                    <i-status :type="['error','success'][scope.row.status]" :message="['终止','启用'][scope.row.status]" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="created"
                  label="卡券创建时间"
                  show-overflow-tooltip
                  min-width="160"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">
            商品积分规则设置
          </h4>
          <div class="del-form">
            <div class="item-row three">
              <el-form-item label="单店兑换限量" prop="limitCount" label-width="100px" style="margin-bottom:0;">
                <el-input style="width:70%;margin-right:10px;" oninput="value=value.replace(/[^0-9]/g,'')" type="number" :disabled="identity === 'detail'" v-model="addForm.limitCount" placeholder="请输入单店兑换限量" min="1"></el-input>
                <span>件</span>
              </el-form-item>
              <el-form-item label="总兑换库存" prop="initStock" label-width="100px" style="margin-bottom:0;">
                <el-input style="width:70%;margin-right:10px;" oninput="value=value.replace(/[^0-9]/g,'')" type="number" :disabled="identity === 'detail'" v-model="addForm.initStock" placeholder="请输入总兑换库存" min="1"></el-input>
                <span>件</span>
              </el-form-item>
              <el-form-item label="起订分规则" prop="startPointNo" label-width="100px" style="margin-bottom:0;">
                <el-select
                    :disabled="identity === 'detail'"
                    v-model="addForm.startPointNo"
                    placeholder="请选择起订分分规则"
                    style="width:70%;"
                >
                  <el-option
                      v-for="item in startPointOptions"
                      :key="item.startPointNo"
                      :label="item.startPointName"
                      :value="item.startPointNo"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="item-row three">
              <el-form-item label="内部编号" prop="outerRelationNo" label-width="100px" style="margin-bottom:0;">
                <el-input style="width:70%;margin-right:10px;" oninput="value=value.replace(/[^a-zA-Z\-0-9]/g,'')" type="text" :disabled="identity === 'detail'" v-model="addForm.outerRelationNo" placeholder="请输入内部编号"></el-input>
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
                  <div>最多1张</div>
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
                    :class="imgDialog.fileList.listPicture.length > 0 || identity === 'detail' ? 'disabled' : ''"
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
                <span class="font-tips">(图片大小为520*520px)</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item prop="listImg" class="form-item-upload">
                <div slot="label" class="form-label">
                  <div>商品详情轮播图</div>
                  <div>最多5张</div>
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
                    :class="imgDialog.fileList.bannerPicture.length > 4 || identity === 'detail' ? 'disabled' : ''"
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
                <span class="font-tips">(图片大小为750*750px)</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item prop="listImg" class="form-item-upload">
                <div slot="label" class="form-label">
                  <div>详情介绍图</div>
                  <div>最多3张</div>
                </div>
                <el-upload
                    ref="detailPictureUpload"
                    accept="image/jpeg, image/png, application/pdf"
                    :action="$uploadUrl"
                    :file-list="imgDialog.fileList.detailPicture"
                    :data="{ target: 'item' }"
                    :limit="3"
                    :disabled="identity === 'detail'"
                    :headers="token"
                    :on-success="handleAvatarDetailPictureSuccess"
                    list-type="picture-card"
                    class="upload-detail"
                    :class="imgDialog.fileList.detailPicture.length > 2 || identity === 'detail' ? 'disabled' : ''"
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
                <span class="font-tips">(图片大小为宽度750px，高度不限)</span>
              </el-form-item>
            </div>
          </div>
        </div>
        <div v-if="identity === 'detail'">

          <div class="item-box">
            <h4 class="item-title">
              标准积分
            </h4>
            <div class="del-form">
              <el-form-item label="标准积分">
                <el-input :disabled="identity === 'detail'" style="width:200px;" v-model="addForm.price" placeholder="请输入积分"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="item-box">
            <h4 class="item-title spec">特殊积分门店
            </h4>
            <div class="toolbar-box">
              <div>
                <div class="label">经销商code</div>
                <div class="content">
                  <el-input clearable v-model="toolBar.dealerCustomerNo" placeholder="请输入经销商code"></el-input>
                </div>
              </div>
              <div>
                <div class="label">门店code</div>
                <div class="content">
                  <el-input clearable v-model="toolBar.storeCustomerNo" placeholder="请输入门店code"></el-input>
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
                      label="特殊积分"
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
            <h4 class="item-title">商品可见门店</h4>
            <div class="toolbar-box">
              <div>
                <div class="label">经销商code</div>
                <div class="content">
                  <el-input clearable v-model="toolBar.dealerCustomerNo" placeholder="请输入经销商code"></el-input>
                </div>
              </div>
              <div>
                <div class="label">门店code</div>
                <div class="content">
                  <el-input clearable v-model="toolBar.storeCustomerNo" placeholder="请输入门店code"></el-input>
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
        <el-button v-if="identity !== 'detail'" type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(saveItem)">暂存</el-button>
        <el-button v-if="identity !== 'detail'" type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(toPutOn)">下一步</el-button>
        <el-button @click="back">取消</el-button>
      </div>
    </div>
    <dialogAddProduct :isMultiSelect="false" :dialogVisible.sync="maxxisAddProductVisible" @selectInfos="getSelectProducts" :goodsStatus="0"/>
    <dialogCoupon :isMultiSelect="false" :dialogVisible.sync="couponDialogVisible" @selectCoupon="getSelectCoupon" integralTitle="integral"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
