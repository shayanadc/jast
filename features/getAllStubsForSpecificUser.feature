Feature: Find All Stubs For User
@5
  Scenario: get all user stubs list
    Given I am a user with prefix "shayanadc" and access_token "8ba59cff3efea5d9b89fd85131ab0a11fbafcawf"
    And I mock object id with "4edd40c86762e0fb12000003"
    And I create stub:
    """
    {
      "request" : {"meta": "hi"},
      "response"  : {"message" : "ok"},
      "header" : {},
      "status" : 200,
      "method" : "POST",
      "endpoint" : "books"
    }
    """
    And I mock object id with "4edd40c86762e0fb12000004"
    And I create stub:
    """
    {
      "request" : {"meta": "hoi"},
      "response"  : {"message" : "bye"},
      "header" : {},
      "status" : 400,
      "method" : "GET",
      "endpoint" : "product"
    }
    """
    And I am a user with prefix "amir" and access_token "8ba59cff42dea5d9b89fd85515ab0a11fbafc45l"
    And I mock object id with "4edd40c86762e0fb12000005"
    And I create stub:
    """
    {
      "request" : {"meta": "hoi"},
      "response"  : {"message" : "bye"},
      "header" : {},
      "status" : 400,
      "method" : "GET",
      "endpoint" : "product"
    }
    """
    When open form "/stubs" 
    And authenticate with "8ba59cff3efea5d9b89fd85131ab0a11fbafcawf"
    And I submit with method "GET":
    """
      {"meta" : "hi"}
    """
    Then I recieved ok
    And I recieved json:
    """
      [
        {
          "_id" : "4edd40c86762e0fb12000003",
          "request": { "meta": "hi" },
          "response": { "message": "ok" },
          "method": "POST",
          "endpoint": "books",
          "status" : 200
        },
        {
          "_id" : "4edd40c86762e0fb12000004",
          "request": { "meta": "hoi" },
          "response": { "message": "bye" },
          "method": "GET",
          "endpoint": "product",
          "status" : 400
        }
      ]
    """