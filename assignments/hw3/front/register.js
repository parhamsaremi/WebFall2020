fillFormRegister = function () {
    var alert = document.getElementById("alertContainer")
    alert.innerHTML = ``
    document.getElementById("logRegForm").innerHTML = `<form>
        <div class = "form-group">
            <div class="form-group" style = "margin-top: 10px;">
                <input type="text" style="width:300px; margin-right:10px;" class="form-control" id="email" aria-describedby="emailHelp" placeholder="ایمیل" oninput="changeDir(this)">
            </div>
            <div class="form-group">
                <input type="password" style="width:300px; margin-right:10px;" class="form-control" id="exampleInputPassword1" placeholder="رمز عبور" oninput="changeDir(this)">
            </div>
            <div class="form-group">
                <input type="password" style="width:300px; margin-right:10px;" class="form-control" id="exampleInputPassword2" placeholder="تکرار رمز عبور" oninput="changeDir(this)">
            </div>
            <div class="form-check">
                <input id="check-rules" style="margin-right:10px;" class="form-check-input" type="checkbox" value="">
                <label id="check-rules-label" style="padding-right:10px;" class="form-check-label" for="check-rules">
                  قوانین و شرایط را می‌پذیرم
                </label>
            </div>              
            <button id="submit-button" style="width:300px; margin-right:10px;"type="button" class="btn btn-primary btn-sm btn-block" onclick="checkFormRegister()">ثبت نام</button>
        </div>
    </form>`
    var element = document.getElementById("registerTab")
    element.classList.add("active")
    element = document.getElementById("loginTab")
    element.classList.remove("active")
}

fillFormLogin = function () {
    var alert = document.getElementById("alertContainer")
    alert.innerHTML = ``
    document.getElementById("logRegForm").innerHTML = `<form>
        <div class = "form-group">
            <div class="form-group" style="margin-top:55px;">
                <input type="text" style="width:300px; margin-right:10px;" class="form-control" id="email" aria-describedby="emailHelp" placeholder="ایمیل" oninput="changeDir(this)">
            </div>
            <div class="form-group">
                <input type="password" style="width:300px; margin-right:10px;" class="form-control" id="exampleInputPassword1" placeholder="رمز عبور" oninput="changeDir(this)">
            </div>
            <button id="submit-button" type="button" style="width:300px; margin-right:10px;" class="btn btn-primary btn-sm btn-block" onclick="checkFormLogin()">ورود</button>
        </div>
    </form>`
    var element = document.getElementById("registerTab")
    element.classList.remove("active")
    element = document.getElementById("loginTab")
    element.classList.add("active")
}

showAlert = function (str, type) {
    var element = document.getElementById("alertContainer")
    element.innerHTML = `
    <div id = "alertBox1" style="width:300px; margin-right:10px;" class="alert alert-${type} alert-dismissible fade show fade-in  align-item-center form-group" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="closeAlert()">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>${str}</strong>
    </div>`
}

closeAlert = function () {
    var element = document.getElementById('alertBox1')
    element.alert('close')
}

checkFormRegister = function () {
    let alert = document.getElementById("alertContainer")
    alert.innerHTML = ``
    let email = document.getElementById('email').value;
    let password = document.getElementById('exampleInputPassword1').value;
    let repeatPassword = document.getElementById('exampleInputPassword2').value;
    let agreeTerms = document.getElementById("check-rules").checked;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
        showAlert('ایمیل خالی می‌باشد.', 'danger')
    } else if (!emailRegex.test(email)) {
        showAlert('فرمت ایمیل ورودی صحیح نمی‌باشد', 'danger');
    } else if (!password) {
        showAlert('رمز عبور خالی می‌باشد.', 'danger')
    } else if (!repeatPassword) {
        showAlert('تکرار رمز عبور خالی می‌باشد.', 'danger')
    } else if (password != repeatPassword) {
        showAlert('رمز عبور و تکرار آن یکسان نمی‌باشد', 'danger');
    } else if (!agreeTerms) {
        showAlert('لطفا قوانین و شرایط را قبول کنید', 'danger');
    } else {
        showAlert('ثبت‌نام موفقیت آمیز بود', 'success')
    }
}

checkFormLogin = function () {
    let alert = document.getElementById("alertContainer")
    alert.innerHTML = ``
    let email = document.getElementById('email').value;
    let password = document.getElementById('exampleInputPassword1').value;
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
        showAlert('ایمیل خالی می‌باشد.', 'danger')
    } else if (!emailRegex.test(email)) {
        showAlert('فرمت ایمیل ورودی صحیح نمی‌باشد', 'danger');
    } else if (!password) {
        showAlert('رمز عبور خالی می‌باشد.', 'danger')
    } else if (email != '1111@gmail.com') {
        showAlert('ایمیل ورودی صحیح نمی‌باشد', 'danger');
    } else if (password != '1111') {
        showAlert('رمز عبور صحیح نمی‌باشد‌', 'danger');
    } else {
        showAlert('ورود موفقیت آمیز بود', 'success')
    }
}

