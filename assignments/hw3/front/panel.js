let posts_count = 10
let posts_start = 0
let post_list = JSON.parse(`{
  "posts": [
      {
          "id": 1,
          "title": "first post",
          "content": "content of first post",
          "created_by": 1,
          "created_at": "2021-01-05"
      },
      {
          "id": 2,
          "title": "second post",
          "content": "content of second post",
          "created_by": 2,
          "created_at": "2021-01-05"
      },
      {
          "id": 3,
          "title": "testTitle",
          "content": "testContent",
          "created_by": 3,
          "created_at": "2021-01-06"
      },
      {
          "id": 11,
          "title": "test5",
          "content": "test5Content",
          "created_by": 3,
          "created_at": "2021-01-10"
      },
      {
          "id": 15,
          "title": "test8",
          "content": "test8Content",
          "created_by": 3,
          "created_at": "2021-01-10"
      },
      {
          "id": 14,
          "title": "test70",
          "content": "test7Content",
          "created_by": 3,
          "created_at": "2021-01-10"
      },
      {
          "id": 16,
          "title": "parham",
          "content": "noice",
          "created_by": 3,
          "created_at": "2021-01-10"
      }
  ]
}`).posts

setup = function () {
  // checkToken();
  loadStartingAnimation();
  document
    .getElementById("customSwitches")
    .addEventListener("click", () => toggleDarkMode());
  document
    .getElementById("infoPage")
    .addEventListener("click", () => loadInfoPage());
  document
    .getElementById("infoPage")
    .addEventListener("click", () => loadInfoPage());
  document
    .getElementById("postPage")
    .addEventListener("click", () => loadPostPage());
  document.documentElement.scrollTop = 0;
};

function checkToken() {
  let token = window.localStorage.getItem("token");

  if (token == null) {
    Swal.fire("شما اجازه‌ی دسترسی به این صفحه را ندارید").then(() => {
      window.location.replace("./register.html");
    });
  } else {
    console.log(token);
  }
}

function loadPostPage() {
  document.getElementById("infoPage").style.borderBottom = "none";
  document.getElementById("postPage").style.borderBottom = "thick solid";
  document.getElementById("dataTable").innerHTML = "";
  document.getElementById("smallDataTable").innerHTML = "";
  document.getElementById("prevButton").display = "block"
  document.getElementById("nextButton").display = "block"
  getPostsAdmin();
  // document.getElementById("dataGrid").innerHTML = getInfoCard("1","2","3","4")
}
function getAddCard() {
  return `
  <span class="card addcard text-white bg-success mb-3" style="width:auto;min-width: 150px;min-height:350px" onclick="addPost()">
  <div class="card-body">
  <?xml version="1.0"?><svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 128 128" width="175px" height="175px" style="margin-top:30%;margin-left:10%">    <path d="M 64 6.0507812 C 49.15 6.0507812 34.3 11.7 23 23 C 0.4 45.6 0.4 82.4 23 105 C 34.3 116.3 49.2 122 64 122 C 78.8 122 93.7 116.3 105 105 C 127.6 82.4 127.6 45.6 105 23 C 93.7 11.7 78.85 6.0507812 64 6.0507812 z M 64 12 C 77.3 12 90.600781 17.099219 100.80078 27.199219 C 121.00078 47.499219 121.00078 80.500781 100.80078 100.80078 C 80.500781 121.10078 47.500781 121.10078 27.300781 100.80078 C 7.0007813 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.399219 17.099219 50.7 12 64 12 z M 64 42 C 62.3 42 61 43.3 61 45 L 61 61 L 45 61 C 43.3 61 42 62.3 42 64 C 42 65.7 43.3 67 45 67 L 61 67 L 61 83 C 61 84.7 62.3 86 64 86 C 65.7 86 67 84.7 67 83 L 67 67 L 83 67 C 84.7 67 86 65.7 86 64 C 86 62.3 84.7 61 83 61 L 67 61 L 67 45 C 67 43.3 65.7 42 64 42 z"/></svg>
  </div>
  </span>`;
}
function getInfoCard(date, title, content, id) {
  return `<span class="card post border-light mb-3" style="min-width: 150px; min-height:350px;" id = "post-${id}">
  <div class="card-header">${date}</div>
  <div class="card-body" style="position: relative;">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${content}</p>
    <div class="justify-content-center" style="position: absolute; bottom:10px;">
      <button type="button" class="btn btn-danger" onclick="deletePost(this)">حذف</button>
      <button type="button" class="btn btn-warning" onclick="editPost(this)">تغییر</button>
    </div>
  </div>
</span>`;
}

