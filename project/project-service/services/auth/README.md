# services/auth

提供用户账号相关服务及鉴权相关服务。

共有两种用户，分别存储在两张表中：

- `Manager`：管理员用户，对应管理者账户

    ```go
    type Manager struct {
    	ID         uint   `json:"id" gorm:"primaryKey"`
    	Username   string `json:"username" gorm:"uniqueIndex; not null"`
    	Password   string `json:"-" gorm:"not null"`
    }
    ```

    可以管理单车信息和普通用户信息

    此外，系统初始创建的 ID 为 1 的管理者账户为「超级管理员」，可以管理其他管理员账号信息。

- `User`：普通用户，对应使用者账户

    ```go
    type User struct {
    	ID        uint   `json:"id" gorm:"primaryKey"`
    	Username  string `json:"username" gorm:"uniqueIndex; not null"`
    	Password  string `json:"-" gorm:"not null"`
    	IsAdmin   bool   `json:"isAdmin"`
    	Signature string `json:"signature"`
    	Avatar    string `json:"avatar"`
    }
    ```

    包含有更多用户的个性信息

