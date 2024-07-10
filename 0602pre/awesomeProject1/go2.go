package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

type Uuu struct {
	//ID        uint   `gorm:"column:ID; primary key"`
	Name      string `gorm:"column:Name; size:20"`
	Age       uint8  `gorm:"column:Age;"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func main() {
	dsn := "root:2005n04y20A!!!@tcp(127.0.0.1:3306)/db2?charset=utf8mb4&parseTime=True&loc=Local"

	db2, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Printf("error:%v", err)
		return
	}
	db2.AutoMigrate(&Uuu{})
	var u = []Uuu{
		{Name: "cln", Age: 20},
		{Name: "cy", Age: 30},
		{Name: "an", Age: 40},
		{Name: "aaa", Age: 20},
		{Name: "bbb", Age: 20},
		{Name: "ccc", Age: 20},
	}
	//db2.Create(&uuu)
	//db2.Where("Age = ?", 20).First(&u)
	//fmt.Println(u)
	//db2.Select("Name", "Age").Find(&u)
	//fmt.Println(u)
	//db2.Order("Age desc").Order("Name asc").Find(&u)
	//fmt.Println(u)
	//db2.Limit(1).Offset(3).Find(&u)
	//fmt.Println(u)
	db2.Select("Name").Group("Name").Having("Name=?", "cln").Find(&u)
	fmt.Println(u)
	db2.Model(&Uuu{}).Where("Name=? And Age=?", "ccc", 20).Update("Name", "aqb").Update("Age", 15)
	db2.Where("Name", "aaa").Delete(&u)
	db2.Where("Name Like ?", "c%").Delete(&u)
	var uu []Uuu
	db2.Find(&uu)
	fmt.Println(uu)
	db2.First(&uu)
	fmt.Println(uu)
	db2.Last(&uu)
	fmt.Println(uu)
	db2.Take(&u)
	fmt.Println(uu)
	db2.Where("Age", 20).Delete(&uu)
	fmt.Println(uu)
}
