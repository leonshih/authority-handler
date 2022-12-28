/** 權限Map */
export const functionPermissionMap = {
	NONE: 0,
	READ: 1 << 0, // 1 讀取
	CREATE: 1 << 1, // 2 建立
	UPDATE: 1 << 2, // 4 更新
	DELETE: 1 << 3, // 8 刪除
	EXPORT: 1 << 4, // 16 匯出
	IMPORT: 1 << 5, // 32 匯入
};

/** 服務權限值對應表 */
export const servicePermissionMap = {
	/** 服務一 */
	F01:
		functionPermissionMap.READ |
		functionPermissionMap.CREATE |
		functionPermissionMap.UPDATE |
		functionPermissionMap.DELETE,
	/** 服務二 */
	F02:
		functionPermissionMap.READ |
		functionPermissionMap.CREATE |
		functionPermissionMap.UPDATE |
		functionPermissionMap.DELETE |
		functionPermissionMap.EXPORT |
		functionPermissionMap.IMPORT,
	/** 服務三 */
	F03:
		functionPermissionMap.READ |
		functionPermissionMap.EXPORT |
		functionPermissionMap.IMPORT,
};

export default { functionPermissionMap, servicePermissionMap };
