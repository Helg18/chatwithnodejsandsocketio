// client/main.js

// Inicializar componentes de Materialize cuando el documento esté listo
$(document).ready(function () {
	$('select').material_select();

	// Conectarse al servidor de Socket.IO
	var socket = io();

	// Manejar conexión
	socket.on('connect', function () {
		console.log('Conectado al servidor');
		Materialize.toast('Conectado al chat', 2000);
	});

	// Manejar desconexión
	socket.on('disconnect', function () {
		console.log('Desconectado del servidor');
		Materialize.toast('Desconectado del chat', 2000);
	});

	// Recibir mensajes
	socket.on('messages', function (messages) {
		var messagesContainer = document.getElementById('messages');
		messagesContainer.innerHTML = '';

		// Recorriendo el arreglo de mensajes
		messages.forEach(function (message) {
			// creando un nuevo elemento div para agregar el contenido de los mensajes
			var messageElement = document.createElement('div');
			messageElement.innerHTML = '<strong>' + message.nickname + ':</strong> ' + message.text;
			messageElement.className = 'message';

			// Agregando el hijo al contenedor de mensajes
			messagesContainer.appendChild(messageElement);
		});

		// Scroll al final de los mensajes
		messagesContainer.scrollTop = messagesContainer.scrollHeight;
	});

	// Enviar mensaje
	document.getElementById('message-form').addEventListener('submit', function (e) {
		e.preventDefault();

		var messageInput = document.getElementById('message-input');
		var nicknameInput = document.getElementById('nickname-input');

		// Validando que no se envien campos vacios
		if (messageInput.value && nicknameInput.value) {

			// Enviando mensajes al socket
			socket.emit('add-msg', {
				text: messageInput.value,
				nickname: nicknameInput.value
			});

			// Borrar el campo de mensaje
			messageInput.value = '';

			// Mantener el foco en el campo de mensaje
			messageInput.focus();
		} else {
			Materialize.toast('Por favor, completa ambos campos', 2000);
		}
	});
});