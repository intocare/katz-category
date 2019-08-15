# katz-category [![Build Status](https://travis-ci.com/intocare/katz-category.svg?branch=master)](https://travis-ci.com/intocare/katz-category) [![codecov](https://codecov.io/gh/intocare/katz-category/badge.svg?branch=master)](https://codecov.io/gh/intocare/katz-category?branch=master)

> Calculate the katz category based on the score


## Install

```
$ npm install @intocare/katz-category
```


## Usage

```js
const katzCategory = require('@intocare/katz-category');

katzCategory('33111111');
//=> 'A'

katzCategory('33333111', true);
//=> 'CD'
```


## API

### katzCategory(score, [dementia])

#### score

Type: `string`

A 6 or 8-digit string respresenting the KATZ score.

#### dementia

Type: `boolean`<br>
Default: `false`

Flag to indicate whether dementia should be taken into account.


## License

MIT © [Sam Verschueren](https://into.care)
