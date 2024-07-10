let userId = +localStorage.getItem("userId");
let avatar = localStorage.getItem("avatar");
let username = localStorage.getItem("username");
let messageCount = 0;
if (!userId) {
  alert("请登录！");
  window.location.href = "./signin.html"; // 重定向到登录页面
  throw new Error("用户未登录或userId未定义");
}

//初始化页面
document.addEventListener("DOMContentLoaded", function () {
  if (userId) {
    fetch(`http://127.0.0.1:8080/commentBoard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("网络响应错误");
        }
        return response.json();
      })
      .then((data) => {
        messageCount = data.messageCount;
        displayMessages(data.data);
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

function displayMessages(messages) {
  const messageList = document.querySelector(".right");
  messageList.innerHTML = "";
  const messagesElement = createMessages(messages);
  messageList.appendChild(messagesElement);
  attachCreateCommentListener();
  attachDeleteButtonListener();
}
function createMessages(messages) {
  const div = document.createElement("div");
  const newDiv = `
  <div class="input-container">
        <input type="text" placeholder="第${messageCount}条留言想说什么？让我猜猜~" name="content" id="content" />
        <button id="ck" type="button">
          <p class="iconfont icon-a-fasongfeiji3x-01 sendck"></p>
        </button>
      </div>
  <div class="comment">
  <div class="comment-list">
    ${messages
      .map((message) => {
        if (
          message.UserId != userId &&
          message.UserId != 1 &&
          message.UserId != 2
        ) {
          return `
        <div class="comment-item" id="comment-${message.Id}">
          <div class="contentother">
            <div class="info">
              <img src="${
                message.User.Avatar
              }" alt="头像" width="50" height="50" />
              <strong class="username">${message.User.Username}</strong>
            </div>
            <span class="createdAt">${getCurrentTime(message.CreatedAt)}</span>
            <div class="comment-content">${message.Content}</div>
          </div>
        </div>
  `;
        } else if (message.UserId === userId) {
          if (message.UserId === 1 || message.UserId === 2) {
            return `
        <div class="rcomment-item" id="comment-${message.Id}">
          <div class="rcontent">
            <span class="rcreatedAt">${getCurrentTime(message.CreatedAt)}</span>
            <div class="rinfo">
              <strong class="rusername"><i class=" fa fa-star arrr"></i>${
                message.User.Username
              }</strong>
              <img src="${
                message.User.Avatar
              }" alt="头像" width="50" height="50" />
            </div>
            <div class="rcomment-content">${message.Content}</div>
          </div>
          <div class="delete-button-container"><button class="delete-button" data-comment-id="${
            message.Id
          }"><i class=" fa fa-trash arr"></i></button></div>
        </div>
  `;
          } else {
            return `
        <div class="rcomment-item" id="comment-${message.Id}">
          <div class="rcontent">
            <span class="rcreatedAt">${getCurrentTime(message.CreatedAt)}</span>
            <div class="rinfo">
              <strong class="rusername">${message.User.Username}</strong>
              <img src="${
                message.User.Avatar
              }" alt="头像" width="50" height="50" />
            </div>
            <div class="rcomment-content">${message.Content}</div>
          </div>
          <div class="delete-button-container"><button class="delete-button" data-comment-id="${
            message.Id
          }"><i class=" fa fa-trash arr"></i></button></div>
        </div>
  `;
          }
        } else if (message.UserId === 1 || message.UserId === 2) {
          return `
        <div class="comment-item" id="comment-${message.Id}">
          <div class="content">
            <div class="info">
              <img src="${
                message.User.Avatar
              }" alt="头像" width="50" height="50" />
              <strong class="username">${
                message.User.Username
              }<i class=" fa fa-star arrr"></i></strong>
            </div>
            <span class="createdAt">${getCurrentTime(message.CreatedAt)}</span>
            <div class="comment-content">${message.Content}</div>
          </div>
        </div>
  `;
        }
      })
      .join("")}
  </div>
  </div>
  `;
  div.innerHTML += newDiv;
  return div;
}


function attachCreateCommentListener() {
  document.getElementById("ck").addEventListener("click", function () {
    var newComment = document.getElementById("content").value.trim();
    if (!newComment) {
      alert("空白不是幽默捏");
      return;
    }
    fetch(`http://127.0.0.1:8080/commentBoard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Content: newComment,
        UserId: userId,
      }),
    })
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
        document.getElementById("content").value = ""; // 清空输入框
      });
    function createCommentE(message, commentLIST) {
      const newDiv = document.createElement("div");
      newDiv.className = "comment-item";
      newDiv.id = `comment-${message.Id}`;
   if (message.UserId === 1 || message.UserId === 2) {
    newDiv.innerHTML = `
    <div class="rcomment-item" id="comment-${message.Id}">
      <div class="rcontent">
        <span class="rcreatedAt">${getCurrentTime(message.CreatedAt)}</span>
        <div class="rinfo">
          <strong class="rusername"><i class=" fa fa-star arrr"></i>${
            message.User.Username
          }</strong>
          <img src="${
            message.User.Avatar
          }" alt="头像" width="50" height="50" />
        </div>
        <div class="rcomment-content">${message.Content}</div>
      </div>
      <div class="delete-button-container"><button class="delete-button" data-comment-id="${
        message.Id
      }"><i class=" fa fa-trash arr"></i></button></div>
    </div>
`;
      } else {
        newDiv.innerHTML = `
    <div class="rcomment-item" id="comment-${message.Id}">
      <div class="rcontent">
        <span class="rcreatedAt">${getCurrentTime(message.CreatedAt)}</span>
        <div class="rinfo">
          <strong class="rusername">${message.User.Username}</strong>
          <img src="${
            message.User.Avatar
          }" alt="头像" width="50" height="50" />
        </div>
        <div class="rcomment-content">${message.Content}</div>
      </div>
      <div class="delete-button-container"><button class="delete-button" data-comment-id="${
        message.Id
      }"><i class=" fa fa-trash arr"></i></button></div>
    </div>
`;
commentLIST.appendChild(newDiv);
      }
    }
  });
}
function attachDeleteButtonListener() {
  var deleteButtons = document.getElementsByClassName("delete-button");
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      var messageId = this.getAttribute("data-comment-id");
      if (confirm("确定要删除评论吗？")) {
        fetch(`http://127.0.0.1:8080/commentBoard/${messageId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        })
          .then((response) => {
            if (response.ok) {
              const commentElement = document.getElementById(
                `comment-${messageId}`
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
      }
    });
  }
}
