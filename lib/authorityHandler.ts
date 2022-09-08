interface IUserAuthority {
  functionKey: string;
  authority: number;
}

/** 權限Enum */
enum DefaultAuthorityEnum {
    NONE,
    READ = 1 << 0, // 1 讀取
    CREATE = 1 << 1, // 2 建立
    UPDATE = 1 << 2, // 4 更新
    DELETE = 1 << 3, // 8 刪除
    EXPORT = 1 << 4, // 16 匯出
    IMPORT = 1 << 5, // 32 匯入
}

export default class AuthorityHandler {
	AuthorityEnum?: any;
	functionAuthorityMap: any;
	authorityNameMap: any;

	constructor(config: {AuthorityEnum?: any, functionAuthorityMap: any, authorityNameMap: any}) {
		this.AuthorityEnum = config.AuthorityEnum ?? DefaultAuthorityEnum;
		this.functionAuthorityMap = config.functionAuthorityMap;
		this.authorityNameMap = config.authorityNameMap;
	}

	/**
     * 檢查該功能是否包含該權限
     * @param authority 權限值 e.g. 3
     * @param functionKey 功能key值 e.g. 'F01'
     * @returns
     * @example
     * verifyAuthority('F01', AuthorityEnum.READ); // { isValid: true, invalidAuthorityList: [] }
     * verifyAuthority('F01', AuthorityEnum.EXPORT); // { isValid: false, invalidAuthorityList: ['export'] }
     * verifyAuthority('F01', AuthorityEnum.READ | AuthorityEnum.EXPORT); // { isValid: false, invalidAuthorityList: ['export'] }
     */
	verifyFunctionAuthority(
		functionKey: string,
		authority: number
	): {
    isValid: boolean;
    invalidAuthorityList: string[];
  } {
		const functionAuthority = this.functionAuthorityMap[functionKey];

		const invalidAuthority = authority & ~functionAuthority;
		return {
			isValid: invalidAuthority === 0,
			invalidAuthorityList: this.getNameListByAuthority(invalidAuthority),
		};
	}

	/**
     * 將權限值轉換為權限名稱之陣列
     * @param authority 權限值
     * @returns string[]
     * @example
     * getNameListByAuthority(3); // ['READ', 'CREATE']
     */
	getNameListByAuthority(authority: number): string[] {
		const nameList = [];

		for (const [name, value] of Object.entries(this.authorityNameMap)) {
			if (authority & (value as number)) {
				nameList.push(name);
			}
		}

		return nameList;
	}

	/**
     * 檢查使用者於某功能內是否有某權限
     * @param userAuthorityList 被驗證的權限清單  e.g. [{ functionKey: 'F01', authority: 3 }]
     * @param targetFunctionKey 功能代碼 e.g. 'F01'
     * @param authority 權限值 e.g. 3
     * @returns boolean
     */
	verifyUserFunctionAuthority(
		userAuthorityList: IUserAuthority[],
		targetFunctionKey: string,
		authorityName: string
	) {
		const authority = this.authorityNameMap[authorityName];
		const authorityData = userAuthorityList.find(
			({ functionKey }: { functionKey: string }) =>
				functionKey === targetFunctionKey
		);

		return !!(authorityData ? authorityData.authority & authority : 0);
	}
}
