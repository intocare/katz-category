export type Category = 'O' | 'A' | 'B' | 'C' | 'D' | 'CD';
export type BedType = 'ROB' | 'RVT' | 'CVK' | 'DVC' | 'NO';

declare const katzCategory: {
	/**
	 * Calculate the category based on the KATZ score.
	 *
	 * @param score - An 8-digit string respresenting the KATZ score.
	 * @returns The KATZ category.
	 */
	(score: string): Category;

	/**
	 * Calculate the category based on the KATZ score, bedtype and the dementia parameter.
	 *
	 * @param score - An 8-digit string respresenting the KATZ score.
	 * @param bedType - Bedtype that should be taken into account.
	 * @param dementia - Flag to indicate whether dementia should be taken into account.
	 * @param palliative - Flag to indicate if the score
	 * @returns The KATZ category.
	 */
	(score: string, bedType: BedType, dementia: boolean, palliative: boolean): Category;
};

export default katzCategory;
