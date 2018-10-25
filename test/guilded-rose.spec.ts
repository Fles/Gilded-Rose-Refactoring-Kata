import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
  describe('goods quality', function () {
    const gildedRose = new GildedRose([
      new Item('Milk', 5, 10),
      new Item('Milk', 0, 5),
      new Item('Milk', 0, 0),
      new Item('Milk', 5, 60),
      new Item('Milk', 0, 60),
    ]);
    const items = gildedRose.updateQuality();
    it('should degrade as they approach the sell date', function() {
      expect(items[0].quality).to.equal(9);
    });
    it('should degrade twice as fast once the sell by date has passed', function() {
      expect(items[1].quality).to.equal(3);
    });
    it('should be zero or higher', function() {
      expect(items[2].quality).to.equal(0);
    });
    it('should be 50 or lower', function() {
      expect(items[3].quality).to.equal(49);
      expect(items[4].quality).to.equal(48);
    });
  });
});