function getPackage(key) {}

function pushPackage(data) {
	return new Promise((resolve, reject) => {
		if (!data) {
			reject('[Push failed]: void package');
		}
		resolve('resolved');
	});
}

module.exports = {
	getPackage: getPackage,
	push: pushPackage,
};
