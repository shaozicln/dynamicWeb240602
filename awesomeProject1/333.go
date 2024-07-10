package main

//import (
//	"fmt"
//	"github.com/gin-gonic/gin"
//	"gorm.io/driver/mysql"
//	"gorm.io/gorm"
//)
//
//type Article struct {
//	ID    int    `gorm:"primaryKey;column:id"`
//	Title string `gorm:"column:title"`
//}
//
//func main() {
//	// 连接数据库
//	dsn := "root:Yu050308@@@tcp(127.0.0.1:3306)/kh?charset=utf8mb4&parseTime=True&loc=Local"
//	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
//	if err != nil {
//		fmt.Printf("error:%v", err)
//		return
//	}
//	db.AutoMigrate(&Article{})
//	Search := gin.Default()
//
//	Search.GET("/search", func(c *gin.Context) {
//		title := c.Query("title")
//		var articles []Article
//		db.Where("title LIKE ?", "%"+title+"%").Find(&articles)
//		fmt.Println(articles)
//		//c.JSON(http.StatusOK, gin.H{"data": articles})
//	})
//	Search.SetTrustedProxies([]string{"127.0.0.1"})
//	Search.Run(":8080")
//}
