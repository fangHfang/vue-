<template>
  <div class="page">
    <h4 class="item-title" style="padding: 15px;">编辑签约</h4>
    <div class="toolbar-box convert-rule-add-toolbar">
      <div style="width:30%">
        <div class="label">签约名称</div>
          <div class="content">
            <el-input v-model="form.ruleName" placeholder="请输入签约名称" maxlength="20" show-word-limit></el-input>
          </div>
      </div>
      <div style="width: 120px;margin-left: 10px">
        <div class="content" style="width: 100%;display: flex;align-items: center">
          <a v-if="activeName === 'contract'" >年度签约类型</a>
          <a v-else>需门店确认</a>
        </div>
      </div>
      <div style="width:35%">
        <div class="label">签约时间</div>
        <div class="content">
          <el-date-picker
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              >
          </el-date-picker>
        </div>
          <div style="width: 10%;margin-left: 10px">
        <div class="content" style="width: 10%;display: flex;align-items: center">
          <el-checkbox v-if="activeName === 'contract'" v-model="form.closeComment" class="comment-check">自然季度补充核算</el-checkbox>
        </div>

      </div>
      </div>
    </div>
    <div v-if="activeName === 'contract'" class="signed-step-add-toolbar-box" style="padding: 15px 0">
    <div style="display: flex;">
      <div class="toolbar-box convert-rule-add-toolbar toolbar-content">
        <div style="width: 100%">
          <div class="label">签约内容</div>
        </div>
      </div>
      <div class="toolbar-box convert-rule-add-toolbar">
        <el-form :model="form" ref="form">
          <el-form-item prop="remarks" class="img-load">
            <el-upload
                    class="convert-rule-upload signed-step-add-upload"
                    :action="$uploadUrl"
                    :headers="token"
                    :limit="6"
                    :data="{ target: 'market' }"
                    list-type="picture-card"
                    accept="image/jpeg,image/gif,image/png"
                    :auto-upload="true"
                    :file-list="listPicture"
                    ref="upload"
                    :class="listPicture.length>5?'disabled':''"
                    :on-success="onListPictureUploadSuccess">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">（最多可上传6张图片）</div>
              <div slot="file" slot-scope="{file}">
                <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" :alt="file"
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
                @click="handleRemove(file, 'listPicture')"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogImageVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-form>
      </div>
    </div>
    </div>
    <div v-if="activeName === 'confirm'" class="signed-step-add-toolbar-box" v-for="(item , index) in profitList" :key="index">
      <div style="display: flex;justify-content: center">
        <div class="toolbar-box convert-rule-add-toolbar" style="width: 90px;height: 100%;padding: 6px 0">
          <div style="width: 100%">
            <div class="label">获利设置</div>
          </div>
        </div>
        <div class="toolbar-box signed-step-add-toolbar">
          <div>
            <div class="content">
              <el-input v-model="item.lowerLimit" placeholder="入库数量下限" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </div>
          </div>
          <div>
            <div class="content">
              <el-input v-model="item.upperLimit" placeholder="入库数量上限" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </div>
          </div>
          <div>
            <div class="content">
              <el-select
                filterable
                remote
                clearable
                v-model="item.rbRuleNo"
                :remote-method="listSearchRbRuleType"
                @focus="listSearchRbRuleType('')"
                placeholder="选择返利规则">
                <el-option
                        v-for="item in selectList.detailRebateRuleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="content">
              <el-select
                filterable
                remote
                clearable
                v-model="item.itRuleNo"
                :remote-method="listSearchItRuleType"
                @focus="listSearchItRuleType('')"
                placeholder="选择积分规则"
              >
                <el-option
                  v-for="item in selectList.integralOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="content">
              <el-select
                filterable
                remote
                clearable
                v-model="item.epRuleNo"
                :remote-method="listSearchEpRuleType"
                @focus="listSearchEpRuleType('')"
                placeholder="选择兑换点规则">
                <el-option
                        v-for="item in selectList.exchangeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="content">
              <el-select
                filterable
                remote
                clearable
                v-model="item.cpRuleNo"
                :remote-method="listSearchCpTemplateType"
                @focus="listSearchCpTemplateType('')"
                placeholder="选择优惠券"
              >
                <el-option
                        v-for="item in selectList.couponOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="content">
              <el-input v-model="item.cpCount" placeholder="优惠券数量"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="el-icon-remove-outline" @click="toReduce(index)"></div>
    </div>
    <div v-if="activeName === 'confirm'" class="icon-box">
      <div class="el-icon-circle-plus-outline" @click="toAdd"></div>
    </div>
    <div style="display: flex;justify-content: center">
      <div class="toolbar-box convert-rule-add-remarks-box" style="width: 90px;height: 100%;">
        <div style="width: 100%">
          <div class="label">备注</div>
        </div>
      </div>
      <div class="toolbar-box convert-rule-add-remarks-box">
        <div style="width: 100%">
          <el-input
                  type="textarea"
                  :rows="4"
                  resize="none"
                  v-model="form.remark">
          </el-input>
        </div>
      </div>
    </div>
    <div v-if="activeName === 'contract'" class="table-main">
      <div class="item-title">获利设置</div>
      <div class="toolbar-box">
        <div>
          <div class="label">门店名称</div>
          <div class="content">
            <storeSelect @change="storeChange" ref="store"/>
          </div>
        </div>
        <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
        <el-button type="primary" @click="resetTableData" plain>{{ $text.reset }}</el-button>
      </div>
      <div class="actionbar">
        <el-button type="primary" @click="dialogVisible = true">添加门店</el-button>
        <el-button type="primary" @click="dialogVisibleImport = true">{{ $text.import }}</el-button>
        <importExport
            :showExport="true"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="获利设置导出"
        />
      </div>
      <div class="table">
        <el-table
                :data="tableData"
                header-cell-class-name="table-header-item"
        >
          <el-table-column
            prop="storeInfoDTO.level"
            label="门店性质"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeInfoDTO.storeRefNo"
              label="门店编号"
              width="180"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeInfoDTO.storeName"
            label="门店名称"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="lowerLimit"
            label="入库下限"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="upperLimit"
            label="入库上限"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="rbRuleName"
            label="返利规则"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="itRuleName"
            label="积分规则"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="epRuleName"
            label="兑换点规则"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cpRuleName"
            label="优惠券"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cpCount"
            label="优惠券数量"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column>
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
        <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <div class="btn-footer">
      <el-button type="primary" @click="save">{{ $text.save }}</el-button>
      <el-button type="primary" @click="back" plain>{{ $text.cancel }}</el-button>
    </div>
    <dialogAddStore :ruleNo="ruleNo" :dialogVisible.sync="dialogVisible" @close="dialogVisible = false" @listStoreByPage="listStoreByPage"/>
    <dialogAddImport
      :rbRuleList="selectList.detailRebateRuleOptions"
      :itRuleList="selectList.integralOptions"
      :epRuleList="selectList.exchangeOptions"
      :couponList="selectList.couponOptions"
      :dialogVisible.sync="dialogVisibleImport"
      :importUrl="importUrl"
      @close="dialogVisibleImport = false"
      @selectImport="getSelectImport"
    />
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
