const net = require('net');
//-------------------------------------------------------------
//Establecer key futuramente para trabajar con el protocolo TCP

function authAndRegister(user, password, create, action) {
	return new Promise(async (resolve, reject) => {
		var client = new net.Socket();
		client.connect(3000, '127.0.0.1', () => {
			client.write(user + ',' + password + ',' + create + ',' + action);
		});
		//devuelve el dato al controlador, pero al ser síncrono, no captura las validaciones.
		client.on('data', (data) => {
			console.log('[serverReturn] ' + data);
			resolve(data);
		});

		client.on('error', (error) => {
			reject('[serverReturn] ERROR: ' + error);
		});

		client.on('close', () => {
			console.log('[serverReturn] Connection close');
			client.destroy();
		});
	});
}

module.exports = {
	store: authAndRegister,
};
