function packageHandling(user, password) {
	return new Promise((resolve, reject) => {
		if (!user || !password) {
			reject('[userController] Invalid data');
		}
		resolve('Ok, package armed');

		var allUserData = {
			username: user,
			password: password,
			create: new Date(),
		};
		console.log(allUserData);
	});
}
module.exports = {
	package: packageHandling,
};
