# Coach Mode Feature

## Overview

Coach Mode is an optional learning enhancement that provides deeper strategic insights during practice sessions. When enabled, it displays detailed coaching hints that explain the mathematical and strategic reasoning behind each decision.

## Usage

### Enabling Coach Mode

1. Navigate to the **Practice** tab
2. Tap the **💡 Coach** button in the top-right corner (next to the stats)
3. The button will highlight in gold when active
4. A coaching panel will appear on the left side, overlaying the hands with a mini visualization of the situation

### Disabling Coach Mode

- Tap the **💡 Coach** button again to toggle it off
- The coaching panel will disappear, returning to the standard practice view

## What Coach Mode Provides

When Coach Mode is active, you'll see a detailed breakdown **before** making your decision:

### 1. **Key Strategy**
A clear statement of the optimal play and why it's fundamental to basic strategy.

### 2. **Dealer Situation**
- Dealer's bust probability for their upcard
- Analysis of dealer's position (weak vs. strong)
- Likely outcomes based on dealer's card

### 3. **Your Hand**
- Evaluation of your hand's strength
- Explanation of what you're trying to accomplish
- Risk/reward analysis for the situation

### 4. **Why This Works**
- Strategic concepts behind the decision
- Mathematical reasoning and expected value
- How this play fits into overall basic strategy

### 5. **⚠️ Common Mistake** (when applicable)
- Typical errors players make in this situation
- Why the incorrect play loses money long-term
- Psychological traps to avoid

## Educational Content

Coach Mode teaches:

- **Dealer bust probabilities** - Exact percentages for each upcard
- **Player bust risks** - When hitting becomes too dangerous
- **Doubling opportunities** - Why certain spots are profitable
- **Splitting logic** - Mathematical reasoning for pair plays
- **Soft hand advantages** - Why Aces provide flexibility
- **Strategic concepts** - Higher-level thinking beyond memorization

## Example Scenarios

### Hard 16 vs Dealer 10
**Without Coach Mode:** Basic feedback after action
**With Coach Mode:**
- Explains that 16 is the worst hand in blackjack
- Notes dealer's 23% bust rate with a 10
- Clarifies why hitting (despite 62% bust risk) is still better than standing
- Warns against the common mistake of standing out of fear

### Soft 18 vs Dealer 5
**Without Coach Mode:** Basic feedback after action
**With Coach Mode:**
- Highlights dealer's 43% bust probability
- Explains why you can't bust on one hit (Ace flexibility)
- Details the profit advantage of doubling in this spot
- Addresses the passive mistake of just standing

### Pair of 8s vs Dealer 10
**Without Coach Mode:** Basic feedback after action
**With Coach Mode:**
- Explains why 16 is terrible and splitting is superior
- Acknowledges this is a "defensive split" (minimizing losses)
- Provides the mathematical comparison of outcomes
- Notes this is one of the "always split 8s" fundamental rules

## Design Philosophy

Coach Mode is designed to be:

- **Non-disruptive** - Positioned in empty space, doesn't interfere with gameplay
- **Educational** - Teaches concepts, not just rules
- **Mathematical** - Provides actual probabilities and percentages
- **Contextual** - Explains why each situation is different
- **Progressive** - Helps transition from memorization to understanding

## When to Use Coach Mode

### Recommended for:
- **Learning phase** - Understanding the "why" behind each decision
- **Difficult decisions** - When you're uncertain about the correct play
- **Stiff hands (12-16)** - The trickiest situations in blackjack
- **Soft hands** - Understanding when to hit, stand, or double
- **Pair decisions** - Learning splitting strategy

### Not needed for:
- **Testing yourself** - When you want to practice without hints
- **Speed practice** - Trying to improve decision-making speed
- **After mastery** - Once you've internalized the concepts

## Technical Details

- **Toggle state** - Persists only during the current session
- **Appearance** - Only shows before making a decision, not during feedback
- **Content** - Dynamically generated based on hand category (pairs, soft, hard)
- **Mini visualization** - Shows small cards representing the current hand situation
- **Positioning** - Left side, overlays hands with semi-transparent background
- **Scrollable** - Content scrolls if needed for longer explanations
- **Performance** - Minimal impact, hint generated only when visible

## Tips for Maximum Learning

1. **Read before deciding** - Use the coaching to think through the decision
2. **Compare to your instinct** - Notice when your gut disagrees with strategy
3. **Focus on concepts** - Try to understand the underlying principles
4. **Test yourself** - Toggle Coach Mode off occasionally to self-assess
5. **Review mistakes** - If you get it wrong, turn Coach Mode back on for the next similar hand

## Future Enhancements (Potential)

- Historical hand review with coaching
- Focused practice on specific hand types
- Coaching difficulty levels (beginner vs. advanced)
- Audio coaching option
- Customizable hint detail level

---

Coach Mode transforms practice from rote memorization into strategic understanding, helping you become not just a player who knows what to do, but one who understands why.
