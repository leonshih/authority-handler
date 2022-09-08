/** 權限Enum */
export enum AuthorityEnum {
  NONE,
  READ = 1 << 0, // 1 讀取
  CREATE = 1 << 1, // 2 建立
  UPDATE = 1 << 2, // 4 更新
  DELETE = 1 << 3, // 8 刪除
  EXPORT = 1 << 4, // 16 匯出
  IMPORT = 1 << 5, // 32 匯入
}

/** 平台功能權限 */
export const functionAuthorityMap = {
	/** 功能一 */
	F01:
    AuthorityEnum.READ |
    AuthorityEnum.CREATE |
    AuthorityEnum.UPDATE |
    AuthorityEnum.DELETE,
	/** 功能二 */
	F02:
    AuthorityEnum.READ |
    AuthorityEnum.CREATE |
    AuthorityEnum.UPDATE |
    AuthorityEnum.DELETE |
    AuthorityEnum.EXPORT |
    AuthorityEnum.IMPORT,
	/** 功能三 */
	F03: 
    AuthorityEnum.READ | 
    AuthorityEnum.EXPORT | 
    AuthorityEnum.IMPORT,
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

/** 權限名稱對應表 */
export const authorityNameMap = {
	NONE: AuthorityEnum.NONE,
	READ: AuthorityEnum.READ,
	UPDATE: AuthorityEnum.UPDATE,
	DELETE: AuthorityEnum.DELETE,
	CREATE: AuthorityEnum.CREATE,
	EXPORT: AuthorityEnum.EXPORT,
	IMPORT: AuthorityEnum.IMPORT,
};

export default { AuthorityEnum, functionAuthorityMap, authorityNameMap };