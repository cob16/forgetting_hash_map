# Forgetting map
A fixed size prioritised hash table, optimised for lookup.

Implemented in Python 3 and Javascript

# Python

## Install
```bash
$ git clone https://github.com/cob16/forgetting_hash_map
$ cd forgetting_hash_map
$ pip install .
```

## Test
```bash
$ git clone https://github.com/cob16/forgetting_hash_map
$ cd forgetting_hash_map
$ pip install -e .[test]
$ nosetests
```

## Usage
```python
from forgetting_hash_map import ForgettingHash

# 2 is number is the max size the hash should be
fh = ForgettingHash(2)
# or add exsting elements
fh = ForgettingHash(2, {'one': 'foo', 'two': 'bar'})

# Returns the 'one' key
fh.find('one')

# This will add the one key and remove the two key as it was the least used
fh.add('three')
```

# Javascript

Written in Babel for ES6 support. To change transpilation  settings, see ```.babelrc```.

## Install
```bash
$ git clone https://github.com/cob16/forgetting_hash_map
$ cd forgetting_hash_map
$ npm install
```

## Test
```bash
$ git clone https://github.com/cob16/forgetting_hash_map
$ cd forgetting_hash_map
$ npm install
$ npm run test
```

Altrenatively, use ```npm run ci``` in your CI builds to produce code coverage and test result reports

## Usage
```javascript
import ForgettinghMap from 'src/forgettingMap.js';

const mapSize = 2;
let map = new ForgettingMap(mapSize);

map.addItem('key', 'value');

let item = map.findItem('key');
/**
 * item = {
 *   key: 'key',
 *   value: 'value,
 *   findCount: 1'
 * }
 */

map.addItem('lessUsedKey', 'lessUsedValue');
let evicted = map.addItem('newerKey', 'newerValue');
/**
 * evicted = {
 *   key: 'lessUsedKey',
 *   value: 'lessUsedValue',
 *   findCount: 0
 * }
 */
```
