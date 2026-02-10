import {
  getRecommendedAction,
  isActionCorrect,
  getAvailableActions,
} from '../utils/strategyUtils';
import { createHand } from '../utils/handUtils';
import { Card } from '../types';

describe('strategyUtils', () => {
  describe('getRecommendedAction', () => {
    describe('hard totals', () => {
      it('should recommend hit on hard 8', () => {
        const hand = createHand([
          { rank: '3', suit: 'hearts' },
          { rank: '5', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '7', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('H');
      });

      it('should recommend double on hard 11 vs dealer 6', () => {
        const hand = createHand([
          { rank: '6', suit: 'hearts' },
          { rank: '5', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '6', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('D');
      });

      it('should recommend stand on hard 17', () => {
        const hand = createHand([
          { rank: '10', suit: 'hearts' },
          { rank: '7', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '10', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('S');
      });

      it('should recommend stand on hard 13 vs dealer 4', () => {
        const hand = createHand([
          { rank: '10', suit: 'hearts' },
          { rank: '3', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '4', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('S');
      });

      it('should recommend hit on hard 16 vs dealer 10', () => {
        const hand = createHand([
          { rank: '10', suit: 'hearts' },
          { rank: '6', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '10', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('H');
      });
    });

    describe('soft totals', () => {
      it('should recommend hit on soft 13 (A,2) vs dealer 7', () => {
        const hand = createHand([
          { rank: 'A', suit: 'hearts' },
          { rank: '2', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '7', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('H');
      });

      it('should recommend double on soft 17 (A,6) vs dealer 4', () => {
        const hand = createHand([
          { rank: 'A', suit: 'hearts' },
          { rank: '6', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '4', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('D');
      });

      it('should recommend stand on soft 19 (A,8)', () => {
        const hand = createHand([
          { rank: 'A', suit: 'hearts' },
          { rank: '8', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '10', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('S');
      });

      it('should recommend hit on soft 18 (A,7) vs dealer 9', () => {
        const hand = createHand([
          { rank: 'A', suit: 'hearts' },
          { rank: '7', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '9', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('H');
      });

      it('should recommend DS on soft 18 (A,7) vs dealer 2', () => {
        const hand = createHand([
          { rank: 'A', suit: 'hearts' },
          { rank: '7', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '2', suit: 'clubs' };
        const action = getRecommendedAction(hand, dealerCard);
        expect(action === 'DS' || action === 'D').toBe(true);
      });
    });

    describe('pairs', () => {
      it('should always split 8,8', () => {
        const hand = createHand([
          { rank: '8', suit: 'hearts' },
          { rank: '8', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '10', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('P');
      });

      it('should always split A,A', () => {
        const hand = createHand([
          { rank: 'A', suit: 'hearts' },
          { rank: 'A', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '10', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('P');
      });

      it('should never split 10,10', () => {
        const hand = createHand([
          { rank: '10', suit: 'hearts' },
          { rank: '10', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '6', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('S');
      });

      it('should never split 5,5 (double instead)', () => {
        const hand = createHand([
          { rank: '5', suit: 'hearts' },
          { rank: '5', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '6', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('D');
      });

      it('should split 9,9 vs dealer 6', () => {
        const hand = createHand([
          { rank: '9', suit: 'hearts' },
          { rank: '9', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '6', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('P');
      });

      it('should stand on 9,9 vs dealer 7', () => {
        const hand = createHand([
          { rank: '9', suit: 'hearts' },
          { rank: '9', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: '7', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('S');
      });
    });

    describe('dealer ace handling', () => {
      it('should handle dealer Ace correctly', () => {
        const hand = createHand([
          { rank: '10', suit: 'hearts' },
          { rank: '6', suit: 'diamonds' },
        ]);
        const dealerCard: Card = { rank: 'A', suit: 'clubs' };
        expect(getRecommendedAction(hand, dealerCard)).toBe('H');
      });
    });
  });

  describe('isActionCorrect', () => {
    it('should validate correct action', () => {
      const hand = createHand([
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      const dealerCard: Card = { rank: '10', suit: 'clubs' };
      expect(isActionCorrect(hand, dealerCard, 'P')).toBe(true);
    });

    it('should reject incorrect action', () => {
      const hand = createHand([
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      const dealerCard: Card = { rank: '10', suit: 'clubs' };
      expect(isActionCorrect(hand, dealerCard, 'S')).toBe(false);
    });

    it('should accept DS or D for double-or-stand situations', () => {
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: '7', suit: 'diamonds' },
      ]);
      const dealerCard: Card = { rank: '2', suit: 'clubs' };

      // DS means either D or S is acceptable
      const recommended = getRecommendedAction(hand, dealerCard);
      if (recommended === 'DS') {
        expect(isActionCorrect(hand, dealerCard, 'D')).toBe(true);
        expect(isActionCorrect(hand, dealerCard, 'S')).toBe(true);
      }
    });

    it('should resolve conditional actions when doubling not allowed', () => {
      // A,4,3 = soft 18 with 3 cards (can't double)
      const hand = createHand([
        { rank: 'A', suit: 'hearts' },
        { rank: '4', suit: 'diamonds' },
        { rank: '3', suit: 'clubs' },
      ]);
      const dealerCard: Card = { rank: '5', suit: 'spades' };

      // Soft 18 vs 5 is DS (double or stand)
      // After 3 cards, can't double, so should resolve to Stand
      const action = getRecommendedAction(hand, dealerCard);
      expect(action).toBe('S');
    });
  });

  describe('getAvailableActions', () => {
    it('should return H, S, D, P for a pair with 2 cards', () => {
      const hand = createHand([
        { rank: '8', suit: 'hearts' },
        { rank: '8', suit: 'diamonds' },
      ]);
      const actions = getAvailableActions(hand);
      expect(actions).toContain('H');
      expect(actions).toContain('S');
      expect(actions).toContain('D');
      expect(actions).toContain('P');
    });

    it('should return only H, S for 3+ cards', () => {
      const hand = createHand([
        { rank: '5', suit: 'hearts' },
        { rank: '6', suit: 'diamonds' },
        { rank: '3', suit: 'clubs' },
      ]);
      const actions = getAvailableActions(hand);
      expect(actions).toEqual(['H', 'S']);
    });

    it('should return H, S, D for non-pair 2 cards', () => {
      const hand = createHand([
        { rank: '5', suit: 'hearts' },
        { rank: '6', suit: 'diamonds' },
      ]);
      const actions = getAvailableActions(hand);
      expect(actions).toContain('H');
      expect(actions).toContain('S');
      expect(actions).toContain('D');
      expect(actions).not.toContain('P');
    });
  });
});
