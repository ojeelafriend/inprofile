function packageHandling(user, password) {
	return new Promise((resolve, reject) => {
		if (!user || !password) {
			reject('[userController] Invalid data');
		}

		const allUserData = {
			objUsuario: {
				username: user,
				password: password,
				create: new Date(),
			},
		};
		
			const ffi = require('ffi-napi');
			const mathLibrary  = new ffi.Library('../../Source/Debug/x64/Users', {
				"AddUser": [
						"string", ["string", "string", "string"]
			],
			});
			console.log(mathLibrary.AddUser("datos", "datos", "datos"));

			

	});

	
module.exports = {
	package: packageHandling,
};
