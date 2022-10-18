/** 權限Map */
export const permissionMap = {
	NONE: 0,
	READ: 1 << 0, // 1 讀取
	CREATE: 1 << 1, // 2 建立
	UPDATE: 1 << 2, // 4 更新
	DELETE: 1 << 3, // 8 刪除
	EXPORT: 1 << 4, // 16 匯出
	IMPORT: 1 << 5, // 32 匯入
}

/** 平台功能權限 */
export const functionPermissionMap = {
	/** 功能一 */
	F01:
    permissionMap.READ |
    permissionMap.CREATE |
    permissionMap.UPDATE |
    permissionMap.DELETE,
	/** 功能二 */
	F02:
    permissionMap.READ |
    permissionMap.CREATE |
    permissionMap.UPDATE |
    permissionMap.DELETE |
    permissionMap.EXPORT |
    permissionMap.IMPORT,
	/** 功能三 */
	F03: 
    permissionMap.READ | 
    permissionMap.EXPORT | 
    permissionMap.IMPORT,
};

export default { permissionMap, functionPermissionMap };