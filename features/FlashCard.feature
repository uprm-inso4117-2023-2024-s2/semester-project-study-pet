Feature: FlashCard

  Background:
  Verify that all relevant features pertaining to the FlashCards work.

  Scenario: FlashCard should flip when user clicks it
    Given User at Overview Screen
    When User Clicks The First FlashCard
    Then The First FlashCard Flips

  Scenario: Verify That New FlashCards Can Be Added
    Given User at Overview Screen
    When User Clicks The Add FlashCard Button
    Then Navigate to Add FlashCard Screen
    When User Fills FlashCard Form
    And User Clicks The Submit Button
    Then Navigate to Overview Screen
    And Verify New FlashCard Appears