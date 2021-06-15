<template>
  <el-dialog
      title="扫码明细"
      :visible.sync="dialogVisible"
      width="1000px"
      destroy-on-close
      :before-close="handleClose">
    <div class="border-content">
      <div class="table-main">
        <div class="table">
          <el-table
              :data="tableData"
              max-height="400"
              header-cell-class-name="table-header-item"
              v-loading="tableLoading"
          >
            <el-table-column
                type="index"
                label="序号"
                align="center"
                width="80"
            >
            </el-table-column>
            <el-table-column
                prop="type"
                label="扫码阶段"
                width="240"
                show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{getPeriod(scope.row.type)}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="operatorName"
                label="操作明细"
                width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="status"
                label="是否有效"
                width="120"
                show-overflow-tooltip
            >
              <template slot-scope="scope">
                <i-status class="i-status" :type="['error','success',][scope.row.status]" :message="['无效','有效'][scope.row.status]" />
              </template>
            </el-table-column>
            <el-table-column
                prop="typeDesc"
                label="有效性质"
                width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="scanTime"
                label="扫码时间"
                min-width="160"
                show-overflow-tooltip
            >
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
    </div>
  </el-dialog>
</template>
<script>
import { pageBarcodeRecord } from "@/api/report/scan/code.js";
export default {
  "name": "dialogActivityClass",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "currentBarCode": {
      "type": String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      "searchData": {
        "pageNum": 1,
        "pageSize": 10
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false
    };
  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.getRemoteDataByPage();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    getPeriod(type) {
      // 扫码阶段1.总部出库 2.经销商入库 3.经销商出库 4.门店入库 5.门店出库 6.门店退货 7.订单退货
      return [ "", "总部出库", "经销商入库", "经销商出库", "门店入库", "门店出库", "门店退货", "订单退货" ][type];
    },
    /**
       * 修改页大小
       * @param {*} val
       */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.getRemoteDataByPage();
    },

    /**
       * 分页器当前页码变化处理
       * @param val
       */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.getRemoteDataByPage();
    },

    /**
       * 查询
       */
    search() {
      this.searchData.pageNum = 1;
      this.getRemoteDataByPage();
    },

    /**
       * 查询
       */
    getRemoteDataByPage() {
      // 请求参数
      const param = "?pageNum=" + this.searchData.pageNum + "&pageSize=" + this.searchData.pageSize + "&barcode=" + this.currentBarCode;
      this.tableLoading = true;
      pageBarcodeRecord(param).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error("查询失败");
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },

    /**
       * 关闭弹窗
       * @param done
       */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>