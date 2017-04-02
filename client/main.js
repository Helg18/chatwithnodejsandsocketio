$('#messages').height('300px');

//establishing the conection
var socket = io.connect('http://52.18.22.122:8000', {'forceNew':true});
						//change this url to YOUR SERVER  URL

//listener for messages
socket.on('messages', function(data){
	writer(data);
});


//runner for display data on chat box
function writer(data){

	//Var to customize messages
	var my_nickname = $('#name_user').val();
	var my_messages = '';
	var my_color    = 'blue-grey darken-1';


	var html = data.map(function(message, index){
		if (message.nickname == my_nickname) {
			my_messages = 'offset-s4 offset-m4 offset-l4';
			my_color    = 'green darken-4';
		}

		return (`
			<div class="col s8 m8 l8 ${my_messages}"">
				<div class="card ${my_color}">
					<div class="card-content white-text">
						<span class="card-title"> ${message.nickname}</span>
						<p>${message.text}</p>
					</div>
				</div>
			</div> 
			`);
	});
	$("#messages").html(html);
	document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;

}

//catpch the event when user
function addmsg(e){

	//prepare object to send it.
	var msg = {
		nickname: $('#name_user').val(),
		text: $('#new_message').val(),
	};

	//sending the new msg to server with flag 'add-msg'
	socket.emit('add-msg', msg);

	//clean input text
	$('#new_message').val('');

	//hidden the name user
	$('#name_user').hide();
	return false;
}	
