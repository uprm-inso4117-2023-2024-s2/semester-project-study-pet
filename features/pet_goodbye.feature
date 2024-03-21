Feature: Testing Pet Goodbye Component

  Scenario: Rendering of Pet Goodbye Component
    Given I navigate to the Pet Goodbye page
    Then I should see the Pet Goodbye component

  Scenario: Interaction with Pet Goodbye Component
    Given I navigate to the Pet Goodbye page
    When I click on the button
    Then I should see the next text box image

  Scenario: Check Initial State of Pet Goodbye Component
    Given I navigate to the Pet Goodbye page
    Then I should see the initial state of the Pet Goodbye component
