import { Action, Card, Hand } from '@/types';
import { getDealerCardValue } from './cardUtils';
import { getHandCategory, getPairRank, getSoftTotal, getHandTotal } from './handUtils';

/**
 * Enhanced coaching information for learning mode
 * Provides deeper strategic insights and mathematical reasoning
 */

export interface CoachingHint {
  primaryInsight: string;
  dealerAnalysis: string;
  playerAnalysis: string;
  strategicConcept: string;
  commonMistake?: string;
}

/**
 * Generate comprehensive coaching hint for a given situation
 */
export function generateCoachingHint(
  playerHand: Hand,
  dealerUpCard: Card,
  correctAction: Action
): CoachingHint {
  const dealerValue = getDealerCardValue(dealerUpCard);
  const category = getHandCategory(playerHand);

  // Build coaching based on hand type
  if (category === 'pair') {
    return generatePairCoaching(playerHand, dealerValue, correctAction);
  } else if (category === 'soft') {
    return generateSoftCoaching(playerHand, dealerValue, correctAction);
  } else {
    return generateHardCoaching(playerHand, dealerValue, correctAction);
  }
}

/**
 * Generate coaching for pair hands
 */
function generatePairCoaching(
  playerHand: Hand,
  dealerValue: number,
  action: Action
): CoachingHint {
  const pairRank = getPairRank(playerHand);
  const total = getHandTotal(playerHand);

  // Special cases for always split
  if (pairRank === 'A') {
    return {
      primaryInsight: 'Always split Aces! Each Ace becomes the foundation for a potentially strong hand.',
      dealerAnalysis: getDealerBustProbability(dealerValue),
      playerAnalysis: 'Starting with 11 gives you excellent chances for 21, while 12 (soft or hard) is a weak total.',
      strategicConcept: 'The value of starting with an Ace far exceeds playing a soft 12. Most casinos limit to one card per split Ace.',
      commonMistake: 'Never treat a pair of Aces as a soft 12. The splitting opportunity is too valuable.',
    };
  }

  if (pairRank === '8') {
    return {
      primaryInsight: 'Always split 8s! A total of 16 is the worst hand in blackjack.',
      dealerAnalysis: getDealerBustProbability(dealerValue),
      playerAnalysis: '16 loses to most dealer totals. Two hands of 8 give you fresh starts with decent building blocks.',
      strategicConcept: 'Starting fresh with 8 vs 8 is mathematically superior to the misery of 16, even against strong dealer cards.',
      commonMistake: 'Standing on 16 loses more often than splitting. Hitting 16 is better than standing, but splitting is best.',
    };
  }

  if (pairRank === '10' || pairRank === 'J' || pairRank === 'Q' || pairRank === 'K') {
    return {
      primaryInsight: 'Never split 10s! You already have 20—one of the best hands possible.',
      dealerAnalysis: `Dealer shows ${dealerValue}. ${getDealerOutcome(dealerValue)}`,
      playerAnalysis: '20 wins against everything except 21. Splitting would create two hands starting at 10—good, but not as strong as 20.',
      strategicConcept: 'The expectation of 20 (winning ~80% of the time) is better than two hands starting at 10.',
      commonMistake: 'Greed is the enemy here. Splitting 10s decreases your overall win rate despite seeming clever.',
    };
  }

  if (pairRank === '5') {
    return {
      primaryInsight: action === 'D' ? 'Double down on 10! Never split 5s.' : 'Treat 5,5 as hard 10.',
      dealerAnalysis: dealerValue <= 6
        ? `Dealer shows ${dealerValue}—a weak card. Dealer busts ${getBustPercentage(dealerValue)} of the time.`
        : `Dealer shows ${dealerValue}. ${getDealerOutcome(dealerValue)}`,
      playerAnalysis: action === 'D'
        ? 'Starting with 10 is excellent for doubling. You have a strong chance of making 20 or 21.'
        : 'With 10, you want to build toward a strong total. Splitting 5s creates two weak starting points.',
      strategicConcept: '10 is a premium doubling hand against weak dealers. Never split it into two hands of 5.',
      commonMistake: 'Splitting 5s creates two terrible starting totals (5) instead of one excellent total (10).',
    };
  }

  // General pair logic
  if (action === 'P') {
    const isAgainstWeak = dealerValue >= 2 && dealerValue <= 6;
    return {
      primaryInsight: `Split ${pairRank}s against dealer ${dealerValue}.`,
      dealerAnalysis: isAgainstWeak
        ? `Dealer shows ${dealerValue}—a weak card with high bust probability (${getBustPercentage(dealerValue)}).`
        : `Dealer shows ${dealerValue}. ${getDealerOutcome(dealerValue)}`,
      playerAnalysis: `Two hands starting with ${pairRank} offer better prospects than one hand of ${total}.`,
      strategicConcept: isAgainstWeak
        ? 'Against weak dealer cards, splitting leverages their bust probability while creating two opportunities to win.'
        : 'Splitting here minimizes losses or maximizes gains based on mathematical expectation.',
      commonMistake: total === 12 || total === 14
        ? `Playing ${total} as a single hand is weak. Splitting gives you better chances.`
        : undefined,
    };
  }

  // Not splitting
  return {
    primaryInsight: `Don't split ${pairRank}s here. Play as ${total}.`,
    dealerAnalysis: getDealerAnalysis(dealerValue),
    playerAnalysis: action === 'H'
      ? `${total} is not strong enough against dealer ${dealerValue}. You need to improve.`
      : `${total} is solid against dealer ${dealerValue}. Stand and hope for dealer bust or lower total.`,
    strategicConcept: 'The combined total is stronger than splitting would be in this scenario.',
    commonMistake: undefined,
  };
}

