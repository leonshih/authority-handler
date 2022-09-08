# authority-handler
[![npm version](https://img.shields.io/npm/v/authority-handler)](https://www.npmjs.com/package/authority-handler)

## Install

```
npm install authority-handler
```

or use yarn

```
yarn add authority-handler
```

## Configuration
* Authority Enum (or use default) 
```js
enum AuthorityEnum {
  NONE,
  READ = 1 << 0, // 1 讀取
  CREATE = 1 << 1, // 2 建立
  UPDATE = 1 << 2, // 4 更新
  DELETE = 1 << 3, // 8 刪除
  EXPORT = 1 << 4, // 16 匯出
  IMPORT = 1 << 5, // 32 匯入
}
```

* Determine the authority of actions in every function
```js
const functionAuthorityMap = {
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
```

* The map of authority action name and it's authority value
```js
const authorityNameMap = {
	NONE: AuthorityEnum.NONE,
	READ: AuthorityEnum.READ,
	UPDATE: AuthorityEnum.UPDATE,
	DELETE: AuthorityEnum.DELETE,
	CREATE: AuthorityEnum.CREATE,
	EXPORT: AuthorityEnum.EXPORT,
	IMPORT: AuthorityEnum.IMPORT,
};
```

## Data structure
* User authority list
```js
[
	{ functionKey: 'F01', authority: 3 },
	{ functionKey: 'F02', authority: 3 },
	{ functionKey: 'F03', authority: 16 },
];
```

## Usage

* Create an instance
```js
import AuthorityHandler from 'authority-handler'

const authorityHandler = new AuthorityHandler({ 
    functionAuthorityMap, 
    authorityNameMap 
});
``` 

* Verify the authoriy of function
```js
const result = authorityHandler.verifyFunctionAuthority(
    'F01', 
    AuthorityEnum.READ
);

// true / false
```

* Verify the user's authority in function
```js
const result = authorityHandler.verifyUserFunctionAuthority(
    userAuthorityList, 
    'F01', 
    'READ'
);

// true / false
```
