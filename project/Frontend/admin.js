init = () => {
    loadUnconfirmedComments();
}

newProf = function () {
    document.getElementById("admin_container").style.display = "none"
    document.getElementById("newProfPanel").style.display = "block"
}

login = function () {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status === 200) {
                // Toast.fire({
                //     icon: 'success',
                //     title: 'ورود با موفقیت انجام شد'
                // })
                const { token } = xhttp.response;
                window.localStorage.setItem('token', token);

                document.getElementById("admin_container").style.display = "flex"
                document.getElementById("loginPage").style.display = "none"
                document.getElementById("newProfPanel").style.display = "none"
            }
            if (this.status === 401) {
                // Toast.fire({
                //     icon: 'error',
                //     title: 'خطا در ورود به حساب کاربری'
                // })
            }
        }
    };
    xhttp.open("POST", "http://localhost:3000/api/signin/admin/");
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.responseType = 'json';
    xhttp.send(JSON.stringify({ username, password }));
}

cancelProf = function () {
    document.getElementById("admin_container").style.display = "flex"
    document.getElementById("newProfPanel").style.display = "none"
}

addProf = () => {
    let faName = document.getElementById("faName").value;
    let enName = document.getElementById("enName").value;
    let imagePath = document.getElementById("imagePath").value;
    let uni = document.getElementById("uni").value;

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/api/admin/profs/");
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify({ faName, enName, imagePath, uni }));

    document.getElementById("admin_container").style.display = "flex"
    document.getElementById("newProfPanel").style.display = "none"
}

messagesGrid = () => {
    document.getElementById("tMess").classList.add("active")
    document.getElementById("tComment").classList.remove("active")
    document.getElementById("tUser").classList.remove("active")
    document.getElementById("tProf").classList.remove("active")

    loadRequests();
}

professorGrid = function () {
    document.getElementById("tProf").classList.add("active")
    document.getElementById("tComment").classList.remove("active")
    document.getElementById("tUser").classList.remove("active")
}

userGrid = function () {
    document.getElementById("tProf").classList.remove("active")
    document.getElementById("tComment").classList.remove("active")
    document.getElementById("tUser").classList.add("active")

    loadUsers()
}

commentGrid = function () {
    document.getElementById("tProf").classList.remove("active")
    document.getElementById("tComment").classList.add("active")
    document.getElementById("tUser").classList.remove("active")

    loadUnconfirmedComments()
}

loadUnconfirmedComments = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            showComments(xhttp.response.comments)
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/admin/unconfirmed/");
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.responseType = 'json';
    xhttp.send();
}

showComments = (comments) => {
    let commentsDiv = document.getElementById("comments")

    commentsDiv.innerHTML = `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">`;

    for (let item of comments) {
        commentsDiv.innerHTML += `<div class="container">
        <div class="row"><div class="col">
            <div class="media g-mb-30 media-comment">
              <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                <div class="g-mb-15"><h5 class="h5 g-color-gray-dark-v1 mb-0">${item.name}</h5>
                </div><p>${item.comment}</p><ul class="list-inline d-sm-flex my-0">
                  <li class="list-inline-item g-mr-20">
                    <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!" onclick="acceptComment(${item.id})">
                      قبول<i class="fa fa-check g-pos-rel g-top-1 g-mr-3" style="color: green;"></i>
                    </a></li><li class="list-inline-item g-mr-20">
                    <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!" onclick="rejectComment(${item.id})">
                      حذف<i class="fa fa-minus g-pos-rel g-top-1 g-mr-3" style="color: red;"></i>
                    </a></li></ul></div></div></div></div></div>`
    }
}

acceptComment = (commentId) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3000/api/admin/confirm/" + commentId);
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.send();
}

rejectComment = (commentId) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/api/admin/feedback/" + commentId);
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.send();
}

loadUsers = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            showUsers(xhttp.response.users)
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/admin/users/");
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.responseType = 'json';
    xhttp.send();
}

showUsers = (comments) => {
    let commentsDiv = document.getElementById("comments")

    commentsDiv.innerHTML = `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">`;

    for (let item of comments) {
        commentsDiv.innerHTML += `<div class="container">
        <div class="row"><div class="col">
            <div class="media g-mb-30 media-comment">
              <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                <div class="g-mb-15"><h5 class="h5 g-color-gray-dark-v1 mb-0">${item.name}</h5>
                </div><p>${item.email}</p><ul class="list-inline d-sm-flex my-0">
                  <li class="list-inline-item g-mr-20">
                    <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="#!" onclick="removeUser('${item.email}')">
                      حذف<i class="fa fa-minus g-pos-rel g-top-1 g-mr-3" style="color: red;"></i>
                    </a></li></ul></div></div></div></div></div>`
    }
}

removeUser = (email) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/api/admin/users/?email=" + email);
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.send();
}

loadRequests = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            showRequests(xhttp.response.requests)
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/admin/requests/");
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.responseType = 'json';
    xhttp.send();
}

showRequests = (requests) => {
    let commentsDiv = document.getElementById("comments")
    console.log(requests);

    commentsDiv.innerHTML = `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
    integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">`;

    for (let item of requests) {
        commentsDiv.innerHTML += `<div class="container">
        <div class="row"><div class="col">
            <div class="media g-mb-30 media-comment">
              <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                <div class="g-mb-15"><h5 class="h5 g-color-gray-dark-v1 mb-0">${item.name}</h5>
                <span class="g-color-gray-dark-v4 g-font-size-12">${item.uni}</span>
                </div><p>${item.description}</p></div></div></div></div></div>`
    }
}
