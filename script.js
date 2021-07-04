window.addEventListener('load', init);

let cadastro;
function init(){
   cadastro = document.forms['dados'];
   cadastro.addEventListener('submit', validarFormulario);

   cadastro.nome.addEventListener('blur', validarNomeCompleto);
   cadastro.email.addEventListener('blur', validarEmail);
   cadastro.endereco.addEventListener('blur', validarEndereco);
   cadastro.phone.addEventListener('blur', validarTelefone);
   cadastro.cep.addEventListener('blur', validarCEP);
   cadastro.datenascimento.addEventListener('blur', validarDataNascimento);
   cadastro.password.addEventListener('blur', validarSenha);
   cadastro.passwordConfirm.addEventListener('blur', validarConfirmPassword);
}

function validarFormulario(event){
   let erros = 0;

   erros += validarNomeCompleto();
   erros += validarEmail();
   erros += validarEndereco();
   erros += validarTelefone();
   erros += validarCEP();
   erros += validarDataNascimento();
   erros += validarSenha();
   erros += validarConfirmPassword();

   if(erros != 0){
      event.preventDefault();
      alert("Por gentileza, preencha os dados corretamente!");
      return false;
   }
   else{
      window.open("home.html")
      return true;
   }
}

//Validações de Inputs//
   function validarNomeCompleto(){
      let cNome = cadastro.nome; //Campo (Input) do nome
      let regex = /^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/;
      return validarInputRegex(cNome, regex);
   }

   function validarEmail(){
      let cEmail = cadastro.email;
      let regex = /^[a-zA-Z]{1}[a-zA-Z0-9\_\.\-]*[@]{1}[a-zA-Z]{3,}\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2}){0,1}$/;
      return validarInputRegex(cEmail, regex);
   }

   function validarEndereco(){
      let cEndereco = cadastro.endereco;
      let regex = /[A-Za-z0-9]$/;
      return validarInputRegex(cEndereco, regex);
   }

   function validarTelefone(){
      let cTelefone = cadastro.phone;//(XX) XXXX-XXXX
      let regex = /^((\(\d{2}\))|(\d{2}))[ ]?[9]?\d{4}[\-]?\d{4}$/;
      return validarInputRegex(cTelefone, regex);
   }

   function validarCEP(){
      let cCep = cadastro.cep;
      let regex = /^[0-9]{5}-[0-9]{3}$/;;
      return validarInputRegex(cCep, regex);
   }

   function validarDataNascimento(){
      let cDataNascimento = cadastro.datenascimento;
      console.log(cDataNascimento.value)
      let regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return validarInputRegex(cDataNascimento, regex);
   }

   function validarSenha(){
      let cSenha = cadastro.password;
      let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return validarInputRegex(cSenha, regex);
   }

   function validarConfirmPassword(){
      let cConfirmSenha = cadastro.passwordConfirm;
      let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      if(cadastro.password.value != cConfirmSenha.value){
         alert("As senhas não conferem.")
      }
      else{
         console.log("Correto!")
      }
      return validarInputRegex(cConfirmSenha, regex);
   }


   function validarInputRegex(campoTexto, regex){
      let valueInput = campoTexto.value;
      if(regex.test(valueInput)){
         console.log("Correto!")
         addBorderSuccess(campoTexto);
         return 0;
      }
      else{
      console.log("Errado!")
      addBorderError(campoTexto);
         return 1;
      }
}

function adicionarCookie(){
   let username = cadastro.username.value
   let password = cadastro.password.value
   criarCookie(username, password, 1);
}

function criarCookie(username, password, dias){
   let data = new Date();
   data.setDate(data.getDate()+dias);
   let newCookie = `${username}=${password}; expires=${data.toUTCString()}`;
   document.cookie = newCookie;
}

function getCookie(){
   let username = cadastro.username.value

   checkCookies(username);
}

function checkCookies(username){
   let cookies = document.cookie
   let vetorCookies = cookies.split("; ")

   for(i=0; i<vetorCookies.length; i++){
      let cookie = vetorCookies[i].split('=');

      if(cookie[0] == username){
         return true;
      }
   }
   return false;
}

function checkDados(){
   let usuario = document.getElementsByName('username')[0].value.toLowerCase();
   let senha = document.getElementsByName('password')[0].value;


   for(let search in dados) {
      let aux = dados[search];
         if(aux.login != usuario && aux.senha != senha){
            alert("Dados incorretos. Tente Novamente!");
         }
   }
}

function addBorderError(campo){
   campo.classList.remove("certo")
   campo.classList.add("errado")
}

function addBorderSuccess(campo){
   campo.classList.remove("errado")
   campo.classList.add("certo")
}