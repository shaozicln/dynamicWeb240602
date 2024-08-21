function check() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if(username == ""){
    alert("快看！无名氏！！");
    return;
  }
  fetch("http://127.0.0.1:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("登录失败，状态码：" + response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.message === "登录成功") {
        alert("登录成功，点击确认进入");
        var userId = data.id;
        var userQx = data.qx;
        var username = data.username;
        var avatar = data.avatar;
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("userQx", userQx);
        window.location.href = "./main-intro1.html";
      } else if (data.message === "密码错误") {
        alert("密码错误，请重试");
      } else if (data.message === "喵喵喵？注册了吗就来登录？") {
        alert("喵喵喵？注册了吗就来登录？");
      }
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const background = document.querySelector(".background");
  document.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY !== 0) {
      background.style.backgroundPosition = `calc(50% + ${scrollY}px) calc(50% + ${scrollY}px)`;
    } else {
      background.style.backgroundPosition = "";
    }
  });
});

