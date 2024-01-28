function validarformulario() {

    var nome = document.forms["formulario"]["nome"].value;
    var email = document.forms["formulario"]["email"].value;
    var mensagem = document.forms["formulario"]["mensagem"].value;

    if (nome == "") {
        alert("Insira seu nome por favor")

        return false
    }
    if (email == "") {
        alert("Insira seu email por favor")

        return false
    }
    else if (!validarEmail(email)) {
        alert("Insira um email válido por favor")

        return false
    }



    localStorage.setItem("nome", nome)
    localStorage.setItem("email", email)
    localStorage.setItem("mensagem", mensagem)



    return true;

}

function validarEmail(email) {

    return email.includes("@") && email.includes(".");




}
