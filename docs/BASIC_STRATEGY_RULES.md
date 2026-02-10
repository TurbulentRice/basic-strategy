# Basic Strategy Rules

## What is Basic Strategy?

Basic strategy is the mathematically optimal way to play every hand in blackjack. It tells you the best action (Hit, Stand, Double, Split) based on:
- Your hand total
- The dealer's up card
- Game rules (number of decks, dealer hits/stands on soft 17, etc.)

Following basic strategy minimizes the house edge to around 0.5%.

## Standard Assumptions

Our implementation uses the most common casino rules:
- **Multiple decks** (4-8 decks)
- **Dealer stands on soft 17** (S17)
- **Double after split allowed** (DAS)
- **Surrender not available** (for simplicity)
- **Blackjack pays 3:2**

## Action Codes

- **H** = Hit (take another card)
- **S** = Stand (keep current hand)
- **D** = Double Down (double bet, take exactly one more card)
- **DS** = Double if allowed, otherwise Stand
- **DH** = Double if allowed, otherwise Hit
- **P** = Split (divide pair into two hands)

## Hand Types

### Hard Totals
Hands without an Ace (or where Ace counts as 1).
- Examples: 10-6 (16), 7-8 (15), K-5 (15)

### Soft Totals
Hands with an Ace counted as 11.
- Examples: A-6 (soft 17), A-4 (soft 15)
- If you hit and bust, the Ace becomes 1

### Pairs
Two cards of the same rank.
- Examples: 8-8, A-A, 10-K (both count as 10)

## Strategy Chart Outline

### Hard Totals (8-20)
- **8 or less**: Always Hit
- **9**: Double vs 3-6, otherwise Hit
- **10**: Double vs 2-9, otherwise Hit
- **11**: Double vs 2-10, otherwise Hit
- **12**: Stand vs 4-6, otherwise Hit
- **13-16**: Stand vs 2-6, otherwise Hit
- **17+**: Always Stand

### Soft Totals (A,2 through A,9)
- **A,2 - A,3**: Double vs 5-6, otherwise Hit
- **A,4 - A,5**: Double vs 4-6, otherwise Hit
- **A,6**: Double vs 3-6, otherwise Hit
- **A,7**: Double vs 2-6, Stand vs 7-8, Hit vs 9-A
- **A,8 - A,9**: Always Stand

### Pairs (2,2 through A,A)
- **2,2 and 3,3**: Split vs 2-7, otherwise Hit
- **4,4**: Split vs 5-6, otherwise Hit
- **5,5**: Never split (treat as 10)
- **6,6**: Split vs 2-6, otherwise Hit
- **7,7**: Split vs 2-7, otherwise Hit
- **8,8**: Always Split
- **9,9**: Split vs 2-9 except 7, Stand vs 7/10/A
- **10,10**: Never Split (20 is too strong)
- **A,A**: Always Split

## Common Mistakes to Avoid

1. **Not splitting 8s and Aces**: Always split these
2. **Splitting 10s**: Never split 20
3. **Standing on soft 17 or less**: You can't bust, so hit or double
4. **Not doubling 11**: Very strong doubling hand
5. **Hitting 12 vs dealer 4-6**: Stand and hope dealer busts
6. **Insurance**: Never take it (not part of basic strategy)

## Variations

Different rule sets may slightly modify basic strategy:
- **Dealer hits soft 17 (H17)**: More aggressive doubling, hit A,8 vs 6
- **No double after split**: Less pair splitting
- **Single deck**: Some strategy changes
- **Surrender allowed**: Additional strategy for 15 and 16

*For this app, we'll focus on the standard multi-deck, S17, DAS rules.*

## References

- Mathematical analysis by Edward Thorp, Julian Braun, and others
- Verified by computer simulations
- Standard casino game assumptions
