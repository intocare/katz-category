import test from 'ava';
import katzCategory from '.';

test('should return undefined if score is not equal to 8', t => {
	t.is(katzCategory('11'), undefined);
});

test('should detect category O', t => {
	t.is(katzCategory('11111111'), 'O');
	t.is(katzCategory('11222222'), 'O');
	t.is(katzCategory('11333333'), 'O');
	t.is(katzCategory('11444444'), 'O');
	t.is(katzCategory('22222222'), 'O');
	t.is(katzCategory('22333333'), 'O');
	t.is(katzCategory('22444444'), 'O');
	t.is(katzCategory('11242424'), 'O');
	t.is(katzCategory('22343434'), 'O');
});

test('should detect category D when category O with dementia', t => {
	t.is(katzCategory('11111111', true), 'D');
	t.is(katzCategory('11222222', true), 'D');
	t.is(katzCategory('11333333', true), 'D');
	t.is(katzCategory('11444444', true), 'D');
	t.is(katzCategory('22222222', true), 'D');
	t.is(katzCategory('22333333', true), 'D');
	t.is(katzCategory('22444444', true), 'D');
	t.is(katzCategory('11242424', true), 'D');
	t.is(katzCategory('22343434', true), 'D');
});

test('should detect category A', t => {
	t.is(katzCategory('33111111'), 'A');
	t.is(katzCategory('33121212'), 'A');
	t.is(katzCategory('33222222'), 'A');
});

test('shoetect category D when category A with dementia', t => {
	t.is(katzCategory('33111111', true), 'D');
	t.is(katzCategory('33121212', true), 'D');
	t.is(katzCategory('33222222', true), 'D');
});

test('should detect category B which are physically dependent', t => {
	t.is(katzCategory('33311111'), 'B');
	t.is(katzCategory('33411111'), 'B');
	t.is(katzCategory('33131111'), 'B');
	t.is(katzCategory('33141111'), 'B');
});

test('should detect category B which are mentally dependent', t => {
	t.is(katzCategory('33111133'), 'B');
	t.is(katzCategory('33111144'), 'B');
	t.is(katzCategory('32112233'), 'B');
	t.is(katzCategory('23112243'), 'B');
});

test('should detect category D when category B with dementia', t => {
	t.is(katzCategory('33311111', true), 'D');
	t.is(katzCategory('33411111', true), 'D');
	t.is(katzCategory('33131111', true), 'D');
	t.is(katzCategory('33141111', true), 'D');
	t.is(katzCategory('33111133', true), 'D');
	t.is(katzCategory('33111144', true), 'D');
	t.is(katzCategory('23112243', true), 'D');
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

test('should detect category CD when C with dementia', t => {
	t.is(katzCategory('33333111', true), 'CD');
	t.is(katzCategory('33331311', true), 'CD');
	t.is(katzCategory('33433111', true), 'CD');
	t.is(katzCategory('33431311', true), 'CD');
	t.is(katzCategory('33343111', true), 'CD');
	t.is(katzCategory('33341311', true), 'CD');
	t.is(katzCategory('33334111', true), 'CD');
	t.is(katzCategory('33331411', true), 'CD');
	t.is(katzCategory('33333222', true), 'CD');
	t.is(katzCategory('33332322', true), 'CD');
	t.is(katzCategory('33333311', true), 'CD');
});

test('should detect category CD', t => {
	t.is(katzCategory('33313133'), 'CD');
	t.is(katzCategory('33133133'), 'CD');
	t.is(katzCategory('33113333'), 'CD');
	t.is(katzCategory('33313111', true), 'CD');
	t.is(katzCategory('33133111', true), 'CD');
	t.is(katzCategory('33113311', true), 'CD');
});
