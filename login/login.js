function enviarinf(){
    var v_email = document.querySelector("[data-email]");
    var v_password = document.querySelector("[data-password]");
    var v_email_db = "pedro@alura.com";
    var v_password_db = "Admin-2023";

    if (v_email==v_email_db && v_password==v_password_db){
        window.alert("usuario correcto")
    }
    else {
        window.alert("usuario incorrecto")
    }

}