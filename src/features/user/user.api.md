# Group User	 

# User [/api/users]

## Get User [GET]
Get user information, including: companies, created listings and applications

+ Response 200

	+ Body

			{
				id: {users.id},
				name: {users.name},
				createdAt: {users.created_at},
				companies: [
					{
						id: {companies.id},
						createdAt: {companies.created_at},
						name: {companies.name},
						isContact: {is user a contact_user for the company? boolean.}
					},
					...
				],
				createdListings: [
					{
						id: {listings.id},
						createdAt: {listings.created_at},
						name: {listings.name},
						description: {listings.description}
					},
					...
				],
				applications: [
					{
						id: {applications.id},
						createdAt: {applications.created_at},
						listing: {
							id: {listings.id},
							name: {listings.name},
							description: {listings.description}
						},
						coverLetter: {applications.cover_letter}
					},
					...
				]
			}
