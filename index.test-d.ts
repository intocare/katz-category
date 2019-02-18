import {expectType} from 'tsd-check';
import katzCategory from '.';

expectType<string>(katzCategory('11111111'));
expectType<string>(katzCategory('11111111', false));
expectType<string>(katzCategory('11111111', true));
