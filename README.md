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
* Permission Map
```js
/** 權限Map */
export const actionPermissionMap = {
    NONE: 0,
    READ: 1 << 0, // 1 讀取
    CREATE: 1 << 1, // 2 建立
    UPDATE: 1 << 2, // 4 更新
    DELETE: 1 << 3, // 8 刪除
    EXPORT: 1 << 4, // 16 匯出
    IMPORT: 1 << 5, // 32 匯入
}
```

* Determine the permission of actions in every function
```js
/** 平台功能權限 */
export const functionPermissionMap = {
    /** 功能一 */
    F01:
        actionPermissionMap.READ |
        actionPermissionMap.CREATE |
        actionPermissionMap.UPDATE |
        actionPermissionMap.DELETE,
    /** 功能二 */
    F02:
        actionPermissionMap.READ |
        actionPermissionMap.CREATE |
        actionPermissionMap.UPDATE |
        actionPermissionMap.DELETE |
        actionPermissionMap.EXPORT |
        actionPermissionMap.IMPORT,
    /** 功能三 */
    F03:
        actionPermissionMap.READ | 
        actionPermissionMap.EXPORT | 
        actionPermissionMap.IMPORT,
};
```


## Usage

* Create an instance
```js
import AuthorityHandler from 'authority-handler'

const authorityHandler = new AuthorityHandler({ 
    functionPermissionMap, 
    permissionMap, // optional
});
``` 

* Verify the authoriy of function
```js
const actionPermissionMap = authorityHandler.actionPermissionMap;

const result = authorityHandler.verifyFunctionPermission('F01', actionPermissionMap.READ);
// true / false
```

* Verify the user's permission in function
```js
const actionPermissionMap = authorityHandler.actionPermissionMap;

// Data to be verified
const userAuthorities = 
    [
        { functionKey: 'F01', permission: 3 },
        { functionKey: 'F02', permission: 3 },
        { functionKey: 'F03', permission: 16 },
    ];

const result = authorityHandler.verifyUserFunctionPermission(
    userAuthorities, 
    'F01', 
    actionPermissionMap.READ
);

// true / false
```
