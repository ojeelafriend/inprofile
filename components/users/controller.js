const manager = require('./manager');

function registerUser(user, password) {
	return new Promise((resolve, reject) => {
		if (!user || !password) {
			reject('[userController] Invalid data');
		} else {
			resolve('[userController] Ok, in process...');
			const create = new Date();
			manager.register(user, password, create);
		}
	});
}

module.exports = {
	register: registerUser,
};
