'use strict';

const getBasicCategory = score => {
	if (score.length === 6) {
		score += '11';
	}

	if (!/^\d{8}$/.test(score)) {
		throw new Error('Provided score should be numeric and have 6 or 8 digits.');
	}

	const r = score.split('').map(x => Number.parseInt(x, 10));

	const [washing, clothing, transfers, toilet, continence, meal, time, space] = r;

	const washingAndClothing = washing >= 3 && clothing >= 3;
	const washingOrClothing = washing >= 3 || clothing >= 3;
	const timeAndSpace = time >= 3 && space >= 3;

	if (
		washingAndClothing &&
		timeAndSpace &&
		continence >= 3 &&
		(transfers >= 3 || toilet >= 3 || meal >= 3)
	) {
		return 'Cd';
	}

	if (washingAndClothing && transfers >= 3 && toilet >= 3 && (continence >= 3 || meal >= 3)) {
		return 'C';
	}

	if (washingAndClothing && (transfers >= 3 || toilet >= 3 || timeAndSpace)) {
		return 'B';
	}

	if (washingOrClothing) {
		if (timeAndSpace) {
			return 'B';
		}

		return 'A';
	}

	if (timeAndSpace) {
		return 'A';
	}

	return 'O';
};

const isIncontinent = score => {
	const toilet = score.charAt(3);

	return toilet >= 3;
};

const isIncontinentAndNeedHelpsWithTransferFoodOrToilet = score => {
	// eslint-disable-next-line no-unused-vars
	const [washing, clothing, transfers, toilet, continence, meal, time, space] = score;

	return (continence >= 3 && (transfers >= 3 || meal >= 3 || toilet >= 3));
};

const getCategoryForOBed = (bedType, dementia, palliative) => {
	if (bedType === 'RVT') {
		throw new Error('O score cannot be placed in RVT bed');
	}

	if (bedType === 'DVC' && !dementia) {
		throw new Error('O score cannot be placed in DVC bed if no dementia diagnosis exists');
	}

	if (bedType === 'DVC' && dementia) {
		return palliative ? 'Fp' : 'D';
	}

	// ROB+CVK checks
	return dementia ? 'D' : 'O';
};

const getCategoryForABed = (score, bedType, dementia, palliative) => {
	if (bedType === 'DVC' && !dementia) {
		throw new Error('A score cannot be placed in DVC bed if no dementia diagnosis exists');
	}

	if (bedType === 'DVC' && dementia) {
		return palliative ? 'Fp' : 'D';
	}

	const isIncontinentAndNeedsExtraHelp = isIncontinentAndNeedHelpsWithTransferFoodOrToilet(score);
	if (bedType === 'RVT') {
		if (!dementia || !isIncontinentAndNeedsExtraHelp) {
			throw new Error('A score cannot be placed in RVT bed if no dementia diagnosis exists or incontinence and additional help');
		}

		return 'Cd';
	}

	// ROB+CVK checks
	if (!dementia) {
		return 'A';
	}

	return isIncontinentAndNeedsExtraHelp ? 'Cd' : 'D';
};

const getCategoryForBBed = (score, bedType, dementia, palliative) => {
	if (bedType === 'DVC') {
		if (palliative) {
			return 'Fp';
		}

		return dementia ? 'D' : 'F';
	}

	const isIncontinentAndNeedsExtraHelp = isIncontinentAndNeedHelpsWithTransferFoodOrToilet(score);
	if (bedType === 'RVT') {
		if (!dementia) {
			return 'B';
		}

		return isIncontinentAndNeedsExtraHelp ? 'Cd' : 'B';
	}

	// ROB+CVK checks
	if (!dementia) {
		return 'B';
	}

	return isIncontinentAndNeedsExtraHelp ? 'Cd' : 'D';
};

const getCategoryForCBed = (score, bedType, dementia, palliative) => {
	if (bedType === 'DVC') {
		if (palliative) {
			return 'Fp';
		}

		return dementia ? 'D' : 'F';
	}

	// ROB+CVK+RVT checks
	if (!dementia) {
		return 'C';
	}

	return isIncontinent(score) ? 'Cd' : 'D';
};

const getCategoryForCdBed = (bedType, dementia, palliative) => {
	if (bedType === 'DVC') {
		if (palliative) {
			return 'Fp';
		}

		return dementia ? 'D' : 'F';
	}

	return 'Cd';
};

const getCategory = (score, bedType, dementia = false, palliative = false) => {
	const basicCategory = getBasicCategory(score);

	if (bedType && bedType.toUpperCase() === 'NO') {
		return basicCategory;
	}

	switch (basicCategory) {
		case 'A':
			return getCategoryForABed(score, bedType, dementia, palliative);
		case 'B':
			return getCategoryForBBed(score, bedType, dementia, palliative);
		case 'C':
			return getCategoryForCBed(score, bedType, dementia, palliative);
		case 'Cd':
			return getCategoryForCdBed(bedType, dementia, palliative);
		case 'O':
			return getCategoryForOBed(bedType, dementia, palliative);
		default:
			return basicCategory;
	}
};

module.exports = getCategory;
module.exports.default = getCategory;
