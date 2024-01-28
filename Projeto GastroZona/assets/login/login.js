function validarLogin() {
    let email = document.getElementById("loginEmail").value;
    let senha = document.getElementById("loginSenha").value;

    let armazenadoEmail = localStorage.getItem("email");
    let armazenadoSenha = localStorage.getItem("senha");
    const emailADM = "marcello@gmail.com";
    const senhaADM = "1234";

    console.log("email:", email);
    console.log("senha:", senha);
    console.log("armazenadoEmail:", armazenadoEmail);
    console.log("armazenadoSenha:", armazenadoSenha);
    console.log("emailADM:", emailADM);
    console.log("senhaADM:", senhaADM);

    if (email.trim() === emailADM && senha.trim() === senhaADM) {
        alert("Login adm sucedido!");
        console.log("Redirecionando para a página do ADM...");
        window.location.href = "../pagADM/index.html";
    } else if (email.trim() === armazenadoEmail && senha.trim() === armazenadoSenha) {
        alert("Login bem-sucedido!");
        console.log("Redirecionando para a página de cadastro...");
        window.location.href = "../pagina principal/index.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }

    return false; // Retorne false se o login falhar
}
