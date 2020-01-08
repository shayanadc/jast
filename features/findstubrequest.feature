Feature: Find Request In DB
  @3
  Scenario: find and return alike stub with request
    Given I am a user with prefix "shayanadc" and access_token "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l"
    And I create stub:
    """
    {
      "request"  : {},
      "response"  : {"message" : "OK"},
      "header" : {},
      "status" : "200",
      "method" : "GET",
      "endpoint" : "shit/123"
    }
    """
    When open form "/shayanadc/shit/123" 
    And authenticate with "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l" 
    And I submit with method "GET":
    """
      
    """
    Then I recieved ok
    And I recieved json:
    """
      {"message" : "OK"}
    """
  @4
  Scenario: get failed to find
    Given I am a user with prefix "shayanadc" and access_token "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l"
    And I create stub:
    """
    {
      "prefix": "shayanadc",
      "request" : {"meta": "hello"},
      "response"  : {"message" : "ok"},
      "header" : {},
      "status" : "200",
      "method" : "GET",
      "endpoint" : "books"
    }
    """
    When open form "/shayanadc/books"
    And authenticate with "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l" 
    And I submit with method "POST":
    """
      {"meta" : "hello"}
    """
    Then I recieved not ok
  @34
  Scenario: find and return alike stub with request
    Given I am a user with prefix "shayanadc" and access_token "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l"
    And I create stub:
    """
    {
      "request"  : {"message" : "hi"},
      "response"  : {"message" : "OK"},
      "header" : {},
      "status" : "200",
      "method" : "POST",
      "endpoint" : "shit/123"
    }
    """
    When open form "/shayanadc/shit/123" 
    And authenticate with "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l" 
    And I submit with method "POST":
    """
    {"message" : "hi"}
    """
    Then I recieved ok
    And I recieved json:
    """
      {"message" : "OK"}
    """

    @7
  Scenario: find and return test request
    Given I am a user with prefix "shayanadc" and access_token "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l"
    When open form "/shayanadc/jast_mock_api" 
    And authenticate with "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l" 
    And I submit with method "GET":
    """
      {"meta" : "hi"}
    """
    Then I recieved ok
    And I recieved json:
    """
      {"message" : "test is ok"}
    """