import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PracticeHand, PracticeStats, Action } from '@/types';
import { dealRandomHand, calculateAccuracy } from '@/utils/practiceGame';
import { isActionCorrect } from '@/utils/strategyUtils';

interface PracticeState {
  currentHand: PracticeHand | null;
  lastAction: Action | null;
  wasCorrect: boolean | null;
  stats: PracticeStats;
}

interface PracticeContextValue {
  state: PracticeState;
  startNewHand: () => void;
  submitAction: (action: Action) => void;
  resetStats: () => void;
}

const PracticeContext = createContext<PracticeContextValue | undefined>(undefined);

const INITIAL_STATS: PracticeStats = {
  totalHands: 0,
  correctDecisions: 0,
  accuracy: 0,
  currentStreak: 0,
  bestStreak: 0,
};

export function PracticeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PracticeState>({
    currentHand: null,
    lastAction: null,
    wasCorrect: null,
    stats: INITIAL_STATS,
  });

  const startNewHand = useCallback(() => {
    const newHand = dealRandomHand();
    setState(prev => ({
      ...prev,
      currentHand: newHand,
      lastAction: null,
      wasCorrect: null,
    }));
  }, []);

  const submitAction = useCallback((action: Action) => {
    setState(prev => {
      if (!prev.currentHand) return prev;

      const correct = isActionCorrect(
        prev.currentHand.playerHand,
        prev.currentHand.dealerUpCard,
        action
      );

      const newTotalHands = prev.stats.totalHands + 1;
      const newCorrectDecisions = prev.stats.correctDecisions + (correct ? 1 : 0);
      const newCurrentStreak = correct ? prev.stats.currentStreak + 1 : 0;
      const newBestStreak = Math.max(prev.stats.bestStreak, newCurrentStreak);
      const newAccuracy = calculateAccuracy(newCorrectDecisions, newTotalHands);

      return {
        ...prev,
        lastAction: action,
        wasCorrect: correct,
        stats: {
          totalHands: newTotalHands,
          correctDecisions: newCorrectDecisions,
          accuracy: newAccuracy,
          currentStreak: newCurrentStreak,
          bestStreak: newBestStreak,
        },
      };
    });
  }, []);

  const resetStats = useCallback(() => {
    setState(prev => ({
      ...prev,
      stats: INITIAL_STATS,
      lastAction: null,
      wasCorrect: null,
    }));
  }, []);

  const value: PracticeContextValue = {
    state,
    startNewHand,
    submitAction,
    resetStats,
  };

  return (
    <PracticeContext.Provider value={value}>
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice() {
  const context = useContext(PracticeContext);
  if (context === undefined) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
}
