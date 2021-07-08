import {expectType} from 'tsd';
import katzCategory, {Category} from '.';

expectType<Category>(katzCategory('11111111'));
expectType<Category>(katzCategory('11111111', 'RVT', false, false));
expectType<Category>(katzCategory('11111111', 'ROB', true, false));
