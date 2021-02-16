load = function(){
    // showHome()
    fillChart()
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

fillChart= function(){

}

teacherHome = function(){
    document.getElementById("tHome").classList.add("active")
    document.getElementById("tComments").classList.remove("active")
    document.getElementById("tCharts").classList.remove("active")
    document.getElementById("overview").style.display="block"
    document.getElementById("comments").style.display= "none"

}

teacherComments = function(){
    document.getElementById("tComments").classList.add("active")
    document.getElementById("tHome").classList.remove("active")
    document.getElementById("tCharts").classList.remove("active")
    document.getElementById("comments").style.display= "block"
    document.getElementById("overview").style.display="none"

}

teacherCharts = function(){
    document.getElementById("tCharts").classList.add("active")
    document.getElementById("tComments").classList.remove("active")
    document.getElementById("tHome").classList.remove("active")
}