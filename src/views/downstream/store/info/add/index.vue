<template>
  <div class="page">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">{{isDetail ? '门店详情' : isModify ? '编辑门店' : '新增门店'}}</h3>
      <el-form :model="form" ref="form" class="store-info-add-form" label-width="90px">
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店名称">
                <span v-if="isDetail">{{form.name}}</span>
                <el-input v-else v-model="form.name" placeholder="请输入门店名称"></el-input>
              </el-form-item>
              <el-form-item label="门店code">
                <span v-if="isDetail">{{form.storeNo}}</span>
                <el-input v-else v-model="form.storeNo" placeholder="请输入门店code" disabled ></el-input>
              </el-form-item>
              <el-form-item label="经销商名称">
                <el-select :disabled="isDetail" clearable v-model="form.dealerNames.value"
                           filterable
                           remote
                           reserve-keyword
                           :placeholder="$text.selectPlaceholder"
                           :remote-method="dealerNameSearch"
                           :loading="dealerLoading"
                           @change="dealerRegion(form.dealerNames.value,0)"
                >
                  <el-option
                    v-for="item in form.dealerNames.options"
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
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="经销商code">
                <span v-if="isDetail">{{form.dealerNo}}</span>
                <el-input v-else v-model="form.dealerNo" placeholder="请输入经销商code" disabled ></el-input>
              </el-form-item>
              <el-form-item label="门店等级">
                <el-select :disabled="isDetail" clearable v-model="form.levels.value" :placeholder="$text.selectPlaceholder">
                  <el-option
                      v-for="item in form.levels.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="门店状态">
                <span v-if="isDetail">{{['启用', '禁用'][form.status]}}</span>
                <el-input v-else v-model="['启用', '禁用'][form.status]" placeholder="" disabled ></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店联系人">
                <span v-if="isDetail">{{form.contact}}</span>
                <el-input v-else v-model="form.contact" placeholder="请输入门店联系人"></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号">
                <span v-if="isDetail">{{form.contactPhone}}</span>
                <el-input v-else v-model="form.contactPhone" placeholder="请输入联系人手机号"></el-input>
              </el-form-item>
              <el-form-item label="联系人邮箱">
                <span v-if="isDetail">{{form.contactEmail}}</span>
                <el-input v-else v-model="form.contactEmail" placeholder="请输入联系人邮箱"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="门店备注">
                <span v-if="isDetail">{{form.remarks}}</span>
                <el-input v-else v-model="form.remarks" placeholder="请输入门店备注"></el-input>
              </el-form-item>
              <el-form-item label="门店创建时间">
                <span v-if="isDetail">{{form.created}}</span>
                <el-input v-else v-model="form.created" placeholder="门店创建时间" disabled ></el-input>
              </el-form-item>
              <el-form-item label="所属区域">
                <el-select :disabled="isDetail" clearable v-model="form.region.value"
                        filterable
                        placeholder="请输入所属区域"
                        :loading="loading">
                  <el-option
                          v-for="item in form.region.options"
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
          <div class="del-form">
            <div class="item-row store-info-add-item-row">
              <el-form-item class="store-info-add-item-row-first" label="门店注册地址">
                <el-select :disabled="isDetail" clearable v-model="form.province.value"
                           @change="changeProvince"
                           placeholder="选择省">
                  <el-option
                      v-for="item in form.province.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select :disabled="isDetail" clearable v-model="form.city.value"
                           @change="changeCity"
                           placeholder="选择市">
                  <el-option
                      v-for="item in form.city.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select :disabled="isDetail" clearable v-model="form.area.value"
                           @change="changeArea"
                           placeholder="选择区">
                  <el-option
                      v-for="item in form.area.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="info-add-address">
                <el-input :disabled="isDetail" v-model="form.address" placeholder="详细地址"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
       <div class="upload-store-info-add-box">
         <div>
           <div class="item-box">
             <div class="del-form">
               <div class="item-row">
                 <el-form-item label="营业执照" class="form-item-upload store-info-add-upload">
                   <img v-if="isDetail" :src="form.license" class="el-upload el-upload--picture-card">
                  <el-upload
                          v-else
                              list-type="picture-card"
                              accept="image/jpeg,image/png"
                              :before-upload="beforeImageUpload"
                              :action="$uploadUrl"
                              :headers="token"
                              :data="{ target: 'item' }"
                              :auto-upload="true"
                              :show-file-list="false"
                              :disabled="isLook"
                              :on-success="(response) => { handleAvatarSuccess4License(response) }"
                              :on-remove="handleRemoveLicense"
                              >
                        <img v-if="form.license" :src="form.license" class="el-upload el-upload--picture-card">
                        <i v-else class="el-icon-plus uploader-icon"/>
                      </el-upload>

                 </el-form-item>
               </div>
             </div>
           </div>
           <div class="item-box">
             <div class="del-form">
               <div class="item-row">
                  <el-form-item label="身份证" class="form-item-upload store-info-add-upload">
                    <img v-if="isDetail" :src="form.contactUrl" class="el-upload el-upload--picture-card">
                         <el-upload
                                 v-else
                              list-type="picture-card"
                              accept="image/jpeg,image/png"
                              :before-upload="beforeImageUpload"
                              :action="$uploadUrl"
                              :headers="token"
                              :data="{ target: 'item' }"
                              :auto-upload="true"
                              :show-file-list="false"
                              :disabled="isLook"
                              :on-success="(response) => { onListPictureUploadContactSuccess(response) }"
                              >
                        <img v-if="form.contactUrl" :src="form.contactUrl" class="el-upload el-upload--picture-card">
                        <i v-else class="el-icon-plus uploader-icon"/>
                      </el-upload>
                 </el-form-item>
               </div>
             </div>
           </div>
           <div class="item-box">
             <div class="del-form">
               <div class="item-row">
                 <el-form-item label="门头照" class="form-item-upload store-info-add-upload">
                   <img v-if="isDetail" :src="form.doorUrl" class="el-upload el-upload--picture-card">
                    <el-upload
                            v-else
                              list-type="picture-card"
                              accept="image/jpeg,image/png"
                              :before-upload="beforeImageUpload"
                              :action="$uploadUrl"
                              :headers="token"
                              :data="{ target: 'item' }"
                              :auto-upload="true"
                              :show-file-list="false"
                              :disabled="isLook"
                              :on-success="(response) => { handleAvatarSuccess4DoorUrl(response) }"
                              >
                        <img v-if="form.doorUrl" :src="form.doorUrl" class="el-upload el-upload--picture-card">
                        <i v-else class="el-icon-plus uploader-icon"/>
                      </el-upload>

                 </el-form-item>
               </div>
             </div>
           </div>
         </div>
         <div class="item-box">
           <div class="del-form">
             <div class="item-row" style="flex-direction: column">
               <el-form-item class="store-info-add-form-item-last" label="门店外部关联号">
                 <span v-if="isDetail">{{form.outRefNo}}</span>
                 <el-input v-else v-model="form.outRefNo" placeholder="请输入门店外部关联号"></el-input>
               </el-form-item>
               <el-form-item class="store-info-add-form-item-last" label="门店标签">
                 <el-select :disabled="isDetail" multiple v-model="form.tags.value" placeholder="选择添加已有标签">
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
          <el-button v-if="!isDetail" type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(saveStoreInfo)">{{ $text.save }}</el-button>
          <el-button @click="back">{{ $text.cancel }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>