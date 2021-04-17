function getPackage(key) {}

function pushPackage(data) {
	return new Promise((resolve, reject) => {
		if (!data) {
			reject('[Push failed]: void package');
		}
		resolve(() => {
			$.ajax({
				method: 'POST',
				url: '',
				data: JSON.stringify(data),
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
			}).done((details) => {
				console.log(details);
			});
		});
	});
}

module.exports = {
	getPackage: getPackage,
	push: pushPackage,
};
