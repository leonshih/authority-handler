import {
	permissionMap,
	PermissionNameEnum
} from '../config/authorityConfig';


interface IUserAuthority {
  functionKey: string;
  permission: number;
}

export default class AuthorityHandler {
	functionPermissionMap: any;
	permissionMap: any;
	PermissionNameEnum: any;

	constructor(config: {
        functionPermissionMap: any, 
        permissionMap?: any, 
        PermissionNameEnum?: any
    }) {
		this.functionPermissionMap = config.functionPermissionMap;
		this.permissionMap = config.permissionMap ?? permissionMap;
		this.PermissionNameEnum = config.PermissionNameEnum ?? PermissionNameEnum;
	}

	/**
     * 檢查該功能是否包含該權限
     * @param permission 權限值 e.g. 3
     * @param functionKey 功能key值 e.g. 'F01'
     * @returns
     * @example
     * verifyFunctionPermission('F01', PermissionEnum.READ); // { isValid: true, invalidPermissionList: [] }
     * verifyFunctionPermission('F01', PermissionEnum.EXPORT); // { isValid: false, invalidPermissionList: ['export'] }
     * verifyFunctionPermission('F01', PermissionEnum.READ | PermissionEnum.EXPORT); // { isValid: false, invalidPermissionList: ['export'] }
     */
	verifyFunctionPermission(
		functionKey: string,
		permission: number
	): {
    isValid: boolean;
    invalidPermissionList: string[];
  } {
		const functionPermission = this.functionPermissionMap[functionKey];

		const invalidPermission = permission & ~functionPermission;
		return {
			isValid: invalidPermission === 0,
			invalidPermissionList: this.getNameListByPermission(invalidPermission),
		};
	}

	/**
     * 將權限值轉換為權限名稱之陣列
     * @param permission 權限值
     * @returns string[]
     * @example
     * getNameListByAuthority(3); // ['READ', 'CREATE']
     */
	getNameListByPermission(permission: number): string[] {
		const nameList = [];

		for (const [name, value] of Object.entries(this.permissionMap)) {
			if (permission & (value as number)) {
				nameList.push(name);
			}
		}

		return nameList;
	}

	/**
     * 檢查使用者於某功能內是否有某權限
     * @param userAuthorityList 被驗證的權限清單  e.g. [{ functionKey: 'F01', permission: 3 }]
     * @param targetFunctionKey 功能代碼 e.g. 'F01'
     * @param permission 權限值 e.g. 3
     * @returns boolean
     */
	verifyUserFunctionPermission(
		userAuthorityList: IUserAuthority[],
		targetFunctionKey: string,
		permissionName: string
	) {
		const permission = this.permissionMap[permissionName];
		const authorityData = userAuthorityList.find(
			({ functionKey }: { functionKey: string }) =>
				functionKey === targetFunctionKey
		);

		return !!(authorityData ? authorityData.permission & permission : 0);
	}
}
