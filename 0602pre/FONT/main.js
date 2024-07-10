let $$ = (xxx) => document.querySelector(xxx);

let x = $$(".search");
let y = $$(".searchtb");
let c1 = $$(".clear");
let c2 = $$("input[type='text']");

y.addEventListener("click", () => {
  x.classList.toggle("changewidth");
});
c1.addEventListener("click", () => {
  c2.value = "";
});

window.onload = function () {
  var Input = document.getElementById("input");
  var Btn = document.getElementById("go");
  var Iframe = document.getElementById("iframe");
  Btn.onclick = function () {
    Iframe.src = "http://cn.bing.com/search?q=" + Input.value;
  };
};

function searchArticles() {
  var searchValue = document.getElementById("search").value;
  fetch("http://127.0.0.1:8080/search?title=" + encodeURIComponent(searchValue))
    .then((response) => {
      if (!response.ok) {
        throw new Error("搜索失败，状态码：" + response.status);
      }
      return response.json();
    })
    .then((data) => {
      displayResults(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function searchArticleIds() {
  var searchValue = document.getElementById("searchid").value;
  fetch("http://127.0.0.1:8080/search?id=" + encodeURIComponent(searchValue))
    .then((response) => {
      if (!response.ok) {
        throw new Error("搜索失败，状态码：" + response.status);
      }
      return response.json();
    })
    .then((data) => {
      displayResults(data.data);
      console.log(data.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function displayResults(articles) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // 清空旧结果
  articles.forEach(function (article) {
    var a = document.createElement("a");
    a.textContent = article.Id + " - " + article.Title;
    a.href = "./article.html";
    a.addEventListener("click", function (event){
      event.preventDefault(); // 阻止默认行为
      localStorage.setItem("articleId", article.Id); // 保存文章ID到localStorage
      window.location.href = a.href; // 跳转到文章页面
    } );
    resultsDiv.appendChild(a);
    resultsDiv.appendChild(document.createElement("br"));
  });
}

// 分类展示处
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://127.0.0.1:8080/categories-with-articles")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      // 检查 responseData 是否包含 'data' 属性，并且 'data' 属性是否为数组
      if (responseData && Array.isArray(responseData.data)) {
        const mainCon = document.getElementById("main-con");
        const categoriesWithArticles = responseData.data; // 访问数组属性

        // 创建一个空数组来存储文章ID
        let articleIds = [];

        categoriesWithArticles.forEach((categoryWithArticles) => {
          const categoryDiv = document.createElement("div");
          categoryDiv.className = "cp";

          const h3 = document.createElement("h3");
          h3.textContent = categoryWithArticles.Name;
          // 根据分类展示
          if (categoryWithArticles.Name === "Fun") {
            h3.id = "fun";
          } else if (categoryWithArticles.Name === "Game") {
            h3.id = "game";
          } else if (categoryWithArticles.Name === "Learn") {
            h3.id = "learn";
          } else if (categoryWithArticles.Name === "Live") {
            h3.id = "live";
          }
          categoryDiv.appendChild(h3);
          const adDiv = document.createElement("div");
          categoryWithArticles.Articles.forEach((article) => {
            const p = document.createElement("p");
            const a = document.createElement("a");
            a.href = "./article.html"; // 假设文章链接格式为 /path/to/article/:id
            localStorage.setItem("articleId", article.Id);
            a.textContent = article.Id + " - " + article.Title;; // 显示文章标题
            a.addEventListener("click", function (event){
      event.preventDefault(); // 阻止默认行为
      localStorage.setItem("articleId", article.Id); // 保存文章ID到localStorage
      window.location.href = a.href; // 跳转到文章页面
    } );
            p.appendChild(a);
            adDiv.appendChild(p);

            // 将文章ID添加到articleIds数组中
            articleIds.push(article.Id);
          });

          categoryDiv.appendChild(adDiv);
          mainCon.appendChild(categoryDiv);
        });

        // 打印文章ID列表
        console.log(articleIds);
      } else {
        console.error(
          "Expected 'data' property to be an array, but got",
          responseData
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching categories with articles:", error);
    });
});

//用户权限分级
let userQx = localStorage.getItem("userQx");
if (userQx === "B") {
  console.log("权限不足，无法编辑文章，看看得啦");
  const addArticleElement = document.getElementById("addarticle");
  if (addArticleElement) {
    addArticleElement.style.pointerEvents = "none"; // 禁用鼠标事件
    addArticleElement.style.opacity = "0.5"; //外观上的区分
  }
}
