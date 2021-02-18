var email_validator_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var pass_validator_regex = /^.+$/;

load = function () {
  // TODO check if token is valid

  let token = window.localStorage.getItem("token");

  if (token === null) {
    document.getElementById("loginBtn").style.display = "flex";
    document.getElementById("panelBtn").style.display = "none";
  } else {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("panelBtn").style.display = "flex";
  }

  // showHome()
  // fillChart()
};

showHome = function () {
  let homeButton = document.getElementById("homeBtn");
  let loginButton = document.getElementById("loginBtn");
  homeButton.classList.add("selected");
  loginButton.classList.remove("selected");
  document.getElementById("welcomePage").style.display = "flex";
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("teacher_container").style.display = "none";
};

showLogin = function () {
  let homeButton = document.getElementById("homeBtn");
  let loginButton = document.getElementById("loginBtn");
  homeButton.classList.remove("selected");
  loginButton.classList.add("selected");
  document.getElementById("welcomePage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";
  document.getElementById("teacher_container").style.display = "none";
};

teacherHome = function () {
  document.getElementById("tComments").classList.remove("active");
  document.getElementById("tCharts").classList.remove("active");
  document.getElementById("comments").style.display = "none";
  document.getElementById("charts").style.display = "none";
};

teacherComments = function () {
  fetchComments(1); // TODO replace with prof id

  document.getElementById("tComments").classList.add("active");
  document.getElementById("tCharts").classList.remove("active");
  document.getElementById("comments").style.display = "block";
  document.getElementById("charts").style.display = "none";
};

teacherCharts = function () {
  document.getElementById("tComments").classList.remove("active");
  document.getElementById("tCharts").classList.add("active");
  document.getElementById("comments").style.display = "none";
  document.getElementById("charts").style.display = "block";

  fetchRatings(1); // TODO replace with prof id
};

function checkForEnter(event) {
  if (event.key === "Enter") search();
}

search = function () {
  let queryName = document.getElementById("form1").value;

  let portfolioSection = document.getElementById("portfolio");
  let finalDiv = document.getElementById("search_results");

  if (queryName.length < 3) return;
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      const { profs } = xhttp.response; // response: {"profs":[{"name":"Kharazi","id":2},{"name":"Kharrazi","id":1}]}

      portfolioSection.style.display = "block";
      finalDiv.innerHTML = ``;

      console.log(profs);
      for (let prof of profs) {
        link = `url(${prof.image_path || "nav/images/logo.jpg"})`;
        finalDiv.innerHTML += `<div id="profSearch_${prof.id}" class="col-lg-3 col-md-8 filter-app" 
                onclick="getProfData(${prof.id})" style="background-color: white;margin-top: 2%;">
          <div class="img bg-wrap text-center py-4"><div class="user-logo" id="profInfo_${prof.id}">
              <div class="img" style="background-image: ${link};"></div>
              <h3><b>${prof.name}</b></h3></div></div></div>`;
      }

      scrollTo({ top: finalDiv.offsetTop, behavior: "smooth" });
    } else {
      // TODO show error
    }
  };
  xhttp.open("GET", `http://localhost:3000/api/profs/search?name=${queryName}`);
  xhttp.responseType = "json";
  xhttp.send();

  portfolioSection.style.display = "block";

  scrollTo({ top: finalDiv.offsetTop, behavior: "smooth" });

  // fetchProfInfo(2);
};

login = () => {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPass").value;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  if (!email_validator_regex.test(email)) {
    Toast.fire({
      icon: "error",
      title: "فرمت ایمیل ورودی صحیح نیست",
    });
  }

  if (!pass_validator_regex.test(password)) {
    Toast.fire({
      icon: "error",
      title: "رمز عبور نمی‌تواند خالی باشد",
    });
  }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status === 200) {
        Toast.fire({
          icon: "success",
          title: "ورود با موفقیت انجام شد",
        });

        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("panelBtn").style.display = "flex";
      }
      if (this.status === 401) {
        Toast.fire({
          icon: "error",
          title: "خطا در ورود به حساب کاربری",
        });
      }
    }
  };
  xhttp.open("POST", "http://localhost:3000/api/signin/");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.responseType = "json";
  xhttp.send(JSON.stringify({ email, password }));
};

