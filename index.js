'use strict';

const getCategory = (score, dementia) => {
	if (score.length !== 8) {
		return;
	}

	const r = score.split('').map(x => parseInt(x, 10));

	const [washing, clothing, transfers, toilet, continence, meal, time, space] = r;

	const washingAndClothing = washing >= 3 && clothing >= 3;
	const washingOrClothing = washing >= 3 || clothing >= 3;
	const timeAndSpace = time >= 3 && space >= 3;

	if (
		washingAndClothing &&
		(timeAndSpace || dementia) &&
		continence >= 3 &&
		(transfers >= 3 || toilet >= 3 || meal >= 3)
	) {
		return 'CD';
	}

	if (washingAndClothing && transfers >= 3 && toilet >= 3 && (continence >= 3 || meal >= 3)) {
		if (dementia) {
			return 'CD';
		}

		return 'C';
	}

	if (washingAndClothing && (transfers >= 3 || toilet >= 3 || timeAndSpace)) {
		if (dementia) {
			return 'D';
		}

		return 'B';
	}

	if (washingOrClothing && !dementia) {
		if (timeAndSpace) {
			return 'B';
		}

		return 'A';
	}

	if (dementia) {
		return 'D';
	}

	return 'O';
};

module.exports = getCategory;
module.exports.default = getCategory;
