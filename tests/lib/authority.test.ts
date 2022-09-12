import { functionAuthorityMap } from '../../config/authorityConfig'
import AuthorityHandler from '../../lib/authorityHandler'

const userAuthorityList = [
	{ functionKey: 'F01', authority: 3 },
	{ functionKey: 'F02', authority: 3 },
	{ functionKey: 'F03', authority: 16 },
];

const authorityHandler = new AuthorityHandler({ functionAuthorityMap });
const authorityMap = authorityHandler.authorityMap;
const AuthorityNameEnum = authorityHandler.AuthorityNameEnum;


describe('Verifying the authoriy of function', () => {
	it('should return the result that isValid is true when verifying the READ authority of function F01', () => {
		const result = authorityHandler.verifyFunctionAuthority('F01', authorityMap.READ);
		expect(result.isValid).toBe(true);
		expect(result.invalidAuthorityList).toEqual([]);
	});

	it('should return the result that isValid is true when verifying the READ and UPDATE authority of function F01', () => {
		const result = authorityHandler.verifyFunctionAuthority('F01', authorityMap.READ | authorityMap.UPDATE);
		expect(result.isValid).toBe(true);
		expect(result.invalidAuthorityList).toEqual([]);
	});

	it('should return the result that isValid is false when verifying the EXPORT authority of function F01', () => {
		const result = authorityHandler.verifyFunctionAuthority('F01', authorityMap.EXPORT);
		expect(result.isValid).toBe(false);
		expect(result.invalidAuthorityList).toEqual(['EXPORT']);
	});

	it('should return the result that isValid is false when verifying the READ and EXPORT authority of function F01', () => {
		const result = authorityHandler.verifyFunctionAuthority('F01', authorityMap.READ | authorityMap.EXPORT);
		expect(result.isValid).toBe(false);
		expect(result.invalidAuthorityList).toEqual(['EXPORT']);
	});
});


describe('Verify the user function authority', () => {
	it('should return true when verifying the user READ authority in function F01', () => {
		const result = authorityHandler.verifyUserFunctionAuthority(userAuthorityList, 'F01', AuthorityNameEnum.READ);
		expect(result).toBe(true);
	});

	it('should return false when verifying the user EXPORT authority in function F01', () => {
		const result = authorityHandler.verifyUserFunctionAuthority(userAuthorityList, 'F01', AuthorityNameEnum.EXPORT);
		expect(result).toBe(false);
	});
});