function editPost(elem) {
  initialHeader = elem.parentElement.parentElement.getElementsByTagName("h5")[0]
    .innerHTML;
  initialText = elem.parentElement.parentElement.getElementsByTagName("p")[0]
    .innerHTML;
  id = elem.parentElement.parentElement.parentElement.id.split("-")[1];
  Swal.mixin({
    confirmButtonText: "بعدی &rarr;",
    showCancelButton: true,
    progressSteps: ["1", "2"],
  })
    .queue([
      {
        title: "عنوان را در صورت نیاز تغییر دهید.",
        input: "text",
        inputValue: initialHeader,
      },
      {
        title: "متن را در صورت نیاز تغییر دهید",
        input: "textarea",
        inputValue: initialText,
      },
    ])
    .then((result) => {
      if (result.value) {
        // making request
        let token = window.localStorage.getItem("token");
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            let message = "عملیات با موفقیت انجام شد.";
            if (xhttp.status !== 204) {
              message = xhttp.response.message;
            }
            if (message === "invalid token") {
              Swal.fire("شما اجازه‌ی دسترسی به این صفحه را ندارید").then(() => {
                window.location.replace("./register.html");
              });
            }
            if (xhttp.status == 400 || xhttp.status == 401) {
              Swal.fire({
                title: message,
                icon: "warning",
                confirmButtonText: "خروج!",
              });
            } else if (xhttp.status == 204) {
              Swal.fire({
                title: message,
                icon: "success",
                confirmButtonText: "خروج!",
              }).then((result) => {
                loadPostPage();
              });
            } else {
              Swal.fire({
                title: "undefined action",
                icon: "warning",
                confirmButtonText: "خروج!",
              });
            }
          }
        };
        // todo check url
        xhttp.open(
          "PUT",
          "http://localhost:3000/api/admin/post/crud/" + id,
          true
        );
        xhttp.setRequestHeader("authorization", token);
        xhttp.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhttp.responseType = "json";
        xhttp.send(`title=${result.value[0]}&content=${result.value[1]}`);
      }
    });
}

function addPost() {
  Swal.mixin({
    confirmButtonText: "بعدی &rarr;",
    showCancelButton: true,
    progressSteps: ["1", "2"],
  })
    .queue([
      {
        title: "عنوان را وارد کنید.",
        input: "text",
      },
      {
        title: "متن مورد نظر را وارد کنید",
        input: "textarea",
      },
    ])
    .then((result) => {
      if (result.value) {
        let token = window.localStorage.getItem("token");
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            const { message } = xhttp.response;
            if (message === "invalid token") {
              Swal.fire("شما اجازه‌ی دسترسی به این صفحه را ندارید").then(() => {
                window.location.replace("./register.html");
              });
            }
            if (xhttp.status == 400) {
              Swal.fire({
                title: message,
                icon: "warning",
                confirmButtonText: "خروج!",
              });
            } else if (xhttp.status == 201) {
              Swal.fire({
                title: "عملیات با موفقیت انجام شد.",
                icon: "success",
                confirmButtonText: "خروج!",
              }).then((result) => {
                loadPostPage();
              });
            } else {
              Swal.fire({
                title: "undefined action",
                icon: "warning",
                confirmButtonText: "خروج!",
              });
            }
          }
        };
        // todo check url
        xhttp.open("POST", "http://localhost:3000/api/admin/post/crud", true);
        xhttp.setRequestHeader("authorization", token);
        xhttp.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhttp.responseType = "json";
        xhttp.send(`title=${result.value[0]}&content=${result.value[1]}`);
      }
    });
}

