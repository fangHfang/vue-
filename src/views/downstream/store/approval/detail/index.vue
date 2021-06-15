<template>
  <div class="page">
    <div class="detail-box">
      <span class="title">门店定位详情</span>
      <div class="detail-item">
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>门店名称: </span>
                <span>{{ form.storeName }}</span>
              </div>
              <div class="content-col">
                <span>门店code: </span>
                <span>{{ form.storeNo }}</span>
              </div>
              <div class="content-col">
                <span>经销商名称: </span>
                <span>{{ form.name }}</span>
              </div>
              <div class="content-col">
                <span>经销商code: </span>
                <span>{{ form.dealerNo }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="content-col" style="flex-wrap: wrap">
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span>门店定位显示</span>
                  <span>初始定位</span>
                </div>
                <div class="map">
                  <div id="aMapId" class="a-map" v-loading="mapLoading"></div>
                </div>
              </div>
              <div class="content-col">
                <span>申请标题: </span>
                <span>{{ form.title }}</span>
              </div>
              <div class="content-col">
                <span>地址: </span>
                <span>{{ form.addressDetail }}</span>
              </div>
              <div class="content-col">
                <span>备注: </span>
                <span>{{ form.remarks }}</span>
              </div>
              <div class="content-col">
                <span>申请时间: </span>
                <span>{{ form.created }}</span>
              </div>
              <div class="content-col">
                <div style="margin-right: 40px">
                  <span>经度: </span>
                  <span>{{ form.longitude }}</span>
                </div>
                <div>
                  <span>纬度: </span>
                  <span>{{ form.latitude }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="content-col">
                <span>附近门店</span>
              </div>
              <div class="content-col table-main" style="flex-wrap: wrap;">
                <div class="table">
                  <el-table
                          v-loading="loading"
                          :data="tableData"
                          max-height="330"
                          header-cell-class-name="table-header-item"
                  >
                    <el-table-column
                            type="index"
                            label="序号"
                            width="100"
                    >
                    </el-table-column>
                    <!-- <el-table-column
                        prop="storeNo"
                        width="150"
                        label="内部门店号"
                        show-overflow-tooltip
                    >
                    </el-table-column> -->
                    <el-table-column
                        prop="storeRefNo"
                        width="150"
                        label="门店编号"
                        show-overflow-tooltip
                    >
                    </el-table-column>
                    <el-table-column
                            prop="storeDistance"
                            label="门店距离"
                    />
                    <!--<el-table-column />-->
                  </el-table>
                </div>
                <div class="pagination">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="searchData.pageIndex"
                    :page-sizes="[10, 20, 50, 100, 200]"
                    :page-size="searchData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                  >
                  </el-pagination>
                  <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer flex-center" v-if="this.approveStatus === 0" >
      <el-button type="primary" @click="approveSuccess">通过</el-button>
      <el-button plain @click="refuseDialog = true">驳回</el-button>
    </div>
       <el-dialog
        title="驳回理由"
        :visible.sync="refuseDialog"
        :before-close="closedDialog"
        width="520px">
      <el-input type="textarea" v-model="remarks" rows="5" placeholder="请输入驳回理由" resize="none"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="refuseDialog = false">取 消</el-button>
          <el-button type="primary" @click="approveFailed">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import 'index';
</style>