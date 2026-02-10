import {
  evaluateHand,
  isSoftHand,
  isHardHand,
  isPair,
  getPairRank,
  canDouble,
  canSplit,
  getHandTotal,
  getSoftTotal,
  getHardTotal,
  getHandCategory,
  createHand,
} from '../utils/handUtils';

describe('handUtils', () => {
  describe('evaluateHand', () => {
    it('should evaluate a simple hard hand', () => {
      const hand = createHand([
        { rank: '7', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(15);
      expect(result.isSoft).toBe(false);
      expect(result.isBusted).toBe(false);
      expect(result.isBlackjack).toBe(false);
    });

    it('should evaluate a soft hand with Ace', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: '6', suit: 'diamonds' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(17);
      expect(result.isSoft).toBe(true);
      expect(result.isBusted).toBe(false);
    });

    it('should handle Ace as 1 when necessary', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: '9', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(15); // A=1, 9, 5
      expect(result.isSoft).toBe(false);
      expect(result.isBusted).toBe(false);
    });

    it('should detect blackjack', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: 'K', suit: 'diamonds' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(21);
      expect(result.isBlackjack).toBe(true);
    });

    it('should not consider 3-card 21 as blackjack', () => {
      const hand = createHand([
        { rank: '7', suit: 'hearts' },
        { rank: '7', suit: 'diamonds' },
        { rank: '7', suit: 'clubs' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(21);
      expect(result.isBlackjack).toBe(false);
    });

    it('should detect busted hand', () => {
      const hand = createHand([
        { rank: '10', suit: 'hearts' },
        { rank: '9', suit: 'diamonds' },
        { rank: '5', suit: 'clubs' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(24);
      expect(result.isBusted).toBe(true);
    });

    it('should handle multiple aces', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: 'A', suit: 'diamonds' },
        { rank: '9', suit: 'clubs' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(21); // A=11, A=1, 9
      expect(result.isSoft).toBe(true);
    });

    it('should handle all aces as 1s when necessary', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: 'A', suit: 'diamonds' },
        { rank: 'A', suit: 'clubs' },
        { rank: '9', suit: 'spades' },
      ]);
      const result = evaluateHand(hand);
      expect(result.total).toBe(12); // A=1, A=1, A=1, 9
      expect(result.isSoft).toBe(false);
    });
  });

  describe('isSoftHand and isHardHand', () => {
    it('should identify soft hands', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: '7', suit: 'diamonds' },
      ]);
      expect(isSoftHand(hand)).toBe(true);
      expect(isHardHand(hand)).toBe(false);
    });

    it('should identify hard hands', () => {
      const hand = createHand([
        { rank: '10', suit: 'hearts' },
        { rank: '7', suit: 'diamonds' },
      ]);
      expect(isSoftHand(hand)).toBe(false);
      expect(isHardHand(hand)).toBe(true);
    });
  });

  describe('isPair', () => {
    it('should detect same-rank pairs', () => {
      const hand = createHand([
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      expect(isPair(hand)).toBe(true);
    });

    it('should detect face card pairs', () => {
      const hand = createHand([
        { rank: 'K', suit: 'hearts' },
        { rank: 'Q', suit: 'diamonds' },
      ]);
      expect(isPair(hand)).toBe(true); // Both 10-value
    });

    it('should not detect pairs with 3+ cards', () => {
      const hand = createHand([
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
        { rank: '3', suit: 'clubs' },
      ]);
      expect(isPair(hand)).toBe(false);
    });

    it('should not detect non-pairs', () => {
      const hand = createHand([
        { rank: '7', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      expect(isPair(hand)).toBe(false);
    });
  });

  describe('getPairRank', () => {
    it('should return rank for pairs', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: 'A', suit: 'diamonds' },
      ]);
      expect(getPairRank(hand)).toBe('A');
    });

    it('should normalize 10-value pairs to "10"', () => {
      const hand = createHand([
        { rank: 'K', suit: 'hearts' },
        { rank: 'Q', suit: 'diamonds' },
      ]);
      expect(getPairRank(hand)).toBe('10');
    });

    it('should return undefined for non-pairs', () => {
      const hand = createHand([
        { rank: '7', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      expect(getPairRank(hand)).toBeUndefined();
    });
  });

  describe('canDouble and canSplit', () => {
    it('should allow doubling on 2 cards', () => {
      const hand = createHand([
        { rank: '5', suit: 'hearts' },
        { rank: '6', suit: 'diamonds' },
      ]);
      expect(canDouble(hand)).toBe(true);
    });

    it('should not allow doubling on 3+ cards', () => {
      const hand = createHand([
        { rank: '5', suit: 'hearts' },
        { rank: '6', suit: 'diamonds' },
        { rank: '2', suit: 'clubs' },
      ]);
      expect(canDouble(hand)).toBe(false);
    });

    it('should allow splitting pairs', () => {
      const hand = createHand([
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      expect(canSplit(hand)).toBe(true);
    });

    it('should not allow splitting non-pairs', () => {
      const hand = createHand([
        { rank: '7', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      expect(canSplit(hand)).toBe(false);
    });
  });

  describe('getHandCategory', () => {
    it('should identify pairs', () => {
      const hand = createHand([
        { rank: '9', suit: 'hearts' },
        { rank: '9', suit: 'diamonds' },
      ]);
      expect(getHandCategory(hand)).toBe('pair');
    });

    it('should identify soft hands', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: '6', suit: 'diamonds' },
      ]);
      expect(getHandCategory(hand)).toBe('soft');
    });

    it('should identify hard hands', () => {
      const hand = createHand([
        { rank: '10', suit: 'hearts' },
        { rank: '7', suit: 'diamonds' },
      ]);
      expect(getHandCategory(hand)).toBe('hard');
    });

    it('should prioritize pair over soft', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: 'A', suit: 'diamonds' },
      ]);
      expect(getHandCategory(hand)).toBe('pair'); // Not 'soft'
    });
  });

  describe('getHandTotal', () => {
    it('should return correct total', () => {
      const hand = createHand([
        { rank: '7', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      expect(getHandTotal(hand)).toBe(15);
    });
  });

  describe('getSoftTotal and getHardTotal', () => {
    it('should return soft total for soft hands', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: '7', suit: 'diamonds' },
      ]);
      expect(getSoftTotal(hand)).toBe(18);
      expect(getHardTotal(hand)).toBeUndefined();
    });

    it('should return hard total for hard hands', () => {
      const hand = createHand([
        { rank: '10', suit: 'hearts' },
        { rank: '7', suit: 'diamonds' },
      ]);
      expect(getHardTotal(hand)).toBe(17);
      expect(getSoftTotal(hand)).toBeUndefined();
    });
  });
});
