<template>
  <div class="page">
    <div style="padding: 15px;">编辑兑换点规则</div>
    <div style="padding: 15px;">基础信息</div>
    <div class="toolbar-box convert-rule-add-toolbar">
      <div>
        <div class="label">兑换点规则名称</div>
        <div class="content">
          <el-input v-model="form.ruleName" placeholder="请输入兑换点规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">兑换点节点</div>
        <div class="content">
          <el-input v-model="['商品下单','商品入库','商品出库'][form.type]" placeholder="请输入兑换点节点" disabled></el-input>
        </div>
      </div>
    </div>
    <div style="padding:15px;" class="flex exchange-point-add-product">
      <div>
        设置兑换点商品
      </div>
      <div>
        <el-button type="primary" @click="dialogVisible4Product=true">添加商品</el-button>
      </div>
    </div>
    <div class="toolbar-box convert-rule-add-toolbar">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input v-model="productInfo.itemName" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-input v-model="productInfo.categoryName" placeholder="请输入商品分类" disabled></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-input v-model="productInfo.brandName" placeholder="请输入商品品牌" disabled></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-input v-model="productInfo.specDetail" placeholder="请输入商品规格" disabled></el-input>
        </div>
      </div>
    </div>

    <div style="padding: 15px;">商品图片</div>
    <div>
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item prop="remarks" class="img-load">
          <label slot="label">
            <div>详情介绍图</div>
            <div style="font-size: 12px;color: #B0B0B0;">最多3张</div>
          </label>
          <el-upload
              ref='upload'
              class="convert-rule-upload"
              :class="{'upload-hide':imageUrl.length === 3}"
              :action="$uploadUrl"
              :data="{ target: 'market' }"
              :headers="token"
              :limit="3"
              list-type="picture-card"
              accept="image/jpeg,image/gif,image/png"
              :auto-upload="true"
              :file-list="imageUrl"
              :on-exceed="overLimit"
              :on-success="(response,file) => { onListPictureUploadSuccess(response,file) }">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">（图片大小为宽度750px，高度不限）</div>
              <div slot="file" slot-scope="{file}">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>

    <div class="toolbar-box convert-rule-add-toolbar-content">
      <div>
        <div class="label">兑换商品所需点数</div>
        <div class="content">
          <el-input v-model="form.exchangeAmount" placeholder="请输入兑换商品所需点数"></el-input>
        </div>
      </div>
      <div style="width: 130px;">
        <div class="label">兑换限制时间</div>
      </div>
      <div>
        <div class="label"><el-radio v-model="form.exchangeTimeType" :label="0">可兑换时间点</el-radio></div>
        <div class="content">
          <el-date-picker
              v-model="form.exchangeTime"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled="!datarange">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label"><el-radio v-model="form.exchangeTimeType" :label="1">领取截止时间</el-radio></div>
        <div class="content">
          <el-date-picker
              v-model="form.exchangeEndTime"
              type="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="领取截止时间"
              :disabled="datarange">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">兑换商品限制数量(0:不限制)</div>
        <div class="content">
          <el-input v-model.number="form.exchangeLimit" :min="0" type="number" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8" placeholder="请输入兑换商品限制数量"></el-input>
        </div>
      </div>
    </div>

    <div class="convert-rule-add-remarks-box">
      <div style="padding-bottom: 15px">备注</div>
      <div>
        <el-input type="textarea" rows="4" resize="none" v-model="form.remark"></el-input>
      </div>
    </div>

    <div class="toolbar-box convert-rule-banner-box">
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-input v-model="form.created" disabled placeholder="请选择创建时间"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-input v-model="form.createBy" disabled placeholder="请输入创建人"></el-input>
        </div>
      </div>
    </div>

    <div class="btn-footer">
      <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(next)">下一步</el-button>
      <el-button type="primary" plain @click="$router.back()">{{ $text.cancel }}</el-button>
    </div>

    <dialogAddProduct :dialogVisible.sync="dialogVisible4Product" :isMultiSelect=false @selectInfos="getSelectProducts"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>