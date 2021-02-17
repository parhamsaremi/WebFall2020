init = () => {
    loadUnconfirmedComments();
}

newProf = function () {
    document.getElementById("admin_container").style.display = "none"
    document.getElementById("newProfPanel").style.display = "block"
}

login = function () {
    document.getElementById("admin_container").style.display = "flex"
    document.getElementById("loginPage").style.display = "none"
    document.getElementById("newProfPanel").style.display = "none"
}

cancelProf = function () {
    document.getElementById("admin_container").style.display = "flex"
    document.getElementById("newProfPanel").style.display = "none"
}

addProf = function () {
    // TODO send data to backend
    document.getElementById("admin_container").style.display = "flex"
    document.getElementById("newProfPanel").style.display = "none"

}

professorGrid = function () {
    document.getElementById("tProf").classList.add("active")
    document.getElementById("tComment").classList.remove("active")
    document.getElementById("tUser").classList.remove("active")

    // TODO fill comments using data from back
}

userGrid = function () {
    document.getElementById("tProf").classList.remove("active")
    document.getElementById("tComment").classList.remove("active")
    document.getElementById("tUser").classList.add("active")

    // TODO fill comments using data from back
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
    xhttp.send();
}

rejectComment = (commentId) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3000/api/admin/feedback/" + commentId);
    xhttp.send();
}