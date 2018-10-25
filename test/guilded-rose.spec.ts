import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  describe('goods quality', function () {
    const gildedRose = new GildedRose([
      new Item('Milk', 5, 10),
      new Item('Milk', 0, 5)
    ]);
    const items = gildedRose.updateQuality();
    it('should degrade as they approach the sell date', function() {
      expect(items[0].quality).to.equal(9);
    });
    it('should degrade twice as fast once the sell by date has passed', function() {
      expect(items[1].quality).to.equal(3);
    });
  });
});