// 假设页面加载时已经有了文章ID

document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://127.0.0.1:8080/path-to-article/${articleId}`)
    .then((response) => response.json())
    .then((data) => displayArticle(data.data))
    .catch((error) => console.error("获取数据失败:", error));
});

function displayArticle(article) {
  const container = document.querySelector(".container");
  // 清空容器内容
  container.innerHTML = "";

  // 创建文章元素并填充数据
  const articleElement = createArticleElement(article);
  container.appendChild(articleElement);
}

function createArticleElement(article) {
  // 创建并返回一个包含用户和评论信息的文章元素
  const div = document.createElement("div");
  div.innerHTML = `
        <div class="message">
            <!-- 填充用户信息 -->
            <img src="${article.User.Avatar}" alt="头像" />
            <span class="username">${article.User.Username}
              <span class="articleCount">${article.User.ArticleCount}</span>
              <span class="viewCount">${article.ViewCount}</span>
            </span>
            <span class="createdAt">${article.CreatedAt}</span>
            <span class="createdAt">2024.5.22 16:30</span>
            <span class="categoryName">${article.Category.Name}</span>
            <span class="commentCount">${article.CommentCount}</span>
            <span class="wordCount">300</span>

            <!-- 其他信息填充 -->
        </div>
        <div class="content">
            <h2>${article.Title}</h2>
            <p>${article.Content}</p>
            <!-- 其他内容填充 -->
        </div>
        <div class="comment">
            <h3>评论区Comment</h3>
            ${article.Comments.map(
              (comment) => `
                <div>
                    <img src="${comment.User.Avatar}" alt="头像" />
                    <strong class="username">${comment.User.Username}</strong>
                    <span>${comment.Idea}</span>
                    <span class="createdAt">发布于：${comment.CreatedAt}</span>
                </div>
            `
            ).join("")}
        </div>
    `;
  return div;
}
