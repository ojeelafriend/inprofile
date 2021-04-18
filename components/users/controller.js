const ffi_exports = require('ffi-napi');

function packageHandling(user, password) {
	return new Promise((resolve, reject) => {
		if (!user || !password) {
			reject('[userController] Invalid data');
		}
		resolve('Ok, package armed');
		const create = new Date();
		const mathLibrary = new ffi_exports.Library('../../Source/Users/bin/Debug/x64/Users.dll', {
			AddUser: ['string', ['string', 'string', 'string']],
		});
		const details = mathLibrary.AddUser(`${user}`, `${password}`, `${create}`);
		console.log(details);
	});
}

module.exports = {
	package: packageHandling,
};