/**
 * Generate coaching for soft hands
 */
function generateSoftCoaching(
  playerHand: Hand,
  dealerValue: number,
  action: Action
): CoachingHint {
  const softTotal = getSoftTotal(playerHand) || 12; // Default to 12 if undefined (shouldn't happen)

  if (action === 'D' || action === 'DS') {
    const isAgainstWeak = dealerValue >= 4 && dealerValue <= 6;
    return {
      primaryInsight: `Double soft ${softTotal}! This is an aggressive, profitable play.`,
      dealerAnalysis: isAgainstWeak
        ? `Dealer shows ${dealerValue}—a weak card. Exploit their ${getBustPercentage(dealerValue)} bust probability.`
        : `Dealer shows ${dealerValue}. You have a favorable situation.`,
      playerAnalysis: `Soft ${softTotal} can't bust on one hit. You're trying to improve while risking extra money in a good spot.`,
      strategicConcept: 'Soft hands double against weak dealers because: (1) you can\'t bust, (2) you might make a strong total, (3) dealer is likely to bust.',
      commonMistake: softTotal >= 17 && softTotal <= 18
        ? `Don't be passive with soft ${softTotal} against weak dealers. Doubling is more profitable long-term.`
        : 'Many players fear doubling soft hands, but mathematics shows this is optimal against weak dealer cards.',
    };
  }

  if (action === 'S') {
    return {
      primaryInsight: `Stand on soft ${softTotal}.`,
      dealerAnalysis: dealerValue >= 7
        ? `Dealer shows ${dealerValue}. They're likely to make a strong total (17-21).`
        : `Dealer shows ${dealerValue} but your soft ${softTotal} is strong enough.`,
      playerAnalysis: softTotal === 19 || softTotal === 20
        ? `Soft ${softTotal} is excellent! Very few hands beat this.`
        : `Soft ${softTotal} is solid. Hitting risks making it worse without enough upside.`,
      strategicConcept: softTotal >= 19
        ? 'Soft 19-20 wins most of the time. Standing is nearly always correct.'
        : 'Against strong dealer cards, soft 18 is marginal. Standing is the safe, correct play.',
      commonMistake: softTotal === 18 && dealerValue >= 9
        ? 'Some players stand on soft 18 vs 9/10/A, but hitting is actually better. Against 7-8, standing is correct.'
        : undefined,
    };
  }

  // Hitting soft hands
  return {
    primaryInsight: `Hit soft ${softTotal}. You can't bust!`,
    dealerAnalysis: getDealerAnalysis(dealerValue),
    playerAnalysis: `Soft ${softTotal} is not strong enough. The beauty of soft hands: you can hit freely without busting.`,
    strategicConcept: 'Always improve weak soft hands. The Ace protects you from busting, making hitting a free improvement opportunity.',
    commonMistake: 'Never stand on soft 17 or below (except soft 18 vs 2-8). You have nothing to lose by hitting.',
  };
}

