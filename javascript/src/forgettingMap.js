
export default class ForgettingMap {

  keyValueMap = {}; // key:value map
  keyCountMap = {}; // key:findCount map

  maxLength;

  /**
   * constructor - A "Forgetting" map that has a fixed length and forgets the least used items when full and a new item
   *               is added.
   *
   * @param  {Number}       maxLength    The max number of items the map will remember before things will start being
   *                                     forgotten
   * @param  {Object} [initialItems]     An object containing key:value pairs to initialise the map with. If the length
   *                                     of this object is larger than maxLength, or initialItems is not an object,
   *                                     an error will be thrown.
   * @throws {Error}                     Thrown when initialItems is set but not an object
   * @throws {Error}                     Thrown when initialItems has more key:value pairs than maxLength
   */
  constructor(maxLength, initialItems) {

    if (maxLength <= 0) {
      throw new Error('Expected maxLength to be greather than 0');
    };

    this.maxLength = maxLength;

    if (initialItems) {
      if (typeof initialItems !== 'object') {
        throw new TypeError('Expected initial items to be an object or falsy');
      }

      if (Object.keys(initialItems).length > maxLength) {
        throw new Error('InitialItems has more items in it than maxLength');
      }

      Object.keys(initialItems).forEach((key) => {
        this.addItem(key, initialItems[key]);
      });
    }

    this.setDecider();
  }

  addItem(key, value) {

    if (this.keyValueMap[key]) {
      // replace the existing key:value pair
      this.keyValueMap[key] = value;
      this.keyCountMap[key] = 0;
      return;
    }

    let removed;

    if (Object.keys(this.keyValueMap).length >= this.maxLength) {
      removed = this.removeLeastUsed();
    }

    this.keyValueMap[key] = value;
    this.keyCountMap[key] = 0;

    return removed;
  }

  removeItem(key) {

    if (!this.keyValueMap[key]) {
      return;
    }

    let removed = {
      key,
      value: this.keyValueMap[key],
      findCount: this.keyCountMap[key]
    };

    delete this.keyCountMap[key];
    delete this.keyValueMap[key];

    return removed;
  }

  findItem(key) {
    if (!this.keyValueMap[key]) {
      return;
    }

    return {
      key,
      value: this.keyValueMap[key],
      findCount: ++this.keyCountMap[key]
    };
  }

  removeLeastUsed() {

    let leastUsed = [];
    let leastUsedKeyCount = Infinity;

    Object.keys(this.keyCountMap).forEach((key) => {
      if (this.keyCountMap[key] < leastUsedKeyCount) {
        leastUsedKeyCount = this.keyCountMap[key];
        leastUsed = [{
          key,
          value: this.keyValueMap[key],
          findCount: leastUsedKeyCount
        }];
      } else if (this.keyCountMap[key] === leastUsedKeyCount) {
        leastUsed.push(key);
      }
    });

    if (leastUsed.length === 1) {
      return this.removeItem(leastUsed[0].key);
    } else if (leastUsed.length > 1) {
      let evictKey = this.decider(leastUsed);

      if (!this.keyValueMap.hasOwnProperty(evictKey)) {
        evictKey = leastUsed[0].key;
      }

      return this.removeItem(evictKey);
    }
  }

  setDecider(lambda) {
    this.decider = lambda || ((items) => items[0].key);
  }
}
