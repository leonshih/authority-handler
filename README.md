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
export const permissionMap = {
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
        permissionMap.READ |
        permissionMap.CREATE |
        permissionMap.UPDATE |
        permissionMap.DELETE,
    /** 功能二 */
    F02:
        permissionMap.READ |
        permissionMap.CREATE |
        permissionMap.UPDATE |
        permissionMap.DELETE |
        permissionMap.EXPORT |
        permissionMap.IMPORT,
    /** 功能三 */
    F03:
        permissionMap.READ | 
        permissionMap.EXPORT | 
        permissionMap.IMPORT,
};
```

* Determine the permission name enum (optional)
```js
/** 平台功能權限名稱 */
export enum PermissionNameEnum {
    READ = 'READ',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    EXPORT = 'EXPORT',
    IMPORT = 'IMPORT',
}
```

## Usage

* Create an instance
```js
import AuthorityHandler from 'authority-handler'

const authorityHandler = new AuthorityHandler({ 
    functionPermissionMap, 
    permissionMap, // or use default
    PermissionNameEnum // or use default
});
``` 

* Verify the authoriy of function
```js
const permissionMap = authorityHandler.permissionMap;

const result = authorityHandler.verifyFunctionPermission('F01', permissionMap.READ);
// true / false
```

* Verify the user's permission in function
```js
const PermissionNameEnum = authorityHandler.PermissionNameEnum;

// Data to be verified
const userAuthorityList = 
    [
        { functionKey: 'F01', permission: 3 },
        { functionKey: 'F02', permission: 3 },
        { functionKey: 'F03', permission: 16 },
    ];

const result = authorityHandler.verifyUserFunctionPermission(
    userPerList, 
    'F01', 
    PermissionNameEnum.READ
);

// true / false
```
