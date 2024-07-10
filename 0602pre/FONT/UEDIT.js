let userId = localStorage.getItem("userId");
let userID = localStorage.getItem("userId");
let userQx = localStorage.getItem("userQx");
let username = localStorage.getItem("username");
let avatar = localStorage.getItem("avatar");
//用户权限分级 页面初始化
document.addEventListener("DOMContentLoaded", function () {
  const Avatar = document.getElementById("file");
  Avatar.value = avatar;
  const roleQxInput = document.getElementById("roleQx");
  roleQxInput.value = userQx;
  roleQxInput.disabled = true;
  const useriddeleteInput = document.getElementById("useriddelete");
  useriddeleteInput.value = userId;
  useriddeleteInput.disabled = true;
  fetch(`http://127.0.0.1:8080/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("搜索失败，状态码：" + response.status);
      }
      return response.json();
    })
    .then((data) => {
      displaybr(data.data);
      console.log(data.data);
      console.log(data.data.Avatar);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
function br(user) {
  var leftDiv = document.getElementById("left");
  leftDiv.innerHTML = ""; // 清空旧结果
  leftDiv.innerHTML = `
  <p class="head" id="avatar"><img src="${user.Avatar}" /></p>
  <p class="user" id="username"><span>用户名：</span>${user.Username}</p>
  <p class="user" id="userid"><span>用户ID：</span>${user.Id}</p>
  <p class="user" id="userQx"><span>用户权限：</span>${user.RoleQx}</p>
  <p class="user" id="articleCount"><span>发布文章数：</span>${user.ArticleCount
    }</p>
  <p class="user" id="userTime"><span>用户创建时间：</span>${getCurrentTime(
      user.CreatedAt
    )}</p>
  <div id="main">
            <a href="././signin.html" style="--clr:#0f0;"><span>去登录</span></a>
        </div>
  `;

  //按钮美化
  let btns = document.querySelectorAll("a");
  btns.forEach((btn) => {
    btn.onmousemove = (e) => {
      let x = e.pageX - btn.offsetLeft;
      let y = e.pageY - btn.offsetTop;
      btn.style.setProperty("--x", `${x}px`);
      btn.style.setProperty("--y", `${y}px`);
    };
  });

  return leftDiv;
}

function displaybr(users) {
  const container = document.querySelector(".left");
  container.innerHTML = "";
  br(users);
}

function getUser() {
  var searchValue = document.getElementById("search").value;
  fetch(
    "http://127.0.0.1:8080/users?username=" + encodeURIComponent(searchValue)
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

function displayResults(users) {
  var usersListDiv = document.getElementById("displayResults");
  usersListDiv.innerHTML = ""; // 清空旧结果
  users.forEach(function (user) {
    var p = document.createElement("p");
    var pp = document.createElement("p");
    var br = document.createElement("br");
    if (user.RoleQx == "A") {
      p.textContent =
        "用户" +
        user.Id +
        "    -" +
        user.Username +
        "   权限：" +
        user.RoleQx +
        "   发布文章数：" +
        user.ArticleCount;

      pp.textContent =
        "   用户创建时间：" +
        getCurrentTime(user.CreatedAt)
    } else {
      p.textContent =
        "用户" +
        user.Id +
        "    -" +
        user.Username +
        "   权限：" +
        user.RoleQx;

      pp.textContent =
        "   用户创建时间：" +
        getCurrentTime(user.CreatedAt)
    }


    usersListDiv.appendChild(p);
    usersListDiv.appendChild(pp);
    usersListDiv.appendChild(br);
  });
}

function updateUser() {
  var avatar = document.getElementById("file").value;
  var username = document.getElementById("usernameaaa").value;
  var password = document.getElementById("password").value;
  const url = `http://127.0.0.1:8080/users/${userId}`;
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Username: username,
      Password: password,
      Avatar: avatar,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("用户信息更新成功");
        return response.json(); // 可以接收返回的数据
      }
      throw new Error("更新失败，状态码：" + response.status);
    })
    .catch((error) => console.error("Error:", error));
    localStorage.setItem("avatar", avatar);
}

function deleteUser() {
  var userid = document.getElementById("useriddelete").value;
  if (!userid) {
    alert("ID不能为空");
    return;
  }
  // 正确使用模板字符串构建 URL
  const url = `http://127.0.0.1:8080/users/${userid}`;
  fetch(url, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        // 检查响应是否成功
        if (confirm("确认注销帐户？")) {
          alert("用户删除成功");
          window.location.href = "./signup.html"; // 刷新页面
        }
      } else {
        // 如果服务器返回错误状态码，抛出错误
        throw new Error("删除失败，状态码：" + response.status);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("删除失败: " + error.message);
    });
}
