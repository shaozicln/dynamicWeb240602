package main

//import (
//	"github.com/gin-gonic/gin"
//	"gorm.io/driver/mysql"
//	"gorm.io/gorm"
//)
//
//// 定义模型
//type Searchitem struct {
//	Id   int    `gorm:"primary key" json:"id"`
//	Name string `json:"name"`
//}
//
//func main() {
//	// 连接数据库
//	dsn := "root:20051012Gyh!@tcp(127.0.0.1:3306)/KH?charset=utf8mb4&parseTime=True&loc=Local"
//	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
//	if err != nil {
//		panic("failed to connect database")
//	}
//	db.AutoMigrate(&Searchitem{})
//	// 初始化Gin
//	r := gin.Default()
//	// 搜索路由
//	r.GET("/search", func(c *gin.Context) {
//		query := c.Query("q")
//		var items []Searchitem
//		db.Where("name LIKE ?", "%"+query+"%").Find(&items)
//		c.JSON(200, items)
//	})
//	r.SetTrustedProxies([]string{"127.0.0.1"})
//	r.Run(":8080")
//}
