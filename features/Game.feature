Feature: Game
  Verify that all relevant features pertaining to the game work.

  Background:
    Given User at Home Page
    When User Clicks The Navigate to Game Page Button

  Scenario: Navigate To The Game Page
    Then User At Game Page

  Scenario Outline: User Plays the Game
    When User Sets Difficulty to "<Difficulty>"
    And User Plays Through The Game Scoring <Score> out of <Total Questions>
    Then Scoring Should Be <Score> of <Total Questions>

    Examples:
      | Difficulty | Score | Total Questions |
      | Easy | 0 | 2 |
      | Easy | 1 | 2 |
      | Easy | 2 | 2 |
      | Medium | 0 | 4 |
      | Medium | 1 | 4 |
      | Medium | 2 | 4 |
      | Medium | 3 | 4 |
      | Medium | 4 | 4 |
      | Hard | 0 | 5 |
      | Hard | 1 | 5 |
      | Hard | 2 | 5 |
      | Hard | 3 | 5 |
      | Hard | 4 | 5 |
      | Hard | 5 | 5 |
