const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');


//me traje el formulario completo y sus inputs

//expresiones regulares para los campos de los inputs guardados en un objeto
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
};

/*SEPTIMO CREAR el objeto CAMPOS representando
si un campo esta valido o no
al cargar la pagina TODOS LOS CAMPOS ESTAN COMO FALSE INVALIDOS
Y QUE APAREZCA EL CARTEL DE ERROR PORQUE NO SE COMPLETARON CORRECTAMENTE LOS
CAMPOS DEL FORMULARIO

QUEREMOS QUE CUANDO COMPLETEMOS CADA CAMPO Y LO COMPLETEMOS CADA CAMPO CAMBIE DE FALSE A TRUE

1° TENER CREADO EL OBJETO CAMPOS
2°EN LA FUNCION VALIDARCAMPO 
3° ACCEDER A CAMPOS Y SOBREESCRIBIR EL VALOR
4° y en las contraseñas tambien cobreescribir
*/

const campos={
	usuario:false,
	nombre:false,
	password:false,
	correo:false,
	telefono:false
}


/*TERCERO validando 
1°cada input debe tener un name propio para poder validar correctamente
2° esta funcion se va a ejecutar dentro del addeventlistener de inputs
3° por eso colocamos el parametro (e)
4° accaeder al e.target.name que seria "console.log(`esta escribiendo en el input : ${e.target.name}`) "- me devuelve en que input escribi
5° voy a usar switch para decir si el e.target.name es este, hace esto
6° comprobar que lo que el usuario escriba en cada input cumpla con las
	expresion regular que corresponda comparando lo que
	ingreso el usuario "e.target.value", la expresion y con test() lo comparo
7°  si la comparacion es correcta haz esto , sino haz esto otro--uso if
8°accedo al grupo__usuario, a la clase y agregar o remover clase correcta o incorrecta

	8.a-si es incorrecto acceder al id grupo__usuario, luego a su class y  agregar clase "formulario__grupo-incorrecto"

	8.b-si es correcto acceder al id grupo_-usuario, luego a su class y remover clase "formulario__grupo-incorrecto"
	8.c-si es correcto acceder al id grupo_-usuario, luego a su class y agregar clase "formulario__grupo-correcto"
	8.d-si es correcto acceder a la etiqueta i que esta dentro de grupo_-usuario y agregar la clase del chek  
	8.e-si es correcto acceder a la etiqueta i que esta dentro de grupo_-usuario y remover la clase fa-times-circle que es el circulo x 
	
	8.F-si es incorrecto acceder al id grupo_-usuario, luego a su class y remover clase "formulario__grupo-correcto"
	8.g-si es incorrecto acceder a la etiqueta i que esta dentro de grupo_-usuario y agregues la clase fa-times-circle que es el circulo x 
	8.h-si es incorrecto acceder a la etiqueta i que esta dentro de grupo_-usuario y remover la clase fa-check-circle 
	8.i-si es incorrecto acceder a la etiqueta de clase formulario_-input-incorrecto  que es el parrafo
			parrafo con el mensaje de error, le agrego activo y aparece , pero no se va
			para que se vaya  hacer lo mismo pero en lugar de add colocar remove al mensaje
	9° ahora deberia hacer lo mismo con cada campo o input, pero voy a crear una funcion: VALIDARCAMPO
	
	CORTO Y PEGO TODO ESTE CODIGO AHI!!

	luego de validar todos los campos me queda validar contraseña2

	que lo vamos a ahcer con otra funcion validarPASSWORD2
*/


