<template>
  <div class="page-content r-i-l-t-add-page-content">
    <h3 class="page-name">资讯详情</h3>
    <el-form :model="form" ref="form" label-width="90px">
      <div class="item-box">
        <div class="del-form">
          <div class="item-row">
            <el-form-item label="资讯标题">
              <span>{{form.name}}</span>
            </el-form-item>
            <el-form-item style="margin-left: 20px;width: 300px">
              <el-radio :label="true" v-model="form.closeComment">不允许评论</el-radio>
            </el-form-item>
            <div class="info-detail-input-box">
              <el-form-item label="创建人">
                <span>{{form.createUserName}}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{form.createdTime}}</span>
              </el-form-item>
            </div>
          </div>
          <div class="item-row">
            <el-form-item label="资讯内容" class="item-textarea r-i-l-t-add-item-textarea">
              <div v-html="form.content"></div>
            </el-form-item>
          </div>

          <div>
            <em style="padding: 14px;color: #666;font-style:normal;">文章评论/点赞</em>
            <div class="table-main r-i-l-t-add-table-main">
              <div class="table">
                <el-table
                    :data="tableData"
                    v-loading="tableLoading"
                    header-cell-class-name="table-header-item"
                >
                  <el-table-column
                      fixed="left"
                      label="操作"
                      width="60"
                  >
                    <template slot-scope="scope">
                      <el-button
                          type="text"
                          size="small"
                          v-if="scope.row.status === 1"
                          @click="operationStatus(scope.row, 0)">
                        {{ $text.stopUsing }}
                      </el-button>
                      <el-button
                          type="text"
                          size="small"
                          v-else
                          @click="operationStatus(scope.row,1)">
                        {{ $text.enable }}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                      type="index"
                      label="序号"
                      width="60">
                  </el-table-column>
                  <el-table-column
                      prop="content"
                      label="评论内容"
                      show-overflow-tooltip
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="created"
                      label="发布时间"
                      width="200">
                  </el-table-column>
                  <el-table-column
                      prop="replyCount"
                      label="回复数量"
                      width="100"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      prop="clickCount"
                      label="点赞数量"
                      width="100"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      prop="userName"
                      label="评论人"
                      show-overflow-tooltip
                      width="140">
                  </el-table-column>
                  <el-table-column
                      prop="storeName"
                      label="评论人门店"
                      show-overflow-tooltip
                      width="160">
                  </el-table-column>
                  <el-table-column
                      prop="status"
                      label="评论状态"
                      width="120">
                    <template slot-scope="scope">
                      <div>
                        <i-status :type="['error', 'success'][scope.row.status]" :message="['关闭', '启用'][scope.row.status]" />
                      </div>
                    </template>
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

                <el-button type="primary">{{ $text.paginationGo }}</el-button>
              </div>
            </div>
          </div>
          <div class="item-row item-button r-i-l-t-add-btn">
            <el-form-item>
              <el-button type="primary" @click="changeStatus(1)">{{ $text.enable }}</el-button>
              <el-button @click="changeStatus(0)">{{ $text.stopUsing }}</el-button>
              <el-button @click="back">{{ $text.cancel }}</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
