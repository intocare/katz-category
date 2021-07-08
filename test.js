'use strict';
const test = require('ava');
const katzCategory = require('.');

test('should throw error if score is not numeric or is not equal to 6 or 8 digits', t => {
	t.throws(() => katzCategory('11'), {
		message: 'Provided score should be numeric and have 6 or 8 digits.'
	});
	t.throws(() => katzCategory('1111111'), {
		message: 'Provided score should be numeric and have 6 or 8 digits.'
	});
	t.throws(() => katzCategory('1111111a'), {
		message: 'Provided score should be numeric and have 6 or 8 digits.'
	});
});

test('should set time and space to 1 if not provided', t => {
	t.is(katzCategory('111111'), 'O');
	t.is(katzCategory('333111'), 'B');
});

test('should detect category O', t => {
	t.is(katzCategory('11111111'), 'O');
	t.is(katzCategory('11222222'), 'O');
	t.is(katzCategory('22222222'), 'O');
	t.is(katzCategory('11242424'), 'O');
});

test('should detect category A when physically dependent', t => {
	t.is(katzCategory('33111111'), 'A');
	t.is(katzCategory('33121212'), 'A');
	t.is(katzCategory('33222222'), 'A');
});

test('should detect category A when psychologically dependent', t => {
	t.is(katzCategory('22343434'), 'A');
	t.is(katzCategory('22333333'), 'A');
	t.is(katzCategory('22444444'), 'A');
	t.is(katzCategory('11333333'), 'A');
	t.is(katzCategory('11444444'), 'A');
});

test('should detect category B which are physically dependent', t => {
	t.is(katzCategory('33311111'), 'B');
	t.is(katzCategory('33411111'), 'B');
	t.is(katzCategory('33131111'), 'B');
	t.is(katzCategory('33141111'), 'B');
	t.is(katzCategory('33331111'), 'B');
});

test('should detect category B which are mentally dependent', t => {
	t.is(katzCategory('33111133'), 'B');
	t.is(katzCategory('33111144'), 'B');
	t.is(katzCategory('32112233'), 'B');
	t.is(katzCategory('23112243'), 'B');
});

test('should detect category C', t => {
	t.is(katzCategory('33333111'), 'C');
	t.is(katzCategory('33331311'), 'C');
	t.is(katzCategory('33433111'), 'C');
	t.is(katzCategory('33431311'), 'C');
	t.is(katzCategory('33343111'), 'C');
	t.is(katzCategory('33341311'), 'C');
	t.is(katzCategory('33334111'), 'C');
	t.is(katzCategory('33331411'), 'C');
	t.is(katzCategory('33333222'), 'C');
	t.is(katzCategory('33332322'), 'C');
	t.is(katzCategory('33333311'), 'C');
});

test('should detect category CD', t => {
	t.is(katzCategory('33313133'), 'Cd');
	t.is(katzCategory('33133133'), 'Cd');
	t.is(katzCategory('33113333'), 'Cd');
});

test('classification of O scores', t => {
	t.is(katzCategory('11222222', 'ROB'), 'O');
	t.is(katzCategory('11222222', 'ROB', true), 'D');

	t.throws(() => katzCategory('11222222', 'RVT'), {
		message: 'O score cannot be placed in RVT bed'
	});
	t.throws(() => katzCategory('11222222', 'RVT', true), {
		message: 'O score cannot be placed in RVT bed'
	});

	t.is(katzCategory('11222222', 'DVC', true, false), 'D');
	t.is(katzCategory('11222222', 'DVC', true, true), 'Fp');
	t.throws(() => katzCategory('11222222', 'DVC', false), {
		message: 'O score cannot be placed in DVC bed if no dementia diagnosis exists'
	});
});

test('classification of A scores', t => {
	t.is(katzCategory('33111111', 'ROB'), 'A');
	t.is(katzCategory('33111111', 'ROB', true), 'D');

	t.throws(() => katzCategory('33111111', 'RVT'), {
		message: 'A score cannot be placed in RVT bed if no dementia diagnosis exists or incontinence and additional help'
	});

	t.throws(() => katzCategory('33111111', 'RVT', true), {
		message: 'A score cannot be placed in RVT bed if no dementia diagnosis exists or incontinence and additional help'
	});

	t.is(katzCategory('33111111', 'DVC', true, false), 'D');
	t.is(katzCategory('33111111', 'DVC', true, true), 'Fp');
	t.throws(() => katzCategory('33111111', 'DVC', false), {
		message: 'A score cannot be placed in DVC bed if no dementia diagnosis exists'
	});
});

test('classification of B scores', t => {
	t.is(katzCategory('33331111', 'ROB'), 'B');
	t.is(katzCategory('33331111', 'ROB', true), 'D');

	t.is(katzCategory('33331111', 'RVT'), 'B');
	t.is(katzCategory('33331111', 'RVT', true), 'B');

	t.is(katzCategory('33331111', 'DVC', true, false), 'D');
	t.is(katzCategory('33331111', 'DVC', true, true), 'Fp');
	t.is(katzCategory('33331111', 'DVC', false, false), 'F');
	t.is(katzCategory('33331111', 'DVC', false, true), 'Fp');
});

test('classification of C scores', t => {
	t.is(katzCategory('33333111', 'ROB'), 'C');
	t.is(katzCategory('33333111', 'ROB', true), 'Cd');

	t.is(katzCategory('33333111', 'RVT'), 'C');
	t.is(katzCategory('33333111', 'RVT', true), 'Cd');

	t.is(katzCategory('33333111', 'DVC', true, false), 'D');
	t.is(katzCategory('33333111', 'DVC', true, true), 'Fp');
	t.is(katzCategory('33333111', 'DVC', false, false), 'F');
	t.is(katzCategory('33333111', 'DVC', false, true), 'Fp');
});

test('classification of Cd scores', t => {
	t.is(katzCategory('33133133', 'ROB'), 'Cd');
	t.is(katzCategory('33133133', 'ROB', true), 'Cd');

	t.is(katzCategory('33133133', 'RVT'), 'Cd');
	t.is(katzCategory('33133133', 'RVT', true), 'Cd');

	t.is(katzCategory('33133133', 'DVC'), 'F');
	t.is(katzCategory('33133133', 'DVC', true), 'D');
	t.is(katzCategory('33133133', 'DVC', false, true), 'Fp');
	t.is(katzCategory('33133133', 'DVC', true, true), 'Fp');
});

test('ROL-189 issue where we use to classify this as a D so it could not be a RVT resident', t => {
	t.is(katzCategory('33142144', 'RVT', true), 'B');
	t.is(katzCategory('33142144', 'ROB', true), 'D');
	t.is(katzCategory('33222244', 'RVT', true), 'B');
	t.is(katzCategory('33222244', 'ROB', true), 'D');
});

test('classification of NO beds', t => {
	t.is(katzCategory('11242424', 'NO'), 'O');
	t.is(katzCategory('33111111', 'NO'), 'A');
	t.is(katzCategory('33311111', 'NO'), 'B');
	t.is(katzCategory('33333111', 'NO'), 'C');
	t.is(katzCategory('33142144', 'NO'), 'B');
	t.is(katzCategory('33142144', 'NO'), 'B');
	t.is(katzCategory('33142144', 'NO'), 'B');
	t.is(katzCategory('33142144', 'NO'), 'B');
});
