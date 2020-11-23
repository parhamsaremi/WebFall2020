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
    document.documentElement.scrollTop = 0;
};

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
    document.getElementById("homePage").style.borderBottom = "thick solid";
    document.getElementById("dataPage").style.borderBottom = "none";
    //
    let template = "";
    for (let i = 0; i < 20; i++) {
        template += `<span class="card" style="width: 15rem;">
  <img class="card-img-top" src="./assets/multi_logo_200x200.png" alt="Card image cap">
  <div class="card-body">
    <p class="card-text">Card ${i + 1}</p>
  </div>
</span>`;
    }
    document.getElementById("dataTable").innerHTML = "";
    document.getElementById("dataGrid").innerHTML = template;
    document.getElementById("panelButtons").style.display = "flex";
};

loadTable = () => {
    document.getElementById("dataPage").style.borderBottom = "thick solid";
    document.getElementById("homePage").style.borderBottom = "none";
    //
    let data = getTableData();
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
    document.getElementById("dataGrid").innerHTML = "";
    document.getElementById("dataTable").innerHTML = template;
    document.getElementById("panelButtons").style.display = "flex";
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

homepage = function () {
    let homepage_s = document.getElementById("homepage_s")
    let login_s = document.getElementById("login_s")
    let register_s = document.getElementById("register_s")
    let data_s = document.getElementById("datapage_s")
    homepage_s.classList.add("active")
    login_s.classList.remove("active")
    register_s.classList.remove("active")
    data_s.classList.remove("active")
}

data = function () {
    let homepage_s = document.getElementById("homepage_s")
    let login_s = document.getElementById("login_s")
    let register_s = document.getElementById("register_s")
    let data_s = document.getElementById("datapage_s")
    data_s.classList.add("active")
    login_s.classList.remove("active")
    register_s.classList.remove("active")
    homepage_s.classList.remove("active")
}

login = function () {
    let homepage_s = document.getElementById("homepage_s")
    let login_s = document.getElementById("login_s")
    let register_s = document.getElementById("register_s")
    let data_s = document.getElementById("datapage_s")
    login_s.classList.add("active")
    homepage_s.classList.remove("active")
    register_s.classList.remove("active")
    data_s.classList.remove("active")
    goToLogin()
}

register = function () {
    let homepage_s = document.getElementById("homepage_s")
    let login_s = document.getElementById("login_s")
    let register_s = document.getElementById("register_s")
    let data_s = document.getElementById("datapage_s")
    register_s.classList.add("active")
    login_s.classList.remove("active")
    homepage_s.classList.remove("active")
    data_s.classList.remove("active")
    goToRegister()
}

loadStartingAnimation = function () {
    let duration = 1500
    let sidebar = document.getElementById('sidebar')
    let topNavbar = document.getElementById('top-navbar')
    let start = Date.now()
    let timer = setInterval(frame, 20);

    function frame() {
        let passedTime = Date.now() - start;
        if (passedTime >= duration) {
            clearInterval(timer);
        } else {
            sidebar.style.right = (-duration / 3 + passedTime / 3) + 'px'
            topNavbar.style.opacity = passedTime / duration
        }
    }
}

loadEndingAnimation = function (duration) {
    let sidebar = document.getElementById('sidebar')
    let topNavbar = document.getElementById('top-navbar')
    let start = Date.now()
    let timer = setInterval(frame, 20);

    function frame() {
        let passedTime = Date.now() - start;
        if (passedTime >= duration) {
            clearInterval(timer);
        } else {
            sidebar.style.right = -passedTime / 4 + 'px'
            topNavbar.style.opacity = 1 - passedTime / duration
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