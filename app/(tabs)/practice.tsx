import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { usePractice } from '@/contexts/PracticeContext';
import { Screen } from '@/components/Screen';
import { StatBar } from '@/components/StatBar';
import { Hand } from '@/components/Hand';
import { ActionButtons } from '@/components/ActionButtons';
import { FeedbackMessage } from '@/components/FeedbackMessage';
import { Action } from '@/types';
import { getAvailableActions } from '@/utils/strategyUtils';
import { getActionRecommendation } from '@/utils/strategyUtils';
import { COLORS, THEME } from '@/constants/theme';
import { createHand } from '@/utils/handUtils';

export default function PracticeScreen() {
  const { state, startNewHand, submitAction } = usePractice();
  const { currentHand, lastAction, wasCorrect, stats } = state;

  // Start first hand on mount
  useEffect(() => {
    if (!currentHand) {
      startNewHand();
    }
  }, []);

  const handleActionPress = (action: Action) => {
    if (lastAction !== null) return; // Already answered
    submitAction(action);
  };

  const handleNextHand = () => {
    startNewHand();
  };

  if (!currentHand) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Screen>
    );
  }

  const availableActions = getAvailableActions(currentHand.playerHand);
  const showingFeedback = lastAction !== null;
  const recommendation = getActionRecommendation(
    currentHand.playerHand,
    currentHand.dealerUpCard
  );

  return (
    <Screen>
      <View style={styles.container}>
        {/* Stats Bar */}
        <StatBar stats={stats} style={styles.statBar} />

        {/* Dealer Hand */}
        <View style={styles.handSection}>
          <Hand
            hand={createHand([currentHand.dealerUpCard])}
            showTotal={false}
            label="Dealer"
            size="standard"
          />
        </View>

        {/* Player Hand */}
        <View style={styles.handSection}>
          <Hand
            hand={currentHand.playerHand}
            showTotal={true}
            label="Your Hand"
            size="large"
          />
        </View>

        {/* Feedback or Action Prompt */}
        <View style={styles.actionSection}>
          {showingFeedback ? (
            <>
              <FeedbackMessage
                isCorrect={wasCorrect || false}
                userAction={lastAction}
                correctAction={currentHand.correctAction}
                explanation={recommendation.explanation}
                style={styles.feedback}
              />
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextHand}
              >
                <Text style={styles.nextButtonText}>Next Hand →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.prompt}>What should you do?</Text>
              <ActionButtons
                availableActions={availableActions}
                onActionPress={handleActionPress}
                disabled={showingFeedback}
              />
            </>
          )}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: THEME.typography.fontSize.xl,
    color: COLORS.ui.white,
  },
  statBar: {
    marginBottom: THEME.spacing.lg,
  },
  handSection: {
    alignItems: 'center',
    marginVertical: THEME.spacing.lg,
  },
  actionSection: {
    marginTop: 'auto',
    paddingTop: THEME.spacing.lg,
  },
  prompt: {
    fontSize: THEME.typography.fontSize.xl,
    fontWeight: THEME.typography.fontWeight.semibold,
    color: COLORS.ui.white,
    textAlign: 'center',
    marginBottom: THEME.spacing.lg,
  },
  feedback: {
    marginBottom: THEME.spacing.lg,
  },
  nextButton: {
    backgroundColor: COLORS.gold.primary,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.xl,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    ...THEME.shadows.md,
  },
  nextButtonText: {
    fontSize: THEME.typography.fontSize.lg,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.feltGreen.dark,
  },
});
