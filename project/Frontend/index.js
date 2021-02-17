load = function () {
    // showHome()
    fillChart()
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

fillChart = function () {

}

teacherHome = function () {
    document.getElementById("tHome").classList.add("active")
    document.getElementById("tComments").classList.remove("active")
    document.getElementById("tCharts").classList.remove("active")
    document.getElementById("overview").style.display = "block"
    document.getElementById("comments").style.display = "none"

}

teacherComments = function () {
    document.getElementById("tComments").classList.add("active")
    document.getElementById("tHome").classList.remove("active")
    document.getElementById("tCharts").classList.remove("active")
    document.getElementById("comments").style.display = "block"
    document.getElementById("overview").style.display = "none"

}

teacherCharts = function () {
    document.getElementById("tCharts").classList.add("active")
    document.getElementById("tComments").classList.remove("active")
    document.getElementById("tHome").classList.remove("active")
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
            document.getElementById("welcomePage").style.display = "none"
            document.getElementById("teacher_container").style.display = "flex"
        }
    };
    xhttp.open("GET", `http://localhost:3000/api/profs/search?name=${queryName}`);
    xhttp.responseType = 'json';
    xhttp.send();

}

login = () => {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPass').value;

    // TODO Handle Errors if (..) else {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(xhttp.response)
            // TODO handle Errors
            // TODO act
        }
    };
    xhttp.open("POST", "http://localhost:3000/api/signin/");
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.responseType = 'json';
    xhttp.send(JSON.stringify({ email, password }));
    // }
}

signup = () => {
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPass').value;
    let passwordConfirm = document.getElementById('signUpConfirmPass').value;

    // TODO Handle Errors if (..) else {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(xhttp.response)
            // TODO handle Errors
            // TODO act
        }
    };
    xhttp.open("POST", "http://localhost:3000/api/signup/");
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.responseType = 'json';
    xhttp.send(JSON.stringify({ name, email, password }));
    // }
}