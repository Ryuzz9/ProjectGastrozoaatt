function validarFormulario(){

var nome = document.forms["formulario"]["nome"].value;
var email = document.forms["formulario"]["email"].value;
var senha = document.forms["formulario"]["senha"].value;

if (nome == ""){

    alert("O campo nome esta vaizio")
    return false
}

if (email == ""){

    alert("O campo email esta vazio")
    return false

}else if (!validarEmail(email)){

    alert("Por favor insira um email valido")
    return false
}

if (senha == ""){

    alert("O campo senha esta vazio")
 
    return false


}else if(!validarSenha(senha)){

    alert("O campo deve conter letras e numeros e um simbolo(@.#$) no minimo")
    return false
}


console.log(nome);

localStorage.setItem("nome", nome);
localStorage.setItem("email", email);
localStorage.setItem("senha", senha);



return true
}

function validarEmail(email){

return email.includes ("@") && email.includes (".");z

}
function validarSenha(senha){

    return senha.length >=5 && /[0-9]/.test(senha) && /[a-z]/.test(senha) && /[A-Z]/.test(senha)
    
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
   $("#name").text(profile.getName());
   $("#email").text(profile.getEmail());
   $("#image").attr('src', profile.getImageUrl());
   $(".data").css("display", "block");
   $(".g-signin2").css("display", "none");
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        alert("Desconectado com sucesso");
        $(".g-signin2").css("display", "block");
        $(".data").css("display", "none");
      
    });
  }
