Feature: Delete Specific Stub For User
@6
  Scenario: delete specific stub with id
    Given I am a user with prefix "shayanadc" and access_token "5ab59cff3efea5d9b89fd85131ab0a11fbafcawf"
    And I mock object id with "4edd40c86762e0fb12000003"
    And I create stub:
    """
    {
      "prefix": "shayanadc",
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
      "prefix": "shayanadc",
      "request" : {"meta": "hoi"},
      "response"  : {"message" : "bye"},
      "header" : {},
      "status" : 400,
      "method" : "GET",
      "endpoint" : "product"
    }
    """
    When open form "/stubs/4edd40c86762e0fb12000004" 
    And authenticate with "5ab59cff3efea5d9b89fd85131ab0a11fbafcawf"
    And I submit with method "DELETE":
    """
      {"meta" : "hi"}
    """
    Then I recieved ok
    And I recieved json:
    """
    {
          "message" : "deleted"
    }
    """
    And I could not find stub with id "4edd40c86762e0fb12000004"