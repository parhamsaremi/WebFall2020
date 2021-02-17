newProf = function(){
    document.getElementById("admin_container").style.display="none"
    document.getElementById("newProfPanel").style.display="block"
}


login = function(){
    document.getElementById("admin_container").style.display="flex"
    document.getElementById("loginPage").style.display="none"
    document.getElementById("newProfPanel").style.display="none"
}

cancelProf = function(){
    document.getElementById("admin_container").style.display= "flex"
    document.getElementById("newProfPanel").style.display="none"
}

addProf = function(){
    // TODO send data to backend
    document.getElementById("admin_container").style.display= "flex"
    document.getElementById("newProfPanel").style.display="none"
}