class ForgettingHash:
    """A fixed size hash that deletes the least used elements when full

    Value is refereed to as 'content'
    """

    def __init__(self, max_len, items=None):  # type: int, list
        self._max_len = max_len

        if not items:
            items = {}

        if len(items) > max_len:
            raise ValueError('There are more items ({}) given then the max_len ({})'.format(len(items), max_len))

        self._map = dict(items)
        # this shows the usage of a key
        self._popularity = dict.fromkeys(items.keys(), 0)

    def add(self, key, content=None):
        """Adds a key value pair ot the map.

        Will reset usage counter if the content is changed on a existing map
        """

        if key in self._map and self._map.get(key) is content:
            return  # do nothing as this key already exists with the same value
        elif len(self._map) >= self._max_len:
                self.delete_least_used()

        self._map[key] = content
        self._popularity[key] = 0

    def find(self, key):
        """gets the value of a key from the map"""
        content = self._map.get(key, None)
        if content:
            self._popularity[key] += 1

        return content

    def delete_least_used(self):
        """Removes the lest used key-value pair"""
        key = min(self._popularity, key=self._popularity.get)  # returns the name of the key with least uses
        del self._map[key]
        del self._popularity[key]