function deletePost(elem) {
  id = elem.parentElement.parentElement.parentElement.id.split("-")[1];
  Swal.fire({
    title: "آیا از حذف پست مطمئنید؟",
    text: "این عمل غیر قابل برگشت است.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
  }).then((result) => {
    if (result.isConfirmed) {
      let token = window.localStorage.getItem("token");
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          let message = "پست شما با موفقیت حذف شد";
          if (xhttp.status !== 204) {
            message = xhttp.response.message;
          }
          if (message === "invalid token") {
            Swal.fire("شما اجازه‌ی دسترسی به این صفحه را ندارید").then(() => {
              window.location.replace("./register.html");
            });
          }
          if (
            xhttp.status == 400 ||
            xhttp.status == 401 ||
            xhttp.status == 404
          ) {
            Swal.fire({
              title: message,
              icon: "warning",
              confirmButtonText: "خروج!",
            });
          } else if (xhttp.status == 204) {
            Swal.fire(message).then((result) => {
              loadPostPage();
            });
          } else {
            Swal.fire({
              title: "undefined action",
              icon: "warning",
              confirmButtonText: "خروج!",
            });
          }
        }
      };
      xhttp.open(
        "DELETE",
        "http://localhost:3000/api/admin/post/crud/" + id,
        true
      );
      xhttp.setRequestHeader("authorization", token);
      xhttp.responseType = "json";
      xhttp.send();
    }
  });
}

function getPostsAdmin() {
  let token = window.localStorage.getItem("token");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    let message = xhttp.response.message;
    if (message === "invalid token") {
      Swal.fire("شما اجازه‌ی دسترسی به این صفحه را ندارید").then(() => {
        window.location.replace("./register.html");
      });
    }
    if (this.readyState == 4 && this.status == 200) {
      const { posts } = this.response;
      post_list = posts
      showPostList()
    }
  };

  xhttp.open("GET", "http://localhost:3000/api/admin/post/crud", true);
  xhttp.setRequestHeader("authorization", token);
  xhttp.responseType = "json";
  xhttp.send();
  showPostList()
}

function showPostList(){
  let template = ``
      for (let i = 0; i < post_list.length; i++) {
        let post = post_list[i];
        template += getInfoCard(
          post.created_at,
          post.title,
          post.content,
          post.id
        );
      }
      template += getAddCard()
      document.getElementById("dataGrid").innerHTML = template;
}

function loadInfoPage() {
  document.getElementById("infoPage").style.borderBottom = "thick solid";
  document.getElementById("postPage").style.borderBottom = "none";
  document.getElementById("dataGrid").innerHTML = "";
  document.getElementById("prevButton").display = "none"
  document.getElementById("nextButton").display = "none"
  document.getElementById("panelButtons").style.display = "none";
  // let temp = userDetailHTML('a', 'b', 'c')
  // document.getElementById("dataTable").innerHTML = temp;

  let token = window.localStorage.getItem("token");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const { user } = this.response;
      let temp = userDetailHTML(user.created_at, user.id, user.email);
      document.getElementById("dataTable").innerHTML = temp;
    }
  };

  xhttp.open("GET", "http://localhost:3000/api/admin/user/crud/", true);
  xhttp.setRequestHeader("authorization", token);
  xhttp.responseType = "json";
  xhttp.send();
}

function userDetailHTML(created_at, id, email) {
  return `
    <form>
    <div class="form-group">
      <label>Email address: ${email}</label>
    </div>
    <div class="form-group">
      <label>id: ${id}</label>
    </div>
    <div class="form-group">
      <label>Created at: ${created_at}</label>
    </div>
  </form>
  `;
}

