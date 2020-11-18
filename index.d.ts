export type Category = 'O' | 'A' | 'B' | 'C' | 'D' | 'CD';

declare const katzCategory: {
	/**
	 * Calculate the category based on the KATZ score.
	 *
	 * @param score - An 8-digit string respresenting the KATZ score.
	 * @returns The KATZ category.
	 */
	(score: string): Category;

	/**
	 * Calculate the category based on the KATZ score and the dementia parameter.
	 *
	 * @param score - An 8-digit string respresenting the KATZ score.
	 * @param dementia - Flag to indicate whether dementia should be taken into account.
	 * @returns The KATZ category.
	 */
	(score: string, dementia: boolean): Category;
};

export default katzCategory;
