Feature: Game
  Verify that all relevant features pertaining to the game work.

  Background:
    Given User at Home Page
    When User Clicks The Navigate to Game Page Button

  Scenario: Navigate To The Game Page
    Then User At Game Page

  Scenario: User Gets 0/5 Correct
    When User Plays Through The Game Scoring 0
    Then Scoring Should Be 0

  Scenario: User Gets 1/5 Correct
    When User Plays Through The Game Scoring 1
    Then Scoring Should Be 1

  Scenario: User Gets 2/5 Correct
    When User Plays Through The Game Scoring 2
    Then Scoring Should Be 2

  Scenario: User Gets 3/5 Correct
    When User Plays Through The Game Scoring 3
    Then Scoring Should Be 3

  Scenario: User Gets 4/5 Correct
    When User Plays Through The Game Scoring 4
    Then Scoring Should Be 4

  Scenario: User Gets 5/5 Correct
    When User Plays Through The Game Scoring 5
    Then Scoring Should Be 5

  Scenario: User Can Play Again
    When User Plays Through The Game Scoring 5
    And User At Finished Screen
    And User Clicks The Play Again Button
    Then User At The First Question
