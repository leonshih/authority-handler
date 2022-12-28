import { functionPermissionMap } from "../config/authorityConfig";

interface IUserAuthority {
	serviceKey: string;
	permission: number;
}

export default class AuthorityHandler {
	servicePermissionMap: any;
	functionPermissionMap: any;

	constructor(config: {
		servicePermissionMap: any;
		functionPermissionMap?: any;
	}) {
		this.servicePermissionMap = config.servicePermissionMap;
		this.functionPermissionMap =
			config.functionPermissionMap ?? functionPermissionMap;
	}

	/**
	 * 檢查該服務是否包含該權限
	 * @param serviceKey 服務代碼 e.g. 'F01'
	 * @param permission 權限值 e.g. 3
	 * @returns
	 * @example
	 * verifyServicePermission('F01', PermissionEnum.READ); // { isValid: true, invalidPermissionList: [] }
	 * verifyServicePermission('F01', PermissionEnum.EXPORT); // { isValid: false, invalidPermissionList: ['export'] }
	 * verifyServicePermission('F01', PermissionEnum.READ | PermissionEnum.EXPORT); // { isValid: false, invalidPermissionList: ['export'] }
	 */
	verifyServicePermission(
		serviceKey: string,
		permission: number
	): {
		isValid: boolean;
		invalidPermissionList: string[];
	} {
		const servicePermission = this.servicePermissionMap[serviceKey];

		const invalidPermission = permission & ~servicePermission;
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

		for (const [name, value] of Object.entries(this.functionPermissionMap)) {
			if (permission & (value as number)) {
				nameList.push(name);
			}
		}

		return nameList;
	}

	/**
	 * 檢查使用者於某服務內是否有某功能之權限
	 * @param userAuthorities 被驗證的權限清單  e.g. [{ serviceKey: 'F01', permission: 3 }]
	 * @param targetServiceKey 服務代碼 e.g. 'F01'
	 * @param functionKey 功能代碼 e.g. 'READ'
	 * @returns boolean
	 */
	verifyUserAuthorities(
		userAuthorities: IUserAuthority[],
		targetServiceKey: string,
		functionKey: string
	) {
		const authorityData = userAuthorities.find(
			({ serviceKey }: { serviceKey: string }) =>
				serviceKey === targetServiceKey
		);

		const permission = this.functionPermissionMap[functionKey];

		return !!(authorityData ? authorityData.permission & permission : 0);
	}
}
