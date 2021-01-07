setup = function () {
  loadStartingAnimation()
  document
    .getElementById("homePage")
    .addEventListener("click", () => fillGrid());
  document
    .getElementById("dataPage")
    .addEventListener("click", () => loadTable());
  document
    .getElementById("customSwitches")
    .addEventListener("click", () => toggleDarkMode());
  document
    .getElementById("infoPage")
    .addEventListener("click", ()=> loadInfoPage());
   document
    .getElementById("infoPage")
    .addEventListener("click", ()=> loadInfoPage());
  document
    .getElementById("postPage")
    .addEventListener("click", ()=> loadPostPage())
  document.documentElement.scrollTop = 0;
};

function loadPostPage(){
  document.getElementById("infoPage").style.borderBottom = "none";
  document.getElementById("dataPage").style.borderBottom = "none";
  document.getElementById("homePage").style.borderBottom = "none";
  document.getElementById("postPage").style.borderBottom = "thick solid";
  document.getElementById("dataGrid").innerHTML = `
  <span class="card text-white bg-success mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Success card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </span>
  
  
  <span class="card border-light mb-3" style="min-width: 300px;min-height:400px;">
  <div class="card-header">تاریخ</div>
  <div class="card-body" style="position: relative;">
    <h5 class="card-title">فرستنده</h5>
    <p class="card-text">متن نمونه</p>
    <div style="position: absolute; bottom:10px;">
      <div  style="position: relative; bottom:10px;">
        <button type="button" class="btn btn-danger">حذف</button>
        <button type="button" class="btn btn-warning" style="position: absolute;right: 10px;">تغییر</button>
      </div>
    </div>
  </div>
</span>`
document.getElementById("dataTable").innerHTML = "";
  document.getElementById("smallDataTable").innerHTML = "";

}

function loadInfoPage(){
  document.getElementById("infoPage").style.borderBottom = "thick solid";
  document.getElementById("dataPage").style.borderBottom = "none";
  document.getElementById("homePage").style.borderBottom = "none";
  document.getElementById("postPage").style.borderBottom = "none";

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
  return template.includes(value1) ?
    template.replace(value1, value2) :
    template.replace(value2, value1);
};

fillGrid = function () {
  document.getElementById("homePage").style.borderBottom = "thick solid";
  document.getElementById("dataPage").style.borderBottom = "none";
  document.getElementById("infoPage").style.borderBottom = "none";
  document.getElementById("postPage").style.borderBottom = "none";
  navigationMenuToggle("homepage_s")
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
  document.getElementById("dataPage").style.borderBottom = "thick solid";
  document.getElementById("homePage").style.borderBottom = "none";
  document.getElementById("infoPage").style.borderBottom = "none";
  document.getElementById("postPage").style.borderBottom = "none";
  navigationMenuToggle("datapage_s")
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
}

function getTableData() {
  return [{
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
  let duration = 1500
  let sidebar = document.getElementById('sidebar')
  let topNavbar = document.getElementById('top-navbar')
  let start = Date.now()
  let timer = setInterval(frame, 20);
  let bottom_navbar = document.getElementById("bottom-navbar")
  let mainPanel = document.getElementById("mainPanel")

  function frame() {
    let passedTime = Date.now() - start;
    if (passedTime >= duration) {
      clearInterval(timer);
    } else {
      sidebar.style.opacity = passedTime / duration
      bottom_navbar.style.opacity = passedTime / duration
      topNavbar.style.opacity = passedTime / duration
      mainPanel.style.opacity = passedTime / duration
    }
  }
}

loadEndingAnimation = function (duration) {
  let sidebar = document.getElementById('sidebar')
  let topNavbar = document.getElementById('top-navbar')
  let start = Date.now()
  let timer = setInterval(frame, 20);
  let bottom_navbar = document.getElementById("bottom-navbar")
  let mainPanel = document.getElementById("mainPanel")

  function frame() {
    let passedTime = Date.now() - start;
    if (passedTime >= duration) {
      clearInterval(timer);
    } else {
      sidebar.style.opacity = 1 - passedTime / duration
      bottom_navbar.style.opacity = 1 - passedTime / duration
      topNavbar.style.opacity = 1 - passedTime / duration
      mainPanel.style.opacity = 1 - passedTime / duration
    }
  }
}

goToRegister = function () {
  let duration = 1500
  loadEndingAnimation(duration)
  setTimeout(() => {
    window.location.href = "./register.html"
  }, duration + 300);
}

goToLogin = function () {
  let duration = 1500
  loadEndingAnimation(duration)
  setTimeout(() => {
    window.location.href = "./register.html"
  }, duration + 300)
}

homepage = function () {
  navigationMenuToggle("homepage_s")
  fillGrid()
}

data = function () {
  navigationMenuToggle("datapage_s")
  loadTable()
}

login = function () {
  navigationMenuToggle("login_s")
  goToLogin()
}

register = function () {
  navigationMenuToggle("register_s")
  goToRegister()
}

navigationMenuToggle = (activeMenu) => {
  let homepage_s = document.getElementById("homepage_s")
  let login_s = document.getElementById("login_s")
  let register_s = document.getElementById("register_s")
  let data_s = document.getElementById("datapage_s")

  let buttonsArr = [homepage_s, login_s, register_s, data_s]
  for (elm of buttonsArr) {
    if (elm.id === activeMenu) {
      elm.classList.add("active")
    } else {
      elm.classList.remove("active")
    }
  }
}