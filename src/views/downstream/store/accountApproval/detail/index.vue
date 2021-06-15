<template>
  <div class="page">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">门店账号审批详情</h3>
      <el-form :model="form" ref="form" class="store-info-add-form" label-width="90px">
        <div class="item-box detail-toolbar">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店名称">
                <el-input v-model="form.name" placeholder="请输入门店名称" readonly></el-input>
              </el-form-item>
              <el-form-item label="门店code">
                <el-input v-model="form.storeNo" placeholder="请输入门店code" readonly></el-input>
              </el-form-item>
              <el-form-item label="经销商名称">
                  <el-input v-model="form.dealerName" placeholder="经销商名称" readonly></el-input>
              </el-form-item>
            <el-form-item label="经销商code">
                <el-input v-model="form.dealerNo" placeholder="请输入经销商code" readonly ></el-input>
            </el-form-item>
            <el-form-item label="门店等级">
                <el-input v-model="form.levels" placeholder="门店等级" readonly></el-input>
            </el-form-item>
                <!-- <el-form-item label="上级门店">
                    <el-input v-model="form.superior" placeholder="上级门店" readonly></el-input>
                </el-form-item> -->
            </div>
          </div>
        </div>
        <div class="item-box detail-toolbar">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店联系人">
                <el-input v-model="form.contact" placeholder="请输入门店联系人" readonly></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号">
                <el-input v-model="form.contactPhone" placeholder="请输入联系人手机号" readonly></el-input>
              </el-form-item>
                <el-form-item label="门店状态">
                    <el-input v-model="['禁用', '启用'][form.status]" placeholder="" readonly ></el-input>
                </el-form-item>
                <el-form-item label="门店备注">
                    <el-input v-model="form.remarks" placeholder="请输入门店备注" readonly></el-input>
                </el-form-item>
                <el-form-item label="门店创建时间">
                    <el-input v-model="form.created" placeholder="门店创建时间" readonly ></el-input>
                </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box detail-toolbar">
          <div class="del-form">
            <div class="item-row store-info-add-item-row">
              <el-form-item class="store-info-add-item-row-first" label="门店地址">
                  <label>{{form.districtName}}{{form.address}}</label>
              </el-form-item>
            </div>
          </div>
        </div>
       <div class="upload-store-info-add-box">
           <div class="item-box detail-toolbar">
             <div class="del-form">
               <div class="item-row">
                 <el-form-item label="营业执照" class="form-item-upload store-info-add-upload">
                   <el-image :preview-src-list="form.srcList" :src="form.license" alt="" class="el-upload el-upload--picture-card"></el-image>
                 </el-form-item>
               </div>
             </div>
           </div>
         </div>
         <div class="upload-store-info-add-box">
           <div class="item-box">
             <div class="del-form">
               <div class="item-row">
                 <el-form-item class="store-info-add-form-item-last" label="门店标签">
                   <el-select multiple v-model="form.tags.value" placeholder="选择添加已有标签">
                     <el-option
                           v-for="item in form.tags.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                     </el-option>
                   </el-select>
                 </el-form-item>
               </div>
             </div>
           </div>
        </div>
        <div class="btn-box">
          <el-button type="primary" @click="storePassed" v-if="permission.includes('ZBPCB01020401')">通过</el-button>
          <el-button @click="storeRejected" v-if="permission.includes('ZBPCB01020402')">驳回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>