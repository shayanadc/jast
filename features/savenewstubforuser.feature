Feature: Save New Stub For User
  @1
  Scenario: save existence user with stub
    Given I am a user with prefix "shayanadc" and access_token "7ba59cff3efea5d9b89fd85131ab0a11fbafcawf"
    When open form "/stubs"
    And authenticate with "7ba59cff3efea5d9b89fd85131ab0a11fbafcawf"
    And I submit with method "POST":
    """
      {
      "request": { "meta": "cat 1" },
      "response": { "message": "change" },
      "method": "PUT",
      "endpoint": "/category",
      "status" : 200
      }
    """
    Then I recieved ok
    And I recieved json:
    """
      {
        "message" : "new one saved!!",
        "prefix" : "shayanadc",
        "items" : [
              {
                "request": { "meta": "cat 1"},
                "response": { "message": "change"},
                "method": "PUT",
                "endpoint": "category",
                "status" : 200
                }
            ]
      }
    """

  @2
  Scenario: want to save wrong data
    Given I am a user with prefix "shayanadc" and access_token "7ba59cff3efea5d9b89fd85131ab0a11fbafcawf"
    When open form "/stubs"
    And authenticate with "7ba59cff3efea5d9b89fd85131ab0a11fbafcawf"
    And I submit with method "POST":
    """
      {
      "request": "value",
      "response": "saf",
      "method": "PUT",
      "endpoint": "category",
      "status" : 200
      }
    """
    Then I recieved not ok
    And I recieved json:
    """
      {
        "errors" : [
          "request should be json type",
          "response should be json type"
        ]
      }
    """