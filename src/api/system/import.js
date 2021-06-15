import { download, upload, downloadPlus } from "@/utils/request";
/**
 * 导入
 */
export const systemFileImport = (url, file) => {
  // const postData = new FormData();
  // postData.append("file", file);
  return upload({
    "url": url,
    "data": file
  });
};
/**
 * 导出
 */
export const systemFileExport = (url, data, method = "post") => {
  if (method === "post") {
    return download({
      "url": url,
      data
    });
  }
  return downloadPlus({
    "url": url,
    data
  });
};