function createUser() {
  var avatar = document.getElementById("file").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var roleqx = document.getElementById("roleQx").value;
  if(username == "" ){
    alert("快看！无名氏！！")
    return
  }else if(password == ""){
    alert("还是做一下保密措施吧~")
    return
  }else if(!/^\d{6}[a-z]{3}$/.test(password)){
    alert("请按格式输入六位数字+三位小写字母")
    return
  }
  const url = "http://127.0.0.1:8080/users";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Username: username,
      Password: password,
      RoleQx: roleqx,
      Avatar: avatar,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("注册成功");
        return response.json();
      }
      throw new Error("创建文章失败，状态码：" + response.status);
    })
    .catch((error) => console.error("Error:", error));
}
let userQx = "B";
document.addEventListener("DOMContentLoaded", function () {
  const roleQxInput = document.getElementById("roleQx");
  roleQxInput.value = userQx;
  roleQxInput.disabled = true;
});
