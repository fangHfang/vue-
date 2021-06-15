<template>
    <el-dialog
            title="订单发货"
            :visible.sync="dialogVisible"
            width="612px"
            destroy-on-close
            :before-close="handleClose">
        <div class="border-content">
            <div class="table-main" style="padding:0;">
                <div class="table">
                    <el-table
                            v-loading="tableLoading"
                            :data="tableDataDeliver"
                            max-height="330"
                            header-cell-class-name="table-header-item"
                    >
                        <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                                width="100"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="orderNo"
                                label="兑换单号"
                                width="160"
                                show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="storeNo"
                            width="150"
                            label="内部门店号"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                            prop="storeRefNo"
                            width="150"
                            label="门店编号"
                            show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column
                                prop="storeName"
                                label="门店名称"
                                width="140"
                                show-overflow-tooltip
                        >
                        </el-table-column>
                        <el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="toolbar-box dialog-set-list-toolbar">
                <div style="padding-top: 15px">
                    <div class="label">快递单号</div>
                </div>
                <div>
                    <div class="content">
                        <el-input v-model="toolBar.courierNo" clearable placeholder="请输入快递单号"></el-input>
                    </div>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">{{ $text.cancel }}</el-button>
            <el-button type="primary" @click="submitDeliver">{{ $text.paginationGo }}</el-button>
      </span>
    </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
    @import "./index";
</style>