function toggleDarkMode() {
  console.log(document.body.classList);
  document.body.classList.toggle("dark-mode");
  console.log(document.body.classList);
  // logo change to red:
  let logo = document.getElementById("logo");
  logo.src = toggleValue(logo.src, "blue", "red");
  // nav buttons go red
  let loginButton = document.getElementById("loginButton");
  let signupButton = document.getElementById("signupButton");
  loginButton.className = toggleValue(
    loginButton.className,
    "danger",
    "primary"
  );
  signupButton.className = toggleValue(
    signupButton.className,
    "danger",
    "primary"
  );
  // prev/next buttons in the panel go red
  let prevButton = document.getElementById("prevButton");
  let nextButton = document.getElementById("nextButton");
  prevButton.className = toggleValue(prevButton.className, "danger", "primary");
  nextButton.className = toggleValue(nextButton.className, "danger", "primary");
}

toggleValue = (template, value1, value2) => {
  return template.includes(value1)
    ? template.replace(value1, value2)
    : template.replace(value2, value1);
};

fillGrid = function () {
  document.getElementById("infoPage").style.borderBottom = "none";
  document.getElementById("postPage").style.borderBottom = "none";
  navigationMenuToggle("homepage_s");
  //
  let template = "";
  for (let i = 0; i < 20; i++) {
    template += `<span class="card" style="width: auto; min-width: 150px">
  <img class="card-img-top" src="./assets/multi_logo_200x200.png" alt="Card image cap">
  <div class="card-body">
    <p class="card-text">کارت ${i + 1}</p>
  </div>
</span>`;
  }
  document.getElementById("dataTable").innerHTML = "";
  document.getElementById("smallDataTable").innerHTML = "";
  document.getElementById("dataGrid").innerHTML = template;
  document.getElementById("panelButtons").style.display = "flex";
};

loadTable = () => {
  document.getElementById("infoPage").style.borderBottom = "none";
  document.getElementById("postPage").style.borderBottom = "none";
  navigationMenuToggle("datapage_s");
  //
  let data = getTableData();
  loadMainTable(data);
  loadSmallTable(data);
  document.getElementById("dataGrid").innerHTML = "";
  document.getElementById("panelButtons").style.display = "flex";
};

loadMainTable = (data) => {
  let template = `<table class='table table-striped' aria-labelledby="tableLabel">
  <thead>
    <tr>
      <th>رتبه</th>
      <th>نام تیم</th>
      <th>نام دانشگاه و کشور</th>
      <th>امتیاز</th>
    </tr>
  </thead>
  <tbody>`;
  for (let i = 0; i < data.length; i++) {
    template += `<tr>
      <td>${data[i].ranking}</td>
      <td>${data[i].name}</td>
      <td>${data[i].from}</td>
      <td>${data[i].score}</td>
    </tr>`;
  }
  template += `</tbody>
</table>
`;
  document.getElementById("dataTable").innerHTML = template;
};

loadSmallTable = (data) => {
  template = ``;
  for (let i = 0; i < data.length; i++) {
    template += `
    <table class="smallTable" aria-labelledby="tableLabel" style="width: 100%;">
    <tbody>
      <tr>
          <td><b>رتبه</b></td>
          <td>${data[i].ranking}</td>
      </tr>
      <tr>
          <td><b>نام تیم</b></td>
          <td style="color: purple"><b>${data[i].name}</b></td>
      </tr>
      <tr>
          <td><b>نام دانشگاه و کشور</b></td>
          <td>${data[i].from}</td>
      </tr>
      <tr>
          <td><b>امتیاز</b></td>
          <td style="color: purple"><b>${data[i].score}</b></td>
      </tr>
      </tbody>
  </table>`;
  }
  document.getElementById("smallDataTable").innerHTML = template;
};

