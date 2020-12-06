

let i=2

function openHamb(){
    const menu = document.querySelector("header nav #responsiveNav #hambMenu");
    const lines = document.querySelectorAll("#line");
 i+=1;
 if(i%2 !== 0){ 

menu.style.transform= "translate(0px, 0px)";
menu.style.opacity= "1";
lines.forEach(line=>{
    line.style.transform="rotate(-45deg)"
})

}else{
    menu.style.transform= "translate(0px, -400px)"
    lines.forEach(line=>{
        line.style.transform="rotate(0deg)"
    })
}

}

document.getElementById("hambIcon").addEventListener("click", openHamb);




