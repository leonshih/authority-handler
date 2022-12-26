import { functionPermissionMap } from '../../config/authorityConfig'
import AuthorityHandler from '../../lib/authorityHandler'

const userAuthorities = [
	{ functionKey: 'F01', permission: 3 },
	{ functionKey: 'F02', permission: 3 },
	{ functionKey: 'F03', permission: 16 },
];

const authorityHandler = new AuthorityHandler({ functionPermissionMap });
const actionPermissionMap = authorityHandler.actionPermissionMap;


describe('Verifying the authoriy of function', () => {
	it('should return the result that isValid is true when verifying the READ permission of function F01', () => {
		const result = authorityHandler.verifyFunctionPermission('F01', actionPermissionMap.READ);
		expect(result.isValid).toBe(true);
		expect(result.invalidPermissionList).toEqual([]);
	});

	it('should return the result that isValid is true when verifying the READ and UPDATE permission of function F01', () => {
		const result = authorityHandler.verifyFunctionPermission('F01', actionPermissionMap.READ | actionPermissionMap.UPDATE);
		expect(result.isValid).toBe(true);
		expect(result.invalidPermissionList).toEqual([]);
	});

	it('should return the result that isValid is false when verifying the EXPORT permission of function F01', () => {
		const result = authorityHandler.verifyFunctionPermission('F01', actionPermissionMap.EXPORT);
		expect(result.isValid).toBe(false);
		expect(result.invalidPermissionList).toEqual(['EXPORT']);
	});

	it('should return the result that isValid is false when verifying the READ and EXPORT permission of function F01', () => {
		const result = authorityHandler.verifyFunctionPermission('F01', actionPermissionMap.READ | actionPermissionMap.EXPORT);
		expect(result.isValid).toBe(false);
		expect(result.invalidPermissionList).toEqual(['EXPORT']);
	});
});


describe('Verify the user function authority', () => {
	it('should return true when verifying the user READ permission in function F01', () => {
		const result = authorityHandler.verifyUserAuthorities(userAuthorities, 'F01', actionPermissionMap.READ);
		expect(result).toBe(true);
	});

	it('should return false when verifying the user EXPORT permission in function F01', () => {
		const result = authorityHandler.verifyUserAuthorities(userAuthorities, 'F01', actionPermissionMap.EXPORT);
		expect(result).toBe(false);
	});
});