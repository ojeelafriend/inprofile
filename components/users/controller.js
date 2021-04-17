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

		resolve(allUserData);
		$.ajax({
			method: 'POST',
			url: '../../src/src/WebForm1.aspx/Login',
			data: JSON.stringify(objUsuario),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
		})
			.done((details) => {
				console.log(details);
			})
			.catch((e) => {
				console.error('error ajax: ', e);
			});
	});
}
module.exports = {
	package: packageHandling,
};
