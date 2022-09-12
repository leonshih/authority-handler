/** 權限Map */
export const authorityMap = {
	NONE: 0,
	READ: 1 << 0, // 1 讀取
	CREATE: 1 << 1, // 2 建立
	UPDATE: 1 << 2, // 4 更新
	DELETE: 1 << 3, // 8 刪除
	EXPORT: 1 << 4, // 16 匯出
	IMPORT: 1 << 5, // 32 匯入
}

/** 平台功能權限 */
export const functionAuthorityMap = {
	/** 功能一 */
	F01:
    authorityMap.READ |
    authorityMap.CREATE |
    authorityMap.UPDATE |
    authorityMap.DELETE,
	/** 功能二 */
	F02:
    authorityMap.READ |
    authorityMap.CREATE |
    authorityMap.UPDATE |
    authorityMap.DELETE |
    authorityMap.EXPORT |
    authorityMap.IMPORT,
	/** 功能三 */
	F03: 
    authorityMap.READ | 
    authorityMap.EXPORT | 
    authorityMap.IMPORT,
};

/** 平台功能權限名稱 */
export enum AuthorityNameEnum {
    READ = 'READ',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    EXPORT = 'EXPORT',
    IMPORT = 'IMPORT',
}

export default { authorityMap, functionAuthorityMap, AuthorityNameEnum };