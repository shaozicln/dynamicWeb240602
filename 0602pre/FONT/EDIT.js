var articleid = +localStorage.getItem("articleId");
let userId = localStorage.getItem("userId");
let userid = localStorage.getItem("userId");
function createArticle() {
  var title = document.getElementById("title").value;
  var content = document.getElementById("content").value;
  var categoryId = parseInt(document.getElementById("categoryId").value, 10);
  var userId = parseInt(userid, 10);
  const url = "http://127.0.0.1:8080/articles";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: title,
      Content: content,
      CategoryId: categoryId,
      UserId: userId,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("文章创建成功");
        fetchArticles(); // 刷新文章列表
        return response.json();
      }
      throw new Error("创建文章失败，状态码：" + response.status);
    })
    .catch((error) => console.error("Error:", error));
}

function updateArticle() {
  var articleId = articleid;
  var title = document.getElementById("titleupdate").value;
  var content = document.getElementById("contentupdate").value;
  var categoryId = parseInt(
    document.getElementById("categoryIdupdate").value,
    10
  );
  var userId = parseInt(userid, 10);
  const url = `http://127.0.0.1:8080/articles/${articleId}`;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: title,
      Content: content,
      CategoryId: categoryId,
      UserId: userId,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("文章更新成功");
        fetchArticles(); // 刷新文章列表
        return response.json(); // 可以接收返回的数据
      }
      throw new Error("更新文章失败，状态码：" + response.status);
    })
    .catch((error) => console.error("Error:", error));
}

function deleteArticle() {
  var articleId = document.getElementById("articleIddelete").value;
  if (!articleId) {
    确;
    alert("文章ID不能为空");
    return;
  }
  // 正确使用模板字符串构建 URL
  const url = `http://127.0.0.1:8080/articles/${articleId}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // 检查响应是否成功
        alert("文章删除成功");
      } else {
        // 如果服务器返回错误状态码，抛出错误
        throw new Error("删除失败，状态码：" + response.status);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("删除文章失败: " + error.message);
    });
}

// 分类管理的函数 //
function getCategoryid() {
  var searchValue = document.getElementById("getCategoryId").value;
  fetch(
    "http://127.0.0.1:8080/categories?id=" + encodeURIComponent(searchValue)
  )
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
function getCategoryName() {
  var searchValue = document.getElementById("getCategoryName").value;
  fetch(
    "http://127.0.0.1:8080/categories?name=" + encodeURIComponent(searchValue)
  )
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
function displayResults(categories) {
  var categoriesListDiv = document.getElementById("categoriesList");
  categoriesListDiv.innerHTML = ""; // 清空旧结果
  categories.forEach(function (category) {
    var p = document.createElement("p");
    p.textContent =
      category.Id + " - " + category.Name + " - " + category.Description;
    categoriesListDiv.appendChild(p);
  });
}

function createCategory() {
  var name = document.getElementById("categoryNameCreate").value;
  var description = document.getElementById("categoryDescriptionCreate").value;
  const url = "http://127.0.0.1:8080/categories";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Name: name, Description: description }),
  })
    .then((response) => {
      if (response.ok) {
        alert("分类创建成功");
        fetchCategories(); // 刷新文章列表
        return response.json();
      }
      throw new Error("创建分类失败，状态码：" + response.status);
    })
    .catch((error) => console.error("Error:", error));
}

function updateCategory() {
  var categoryId = document.getElementById("categoryIdUpdate").value;
  var name = document.getElementById("categoryNameUpdate").value;
  var description = document.getElementById("categoryDescriptionUpdate").value;
  const url = `http://127.0.0.1:8080/categories/${categoryId}`;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Name: name, Description: description }),
  })
    .then((response) => {
      if (response.ok) {
        alert("分类更新成功");
        fetchCategories(); // 刷新文章列表
        return response.json(); // 可以接收返回的数据
      }
      throw new Error("更新分类失败，状态码：" + response.status);
    })
    .catch((error) => console.error("Error:", error));
}
function deleteCategory() {
  var categoryId = document.getElementById("categoryIdDelete").value;
  if (!categoryId) {
    确;
    alert("分类ID不能为空");
    return;
  }
  // 正确使用模板字符串构建 URL
  const url = `http://127.0.0.1:8080/categories/${categoryId}`;
  fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      // 检查响应是否成功
      alert("分类删除成功");
      fetchCategories(); // 刷新分类列表
    } else {
      // 如果服务器返回错误状态码，抛出错误
      throw new Error("删除失败，状态码：" + response.status);
    }
  });
}

// document.addEventListener("DOMContentLoaded", function () {
//   var contentTextarea = document.querySelector(".auto-paragraph");

//   contentTextarea.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       var currentContent = this.value;
//       var newContent = currentContent.replace(/(\n{2,})/g, "</p><p>");
//       this.value = newContent;
//     }
//   });
// });


let userQx = localStorage.getItem("userQx");
document.addEventListener("DOMContentLoaded", function () {
  const userIdInput = document.getElementById("userId");
  userIdInput.value = userId;
  userIdInput.disabled = true;
  const useriddeleteInput = document.getElementById("userIdupdate");
  useriddeleteInput.value = userId;
  useriddeleteInput.disabled = true;
  if ((userQx = "B")) {
    const users = document.getElementById("users");
    users.disabled = true;

  }
});
