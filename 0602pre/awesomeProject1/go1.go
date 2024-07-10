package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type User struct {
	Num   int     `gorm:"column:num"`
	Name  string  `gorm:"column:name;size:20"`
	Age   int     `gorm:"column:age"`
	Grade float64 `gorm:"column:grade"`
}

func main() {
	dsn := "root:2005n04y20A!!!@tcp(127.0.0.1:3306)/GORM?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Printf("error:%v", err)
		return
	}
	db.AutoMigrate(&User{})
	var user = []User{
		{Num: 1001, Name: "张三", Age: 18, Grade: 59.5},
		{Num: 1002, Name: "李四", Age: 19, Grade: 90.2},
		{Num: 1003, Name: "王五", Age: 20, Grade: 58.9},
		{Num: 1004, Name: "赵六", Age: 18, Grade: 87.3},
		{Num: 1005, Name: "钱七", Age: 19, Grade: 92.1},
	}
	//db.Create(&user)
	db.Where("Grade >= ?", 60).Find(&user)
	fmt.Println(user)
	db.Model(&User{}).Where("Num = ?", 1002).Update("name", "王二")
	db.Where("Num = ?", 1004).Delete(&user)
	db.Where("Num = ?", 1002).Delete(&User{})

}