/**
 * Generate coaching for hard hands
 */
function generateHardCoaching(
  playerHand: Hand,
  dealerValue: number,
  action: Action
): CoachingHint {
  const total = getHandTotal(playerHand);

  if (action === 'D') {
    return {
      primaryInsight: `Double on ${total}! You have the advantage.`,
      dealerAnalysis: `Dealer shows ${dealerValue}—a weak card with ${getBustPercentage(dealerValue)} bust probability.`,
      playerAnalysis: total === 11
        ? '11 is the best doubling hand! You can\'t bust and have excellent odds of making 20 or 21.'
        : total === 10
        ? '10 is excellent for doubling. Strong chance of making 20, and dealer is weak.'
        : `${total} is favorable against this weak dealer. Doubling maximizes your expected profit.`,
      strategicConcept: 'Doubling on 9-11 against weak dealers is fundamental. You\'re putting more money out when you have the edge.',
      commonMistake: total === 11 && dealerValue <= 10
        ? 'Always double 11 (except vs Ace). This is one of the most profitable plays in blackjack.'
        : 'Many players hesitate to double, but this is exactly when you want extra money in action.',
    };
  }

  if (action === 'S') {
    const isAgainstWeak = dealerValue >= 2 && dealerValue <= 6;

    if (total >= 17) {
      return {
        primaryInsight: `Always stand on ${total}! Too risky to hit.`,
        dealerAnalysis: getDealerAnalysis(dealerValue),
        playerAnalysis: `With ${total}, hitting has a ${getBustChance(total)} chance of busting. The risk far outweighs potential gain.`,
        strategicConcept: 'Standing on 17+ is fundamental. Even when dealer shows strong cards, hitting busts too often to be worthwhile.',
        commonMistake: total === 17 && dealerValue >= 9
          ? 'Even against strong dealer cards, hitting 17 busts 69% of the time. Standing is correct despite feeling weak.'
          : undefined,
      };
    }

    if (isAgainstWeak) {
      return {
        primaryInsight: `Stand on ${total} vs dealer ${dealerValue}.`,
        dealerAnalysis: `Dealer shows ${dealerValue}—a weak card. Dealer busts ${getBustPercentage(dealerValue)} of the time.`,
        playerAnalysis: `Your ${total} is vulnerable, but dealer's bust probability makes standing profitable.`,
        strategicConcept: 'Against weak dealer cards (2-6), stand on 12-16. Force dealer to hit their weak hand and risk busting.',
        commonMistake: 'The most common beginner mistake: hitting 12-16 vs weak dealers. Let the dealer take the bust risk!',
      };
    }

    return {
      primaryInsight: `Stand on ${total}.`,
      dealerAnalysis: getDealerAnalysis(dealerValue),
      playerAnalysis: `${total} vs ${dealerValue}: standing is optimal based on dealer's likely outcomes.`,
      strategicConcept: 'Basic strategy balances your bust risk against dealer probabilities.',
    };
  }

  // Hitting
  const cantBust = total <= 11;
  return {
    primaryInsight: cantBust
      ? `Hit ${total}—you can't bust!`
      : `Hit ${total} vs dealer ${dealerValue}.`,
    dealerAnalysis: dealerValue >= 7
      ? `Dealer shows ${dealerValue}. They're likely to make a pat hand (17-21).`
      : getDealerAnalysis(dealerValue),
    playerAnalysis: cantBust
      ? `With ${total}, any card improves your hand without busting. Always hit.`
      : total >= 12 && total <= 16
      ? `${total} is a "stiff" hand—weak and at risk of busting. But against dealer ${dealerValue}, hitting is the lesser evil.`
      : `${total} needs improvement to compete with dealer's likely total.`,
    strategicConcept: cantBust
      ? 'Always hit hard 11 or below (unless doubling). Impossible to bust = no reason not to improve.'
      : total >= 12 && total <= 16 && dealerValue >= 7
      ? 'Against dealer 7-A, your 12-16 loses most of the time either way. Hitting gives you a fighting chance despite bust risk.'
      : 'When dealer shows strength, you need to match it by improving your hand.',
    commonMistake: total === 12 && dealerValue >= 7
      ? '12 vs 7+ feels scary to hit, but standing wins less often. Hit and hope for 2-9.'
      : total >= 13 && total <= 16 && dealerValue >= 7
      ? 'Many players stand on stiff hands out of fear. Against strong dealers, hitting is correct despite the bust risk.'
      : undefined,
  };
}

