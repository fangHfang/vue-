<template>
  <div class="page">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">签约门店审批详情</h3>
      <el-form :model="form" ref="form" class="store-info-add-form" label-width="90px">
        <div class="item-box detail-toolbar">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店名称">
                <p>{{storeForm.storeName}}</p>
              </el-form-item>
              <el-form-item label="门店code">
                <p>{{storeForm.storeNo}}</p>
              </el-form-item>
              <el-form-item label="经销商名称">
                   <p>{{storeForm.dealerName}}</p>
              </el-form-item>
              <el-form-item label="经销商code">
                <p>{{storeForm.dealerNo}}</p>
              </el-form-item>
            </div>

            <div class="item-row">
              <el-form-item label="所属区域">
                <p>{{storeForm.regionName}}</p>
              </el-form-item>
              <el-form-item label="所在城市">
                <p>{{storeForm.districtName}}</p>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box detail-toolbar">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店联系人">
                <p>{{storeForm.contact}}</p>
              </el-form-item>
              <el-form-item label="联系人手机号">
                <p>{{storeForm.contactPhone}}</p>
              </el-form-item>
              <el-form-item label="门店状态">
                <p>{{['启用','禁用'][storeForm.status]}}</p>
              </el-form-item>
              <el-form-item label="门店创建时间">
                <p>{{storeForm.created}}</p>
              </el-form-item>
            </div>
          </div>
        </div>
          <h4 class="item-title">签约门店详情</h4>
          <div class="toolbar-box convert-rule-add-toolbar">
            <div>
                <div class="label">签约名称</div>
                <div class="content">
                    <el-input v-model="form.ruleName" :disabled="true" placeholder="请输入签约名称"></el-input>
                </div>
            </div>
            <div style="width: 10%;margin-left: 10px">
                <div class="content" style="width: 60%;display: flex;align-items: center">
                    <a >需门店确认</a>
                </div>
            </div>
            <div>
                <div class="label">签约时间</div>
                <div class="content">
                    <el-date-picker
                        v-model="form.date"
                        :disabled="true"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        >
                    </el-date-picker>
                </div>
            </div>
          </div>
      <div style="display: flex;">
      <div class="toolbar-box convert-rule-add-toolbar toolbar-content" style="width: auto">
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
                    :data="{ target: 'market' }"
                    list-type="picture-card"
                    accept="image/jpeg,image/gif,image/png"
                    :auto-upload="true"
                    :show-file-list="true"
                    ref="upload"
                    :on-success="(response) => { onListPictureUploadSuccess(response) }">
              <i class="el-icon-plus"></i>
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
                @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
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

      <div style="display: flex;justify-content: center">
        <div class="toolbar-box convert-rule-add-toolbar" style="width: 90px;height: 100%;padding: 6px 0">
          <div style="width: 100%">
            <div class="label">获利设置</div>
          </div>
        </div>
        <div class="toolbar-box signed-step-add-toolbar">
          <div>
            <div class="content">
              <el-input v-model="item.lowerLimit" :disabled="true" placeholder="入库数量下限"></el-input>
            </div>
          </div>
          <div>
            <div class="content">
              <el-input v-model="item.upperLimit" :disabled="true" placeholder="入库数量上限"></el-input>
            </div>
          </div>
          <div>
            <div class="content">
              <el-select
                filterable
                remote
                clearable
                v-model="item.rbRuleNo"
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
              <el-input v-model="item.cpCount" :disabled="true" placeholder="优惠券数量"></el-input>
            </div>
          </div>
        </div>
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
                              :disabled="true"
                              v-model="form.remark">
                      </el-input>
                  </div>
              </div>
          </div>
          <div v-if="item.approvalStatus !== 0" class="toolbar-box convert-rule-add-toolbar approvalStatus-box">
              <div>
                  <div class="label">门店签约状态</div>
                  <div class="content">
                      <el-input v-model="['', '审批通过', '审批不通过'][item.approvalStatus]" placeholder="" readonly></el-input>
                  </div>
              </div>
          </div>
        <div class="btn-box" v-if="item.approvalStatus===0">
          <el-button type="primary" @click="save(1)">通过</el-button>
          <el-button @click="dialogVisibleVeto = true">否决</el-button>
        </div>
      </el-form>
    </div>
      <el-dialog
        title="否决原因"
        :visible.sync="dialogVisibleVeto"
        width="600px"
        :before-close="handleClose"
        class="dialog"
      >
          <div style="display:flex;justify-content: center">
              <div class="dia-content">
                  <el-input type="textarea" :rows="4" v-model="vetoReason" placeholder="请输入否决原因"></el-input>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save(2)">{{$text.confirm}}</el-button>
        <el-button @click="close">{{$text.cancel}}</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
