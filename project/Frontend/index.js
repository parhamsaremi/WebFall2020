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

teacherComments = function () {
    fetchComments(1); // TODO replace with prof id
    
    document.getElementById("tComments").classList.add("active")
    document.getElementById("tCharts").classList.remove("active")
    document.getElementById("comments").style.display = "block"
    document.getElementById("overview").style.display = "none"
}

teacherCharts = function () {
    document.getElementById("tCharts").classList.add("active")
    document.getElementById("tComments").classList.remove("active")

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
}

login = () => {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPass').value;

    // TODO Handle Errors if (sth is wrong) return

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {
                // login successful
            }
            if (this.status === 401) {
                // wrong email or password
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

    // TODO Handle Input Errors if (sth is wrong) return

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 201) {
                // user created successfully
            }
            if (this.status === 409) {
                // user with email already exists
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
    console.log(ratings) // {prof_id: 1, feature_1: "2.50", feature_2: "2.00", feature_3: "3.50", feature_4: "3.50"}
}