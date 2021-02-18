load = function () {
    // showHome()
    // fillChart()
}

showHome = function () {
    let homeButton = document.getElementById("homeBtn")
    let panelBtn = document.getElementById("panelBtn")
    let logoutBtn = document.getElementById("logoutBtn")
    homeButton.classList.add("selected")
    panelBtn.classList.remove("selected")
    logoutBtn.classList.remove("selected")
    document.getElementById("welcomePage").style.display = "flex"
    document.getElementById("user_container").style.display = "none"
}

showPanel = function () {
    let homeButton = document.getElementById("homeBtn")
    let panelBtn = document.getElementById("panelBtn")
    let logoutBtn = document.getElementById("logoutBtn")
    homeButton.classList.remove("selected")
    panelBtn.classList.add("selected")
    logoutBtn.classList.remove("selected")
    document.getElementById("welcomePage").style.display = "none"
    document.getElementById("user_container").style.display = "flex"
}

logout = function () {
    window.localStorage.removeItem('token')
    window.location.href = "./index_fa.html"
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

fetchComments = () => {
    // showComments([{comment: 'سلام چطوری؟', id: 2}, {comment: 'خوبم ممنون', id: 3}])
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status === 200) {
            showComments(xhttp.response.comments)
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/feedback/");
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.responseType = 'json';
    xhttp.send();
}

deleteComment = (commentId) => {
    console.log(commentId)
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
        if (this.readyState == 4 && this.status === 200) {
            Toast.fire({
                icon: 'success',
                title: 'نظر شما با موفقیت حذف شد'
            })
        }
    };
    xhttp.open("DELETE", "http://localhost:3000/api/feedback/" + commentId);
    let token = window.localStorage.getItem("token");
    xhttp.setRequestHeader("authorization", token);
    xhttp.responseType = 'json';
    xhttp.send();
}

showComments = (comments) => {
    let commentsDiv = document.getElementById("comments")

    commentsDiv.innerHTML = `<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" 
    rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
     crossorigin="anonymous">`;

     if(comments === ""){
        return
    }

    for (let item of comments) {
        commentsDiv.innerHTML += `<div class="container">
        <div class="row">
          <div class="col">
            <div class="media g-mb-30 media-comment">
              <div class="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                <p>${item.comment}</p>
                <ul class="list-inline d-sm-flex my-0">
                  <li class="list-inline-item g-mr-20">
                    <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" onclick="deleteComment(${item.id})" href="#!">
                      حذف
                      <i class="fa fa-minus g-pos-rel g-top-1 g-mr-3" style="color: red;"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>`
    }
}
