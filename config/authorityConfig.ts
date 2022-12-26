/** 權限Map */
export const actionPermissionMap = {
  NONE: 0,
  READ: 1 << 0, // 1 讀取
  CREATE: 1 << 1, // 2 建立
  UPDATE: 1 << 2, // 4 更新
  DELETE: 1 << 3, // 8 刪除
  EXPORT: 1 << 4, // 16 匯出
  IMPORT: 1 << 5, // 32 匯入
};

/** 平台功能權限 */
export const functionPermissionMap = {
  /** 功能一 */
  F01:
    actionPermissionMap.READ |
    actionPermissionMap.CREATE |
    actionPermissionMap.UPDATE |
    actionPermissionMap.DELETE,
  /** 功能二 */
  F02:
    actionPermissionMap.READ |
    actionPermissionMap.CREATE |
    actionPermissionMap.UPDATE |
    actionPermissionMap.DELETE |
    actionPermissionMap.EXPORT |
    actionPermissionMap.IMPORT,
  /** 功能三 */
  F03:
    actionPermissionMap.READ |
    actionPermissionMap.EXPORT |
    actionPermissionMap.IMPORT,
};

export default { actionPermissionMap, functionPermissionMap };
