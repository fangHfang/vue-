<template>
  <div class="page" v-loading="detailLoading">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">
        <span>{{pageTitle}}</span>
        <div class="select" v-if="identity !== 'detail'">
          <el-button :class="addForm.pkgType===1?'active first':'first'" @click="addForm.pkgType=1">玛吉斯商品</el-button>
          <el-button :class="addForm.pkgType===0?'active':''" @click="addForm.pkgType=0">非玛吉斯商品</el-button>
        </div>
      </h3>
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px">
        <div class="item-box">
          <div class="maxxis-add-title-btm-box">
            <h4 class="item-title">套餐商品基础信息</h4>
          </div>
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="商品名称" prop="itemName">
                <el-input v-if="identity !== 'detail'" v-model="addForm.itemName" placeholder="请输入商品名称"></el-input>
                <span v-else>{{addForm.itemName}}</span>
              </el-form-item>
              <el-form-item v-if="identity === 'detail'" label="商品编码" prop="itemNo">
                <el-tooltip placement="top">
                  <div slot="content">{{addForm.itemNo}}</div>
                  <div class="ellipsis">{{addForm.itemNo}}</div>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="商品标签" prop="labelNos">
                <el-select v-if="identity !== 'detail'" clearable collapse-tags v-model="addForm.labelNos" :placeholder="$text.selectPlaceholder" multiple filterable>
                  <el-option
                      v-for="item in itemLabelRefOptions"
                      :key="item.labelNo"
                      :label="item.labelName"
                      :value="item.labelNo">
                  </el-option>
                </el-select>
                <el-tooltip placement="top" v-else>
                  <div slot="content">{{labelName}}</div>
                  <div class="ellipsis">{{labelName}}</div>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="后端分类" prop="backCategory">
                <el-select v-if="identity !== 'detail'" clearable collapse-tags v-model="addForm.backCategory" placeholder="请选择后端分类" filterable multiple :multiple-limit="1">
                  <el-option
                      v-for="item in itemBackCategoryOptions"
                      :key="item.categoryNo"
                      :label="item.wholeCategoryName"
                      :value="item.categoryNo">
                  </el-option>
                </el-select>
                <el-tooltip placement="top" v-else>
                  <div slot="content">{{backCategoryName}}</div>
                  <div class="ellipsis">{{backCategoryName}}</div>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="前端分类" prop="frontCategory">
                <el-select v-if="identity !== 'detail'" clearable collapse-tags v-model="addForm.frontCategory" placeholder="请选择前端分类" multiple filterable>
                  <el-option
                      v-for="item in itemFrontCategoryOptions"
                      :key="item.categoryNo"
                      :label="item.wholeCategoryName"
                      :value="item.categoryNo">
                  </el-option>
                </el-select>
                <el-tooltip placement="top" v-else>
                  <div slot="content">{{frontCategoryName}}</div>
                  <div class="ellipsis">{{frontCategoryName}}</div>
                </el-tooltip>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box table-main">
          <div class="maxxis-add-title-btm-box">
            <h4 class="item-title">套餐内商品</h4>
            <div>
              <el-button type="primary" :disabled="identity === 'detail'" @click="toAddProduct">添加商品</el-button>
              <el-button type="primary" :disabled="identity === 'detail'" @click="removeBatch">批量取消</el-button>
            </div>
          </div>
          <div class="table">
            <el-table
                :data="specTemplateTable"
                @selection-change="handleSelectionChange"
                header-cell-class-name="table-header-item"
            >
              <el-table-column
                  fixed="left"
                  type="selection"
                  width="50"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  type="index"
                  label="序号"
                  width="60"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="itemName"
                  show-overflow-tooltip
                  label="商品名称"
                  min-width="120"
              >
              </el-table-column>
              <el-table-column
                  prop="brandName"
                  label="商品品牌"
                  min-width="120"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.brandName || ' '}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="itemCategoryDTOS"
                  label="商品分类"
                  min-width="120"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.itemCategoryDTOS[1] && scope.row.itemCategoryDTOS[1].wholeCategoryName || ' '}}</span>
                </template>
              </el-table-column>
              <el-table-column
                  prop="specDetail"
                  label="商品规格"
                  show-overflow-tooltip
                  min-width="120"
              >
              </el-table-column>
              <el-table-column
                  prop="price"
                  label="商品原价"
                  min-width="120"
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input size="small" :disabled="identity === 'detail'" v-model="scope.row.price" placeholder="请输入" min="0" oninput="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="quantity"
                  label="套餐内商品数量"
                  width="180"
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input size="small" :disabled="identity === 'detail'" v-model="scope.row.quantity" placeholder="请输入" type="number" min="0" oninput="value=value.replace(/[^0-9]/g,'')" />
                    <span class="tips">个</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column/>
            </el-table>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">
            可售库存设置
          </h4>
          <div class="del-form">
            <el-form-item label="填写商品库存" prop="stock" label-width="100px" style="margin-bottom:0;">
              <el-input style="width:200px;margin-right:10px;" :disabled="identity === 'detail'" v-model="addForm.stock" oninput="value=value.replace(/[^0-9]/g,'')" placeholder="请输入商品库存"></el-input>
              <span>个</span>
            </el-form-item>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">套餐商品图片</h4>
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
                    accept="image/jpeg, image/png"
                    :action="$uploadUrl"
                    :data="{ target: 'item' }"
                    :limit="1"
                    :headers="token"
                    :file-list="imgDialog.fileList.listPicture"
                    :on-success="handleAvatarSuccess"
                    list-type="picture-card"
                    :class="imgDialog.fileList.listPicture.length>0 || identity === 'detail'?'disabled':''"
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
                    accept="image/jpeg, image/png"
                    list-type="picture-card"
                    :action="$uploadUrl"
                    :data="{ target: 'item' }"
                    :headers="token"
                    :disabled="identity === 'detail'"
                    :on-success="handleAvatarbannerSuccess"
                    :file-list="imgDialog.fileList.bannerPicture"
                    :limit="5"
                    :class="imgDialog.fileList.bannerPicture.length>4 || identity === 'detail'?'disabled':''"
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
                  <div>最多5张</div>
                </div>
                <el-upload
                    ref="detailPictureUpload"
                    accept="image/jpeg, image/png"
                    :action="$uploadUrl"
                    :file-list="imgDialog.fileList.detailPicture"
                    :data="{ target: 'item' }"
                    :limit="5"
                    :disabled="identity === 'detail'"
                    :headers="token"
                    :on-success="handleAvatarDetailPictureSuccess"
                    list-type="picture-card"
                    class="upload-detail"
                    :class="imgDialog.fileList.detailPicture.length>4 || identity === 'detail'?'disabled':''"
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
            <div style="display:flex;align-items: center">
              <el-form-item label="优惠券限制" prop="couponLimitType" label-width="100px" >
                <el-switch v-model="addForm.couponLimitType" :disabled="identity==='detail'"></el-switch>
                <span class="tips">{{addForm.couponLimitType ? '（不允许用户使用优惠券购买）':'（允许用户使用优惠券购买）'}}</span>
              </el-form-item>
              <el-form-item label="定位限制" prop="positionLimit.value">
                <el-select style="width:200px;" :disabled="identity==='detail'" v-model="addForm.positionLimit.value" placeholder="请选择">
                  <el-option
                      v-for="item in addForm.positionLimit.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">商品剩余数量显示规则设置</h4>
          <div class="del-form" style="display:flex;align-items: center">
            <el-form-item label="显示规则" prop="displayRules.value">
              <el-select :disabled="identity==='detail'" v-model="addForm.displayRules.value" placeholder="请选择显示规则" style="width:200px;">
                <el-option
                    v-for="item in addForm.displayRules.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="剩余商品数量" prop="displayQuantity" label-width="100px" style="margin-left:15px;">
              <el-input style="width:200px;margin-right:10px;" :disabled="identity === 'detail'" v-model="addForm.displayQuantity" oninput="value=value.replace(/[^0-9]/g,'')" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </div>
        <div v-if="identity === 'detail'">

          <!--<div class="item-box">-->
            <!--<h4 class="item-title spec">-->
              <!--经销商价格-->
            <!--</h4>-->
            <!--<div class="table-main">-->
              <!--<div class="table">-->
                <!--<el-table-->
                    <!--:data="dealer.tableData"-->
                    <!--v-loading="dealer.tableLoading"-->
                    <!--header-cell-class-name="table-header-item"-->
                <!--&gt;-->
                  <!--<el-table-column-->
                      <!--type="index"-->
                      <!--label="序号"-->
                      <!--width="100"-->
                      <!--align="center"-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="name"-->
                      <!--label="经销商名称"-->
                      <!--min-width="200"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="customerNo"-->
                      <!--label="内部经销商号"-->
                      <!--min-width="200"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--width="150"-->
                      <!--prop="dealerRefNo"-->
                      <!--label="经销商编号"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="price"-->
                      <!--label="商品价格"-->
                      <!--min-width="200"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column/>-->
                <!--</el-table>-->
              <!--</div>-->
              <!--<div class="pagination">-->
                <!--<el-pagination-->
                    <!--background-->
                    <!--@size-change="handleDealerSizeChange"-->
                    <!--@current-change="handleDealerCurrentChange"-->
                    <!--:current-page="dealer.pagination.current"-->
                    <!--:page-sizes="dealer.pagination.sizes"-->
                    <!--:page-size="dealer.pagination.size"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="dealer.pagination.total"-->
                <!--&gt;-->
                <!--</el-pagination>-->
                <!--<el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="item-box">-->
            <!--<h4 class="item-title spec">特殊价格门店-->
            <!--</h4>-->
            <!--<div class="toolbar-box">-->
              <!--<div>-->
                <!--<div class="label">经销商code</div>-->
                <!--<div class="content">-->
                  <!--<el-input clearable v-model="toolBar.dealerCustomerNo" placeholder="请输入经销商code"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div>-->
                <!--<div class="label">门店code</div>-->
                <!--<div class="content">-->
                  <!--<el-input clearable v-model="toolBar.storeCustomerNo" placeholder="请输入门店code"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<el-button type="primary" @click="getRemoteSpecStoreTableData">{{ $text.search }}</el-button>-->
            <!--</div>-->
            <!--<div class="table-main">-->
              <!--<div class="table">-->
                <!--<el-table-->
                    <!--:data="specWhitelist.tableData"-->
                    <!--v-loading="specWhitelist.tableLoading"-->
                    <!--header-cell-class-name="table-header-item"-->
                <!--&gt;-->
                  <!--<el-table-column-->
                      <!--type="index"-->
                      <!--label="序号"-->
                      <!--width="100"-->
                      <!--align="center"-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--width="150"-->
                      <!--prop="dealerNo"-->
                      <!--label="内部经销商号"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--width="150"-->
                      <!--prop="dealerRefNo"-->
                      <!--label="经销商编号"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="dealerName"-->
                      <!--label="经销商名称"-->
                      <!--min-width="200"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="storeNo"-->
                      <!--width="150"-->
                      <!--label="内部门店号"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="storeRefNo"-->
                      <!--width="150"-->
                      <!--label="门店编号"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="storeName"-->
                      <!--label="门店名称"-->
                      <!--min-width="200"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="storeLevel"-->
                      <!--label="门店性质"-->
                      <!--min-width="200"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="storeNo"-->
                      <!--label="门店id"-->
                      <!--min-width="200"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                      <!--prop="price"-->
                      <!--label="特殊价格"-->
                      <!--width="240"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                    <!--<template slot-scope="scope">-->
                      <!--<div class="table-color-rule-add">{{ scope.row.price }}</div>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                  <!--<el-table-column/>-->
                <!--</el-table>-->
              <!--</div>-->
              <!--<div class="pagination">-->
                <!--<el-pagination-->
                    <!--background-->
                    <!--@size-change="handleSpecWhitelistSizeChange"-->
                    <!--@current-change="handleSpecWhitelistCurrentChange"-->
                    <!--:current-page="specWhitelist.pagination.current"-->
                    <!--:page-sizes="specWhitelist.pagination.sizes"-->
                    <!--:page-size="specWhitelist.pagination.size"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="specWhitelist.pagination.total"-->
                <!--&gt;-->
                <!--</el-pagination>-->
                <!--<el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
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
                      prop="dealerNo"
                      label="内部经销商号"
                      min-width="200"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="dealerRefNo"
                      label="经销商编号"
                      min-width="200"
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
        <el-button :loading="btnLoading" v-if="identity !== 'detail'" type="primary" @click="btnLoading = true;$throttle(toPutOn)">继续上架</el-button>
        <el-button :loading="btnLoading" v-if="identity !== 'detail'" type="primary" @click="btnLoading = true;$throttle(saveItem)">{{ $text.save }}</el-button>
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </div>
    <dialogAddProduct :dialogVisible.sync="maxxisAddProductVisible" @selectInfos="getSelectProducts" :saleStatus="0" :goodsStatus="0" :goodsType="addForm.pkgType===1?1:2" :needRefresh="true"/>
    <dialogSelectEpRule :dialogVisible.sync="epRuleDialogVisible" @selectRules="getSelectRules"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
