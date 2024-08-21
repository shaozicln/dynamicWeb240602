let articleId = +localStorage.getItem("articleId");
let userId = +localStorage.getItem("userId");
if (!userId) {
  alert("请登录！");
  window.location.href = "./signin.html"; // 重定向到登录页面
  throw new Error("用户未登录或userId未定义");
};

//初始化页面
document.addEventListener("DOMContentLoaded", function () {
  if (articleId) {
    fetch(
      `http://127.0.0.1:8080/path-to-article/${encodeURIComponent(articleId)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("网络响应错误");
        }
        return response.json();
      })
      .then((data) => {
        displayArticle(data.data)
        console.log(data.data);
      })
      .catch((error) => console.error("获取数据失败:", error));
  } else {
    console.error("文章ID未定义");
  }
});

//时间格式
function getCurrentTime(time) {
  const date = new Date(time);
  const year = date.getFullYear(); // 获取四位数的年份
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份，月份是从 0 开始的
  const day = date.getDate().toString().padStart(2, "0"); // 获取日
  const hours = date.getHours().toString().padStart(2, "0"); // 获取小时
  const minutes = date.getMinutes().toString().padStart(2, "0"); // 获取分钟
  const seconds = date.getSeconds().toString().padStart(2, "0"); // 获取秒
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

//显示文章
function createArticleElement(article) {
  const div = document.createElement("div");
  const newContent = `
        <nav>
          <div class="nav-item">
            <span id="top">
              <span id="logo">${article.Title} |</span> 
              <a href="./main.html" id="return">返回</a>
            </span>   
          </div>
        </nav>
        <div class="message">
        <span>
            <img src="${article.User.Avatar}" alt="头像" id="author-avatar"/>
            <span class="username"> 
            <span>作者:</span>${article.User.Username}</span>
            <span class="articleCount"><span>发布文章数:</span>${
              article.User.ArticleCount
            }</span>
        </span>
        </div>
        <main>
          <div class="acontent">
          <img src="../Pictures/文章背景.jpg" id="article-bg">
            <p class="CCC">${article.Content}</p>
          </div>
        </main>
        <div class="article-message">
          <span class="viewCount"><span>文章浏览量:</span>${
            article.ViewCount
          }</span>
           
              <span class="categoryName"><span>文章类别:</span>${
                article.Category.Name
              }</span>
              <span class="commentCount"><span>文章评论量:</span>${
                article.CommentCount
              }</span>
            <span class="createdAt"><span>发布时间:</span></span>${getCurrentTime(
              article.CreatedAt
            )}</span>
        </div>
        <div class="recommend">
          <h3>评论区Comment</h3>
          <span>
            <input type="text" placeholder="用户查询" name="searchid" id="searchid">
            <button id="ck" type="submit" onclick="searchid()"><p class="iconfont icon-sousuo searchck"></p></button>
            <input type="text" placeholder="内容查询" name="searchIdea" id="searchIdea">
            <button id="ck" type="submit" onclick="searchIdea()"><p class="iconfont icon-sousuo searchck"></p></button>
            <div id="results"></div>
            <br>
            <br>
            <input type="text" placeholder="哎呦，不错呦。发条评论吧...- < -"  id="createCommentWrite"  />
            <button id="createComment" type="submit">提交</button>  
          </span>
        </div>
        <div class="comment">
            ${article.Comments.map((comment) => {
              let deleteButton = "";
              if (comment.UserId === userId) {
                deleteButton = `<button class="delete-button" id="delete-button111" data-comment-id="${comment.Id}">删除</button>`;
              }
              return `
                  <div class="comment-list">
                    <div class="comment-item" id="comment-${comment.Id}">
                      <div class="content">
                        <div class="info">
                          <img src="${comment.User.Avatar}" alt="头像" />
                          <strong class="username">${
                            comment.User.Username
                          }</strong>
                        </div>
                        <span class="createdAt">发布于：${getCurrentTime(
                          comment.CreatedAt
                        )}</span>
                        <div class="comment-content">${comment.Idea}</div>
                      </div>
                      <div class="delete-button-container">${deleteButton}</div>
                    </div>     
                  </div>
                 `;
            }).join("")}
        </div>
        <footer>
        <span>${article.Title} - ${article.User.Username}</span>
      </footer>
    `;
  div.innerHTML += newContent;
  return div;
};
function displayArticle(article) {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  const articleElement = createArticleElement(article);
  container.appendChild(articleElement);
  //监听按钮
  attachCreateCommentListener();
  attachDeleteButtonListener();
};

//查询评论
function searchIdea() {
  var searchValue = document.getElementById("searchIdea").value;
  // if (!searchValue) {
  //   alert("空白不是幽默捏");
  //   return;
  // }
  fetch(
    `http://127.0.0.1:8080/comments/${articleId}?idea=` +
      encodeURIComponent(searchValue)
  )
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
};
function searchid() {
  var searchValue = document.getElementById("searchid").value;
  // if (!searchValue) {
  //   alert("空白不是幽默捏");
  //   return;
  // }
  fetch(
    `http://127.0.0.1:8080/comments/${articleId}?username=` +
      encodeURIComponent(searchValue)
  )
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
};
function displayResults(comments) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // 清空旧结果
  comments.forEach(function (comment) {
    var a = document.createElement("a");
    a.id = `size`;
    a.textContent = comment.Idea;
    a.href = `./article.html#comment-${comment.Id}`;
    resultsDiv.appendChild(a);
  });
};

//创造评论 监听按钮
function attachCreateCommentListener() {
  document
    .getElementById("createComment")
    .addEventListener("click", function () {
      var newComment = document
        .getElementById("createCommentWrite")
        .value.trim();
      if (!newComment) {
        alert("空白不是幽默捏");
        return;
      }
      fetch(
        `http://127.0.0.1:8080/path-to-article/${encodeURIComponent(
          articleId
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Idea: newComment,
            UserId: userId,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            alert("发布评论成功！");
            return response.json();
          } else {
            throw new Error("发布评论失败，状态码：" + response.status);
          }
        })
        .then((data) => {
          console.log(data);
          if (data && data.Idea) {
            const commentLIST = document.querySelector(".comment-list");
            createCommentE(data, commentLIST);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(error.message);
        })
        .finally(() => {
          document.getElementById("createCommentWrite").value = ""; // 清空输入框
        });
      function createCommentE(comment, commentLIST) {
        const newDiv = document.createElement("div");
        newDiv.className = "comment-item";
        newDiv.id = `comment-${comment.Id}`;

        // 构建评论的HTML结构
        newDiv.innerHTML = `
    <div class="content">
      <div class="info">
        <img src="${comment.User.Avatar}" alt="头像" />
        <strong class="username">${comment.User.Username}</strong>
      </div>
      <span class="createdAt">发布于：${getCurrentTime(
        comment.CreatedAt
      )}</span>
      <div class="comment-content">${comment.Idea}</div>
    </div>
  `;
        if (comment.UserId === userId) {
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "删除";
          deleteButton.className = "delete-button"; // 给按钮添加类名，方便后续通过类名选择器获取
          deleteButton.setAttribute("data-comment-id", comment.Id); // 设置数据属性存储评论ID
          // 为删除按钮添加点击事件
          deleteButton.addEventListener("click", function () {
            DeleteComment(comment.Id); // 传递评论ID给删除函数
          });
          newDiv.appendChild(deleteButton);
        }
        commentLIST.appendChild(newDiv);
      }
    });
};

//删除评论 监听按钮
function attachDeleteButtonListener() {
  var deleteButtons = document.getElementsByClassName("delete-button");
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      var commentId = this.getAttribute("data-comment-id");
      if (confirm("确定要删除评论吗？")) {
        fetch(`http://127.0.0.1:8080/path-to-article/${commentId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        })
          .then((response) => {
            if (response.ok) {
              const commentElement = document.getElementById(
                `comment-${commentId}`
              );
              if (commentElement) {
                commentElement.remove();
              }
              alert("评论删除成功");
            } else {
              throw new Error("删除失败，状态码：" + response.status);
            }
          })
          .catch((error) => {
            console.error("删除评论失败:", error);
            alert("删除评论失败");
          });
      };
    });
  };
};
