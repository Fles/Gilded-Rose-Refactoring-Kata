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
  describe('Aged Brie quality', function () {
    const gildedRose = new GildedRose([
      new Item('Aged Brie', 5, 10),
      new Item('Aged Brie', 0, 10),
    ]);
    const items = gildedRose.updateQuality();
    it('should increase as they approach the sell date', function() {
      expect(items[0].quality).to.equal(11);
    });
    it('should increase twice as fast once the sell by date has passed', function() {
      expect(items[1].quality).to.equal(12);
    });
  });
  describe('Sulfuras', function () {
    const gildedRose = new GildedRose([
      new Item('Sulfuras, Hand of Ragnaros', 5, 10),
      new Item('Sulfuras, Hand of Ragnaros', 0, 10),
      new Item('Sulfuras, Hand of Ragnaros', -10, 10),
    ]);
    const items = gildedRose.updateQuality();
    it('should not degrade sellIn value', function() {
      expect(items[0].sellIn).to.equal(5);
      expect(items[1].sellIn).to.equal(0);
    });
    it('should always have quality value 80', function() {
      expect(items[0].quality).to.equal(80);
      expect(items[1].quality).to.equal(80);
    });
  });
  describe('Backstage passes quality', function () {
    const gildedRose = new GildedRose([
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10),
      new Item('Backstage passes to a TAFKAL80ETC concert', 8, 10),
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
      new Item('Backstage passes to a TAFKAL80ETC concert', 2, 10),
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10),
    ]);
    const items = gildedRose.updateQuality();
    it('should increase by 1 if sel by date is more than 10', function() {
      expect(items[0].quality).to.equal(11);
    });
    it('should increase by 2 once the sell by date is 10 or less', function() {
      expect(items[1].quality).to.equal(12);
      expect(items[2].quality).to.equal(12);
    });
    it('should increase by 3 once the sell by date is 5 or less', function() {
      expect(items[3].quality).to.equal(13);
      expect(items[4].quality).to.equal(13);
    });
    it('should be zero once the sell by date has passed', function() {
      expect(items[5].quality).to.equal(0);
    });
  });
  describe('Conjured quality', function () {
    const gildedRose = new GildedRose([
      new Item('Conjured', 10, 10),
      new Item('Conjured', 0, 10),
    ]);
    const items = gildedRose.updateQuality();
    it('should degrade twice as fast as regular items', function () {
      expect(items[0].quality).to.equal(8);
      expect(items[1].quality).to.equal(6);
    });
  })
});