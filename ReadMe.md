
## get facebook friends


## Installation

    npm install fake-facebook

## facebook and friends!

## Usage

```js
var fakeFacebook = require('fake-facebook');

fakeFacebook.signup({name: "Nino", surname: "D'Angelo"});
console.log(fakeFacebook.getUserById(1)); // single user
console.log(fakeFacebook.getAll()); // list of Users
console.log(fakeFacebook.getAllTokens()); // list of tokens
fakeFacebook.createPost(1, { title: 'New Post'});
fakeFacebook.removePosts(1, 0);
fakeFacebook.friendlyRequest(1, 2);
fakeFacebook.acceptRequest(1, 0);
fakeFacebook.deleteRequest(3, 1);

```
