# API Reference

- [api/post](#api/post)
	- Verbs: 'POST'
	- POST:
		takes ```{
			title: string;
			content: string;
			cats?: string[];
		}```
		and creates a post with the given title, content, and categories with the author as the user who sent the request.
	- [api/post/{id}](#api/post/{id})
		- Verbs: 'GET'
		- GET:
			returns the post and author with the given id.
- [api/comment](#api/comment)
  - Verbs: 'POST'
  - POST:
    	takes ```{
			postId: string;
			parentId?: string;
			content: string;
		}```
		and creates a comment with the given content under the postId. If parentId is given, the comment will be a reply to the comment with the given parentId.
  - [api/comment/{post_id}](#api/comment/{post_id})
    - Verbs: 'GET'
    - GET:
  		returns all comments under the post with the given post_id.
- [api/trending](#api/trending)
- [api/register](#api/register)
  - Verbs: 'POST'
  - POST:
		takes ```{
			username: string;
			password: string;
			email: string;
		}```
		and creates a user with the given username, password, and email. The password is hashed and salted 12 times and only the hash is stored.
- [api/profile/{id}](#api/profile/{id})
  - Verbs: 'GET'
  - GET:
		returns the profile of the user with the given id. The profile contains the user's username, email, and posts, comments, and likes.
- [api/auth](#api/auth)
	- Handled by Next-Auth. Refer to [NextAuth Documentation for Obelisk](/nextauth-01.doc.md)