function getTableData() {
  return [
    {
      name: "کوشا‌ جان",
      ranking: 1,
      from: "دانشگاه صنعتی شریف، ایران",
      score: 1305,
    },
    {
      name: "مبارزین نتها",
      ranking: 2,
      from: "دانشگاه امیرکبیر، ایران",
      score: 1270,
    },
    {
      name: "حاجی درچه‌ای",
      ranking: 3,
      from: "دانشگاه علوم پزشکی اصفهان، اصفهان",
      score: 1250,
    },
    {
      name: "عدالت و آزادی",
      ranking: 4,
      from: "دانشگاه آزاد قزوین، ایران",
      score: 1105,
    },
    {
      name: "Beatles",
      ranking: 5,
      from: "دانشگاه ملی شوچنکو، اوکراین",
      score: 940,
    },
    {
      name: "الگل",
      ranking: 6,
      from: "دانشگاه آزاد اسلامی واحد علوم تحقیقات، تهران",
      score: 925,
    },
    {
      name: "عمال مناجم البيانات",
      ranking: 7,
      from: "دانشگاه علم و صنعت اردن، اردن",
      score: 870,
    },
  ];
}

showSidebar = function () {
  let element = document.getElementById("sidebar");
  element.classList.toggle("active");
  let show_button = document.getElementById("show-sidebar");
  let hide_button = document.getElementById("hide-sidebar");
  show_button.style.display = "none";
  hide_button.style.display = "";
};

hideSidebar = function () {
  let element = document.getElementById("sidebar");
  element.classList.toggle("active");
  let show_button = document.getElementById("show-sidebar");
  let hide_button = document.getElementById("hide-sidebar");
  show_button.style.display = "";
  hide_button.style.display = "none";
};

loadStartingAnimation = function () {
  let duration = 1500;
  let sidebar = document.getElementById("sidebar");
  let topNavbar = document.getElementById("top-navbar");
  let start = Date.now();
  let timer = setInterval(frame, 20);
  let bottom_navbar = document.getElementById("bottom-navbar");
  let mainPanel = document.getElementById("mainPanel");

  function frame() {
    let passedTime = Date.now() - start;
    if (passedTime >= duration) {
      clearInterval(timer);
    } else {
      sidebar.style.opacity = passedTime / duration;
      bottom_navbar.style.opacity = passedTime / duration;
      topNavbar.style.opacity = passedTime / duration;
      mainPanel.style.opacity = passedTime / duration;
    }
  }
};

loadEndingAnimation = function (duration) {
  let sidebar = document.getElementById("sidebar");
  let topNavbar = document.getElementById("top-navbar");
  let start = Date.now();
  let timer = setInterval(frame, 20);
  let bottom_navbar = document.getElementById("bottom-navbar");
  let mainPanel = document.getElementById("mainPanel");

  function frame() {
    let passedTime = Date.now() - start;
    if (passedTime >= duration) {
      clearInterval(timer);
    } else {
      sidebar.style.opacity = 1 - passedTime / duration;
      bottom_navbar.style.opacity = 1 - passedTime / duration;
      topNavbar.style.opacity = 1 - passedTime / duration;
      mainPanel.style.opacity = 1 - passedTime / duration;
    }
  }
};

goToRegister = function () {
  let duration = 1500;
  loadEndingAnimation(duration);
  setTimeout(() => {
    window.location.href = "./register.html";
  }, duration + 300);
};

goToLogin = function () {
  let duration = 1500;
  loadEndingAnimation(duration);
  setTimeout(() => {
    window.location.href = "./register.html";
  }, duration + 300);
};

homepage = function () {
  navigationMenuToggle("homepage_s");
  fillGrid();
};

data = function () {
  navigationMenuToggle("datapage_s");
  loadTable();
};

login = function () {
  navigationMenuToggle("login_s");
  goToLogin();
};

register = function () {
  navigationMenuToggle("register_s");
  goToRegister();
};

navigationMenuToggle = (activeMenu) => {
  let homepage_s = document.getElementById("homepage_s");
  let login_s = document.getElementById("login_s");
  let register_s = document.getElementById("register_s");
  let data_s = document.getElementById("datapage_s");

  let buttonsArr = [homepage_s, login_s, register_s, data_s];
  for (elm of buttonsArr) {
    if (elm.id === activeMenu) {
      elm.classList.add("active");
    } else {
      elm.classList.remove("active");
    }
  }
};
