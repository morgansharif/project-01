Working Titles:
Code Snippet Repository

What does it do?
This app provides a user to create their own repository of code snippets that are important to them and allows them to title and comments them.

(MVP)
A new visitor is promoted to create their own local snippet repository (Repo schema), which will have name, authentication(V2), and snippets , which is an array of an embedded schema Snippet. Snippet has attributes: title, which is a short name of the snippet; desc, which is a brief explanation of the code; and code, which is the actual code snippet text.

When a user is in their repository, they can create a new snippet by entering a title in a text field and clicking Create New Snippet.
The title field will be serialized and sent via ajax with method POST, to the server on an endpoint unique to the Repo id. The server appends the incoming request data as a Snippet schema to the Repo.snippets, and then responds with the new snippet to ajax to confirm success. Using that response the client prepends the snippet to the page.

Users can input information into title, desc, and code, and can update, or delete snippets.  Saving sends the title, desc, and code to be serialized and sent via POST to the server on an endpoint unique to the Repo id. The server appends any unique incoming data in the Snippet schema to the Repo.snippets, and then returns the snippet to ajax to confirm success. 


(MODELS)

Snippet
	title: String -  Short name for the snippet.
	desc: String - Brief description of what it does.
	code: String - The code snippet itself.

Repo
	name: String - name of the repository
	auth: String - a user-created access-code (V2)
	snippets: [ Snippet.schema ]
