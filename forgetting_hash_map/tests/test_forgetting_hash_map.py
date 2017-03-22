from unittest import TestCase

from ..forgetting_hash_map import ForgettingHash


class TestForgettingHash(TestCase):
    def setUp(self):
        self.fh = ForgettingHash(2, {'one': 'foo', 'two': 'bar'})
        self.fh.find('one')
        self.fh.find('two')
        self.fh.find('two')

    def test_init(self):
        # expected use
        a = ForgettingHash(1, {'one': 1})
        self.assertEquals(a._map['one'], 1)
        ForgettingHash(999)

        # invalid use
        self.assertRaises(ValueError, ForgettingHash, -1)
        self.assertRaises(ValueError, ForgettingHash, 0, {'one': 1})

    def test_find(self):
        self.assertEquals(self.fh._popularity['one'], 1)
        self.assertEquals(self.fh._popularity['two'], 2)

        self.assertTrue(self.fh.find('THIS IS NOT A VALID FIND') is None)

        self.assertEquals(self.fh.find('two'), 'bar')

    def test_add(self):
        #check for noop when content is the same
        self.fh.add('one', 'foo')
        self.assertEquals(self.fh._popularity['one'], 1)
        self.assertTrue('one' in self.fh._map and 'two' in self.fh._map)

        # check popularity set to 0 when key is the same
        self.fh.add('one', 'bam!')
        self.assertEquals(self.fh._popularity['one'], 0)

        # check key is removed on hash overflow
        self.fh.add('three', 'foobar')
        self.assertEquals(self.fh._popularity['three'], 0)
        self.assertEquals(self.fh._map['three'], 'foobar')
        self.assertFalse('one' in self.fh._map)
