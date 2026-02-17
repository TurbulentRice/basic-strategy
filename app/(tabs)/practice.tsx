import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { usePractice } from '@/contexts/PracticeContext';
import { Screen } from '@/components/Screen';
import { StatBar } from '@/components/StatBar';
import { Hand } from '@/components/Hand';
import { ActionButtons } from '@/components/ActionButtons';
import { FeedbackMessage } from '@/components/FeedbackMessage';
import { CoachHint } from '@/components/CoachHint';
import { Action } from '@/types';
import { getAvailableActions } from '@/utils/strategyUtils';
import { getActionRecommendation } from '@/utils/strategyUtils';
import { generateCoachingHint } from '@/utils/coachingUtils';
import { COLORS, THEME } from '@/constants/theme';
import { createHand } from '@/utils/handUtils';

export default function PracticeScreen() {
  const { state, startNewHand, submitAction } = usePractice();
  const { currentHand, lastAction, wasCorrect, stats } = state;
  const [coachMode, setCoachMode] = useState(false);
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

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

  // Generate coaching hint
  const coachingHint = coachMode && !showingFeedback
    ? generateCoachingHint(
        currentHand.playerHand,
        currentHand.dealerUpCard,
        currentHand.correctAction
      )
    : null;

  return (
    <Screen>
      <View style={styles.container}>
        {/* Stats Bar with integrated Coach Mode Toggle */}
        <StatBar
          stats={stats}
          coachMode={coachMode}
          onCoachToggle={() => setCoachMode(!coachMode)}
          style={styles.statBar}
        />

        {/* Game Area (Dealer + Player Hands) */}
        <View style={styles.gameArea}>
          {/* Dealer Hand */}
          <View style={styles.dealerHandSection}>
            <Hand
              hand={createHand([currentHand.dealerUpCard])}
              showTotal={false}
              label="Dealer"
              size="standard"
            />
          </View>

          {/* Player Hand */}
          <View style={styles.playerHandSection}>
            <Hand
              hand={currentHand.playerHand}
              showTotal={true}
              label="Your Hand"
              size="large"
            />
          </View>

          {/* Coach Hint - overlays both hands */}
          {coachingHint && (
            <View style={styles.coachHintContainer}>
              <CoachHint
                hint={coachingHint}
                playerHand={currentHand.playerHand}
                dealerCard={currentHand.dealerUpCard}
              />
            </View>
          )}
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
                style={[styles.nextButton, isTablet && styles.nextButtonTablet]}
                onPress={handleNextHand}
              >
                <Text style={[styles.nextButtonText, isTablet && styles.nextButtonTextTablet]}>Next Hand →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[styles.prompt, isTablet && styles.promptTablet]}>What should you do?</Text>
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
    marginBottom: THEME.spacing.sm,
  },
  gameArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-around',
  },
  dealerHandSection: {
    alignItems: 'center',
    marginTop: THEME.spacing.md,
  },
  playerHandSection: {
    alignItems: 'center',
  },
  coachHintContainer: {
    position: 'absolute',
    height: '100%',
    zIndex: 10,
  },
  actionSection: {
    marginTop: 'auto',
    paddingTop: THEME.spacing.xs,
    minHeight: 180,
    justifyContent: 'flex-end',
  },
  prompt: {
    fontSize: THEME.typography.fontSize.base,
    fontWeight: THEME.typography.fontWeight.semibold,
    color: COLORS.ui.white,
    textAlign: 'center',
    marginBottom: THEME.spacing.sm,
  },
  promptTablet: {
    fontSize: THEME.typography.fontSize.lg,
    marginBottom: THEME.spacing.md,
  },
  feedback: {
    marginBottom: THEME.spacing.sm,
  },
  nextButton: {
    backgroundColor: COLORS.gold.primary,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    ...THEME.shadows.md,
  },
  nextButtonTablet: {
    paddingVertical: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.xl,
  },
  nextButtonText: {
    fontSize: THEME.typography.fontSize.base,
    fontWeight: THEME.typography.fontWeight.bold,
    color: COLORS.feltGreen.dark,
  },
  nextButtonTextTablet: {
    fontSize: THEME.typography.fontSize.lg,
  },
});
