Feature: Shop
  Verify that all relevant features pertaining to the shop work.

  Background:
    Given User at Home Page
    When User Clicks The Navigate to Shop Page Button

  Scenario: Navigate To The Bath Page
    Then User At Shop Page

  Scenario Outline: Filtering
    When User Filters by "<Filter>"
    Then "<Filter>" Items Show

    Examples:
      | Filter |
      | All |
      | Food |
      | Toys |
      | Clothes |

    Scenario Outline: Buying
      When User Buys "<Item>"
      Then Money Left is "<Balance>"

      Examples:
        | Item | Balance |
        | Orange Juice | 490 |
        | Apple Juice | 480 |
        | Banana Juice | 480 |
        | Ball | 450 |
        | Los Diablos Ski Mask | 460 |
        | All | 360 |

    Scenario: Resetting Money
      When User Buys "All"
      And User Resets Money
      Then Money Left is "999"
