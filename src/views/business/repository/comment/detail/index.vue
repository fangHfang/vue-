<template>
  <div class="page-content r-i-l-t-add-page-content">
    <h3 class="page-name">评论详情</h3>
    <el-form :model="form" ref="form" label-width="90px">
      <div class="item-box">
        <div class="del-form">
          <div class="item-row">
            <el-form-item label="文章标题">
              <el-input v-model="form.title" disabled></el-input>
            </el-form-item>
            <el-form-item label="文章类型">
              <el-input v-model="form.articleType" disabled></el-input>
            </el-form-item>
          </div>
          <div class="item-row">
            <el-form-item label="文章内容" class="item-textarea r-i-l-t-add-item-textarea">
              <div v-html="form.articleContent"></div>
            </el-form-item>
          </div>
          <div class="toolbar-box repository-comment-detail-toolbar">
            <div>
              <el-form-item label="评论人">
                <span>{{form.createBy}}</span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="评论人所属门店" label-width="120px">
                <span>{{form.storeName}}</span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="发表时间">
                <span>{{form.created}}</span>
              </el-form-item>
            </div>
            <div style="width: calc(610 / 1366 * 100vw);">
              <el-form-item label="评论内容" class="item-textarea r-i-l-t-add-item-textarea" style="width: calc(100% - 20px);">
                <div v-html="form.content"></div>
              </el-form-item>
            </div>
          </div>
          <div>
            <h3 style="padding: 15px;color: #000;">回复内容</h3>
            <div class="table-main r-i-l-t-add-table-main">
              <div class="table">
                <el-table
                    :data="tableData"
                    max-height="330"
                    header-cell-class-name="table-header-item"
                >
                  <el-table-column
                      fixed="left"
                      label="操作"
                      width="90"
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
                      width="90">
                  </el-table-column>
                  <el-table-column
                      prop="content"
                      label="评论内容"
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
                      width="120"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      prop="clickCount"
                      label="点赞数量"
                      width="120"
                      show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                      prop="userName"
                      label="评论人"
                      width="120">
                  </el-table-column>
                  <el-table-column
                      prop="storeName"
                      label="评论人门店"
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
              <el-button type="primary" @click="saveStatus(1)">{{ $text.enable }}</el-button>
              <el-button @click="saveStatus(0)">{{ $text.stopUsing }}</el-button>
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
