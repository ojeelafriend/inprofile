const net = require('net');
//-------------------------------------------------------------
var client = new net.Socket();
//Establecer key futuramente para trabajar con el protocolo TCP

function connection(port, host) {
	client.connect(`${port}`, `${host}`, () => {
		console.log('[manager] Connected');
	});

	client.on('close', () => {
		console.log('[manager] Connection closed');
	});

	client.on('error', (error) => {
		//charlar el manejador de errores para mayor comodidad en el test
		console.error('[serverReturn] ', error);
	});
}

function sendRegister(user, password, create) {
	connection('3000', '127.0.0.1');
	client.write(user + ',' + password + ',' + create + ',' + 'add');
	client.on('data', (data) => {
		console.log(' ', data);
	});
}

function authUser(user, password) {
	connection('3000', '127.0.0.1');
	client.write(user + ',' + password + ',' + 'check');
	client.on('data', (data) => {
		//falta retornos al controller y network
		console.log('[serverReturn]', data);
	});
}

/*let create = new Date();
let client = new net.Socket();
client.connect(3000, '127.0.0.1', function () {
	client.write(user + ',' + password + ',' + create + ',' + 'add');
});
client.on('data', function (data) {
	console.log(' ' + data);
});*/

module.exports = {
	register: sendRegister,
	login: authUser,
};
