import ForgettingMap from '../src/forgettingMap.js';

describe('Forgetting Map', () => {

  describe('constructor', () => {

    it('should take a positive max length', () => {

      expect(() => {
        new ForgettingMap(5);
      }).not.toThrow();

      expect(() => {
        new ForgettingMap(0);
      }).toThrow(new Error('Expected maxLength to be greather than 0'));

      expect(() => {
        new ForgettingMap(-1);
      }).toThrow(new Error('Expected maxLength to be greather than 0'));

    });

    it('should take an initial object', () => {

      expect(() => {
        new ForgettingMap(5, {foo: 'bar', things: 'awesome'});
      }).not.toThrow();

      expect(() => {
        new ForgettingMap(1, {foo: 'bar', things: 'awesome'});
      }).toThrow(new Error('InitialItems has more items in it than maxLength'));

      expect(() => {
        new ForgettingMap(5, 'Not An Object');
      }).toThrow(new TypeError('Expected initial items to be an object or falsy'));
    });

  });

  describe('addKey', () => {

    it('should add keys to non full list', () => {

      let fm = new ForgettingMap(5, {foo: 'bar'});

      let evicted = fm.addItem('things', {awesome: true});

      expect(evicted).toBe(undefined);

    });

    it('should add keys to a full list', () => {

      let fm = new ForgettingMap(1, {foo: 'bar'});

      let evicted = fm.addItem('things', {awesome: true});

      expect(evicted).toEqual(jasmine.objectContaining({key: 'foo', value: 'bar', findCount: 0}));

    });

    it('should replace key that already exists', () => {

      let fm = new ForgettingMap(1, {foo: 'bar'});

      fm.keyCountMap['foo'] = 4;

      let evicted = fm.addItem('foo', 'awesome');

      expect(evicted).toEqual(undefined);
      expect(fm.keyCountMap['foo']).toEqual(0);
      expect(fm.keyValueMap['foo']).toEqual('awesome');
    });

  });

  describe('removeKey', () => {

    it('should remove existing keys', () => {
      let fm = new ForgettingMap(5, {foo: 'bar'});

      let evicted = fm.removeItem('foo');

      expect(evicted).toEqual(jasmine.objectContaining({
        key: 'foo',
        value: 'bar',
        findCount: 0
      }));
    });

    it('should remove non existing key', () => {

      let fm = new ForgettingMap(5, {foo: 'bar'});

      let evicted = fm.removeItem('nonExistant');

      expect(evicted).toEqual(undefined);

    });
  });

  describe('findKey', () => {

    it('should find existing key', () => {

      let fm = new ForgettingMap(5, {foo: 'bar'});

      expect(fm.findItem('foo')).toEqual(jasmine.objectContaining({
        key: 'foo',
        value: 'bar',
        findCount: 1
      }));
    });

    it('should not find non-existing keys', () => {

      let fm = new ForgettingMap(5, {foo: 'bar'});

      expect(fm.findItem('nonExistant')).toEqual(undefined);
      expect(fm.keyCountMap['nonExistant']).toEqual(undefined);
    });

  });

  describe('removeLeastUsed', () => {

    it('should remove least used key', () => {

      let fm = new ForgettingMap(5, {foo: 'bar', things: 'awesome'});

      for (let i = 0; i < 10; i++) {
        fm.findItem('things');
      }

      expect(fm.removeLeastUsed()).toEqual(jasmine.objectContaining({key: 'foo', value: 'bar', findCount: 0}));

    });

    it('should not remove non existant', () => {

      let fm = new ForgettingMap(5);

      expect(fm.removeLeastUsed()).toEqual(undefined);

    });

  });

});
