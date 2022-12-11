Feature: Update a User

	Scenario: Given a User data should create new user
		Given I send a PUT request to "/user/784a28b4-a777-47b8-b4ed-9fdc591d0d7d" with body:
		"""
		{
		  "name": "Jesus",
		  "roleId": "2b2fe2d7-252f-48c6-80c5-e80799f63f44"
		}
		"""
		Then the response status code should be 201
		Then the response should be empty
