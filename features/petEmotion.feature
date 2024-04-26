
Feature: PetEmotion

  Scenario: Display baby stage image when growth level is 1
    Given the pet's growth level is 1
    When the image selection logic is executed
    Then the current image should be the baby stage image

  Scenario: Display young stage image when growth level is 2
    Given the pet's growth level is 2
    When the image selection logic is executed
    Then the current image should be the young stage image

  Scenario: Display specific image based on growth level and happiness level
    Given the pet's growth level is 3
    And the pet's happiness level is 80
    When the image selection logic is executed
    Then the current image should be the happy adult frog image

  Scenario: Display sad adult frog image when happiness level is low
    Given the pet's growth level is 3
    And the pet's happiness level is 20
    When the image selection logic is executed
    Then the current image should be the sad adult frog image

  Scenario: Display default image when care mistakes are >= 10
    Given the pet's care mistakes are 10
    When the image selection logic is executed
    Then the current image should 

