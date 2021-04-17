function packageHandling(user, password) {
	return new Promise((resolve, reject) => {
		if (!user || !password) {
			reject('[messageController] Invalid data');
		}

		const allUserData = {
			user: user,
			pass: password,
			create: new Date(),
		};
		resolve('Send package');
		console.log(allUserData);
	});
}
module.exports = {
	package: packageHandling,
};
