package main

//
//
//import (
//	"fmt"
//	"github.com/gin-gonic/gin"
//	"gorm.io/driver/mysql"
//	"gorm.io/gorm"
//)
//
//type Use struct {
//	Id    string `json:"id" binding:"required"`
//	Name  string `json:"name" binding:"required"`
//	Email string `json:"email" binding:"required"`
//}
//
//func main() {
//	dsn := "root:2005n04y20A!!!@tcp(127.0.0.1:3306)/GORM?charset=utf8mb4&parseTime=True&loc=Local"
//	db, err2 := gorm.Open(mysql.Open(dsn), &gorm.Config{})
//	if err2 != nil {
//		fmt.Printf("error:%v", err2)
//		return
//	}
//
//	r := gin.Default()
//	r.GET("/users/:id", func(c *gin.Context) {
//		id := c.Param("id")
//		var use Use
//		db.First(&use, "id = ?", id) // 确保id为uint类型
//		name := use.Name
//		email := use.Email
//
//		c.JSON(200, gin.H{
//			"id":    id,
//			"name":  name,
//			"email": email,
//		})
//	})
//	r.SetTrustedProxies([]string{"127.0.0.1"})
//	r.Run(":8081")
//
//}
