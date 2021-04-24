const manager = require('./manager');
function registerUser(user, password) {
	return new Promise(async (resolve, reject) => {
		if (!user || !password) {
			reject('[userController] Invalid data');
		} else {
			resolve('[userController] Ok, in process...');
			let create = new Date();
			await manager
				.store(user, password, create, 'add')
				.then((result) => {
					console.log('recibido' + result);
				})
				.catch((e) => {
					console.error(e);
				});
		}
	});
}

function authUser(user, password) {
	return new Promise((resolve, reject) => {
		if ((!user, !password)) {
			reject('Sorry man ;)');
		} else {
			resolve('Ok, authentication in process, wait...');
			manager.store(user, password, ' ', 'check');
		}
	});
}
module.exports = {
	register: registerUser,
	auth: authUser,
};
