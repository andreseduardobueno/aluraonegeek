/* XMLHttpRequest para comunicar el  http con el servidor */ 
// https://es.javascript.info/xmlhttprequest
const http = new XMLHttpRequest();

//abrir http (métodos,url)

//CRUD    - Métodos HTTP
//Create  - POST
//Read    - GET
//Update  - PUT/PATON
//Delete  - DELETE
function enviarinf(){
    
    const input      = document.querySelector("[data-email]");
    const v_email    = input.value;
    const input2 = document.querySelector("[data-password]");
    const v_password = input2.value;
    const v_email_db = "pedro@alura.com";
    const v_password_db = "Admin-2023";
    
    http.open("GET","http://localhost:3000/perfil")
    http.send();
    http.onload = () => {
        const data = http.response;
    }












    if (v_email==v_email_db && v_password==v_password_db){
        window.alert("usuario correcto")
    }
    else {
        window.alert("usuario incorrecto")
    }

}

/*new XMLHttpRequest


JSON.parse();

*/
