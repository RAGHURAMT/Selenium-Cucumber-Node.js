Feature: BBC iPlayer Homepage

As a user
  I want to be able to see available programs
  So that I can quickly navigate to relevant content

  Background:
    Given I am on the BBC iPlayer homepage

  Scenario: Verify Homepage Title
    Then the page title should be "BBC iPlayer - Home"

  Scenario: The page has one iPlayer navigation menu
    Then there should be one iPlayer navigation menu

  Scenario: The page has at least 4 sections that each contain 1 carousel
    Then there should be at least 4 sections with carousels

  Scenario: Each carousel contains at least 4 programme items
    And there are carousels on the page
    Then each carousel should contain at least 4 programme items

  Scenario: More items in the carousel are shown when clicking a carousel arrow
    When I click the carousel arrow
    Then more items should be shown in the carousel

  Scenario: The relevant Playback page is displayed when an episode is clicked
    When I click on an episode in the carousel
    Then the episodes page should be displayed
