# Group Dashboard	 

# Dashboard [/api/dashboard]

## Get TopActiveUsers [GET]
Get Top Active Users, with last 3 listings and a count of last's week applications

+ Response 200

	+ Body
	
			[
				{
					id: {users.id},
					createdAt: {users.created_at},
					name: {users.name},
					count: {count of applications in the past week's time}
					listings: [
						{listings.name},
						{listings.name},
						{listings.name}
					]
				},
				...
			]