load = function () {
    // showHome()
    // fillChart()
}

showHome = function () {
    let homeButton = document.getElementById("homeBtn")
    let loginButton = document.getElementById("loginBtn")
    homeButton.classList.add("selected")
    loginButton.classList.remove("selected")
    document.getElementById("welcomePage").style.display = "flex"
    document.getElementById("loginPage").style.display = "none"
    document.getElementById("teacher_container").style.display = "none"
}

showLogin = function () {
    let homeButton = document.getElementById("homeBtn")
    let loginButton = document.getElementById("loginBtn")
    homeButton.classList.remove("selected")
    loginButton.classList.add("selected")
    document.getElementById("welcomePage").style.display = "none"
    document.getElementById("loginPage").style.display = "block"
    document.getElementById("teacher_container").style.display = "none"
}

teacherHome = function () {
    document.getElementById("tHome").classList.add("active")
    document.getElementById("tComments").classList.remove("active")
    document.getElementById("tCharts").classList.remove("active")
    document.getElementById("overview").style.display = "block"
    document.getElementById("comments").style.display = "none"
    document.getElementById("charts").style.display = "none"
}

teacherComments = function () {
    fetchComments(1); // TODO replace with prof id

    document.getElementById("tHome").classList.remove("active")
    document.getElementById("tComments").classList.add("active")
    document.getElementById("tCharts").classList.remove("active")
    document.getElementById("overview").style.display = "none"
    document.getElementById("comments").style.display = "block"
    document.getElementById("charts").style.display = "none"
}

teacherCharts = function () {
    document.getElementById("tHome").classList.remove("active")
    document.getElementById("tComments").classList.remove("active")
    document.getElementById("tCharts").classList.add("active")
    document.getElementById("overview").style.display = "none"
    document.getElementById("comments").style.display = "none"
    document.getElementById("charts").style.display = "block"


    fetchRatings(1); // TODO replace with prof id
}

function checkForEnter(event) {
    if (event.key === 'Enter')
        search()
}

search = function () {
    let queryName = document.getElementById('form1').value;

    if (queryName.length < 3)
        return;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            const { profs } = xhttp.response; // response: {"profs":[{"name":"Kharazi","id":2},{"name":"Kharrazi","id":1}]}

            // front stuff
        }
    };
    xhttp.open("GET", `http://localhost:3000/api/profs/search?name=${queryName}`);
    xhttp.responseType = 'json';
    xhttp.send();

    document.getElementById("welcomePage").style.display = "none"
    document.getElementById("teacher_container").style.display = "flex"

    fetchProfInfo(2);
}

login = () => {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPass').value;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
            }
            if (this.status === 401) {
                Toast.fire({
                    icon: 'error',
                    title: 'Sign in unsuccessful'
                  })
            }
        }
    };
    xhttp.open("POST", "http://localhost:3000/api/signin/");
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.responseType = 'json';
    xhttp.send(JSON.stringify({ email, password }));
}

signup = () => {
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPass').value;
    let passwordConfirm = document.getElementById('signUpConfirmPass').value;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
            }
            if (this.status === 401) {
                Toast.fire({
                    icon: 'error',
                    title: 'Sign in unsuccessful'
                  })
            }
        }
    };
    xhttp.open("POST", "http://localhost:3000/api/signup/");
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.responseType = 'json';
    xhttp.send(JSON.stringify({ name, email, password }));
}

fetchComments = (profId) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            showComments(xhttp.response.comments)
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/profs/comments/" + profId);
    xhttp.responseType = 'json';
    xhttp.send();
}

showComments = (comments) => {
    let commentsDiv = document.getElementById("comments")

    commentsDiv.innerHTML = `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" 
    rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
     crossorigin="anonymous">`;

    for (let item of comments) {
        commentsDiv.innerHTML += `<div class="container"><div class="row"><div class="col">
        <div class="media g-mb-30 media-comment">
          <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
            <div class="g-mb-15"><h5 class="h5 g-color-gray-dark-v1 mb-0">${item.name}</h5>
              <span class="g-color-gray-dark-v4 g-font-size-12">${item.created_at}</span></div>
            <p>${item.comment}</p></div></div></div></div></div>`
    }
}

fetchRatings = (profId) => {
    showCharts({'feature_1':1, 'feature_2':2, 'feature_3': 3, 'feature_4': 4}); // TODO remove this
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            showCharts(xhttp.response.ratings)
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/profs/ratings/" + profId);
    xhttp.responseType = 'json';
    xhttp.send();
}

showCharts = (ratings) => {
    let chart = new CanvasJS.Chart("charts", {
        animationEnabled: true,
        theme: "dark2", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "Teacher scores"
        },
        axisY: {
            title: "Score"
        },
        data: [{
            type: "column", // "bar"  
            showInLegend: true,
            legendMarkerColor: "trasparent",
            legendText: "Scores are ranged from 0 to 5",
            dataPoints: [
                { y: ratings['feature_1'], label: "اخلاق" },
                { y: ratings['feature_2'], label: "نمره" },
                { y: ratings['feature_3'], label: "درس" },
                { y: ratings['feature_4'], label: "نظم" }
            ]
        }]
    });
    chart.render();
}

fetchProfInfo = (profId) => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            console.log(xhttp.response.info)
            showProf(xhttp.response.info)
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/profs/info/" + profId);
    xhttp.responseType = 'json';
    xhttp.send();
}

showProf = (info) => {
    let infoDiv = document.getElementById("profInfo")

    let imageUrl = `url(${info.image_path || "nav/images/logo.jpg"})`

    template = `<div class="img" style="background-image: ${imageUrl};"></div>
    <h3><b>${info.fa_name}</b></h3>
    <h6>${info.uni}</h6>`

    infoDiv.innerHTML = template
}
