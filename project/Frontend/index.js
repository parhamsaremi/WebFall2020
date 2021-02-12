load = function(){
    showHome()
}

showHome = function(){
    let homeButton = document.getElementById("homeBtn")
    let loginButton = document.getElementById("loginBtn")
    homeButton.classList.add("selected")
    loginButton.classList.remove("selected")
    document.getElementById("welcomPage").style.display = "flex"
    document.getElementById("loginPage").style.display = "none"
}


showLogin = function(){
    let homeButton = document.getElementById("homeBtn")
    let loginButton = document.getElementById("loginBtn")
    homeButton.classList.remove("selected")
    loginButton.classList.add("selected")
    document.getElementById("welcomPage").style.display = "none"
    document.getElementById("loginPage").style.display = "block"

}