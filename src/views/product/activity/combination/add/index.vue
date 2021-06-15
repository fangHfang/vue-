<template>
  <div class="page-content" v-loading="detailLoading">
    <h3 class="page-name">{{pageTitle}}
      <div class="select">
        <el-button :class="isMjsProduct?'active first':'first'" @click="isMjsProduct=true">玛吉斯商品</el-button>
        <el-button :class="!isMjsProduct?'active':''" @click="isMjsProduct=false">非玛吉斯商品</el-button>
      </div>
    </h3>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
      <div class="item-box">
        <h4 class="item-title">活动信息</h4>
        <div class="del-form">
          <div class="item-row">
            <el-form-item label="活动名称" prop="name">
              <el-input :disabled="identity==='detail'" v-model="form.name" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="活动规则名称" prop="promotionRule">
              <el-input :disabled="identity==='detail'" v-model="form.promotionRule" placeholder="请输入活动规则名称"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" prop="activeDate">
              <el-date-picker
                  v-model="form.activeDate"
                  :disabled="identity==='detail'"
                  range-separator="-"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动分类" prop="activeType.value">
              <el-select clearable v-model="form.activeType.value" placeholder="请选择活动分类" :disabled="identity==='detail'" >
                <el-option
                    v-for="item in form.activeType.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="活动列表图" prop="activeListImg">
            <el-upload
                :action="$uploadUrl"
                :headers="token"
                :disabled="identity==='detail'"
                list-type="picture-card"
                accept="image/jpeg,image/png"
                :limit="1"
                :data="{ target: 'item' }"
                :on-success="handlePicSuccess"
                :file-list="form.activeListImg.list"
                :class="form.activeListImg.url?'disabled':''"
            >
              <i class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions" v-if="identity!=='detail'">
                    <span
                        class="el-upload-list__item-delete"
                        @click="handlePicRemove(file,'activeListImg')"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
              </div>
            </el-upload>
            <span class="font-tips">（图片大小为520*520px）</span>
          </el-form-item>

          <el-form-item label="活动介绍海报" prop="activeBanner">
            <el-upload
                :action="$uploadUrl"
                :headers="token"
                list-type="picture-card"
                accept="image/jpeg,image/png"
                :disabled="identity==='detail'"
                :limit="1"
                :data="{ target: 'item' }"
                :on-success="handlePic2Success"
                :file-list="form.activeBanner.list"
                class="lage"
                :class="form.activeBanner.url?'disabled':''"
            >
              <i class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions" v-if="identity!=='detail'">
                    <span
                        class="el-upload-list__item-delete"
                        @click="handlePicRemove(file,'activeBanner')"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
              </div>
            </el-upload>
            <span class="font-tips">（图片大小为750*500px）</span>
          </el-form-item>
          <div class="item-row">
            <el-form-item label="活动介绍" prop="introduce" style="width:90%;">
              <el-input v-model="form.introduce" placeholder="请输入活动介绍" :disabled="identity==='detail'"></el-input>
            </el-form-item>
          </div>

          <div class="item-row location-row">
            <el-form-item label="优惠券限制" prop="couponRestrictions">
              <el-switch v-model="form.couponRestrictions" :disabled="identity==='detail'"></el-switch>
              <span class="tips">{{form.couponRestrictions ? '（不允许用户使用优惠券购买）':'（允许用户使用优惠券购买）'}}</span>
            </el-form-item>
            <el-form-item label="仅展示优惠力度" prop="showCouponDepth">
              <el-switch v-model="form.showCouponDepth" :disabled="identity==='detail'"></el-switch>
            </el-form-item>
            <el-form-item label="定位限制" prop="positioningConstraints.value">
              <el-select :disabled="identity==='detail'" v-model="form.positioningConstraints.value" placeholder="请选择">
                <el-option
                    v-for="item in form.positioningConstraints.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="location-item">
              <div style="display: flex;align-items: center;height: 40px;width: 100%">
                <el-button type="text" size="small" @click="dialogLocationVisible = true">&nbsp;精准定位设置</el-button>
                <div v-if="form.positioningConstraints.value === 2" class="content-col">
                  <div style="margin-right: 20px;display: flex">
                    <div class="label">经度: </div>
                    <el-input v-model="mapLocation.coordinate.lng" placeholder="" readOnly></el-input>
                  </div>
                  <div style="display: flex">
                    <div class="label">纬度: </div>
                    <el-input v-model="mapLocation.coordinate.lat" placeholder="" readOnly></el-input>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>

        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">参加活动获得兑换点</h4>
        <div class="table-main">
          <div class="actionbar gray-bg-box" v-if="identity!=='detail'">
            <el-button type="primary" @click="epRuleDialogVisible=true">添加兑换点规则</el-button>
            <el-button type="primary" @click="deleteEpRuleAll">删除全部</el-button>
          </div>
          <div class="table">
            <el-table
                :data="form.couponTableData"
                header-cell-class-name="table-header-item"
            >
              <el-table-column
                  fixed="left"
                  label="操作"
                  width="100"
                  v-if="identity!=='detail'"
                  align="center"
              >
                <template slot-scope="scope">
                  <el-button
                      type="text"
                      size="small"
                      @click="deleteEpRule(scope.row.ruleNo)"
                  >
                    {{ $text.del }}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  prop="ruleName"
                  label="兑换点规则"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="createBy"
                  label="创建人"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="created"
                  label="创建时间"
                  show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">返利规则设置<el-switch :disabled="identity==='detail'" v-model="form.rebateRules.status" style="margin-left:10px;"></el-switch></h4>
        <div class="del-form">
          <el-form-item label="选择返利规则" prop="rebateRules" :disabled="!form.rebateRules.status">
            <el-select :disabled="!form.rebateRules.status || identity==='detail'" v-model="form.rebateRules.value" placeholder="请选择返利规则" style="width:200px;">
              <el-option
                  v-for="item in form.rebateRules.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">积分规则设置<el-switch :disabled="identity==='detail'" v-model="form.pointsRules.status" style="margin-left:10px;"></el-switch></h4>
        <div class="del-form">
          <el-form-item label="选择积分规则" prop="rebateRules" :disabled="!form.pointsRules.status">
            <el-select :disabled="!form.pointsRules.status || identity==='detail'" v-model="form.pointsRules.value" placeholder="请选择积分规则" style="width:200px;">
              <el-option
                  v-for="item in form.pointsRules.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">商品剩余数量显示规则设置</h4>
        <div class="del-form">
          <el-form-item label="显示规则" prop="displayRules.value">
            <el-select :disabled="identity==='detail'" v-model="form.displayRules.value" placeholder="请选择显示规则" style="width:200px;">
              <el-option
                  v-for="item in form.displayRules.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">商品批次</h4>
        <div class="toolbar-box">
          <div>
            <div class="label">商品名称</div>
            <div class="content">
              <el-input v-model="toolBar.name" placeholder="请输入商品名称"></el-input>
            </div>
          </div>
          <div>
            <div class="label">商品分类</div>
            <div class="content">
              <el-select clearable v-model="toolBar.class.value" placeholder="请输入商品分类">
                <el-option
                    v-for="item in toolBar.class.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">商品规格</div>
            <div class="content">
              <el-select clearable v-model="toolBar.spec.value" placeholder="请输入商品规格">
                <el-option
                    v-for="item in toolBar.spec.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">商品品牌</div>
            <div class="content">
              <el-input v-model="toolBar.brand" placeholder="请输入商品品牌"></el-input>
            </div>
          </div>
          <div>
            <div class="label">商品标签</div>
            <div class="content">
              <el-select clearable v-model="toolBar.tag.value" placeholder="请选择商品标签">
                <el-option
                    v-for="item in toolBar.tag.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-button type="primary">{{ $text.search }}</el-button>
          <el-button type="primary" plain>{{ $text.reset }}</el-button>
        </div>
        <div class="table-main">
          <div class="actionbar" v-if="identity!=='detail'">
            <el-button type="primary" @click="removeBatchAll">全部取消</el-button>
            <importExport
                :showImport="true"
            />
          </div>
        </div>
      </div>
      <div class="item-box" v-for="(productmix,index) in productmixCreateReqs" :key="index">
        <div class="table-main gray-bg-box">
          <div class="gray-bg-box">
            <el-form-item label="添加固定商品" style="margin:0" label-width="100px" v-if="productmix.itemType===0">
              <el-button v-if="identity!=='detail'" @click="addProduct(productmix.itemType)" type="primary">添加商品</el-button>
              <el-button v-if="identity!=='detail'" type="primary" @click="removeBatch(productmix.itemType)">批量取消</el-button>
            </el-form-item>
            <el-form-item label="添加自选商品" style="margin:0" label-width="100px" v-if="productmix.itemType===1">
              <el-button v-if="identity!=='detail'" @click="addProduct(productmix.itemType)" type="primary">添加商品</el-button>
              <el-button v-if="identity!=='detail'" type="primary" @click="removeBatch(productmix.itemType)">批量取消</el-button>
              <el-input v-if="identity!=='detail'" class="cl-el-input" v-model="form.diySelectProductLimit" type="number" placeholder="输入自选品类限制数量"/>
            </el-form-item>
          </div>
          <div class="table">
            <el-table
                :data="productmix.list"
                @selection-change="(selection)=>handleSelectionChange(selection,productmix.itemType)"
                header-cell-class-name="table-header-item"
            >
              <el-table-column
                  type="selection"
                  width="50"
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
                  label="商品图片"
                  width="100"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <img class="table-pd-img" :src="scope.row.itemImageUrl" />
                </template>
              </el-table-column>
              <el-table-column
                  v-if="productmix.itemType===0"
                  label="必须购买"
                  width="100"
              >
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.isForceItem"/>
                </template>
              </el-table-column>
              <el-table-column
                  prop="itemName"
                  label="商品名称"
                  width="300"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  label="商品原价"
                  width="180"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input oninput="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" :disabled="identity==='detail'" size="small" v-model="scope.row.itemAmount" placeholder="请输入"></el-input>
                    <span class="tips">元</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  prop="itemBrand"
                  label="商品品牌"
                  width="100"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="itemCategory"
                  label="商品分类"
                  min-width="100"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="itemSpec"
                  label="商品规格"
                  width="100"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="itemTag"
                  label="商品标签"
                  width="100"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  label="活动价格"
                  width="160"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input oninput="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" :disabled="identity==='detail'" size="small" v-model="scope.row.amount" placeholder="请输入" ></el-input>
                    <span class="tips">元</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  label="仅显示优惠金额"
                  width="160"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input oninput="value=value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')" :disabled="identity==='detail'" size="small" v-model="scope.row.discountAmount" placeholder="请输入"></el-input>
                    <span class="tips">元</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  label="个人购买限量"
                  width="160"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input oninput="value=value.replace(/[^0-9]/g,'')" :disabled="identity==='detail'" size="small" v-model="scope.row.personalLimitCount" placeholder="请输入" type="number"></el-input>
                    <span class="tips">个</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  label="商品活动库存"
                  width="160"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input oninput="value=value.replace(/[^0-9]/g,'')" :disabled="identity==='detail'" size="small" v-model="scope.row.stock" placeholder="请输入" type="number"></el-input>
                    <span class="tips">个</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                  label="APP显示剩余数量"
                  width="160"
                  show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="tl-input-box">
                    <el-input oninput="value=value.replace(/[^0-9]/g,'')" :disabled="identity==='detail'" size="small" v-model="scope.row.displayStock" placeholder="请输入" type="number"></el-input>
                    <span class="tips">个</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <!--<el-button v-if="identity!=='detail'" type="primary">{{ $text.preview }}</el-button>-->
        <el-button v-if="identity!=='detail'" @click="saveActivity" :loading='btnLoading'>{{ $text.save }}</el-button>
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </el-form>
    <dialogAddProduct :dialogVisible.sync="dialogVisible" @selectInfos="getSelectProducts" :saleStatus="0" :goodsStatus="0" :goodsType="isMjsProduct?1:2" :needRefresh="true"/>
    <dialogSelectEpRule :dialogVisible.sync="epRuleDialogVisible" @selectRules="getSelectRules"/>
    <dialogAddLocation :dialogVisible.sync="dialogLocationVisible" @selectLocation="getSelectLocation"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>