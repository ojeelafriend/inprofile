const sendJson = require('../sendpackage/controller');
function packageHandling(user, password) {
	return new Promise((resolve, reject) => {
		if (!user || !password) {
			reject('[userController] Invalid data');
		}

		const allUserData = {
			username: user,
			password: password,
			create: new Date(),
		};

		resolve(() => {
			sendJson
				.push(allUserData)
				.then(() => {
					console.log('[Success] SEND JSON!');
				})
				.catch((e) => {
					console.error(e);
				});
			console.log(allUserData);
		});
	});
}
module.exports = {
	package: packageHandling,
};
