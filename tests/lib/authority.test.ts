import { servicePermissionMap } from '../../config/authorityConfig'
import AuthorityHandler from '../../lib/authorityHandler'

const userAuthorities = [
	{ serviceKey: 'F01', permission: 3 },
	{ serviceKey: 'F02', permission: 3 },
	{ serviceKey: 'F03', permission: 16 },
];

const authorityHandler = new AuthorityHandler({ servicePermissionMap });
const functionPermissionMap = authorityHandler.functionPermissionMap;


describe('Verifying the authoriy of service', () => {
	it('should return the result that isValid is true when verifying the READ permission of service F01', () => {
		const result = authorityHandler.verifyServicePermission('F01', functionPermissionMap.READ);
		expect(result.isValid).toBe(true);
		expect(result.invalidPermissionList).toEqual([]);
	});

	it('should return the result that isValid is true when verifying the READ and UPDATE permission of service F01', () => {
		const result = authorityHandler.verifyServicePermission('F01', functionPermissionMap.READ | functionPermissionMap.UPDATE);
		expect(result.isValid).toBe(true);
		expect(result.invalidPermissionList).toEqual([]);
	});

	it('should return the result that isValid is false when verifying the EXPORT permission of service F01', () => {
		const result = authorityHandler.verifyServicePermission('F01', functionPermissionMap.EXPORT);
		expect(result.isValid).toBe(false);
		expect(result.invalidPermissionList).toEqual(['EXPORT']);
	});

	it('should return the result that isValid is false when verifying the READ and EXPORT permission of service F01', () => {
		const result = authorityHandler.verifyServicePermission('F01', functionPermissionMap.READ | functionPermissionMap.EXPORT);
		expect(result.isValid).toBe(false);
		expect(result.invalidPermissionList).toEqual(['EXPORT']);
	});
});


describe('Verify the user service authority', () => {
	it('should return true when verifying the user READ permission of service F01', () => {
		const result = authorityHandler.verifyUserAuthorities(userAuthorities, 'F01', 'READ');
		expect(result).toBe(true);
	});

	it('should return false when verifying the user EXPORT permission of service F01', () => {
		const result = authorityHandler.verifyUserAuthorities(userAuthorities, 'F01', 'EXPORT');
		expect(result).toBe(false);
	});
});