/**
 * Get dealer bust probability description
 */
function getDealerBustProbability(dealerValue: number): string {
  const percentage = getBustPercentage(dealerValue);
  if (dealerValue >= 2 && dealerValue <= 6) {
    return `Dealer shows ${dealerValue}—a weak card. Dealer busts ${percentage} of the time with this upcard.`;
  } else if (dealerValue >= 7 && dealerValue <= 9) {
    return `Dealer shows ${dealerValue}. Only ${percentage} bust rate—dealer likely makes a pat hand.`;
  } else {
    return `Dealer shows ${dealerValue === 10 ? '10' : 'Ace'}. Strong card with just ${percentage} bust probability.`;
  }
}

/**
 * Get dealer outcome description
 */
function getDealerOutcome(dealerValue: number): string {
  if (dealerValue >= 7 && dealerValue <= 9) {
    return `Strong card—dealer makes pat hands (17-21) most of the time.`;
  } else if (dealerValue === 10) {
    return 'Dealer likely has 20 or will draw to a strong total.';
  } else if (dealerValue === 11) {
    return 'Ace is the dealer\'s strongest card. They have flexible options.';
  }
  return 'Dealer is in a difficult position.';
}

/**
 * Get dealer analysis
 */
function getDealerAnalysis(dealerValue: number): string {
  const isWeak = dealerValue >= 2 && dealerValue <= 6;
  const isStrong = dealerValue >= 7;

  if (isWeak) {
    return `Dealer shows ${dealerValue}—a weak card with ${getBustPercentage(dealerValue)} bust probability. This drives your strategy.`;
  } else if (isStrong) {
    return `Dealer shows ${dealerValue}. Strong card with low bust rate (${getBustPercentage(dealerValue)}). They're likely to make 17-21.`;
  }
  return `Dealer shows ${dealerValue}.`;
}

/**
 * Get dealer bust percentage as string
 */
function getBustPercentage(dealerValue: number): string {
  const bustRates: Record<number, string> = {
    2: '35%',
    3: '38%',
    4: '40%',
    5: '43%',
    6: '42%',
    7: '26%',
    8: '24%',
    9: '23%',
    10: '23%',
    11: '17%', // Ace
  };
  return bustRates[dealerValue] || 'unknown';
}

/**
 * Get player bust chance
 */
function getBustChance(total: number): string {
  const bustChances: Record<number, string> = {
    12: '31%',
    13: '39%',
    14: '46%',
    15: '54%',
    16: '62%',
    17: '69%',
    18: '77%',
    19: '85%',
    20: '92%',
  };
  return bustChances[total] || 'high';
}
