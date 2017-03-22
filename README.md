# Forgetting map
A fixed size prioritised hash table, optimised for lookup.

# Usage
```python3
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


# Install
```bash
git clone <this repo> forgetting_map
cd forgetting_map
pip install .
```

# To Instal and run tests
```bash
git clone <this repo> forgetting_map
cd forgetting_map
pip install -e .[test]
nosetests
```
