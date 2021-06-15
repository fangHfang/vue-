<template>
  <div class="page-content">
    <h3 class="page-name">{{isModify ? '编辑' : '新增'}}店检规则</h3>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <div class="del-form">
        <div class="item-box">
          <h4 class="item-title">店检基础信息</h4>
          <div class="item-row">
            <el-form-item label="名称" prop="name">
              <el-input :value="form.name" placeholder="请输入店检名称" @input="e=>form.name=$validForbid(e)"></el-input>
            </el-form-item>
            <el-form-item label="店检时间" prop="time" class="item-time">
              <el-date-picker
                  v-model="form.monthArr"
                  type="monthrange"
                  value-format="yyyy-MM"
                  range-separator="至"
                  :picker-options="pickerOptions"
                  start-placeholder="开始月份"
                  end-placeholder="结束月份">
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">店检项目设置</h4>
          <div class="item-row">
            <el-form-item label="自定义项目分值" prop="score">
              <el-input v-model="form.customScore" placeholder="设置自定义分值占总分的部分分值"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="text" size="small">（注意此处默认总分为100分）</el-button>
            </el-form-item>
          </div>
          <div class="link-box" v-for="(item,index) in form.clauseList" :key="index">
            <div class="item-row">
              <div class="spec-input-box">
                <el-form-item label="项目名称" prop="name">
                  <el-input maxlength="20" show-word-limit :value="item.name" placeholder="请输入项目名称" @input="e=>item.name=$validForbid(e)" style="max-width:377px;"></el-input>
                </el-form-item>
                <el-form-item label="分值" prop="fullScore">
                  <el-input v-model="item.fullScore" placeholder="请输入分值" style="max-width:150px;" type="number"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="示例图" prop="exampleUrl" class="item-image">
                <div class="flex-start align-start">
                  <div>
                    <el-upload
                        :action="$uploadUrl"
                        :headers="token"
                        list-type="picture-card"
                        accept="image/jpeg,image/png"
                        :limit="1"
                        :size="{width:200,height:100}"
                        :data="{ target: 'item' }"
                        :on-success="val=>handlePicSuccess(val,item)"
                        :file-list="item.exampleUrlFileList"
                        :class="item.exampleUrl?'disabled upcard':'upcard'"
                    >
                      <i class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{file}">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions" >
                    <span
                        class="el-upload-list__item-delete"
                        @click="handlePicRemove(file,item)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                      </div>
                    </el-upload>
<!--                    <upload :fileList.sync="item.exampleUrlFileList" @realList="(list)=>getImgList(list,item)" :limit="1" :size="{width:200,height:100}"/>-->
                  </div>
                  <el-form-item style="width:300px;margin-left:10px;">
                    <span>支持扩展名：. jpg . png 图片大小为750*230px</span>
                  </el-form-item>
                </div>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="项目要求" prop="requirement" class="item-image">
                <el-input maxlength="200" show-word-limit v-model="item.requirement" placeholder="" type="textarea" :autosize="{ minRows: 4}"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="备注" prop="description" class="item-image">
                <el-input maxlength="200" show-word-limit v-model="item.description" placeholder="" type="textarea" :autosize="{ minRows: 4}"></el-input>
              </el-form-item>
            </div>
            <em @click="removeLinkItem(index)" class="el-icon-remove-outline"></em>
          </div>
          <em @click="addClauseItem" class="el-icon-circle-plus-outline"></em>
        </div>
        <div class="item-box item-rebate">
          <div class="rebate">
            <h4 class="item-title">返利设置</h4>
            <em @click="addTotalRebateItem()" class="el-icon-circle-plus-outline"></em>
          </div>
          <div v-if="form.rebateList.length > 0">
            <div class="link-box rebate-box" v-for="(item,index) in form.rebateList" :key="index">
              <div class="item-row">
                <el-checkbox v-model="item.checked"></el-checkbox>
                <div class="rebate-row">
                  <el-row :gutter="12">
                    <el-col :span="1" @click.native="addRebateItem(index)"><i class="iconfont jiahao"></i></el-col>
                    <el-col :span="6" class="header-text"><span>分数条件</span></el-col>
                    <el-col :span="6"><el-input v-model="item.minScore" placeholder=""></el-input></el-col>
                    <el-col :span="1"><span>至</span></el-col>
                    <el-col :span="6"><el-input v-model="item.maxScore" placeholder=""></el-input></el-col>
                    <el-col :span="6" class="header-text"><span>获得设置</span></el-col>
                    <el-col :span="24"></el-col>
                  </el-row>
                  <el-row :gutter="12" v-for="(setItem,setIndex) in item.rebateSettingsList" :key="setIndex">
                    <el-col :span="1" @click.native="removeRebateItem(index,setIndex)"><i class="iconfont jianhao"></i></el-col>
                    <el-col :span="6" class="header-text">
                      <el-select clearable v-model="setItem.conditionType.value" placeholder="条件类型" @change="(val)=>conditionTypeChange(val,setItem)">
                        <el-option
                          v-for="item in setItem.conditionType.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6"><el-input v-model="setItem.minCount" placeholder=""></el-input></el-col>
                    <el-col :span="1"><span>至</span></el-col>
                    <el-col :span="6"><el-input v-model="setItem.maxCount" placeholder=""></el-input></el-col>
                    <el-col :span="6" class="header-text">
                      <el-select clearable v-model="setItem.rebateNo.value" placeholder="返利规则" @visible-change="(val)=>selectVisibleChange(val,setItem)">
                        <el-option
                          v-for="item in setItem.rebateNo.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6" class="header-text">
                      <el-select clearable v-model="setItem.integralNo.value" placeholder="积分规则" @visible-change="(val)=>selectVisibleChange(val,setItem)">
                        <el-option
                          v-for="item in setItem.integralNo.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6" class="header-text">
                      <el-select clearable v-model="setItem.exchangeNo.value" placeholder="兑换点规则" @visible-change="(val)=>selectVisibleChange(val,setItem)">
                        <el-option
                                v-for="item in setItem.exchangeNo.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6" class="header-text">
                      <el-select clearable v-model="setItem.couponNo.value" placeholder="优惠券规则" @visible-change="(val)=>selectVisibleChange(val,setItem)">
                        <el-option
                          v-for="item in setItem.couponNo.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6" class="header-text"><el-input v-model="setItem.couponCount" placeholder="数量"></el-input></el-col>
                  </el-row>
                </div>
                <em @click="removeRebateSetItem(index)" class="el-icon-remove-outline"></em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="saveInspect">{{ $text.save }}</el-button>
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>