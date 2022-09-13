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
* Authority Map
```js
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
```

* Determine the authority of actions in every function
```js
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
```

* Determine the authority name enum (optional)
```js
/** 平台功能權限名稱 */
export enum AuthorityNameEnum {
    READ = 'READ',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    EXPORT = 'EXPORT',
    IMPORT = 'IMPORT',
}
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
    authorityMap, // or use default
    AuthorityNameEnum // or use default
});
``` 

* Verify the authoriy of function
```js
const authorityMap = authorityHandler.authorityMap;

const result = authorityHandler.verifyFunctionAuthority('F01', authorityMap.READ);
// true / false
```

* Verify the user's authority in function
```js
const AuthorityNameEnum = authorityHandler.AuthorityNameEnum;

const result = authorityHandler.verifyUserFunctionAuthority(
    userAuthorityList, 
    'F01', 
    AuthorityNameEnum.READ
);

// true / false
```
