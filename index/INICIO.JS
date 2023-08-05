// Hay menos formas de elegir un nodo DOM con navegadores antiguos
const form = document.getElementsByTagName("form")[0];
const email = document.getElementById("mail");
const names = document.getElementById("formcontato__input");

// Lo siguiente es un truco para llegar al siguiente nodo de elementos hermanos en el DOM
// Esto es peligroso porque puedes construir fácilmente un bucle infinito.
// En los navegadores modernos es mejor usar element.nextElementSibling
let error = email;
while ((error = error.nextSibling).nodeType != 1);

let errorName = names;
while ((errorName = errorName.nextSibling).nodeType != 1);

// según la especificación HTML5
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const namesRegExp =
  /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$/;
  

// Muchos navegadores antiguos no son compatibles con el método addEventListener.
// Aquí hay una manera simple de manejar esto; está lejos de ser la única.
function addEvent(element, event, callback) {
  let previousEventCallBack = element["on" + event];
  element["on" + event] = function (e) {
    let output = callback(e);

    // Una devolución de llamada que devuelve «false» detiene la cadena de devolución de llamada
    // e interrumpe la ejecución de la devolución de llamada del evento.
    if (output === false) return false;

    if (typeof previousEventCallBack === "function") {
      output = previousEventCallBack(e);
      if (output === false) return false;
    }
  };
}

// Ahora podemos reconstruir nuestra restricción de validación
// Debido a que no confiamos en la pseudoclase de CSS, tenemos que
// establecer explícitamente la clase valid/invalid en nuestro campo de correo electrónico
// establecer explícitamente la clase valid/invalid en nuestro campo de nombre
addEvent(window, "load", function () {
  // Aquí probamos si el campo está vacío (recuerda, el campo no es obligatorio)
  // Si no es así, verificamos si su contenido es una dirección de correo electrónico con el formato correcto.
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  // Aquí probamos si el campo está vacío (recuerda, el campo no es obligatorio)
  // Si no es así, verificamos si su contenido es un nombre con el formato correcto.
  //const testn = names.value.length === 1 ;
  const testn = names.value.length === 0 || namesRegExp.test(names.value);
  email.className = test ? "valid" : "invalid";
  names.className = testn ? "valid" : "invalid";
});



// Esto define lo que sucede cuando el usuario escribe en el campo
addEvent(email, "input", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
  if (test) {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  } else {
    email.className = "invalid";
  }

});


// Esto define lo que sucede cuando el usuario escribe en el campo
addEvent(names, "input", function () {
  const testn = names.value.length === 0 || namesRegExp.test(names.value);

  if (testn) {
    names.className = "valid";
    errorName.innerHTML = "";
    errorName.className = "error";
  } else {
    names.className = "invalid";
  }
});

// Esto define lo que sucede cuando el usuario intenta enviar los datos.
addEvent(form, "submit", function () {
  const test = email.value.length === 0 || emailRegExp.test(email.value);
 // const testn = names.value.length === 0 || namesRegExp.test(names.value);
 const testn =  namesRegExp.test(names.value);
  if (!test) {
    email.className = "invalid";
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";

    // Algunos navegadores antiguos no son compatibles con el método event.preventDefault ()
    return false;
  } else {
    email.className = "valid";
    error.innerHTML = "";
    error.className = "error";
  }

  if (!testn) {
    names.className = "invalid";
    errorName.innerHTML = "No es formato valido para un nombre...! "
    errorName.className = "error active";

    // Algunos navegadores antiguos no son compatibles con el método event.preventDefault ()
    return false;
  } else {
    names.className = "valid";
    errorName.innerHTML = "";
    errorName.className = "error";
  }
});