setup = function () {
    fillFormLogin();
    loadTextColorAnimation();
    loadStartingAnimation();
}

loadTextColorAnimation = function () {
    let imgLightText = document.getElementById('img-text-light');
    let imgDarkText = document.getElementById('img-text-dark');

    let timer = setInterval(frame, 1000);

    function frame() {
        if (imgLightText.style.color == 'yellow') {
            imgLightText.style.color = 'red';
        }
        else if (imgLightText.style.color == 'red') {
            imgLightText.style.color = 'blue';
        }
        else {
            imgLightText.style.color = 'yellow';
        }
        if (imgDarkText.style.color == 'white') {
            imgDarkText.style.color = 'orange';
        }
        else if (imgDarkText.style.color == 'orange') {
            imgDarkText.style.color = 'cyan';
        }
        else {
            imgDarkText.style.color = 'white';
        }
    }
}

loadStartingAnimation = function () {
    let body = document.getElementById('main-body');
    let navbar = document.getElementById('top-navbar');
    let imageLight = document.getElementById('image-light');
    let imageDark = document.getElementById('image-dark');
    let imgLightText = document.getElementById('img-text-light');
    let imgDarkText = document.getElementById('img-text-dark');
    let logregdiv = document.getElementById('logregdiv');
    navbar.style.opacity = 0

    let start1 = Date.now();
    let timer_navbar = setInterval(frame_navbar, 20);

    function frame_navbar() {
        let duration = 1500;
        let passedTime = Date.now() - start1;
        if (passedTime >= duration) {
            clearInterval(timer_navbar);
        } else {
            navbar.style.opacity = passedTime / duration;
        }
    }

    setTimeout(() => {
        start2 = Date.now()
        logregdiv.style.visibility = 'visible'
        imageLight.style.visibility = 'visible'
        imageDark.style.visibility = 'visible'
        let timer_mid = setInterval(frame_mid, 20);

        function frame_mid() {
            let duration = 1500;
            let passedTime = Date.now() - start2;
            if (passedTime >= duration) {
                clearInterval(timer_mid);
            } else {
                imageLight.style.left = -duration / 5 + passedTime / 5 + 'px';
                imageLight.style.opacity = passedTime / duration;
                imageDark.style.left = -duration / 5 + passedTime / 5 + 'px';
                imageDark.style.opacity = passedTime / duration;
                logregdiv.style.opacity = passedTime / duration;
                logregdiv.style.right = -duration / 5 + passedTime / 5 + 'px';
            }
        }

        setTimeout(() => {
            start3 = Date.now()
            let timer_img_text = setInterval(frame_img_text, 20);

            function frame_img_text() {
                let duration = 1500;
                let passedTime = Date.now() - start3;
                if (passedTime >= duration) {
                    clearInterval(timer_img_text);
                } else {
                    imgLightText.style.opacity = passedTime / duration;
                    imgDarkText.style.opacity = passedTime / duration;
                }
            }
        }, 1700);
    }, 1200);
}

loadEndingAnimation = function (duration) {
    let body = document.getElementById('main-body');
    let navbar = document.getElementById('top-navbar');
    let imageLight = document.getElementById('image-light');
    let imageDark = document.getElementById('image-dark');
    let imgLightText = document.getElementById('img-text-light');
    let imgDarkText = document.getElementById('img-text-dark');
    let logregdiv = document.getElementById('logregdiv');
    let start = Date.now();
    let timer = setInterval(frame, 20);

    function frame() {
        let passedTime = Date.now() - start;
        if (passedTime >= duration) {
            clearInterval(timer);
        } else {
            body.style.opacity = 1 - passedTime / duration
            navbar.style.opacity = 1 - passedTime / duration
            imageLight.style.left = (-duration / 5) - (-duration / 5 + passedTime / 5) + 'px'
            imageLight.style.opacity = 1 - passedTime / duration
            imageDark.style.left = (-duration / 5) - (-duration / 5 + passedTime / 5) + 'px'
            imageDark.style.opacity = 1 - passedTime / duration
            logregdiv.style.right = (-duration / 5) - (-duration / 5 + passedTime / 5) + 'px'
            imgLightText.style.opacity = 1 - passedTime / duration
            imgDarkText.style.opacity = 1 - passedTime / duration
            logregdiv.style.opacity = 1 - passedTime / duration
        }
    }
}

backToHome = function () {
    let duration = 1500
    loadEndingAnimation(duration)
    setTimeout(() => {
        window.location.href = "./index.html"
    }, duration + 300);
}

changeDir = function (elem) {
    if (!elem.value) {
        elem.dir = "rtl"
    } else {
        elem.dir = "ltr"
    }
}

toggleDark = function () {
    document.getElementById("main-body").classList.toggle("dark-mode")
}