signup = () => {
  let name = document.getElementById("signUpName").value;
  let email = document.getElementById("signUpEmail").value;
  let password = document.getElementById("signUpPass").value;
  let passwordConfirm = document.getElementById("signUpConfirmPass").value;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  if (name == "") {
    Toast.fire({
      icon: "error",
      title: "نام نمی‌تواند خالی باشد",
    });
    return;
  }

  if (!email_validator_regex.test(email)) {
    Toast.fire({
      icon: "error",
      title: "فرمت ایمیل ورودی صحیح نیست",
    });
    return;
  }

  if (!pass_validator_regex.test(password)) {
    Toast.fire({
      icon: "error",
      title: "رمز عبور نمی‌تواند خالی باشد",
    });
  }

  if (password != passwordConfirm) {
    Toast.fire({
      icon: "error",
      title: "رمز عبور و تکرار آن باید یکسان باشند",
    });
  }

  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status === 200) {
        Toast.fire({
          icon: "success",
          title: "ثبت‌نام با موفقیت انجام شد",
        });
      }
      if (this.status === 401) {
        Toast.fire({
          icon: "error",
          title: "خطا در ثبت‌نام",
        });
      }
    }
  };
  xhttp.open("POST", "http://localhost:3000/api/signup/");
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.responseType = "json";
  xhttp.send(JSON.stringify({ name, email, password }));
};

fetchComments = (profId) => {
  showComments("");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      showComments(xhttp.response.comments);
    }
  };
  xhttp.open("GET", "http://localhost:3000/api/profs/comments/" + profId);
  xhttp.responseType = "json";
  xhttp.send();
};

showComments = (comments) => {
  let commentsDiv = document.getElementById("comments");

  commentsDiv.innerHTML = `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" 
    rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
     crossorigin="anonymous">`;
  commentsDiv.innerHTML += `<div class="form-group justify-content-center">
     <button class="btn btn-success" style="margin-left: 40%;" onclick="newComment()">کامنت جدید</button>
   </div>`;
  if (comments === "") {
    return;
  }
  for (let item of comments) {
    commentsDiv.innerHTML += `<div class="container"><div class="row"><div class="col">
        <div class="media g-mb-30 media-comment">
          <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
            <div class="g-mb-15"><h5 class="h5 g-color-gray-dark-v1 mb-0">${item.name}</h5>
              <span class="g-color-gray-dark-v4 g-font-size-12">${item.created_at}</span></div>
            <p>${item.comment}</p></div></div></div></div></div>`;
  }
};

fetchRatings = (profId) => {
  showCharts({ feature_1: 1, feature_2: 2, feature_3: 3, feature_4: 4 });
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      showCharts(xhttp.response.ratings);
    }
  };
  xhttp.open("GET", "http://localhost:3000/api/profs/ratings/" + profId);
  xhttp.responseType = "json";
  xhttp.send();
};

showCharts = (ratings) => {
  let chart = new CanvasJS.Chart("charts", {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Teacher scores",
    },
    axisY: {
      title: "Score",
    },
    data: [
      {
        type: "column", // "bar"
        showInLegend: true,
        legendMarkerColor: "trasparent",
        legendText: "Scores are ranged from 0 to 5",
        dataPoints: [
          { y: +ratings["feature_1"], label: "اخلاق" },
          { y: +ratings["feature_2"], label: "نمره دادن" },
          { y: +ratings["feature_3"], label: "کیفیت تدریس" },
          { y: +ratings["feature_4"], label: "نظم" },
        ],
      },
    ],
  });
  chart.render();
};

fetchProfInfo = (profId) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status === 200) {
      showProf(xhttp.response.info);
    }
  };
  xhttp.open("GET", "http://localhost:3000/api/profs/info/" + profId);
  xhttp.responseType = "json";
  xhttp.send();
};

showProf = (info) => {
  let infoDiv = document.getElementById("profInfo");

  let imageUrl = `url(${info.image_path || "nav/images/logo.jpg"})`;

  template = `<div class="img" style="background-image: ${imageUrl};"></div>
    <h3><b>${info.fa_name}</b></h3>
    <h6>${info.uni}</h6>`;

  infoDiv.innerHTML = template;
};

addComment = () => {
  // TODO send request

  document.getElementById("newCommentPanel").style.display = "none";
  document.getElementById("teacher_container").style.display = "flex";
};

cancelComment = () => {
  document.getElementById("newCommentPanel").style.display = "none";
  document.getElementById("teacher_container").style.display = "flex";
};

newComment = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: "برای نظر دادن باید وارد حساب کاربری خود شوید.",
  });
};

getProfData = (id) => {
  fetchProfInfo(id);
  fetchRatings(id);

  document.getElementById("portfolio").style.display = "none";
  document.getElementById("teacher_container").style.display = "flex";
  document.getElementById("welcomePage").style.display = "none";
};
