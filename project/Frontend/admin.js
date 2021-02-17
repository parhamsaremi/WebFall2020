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

professorGrid = function(){
    document.getElementById("tProf").classList.add("active")
    document.getElementById("tComment").classList.remove("active")
    document.getElementById("tUser").classList.remove("active")

    // TODO fill comments using data from back
}

userGrid = function(){
    document.getElementById("tProf").classList.remove("active")
    document.getElementById("tComment").classList.remove("active")
    document.getElementById("tUser").classList.add("active")

    // TODO fill comments using data from back
}

commentGrid = function(){
    document.getElementById("tProf").classList.remove("active")
    document.getElementById("tComment").classList.add("active")
    document.getElementById("tUser").classList.remove("active")


    // TODO fill comments using data from back
}