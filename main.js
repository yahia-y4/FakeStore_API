document.getElementById("add_icon").onclick =()=>{
    document.getElementById("form_div").style.display="flex";
}

document.getElementById("x_but").onclick =(e)=>{
 e.preventDefault();
    document.getElementById("form_div").style.display="none";
}