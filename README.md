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
export const functionPermissionMap = {
    NONE: 0,
    READ: 1 << 0, // 1 讀取
    CREATE: 1 << 1, // 2 建立
    UPDATE: 1 << 2, // 4 更新
    DELETE: 1 << 3, // 8 刪除
    EXPORT: 1 << 4, // 16 匯出
    IMPORT: 1 << 5, // 32 匯入
}
```

* Determine the permission of services' functions
```js
/** 服務權限值對應表 */
export const servicePermissionMap = {
    /** 服務一 */
    F01:
        functionPermissionMap.READ |
        functionPermissionMap.CREATE |
        functionPermissionMap.UPDATE |
        functionPermissionMap.DELETE,
    /** 服務二 */
    F02:
        functionPermissionMap.READ |
        functionPermissionMap.CREATE |
        functionPermissionMap.UPDATE |
        functionPermissionMap.DELETE |
        functionPermissionMap.EXPORT |
        functionPermissionMap.IMPORT,
    /** 服務三 */
    F03:
        functionPermissionMap.READ | 
        functionPermissionMap.EXPORT | 
        functionPermissionMap.IMPORT,
};
```


## Usage

* Create an instance
```js
import AuthorityHandler from 'authority-handler'

const authorityHandler = new AuthorityHandler({ 
    servicePermissionMap, 
    permissionMap, // optional
});
``` 

* Verify the authoriy of service
```js
const functionPermissionMap = authorityHandler.functionPermissionMap;

const result = authorityHandler.verifyServicePermission('F01', functionPermissionMap.READ);
// true / false
```

* Verify the user's permission of service
```js
// Data to be verified
const userAuthorities = 
    [
        { serviceKey: 'F01', permission: 3 },
        { serviceKey: 'F02', permission: 3 },
        { serviceKey: 'F03', permission: 16 },
    ];

const result = authorityHandler.verifyUserAuthorities(userAuthorities, 'F01', 'READ');

// true / false
```