const validarFormulario = (e)=>{
	switch(e.target.name){
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();			
		break;
		case "password2":
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
};


/*CUARTO PEGO ACA LO QUE HABIA HECHO EN VALIDAR FORMULARIO
PARA HACERLO MAS DINAMICO Y AHORRAR CODOGO

			if(expresiones.usuario.test(e.target.value)){
				document.getElementById('grupo__usuario').classList.remove('formulario__grupo-incorrecto');
				document.getElementById('grupo__usuario').classList.add('formulario__grupo-correcto');
				document.querySelector('#grupo__usuario i').classList.add('fa-check-circle');
				document.querySelector('#grupo__usuario i').classList.remove('fa-times-circle');
				document.querySelector('#grupo__usuario .formulario__input-error').classList.remove('formulario__input-error-activo');
			}else{
				document.getElementById('grupo__usuario').classList.add('formulario__grupo-incorrecto');
				document.getElementById('grupo__usuario').classList.remove('formulario__grupo-correcto');
				document.querySelector('#grupo__usuario i').classList.add('fa-times-circle');
				document.querySelector('#grupo__usuario i').classList.remove('fa-check-circle');
				document.querySelector('#grupo__usuario .formulario__input-error').classList.add('formulario__input-error-activo');
			}


2° en la funcion validarFormulario voy a llamar a esta funcion			
3° y hay un problema como reutilizar este codigo en todos los campos menos password que lo voy
a hacer de otra forma??

** hasta aca yo le puse como parametro que acceda a las expresiones de usuario y las compare con el valor ingresado
			por el usuario en el evento

4° pasare como parametro de esta funcion: expresion- input - campo
5° cambio los argumentos del if
6° si testees la expresion del valor de este input y es CORRECTA haz esto, SINO...
expresion: propiedades dentro de expresiones como usuario, nombre, etc
input: lo vamos a sacar del evento e.target
campo: por ejemplo le di 'usuario' en usuario para identificalo cuando lo llame con el evento
			o ponerle el e.target.name seria lo mismo
7°en la funcion validar Formulario le paso los parametros expresiones.usuario, e.target, 'usuario'
8° una vez que pasamos los parametros en la funcion VALIDARFORMULARIO
9° EL CAMPO VA A IR A REEMPLAZAR DE "grupo__usuario" usuario utilizando batics
*/
/*OCTAVO SOBRRESCRIBIR CAMPOS [campos (reemplazando a lo que quiero acceder  a xej "usuario")]
o sea que este campo es valido, else el cmpo es invalido
*/

const validarCampo =(expresion, input, campo)=>{
	
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo]=true;
	}else{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo]=false;
	}
}


/*QUINTO VALIDANDO Y COMPARANDO DOS CONTRASEÑAS
1°acceder a los dos inputs
2° preguntar si el valor de la 1° contraseña es diferente !==
a la 2° contraseña
3°es lo mismo que hicimos en validar campo
4°pero alreves
5°que pasa si cambio un valor en la primera contraseña me marca bien, como lo soluciono
6°ejecutando validarPassword2 tambien en case password1 en validarCampos
*/

const validarPassword2 = ()=>{
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){		
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password']=false;
	}else{
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password']=true;
	};
};



/*SEGUNDO comprobar cuando el usuario de un click adentro o afuera del input 
1°quiero que por cada input me ejecutes una funcion al hacer click dentro 
del input
2°lo voy a indicar con una funcion tipo flecha que se va a ejecutar por
cada uno de los inputs que demos click
3°le indico con el parametro INPUT para que sepa a cual aplicar la funcion
4°quiero que a cada input le agregue una funcion
5°y quiero comprobar que cada vez que presione un tecla cuando la levanto KEYUP se va a estar 
ejecutando un codigo
6°puedo poner una funcion de tipo flecha y ejecutarlo aca, crear una funcion por fuera y llamarla aca
7°cuando levante la tecla quiero que ejecutes esta funcion

*/

inputs.forEach((input) =>{
	input.addEventListener('keyup', validarFormulario); //dentro
	input.addEventListener('blur', validarFormulario);  //fuera

});


/*PRIMERO: boton enviar 
1°agregarle un evento SUBMIT al boton enviar
2°controlar el comporatmiento por default

*/

/*SEXTO AL PRESIONAR ENVIAR COMPROBAR QUE TODOS LOS CAMPOS ESTEN COMPLETOS Y CORRECTOS
1°comprobar que todos los campos esten correctos con un condicional
2° crear una CONSTANTE CAMPOS
3°una vez que cobreescribi valores en validar campos y contraseñas
4°y si todo es true entonces accedo a formulario y lo va a resetear con .reset
5°si terminos esta checkeado accediendo a el
6°que muestre el mensale de exito
7°agregar un settimeaout para remover la clase del mensaje de formulario enviado
8°quitar los iconos

*/

formulario.addEventListener('submit', (e) =>{
	e.preventDefault();

	const terminos = document.getElementById('terminos'); //me traigo el elemento por su id

	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		
		setTimeout(()=>{
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');

		},5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) =>{
			icono.classList.remove('formulario__grupo-correcto');
		});
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo')
	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo')
	}
});