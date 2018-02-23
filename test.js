var assert = require('assert');
var fakeFacebook = require('./index');


describe('Signup', function() {
  it('try to create a new user',
    function() {
      var lengthOfUsers = fakeFacebook.getAll().length;
      fakeFacebook.signup({name: "Nino", surname: "D'Angelo"})
      assert.equal(fakeFacebook.getAll().length, lengthOfUsers + 1);
  });
});

describe('Tokens', function() {
  it('try to create a new user',
    function() {
      assert.equal(typeof fakeFacebook.getAllTokens(), 'object');
      assert.equal(fakeFacebook.getAllTokens().length, 5);
  });
});

describe('Posts', function() {
  it('try to create a new post',
    function() {
      fakeFacebook.createPost(1, { title: 'New Post'});
      assert.equal(fakeFacebook.getUserById(1).posts.length, 1);
  });
  it('try to delete a new post',
    function() {
      fakeFacebook.createPost(1, { title: 'New Post'})
      fakeFacebook.removePosts(1, 0);
      assert.equal(fakeFacebook.getUserById(1).posts.length, 1);
  });
});

describe('friendly', function() {
    it('new request friendly',
      function() {
      fakeFacebook.friendlyRequest(1, 2);
      assert.equal(fakeFacebook.getUserById(1).requests.includes(2), true);
      assert.equal(fakeFacebook.getUserById(2).pending.includes(1), true);
    });

    it('new request friendly in not exists user',
      function() {
      fakeFacebook.friendlyRequest(1, 7);
      assert.equal(fakeFacebook.getUserById(1).requests.includes(7), false);
      assert.equal(fakeFacebook.getUserById(7), null);
    });

    it('accept request friendly',
      function() {
      fakeFacebook.friendlyRequest(0, 1);
      fakeFacebook.acceptRequest(1, 0);
      assert.equal(fakeFacebook.getUserById(0).requests.includes(1), false);
      assert.equal(fakeFacebook.getUserById(1).pending.includes(0), false);
      assert.equal(fakeFacebook.getUserById(0).friends.includes(1), true);
      assert.equal(fakeFacebook.getUserById(1).friends.includes(0), true);
      assert.equal(fakeFacebook.areFriends(0, 1), true);
      assert.equal(fakeFacebook.areFriends(1, 0), true);
    });

    it('delete request friendly',
      function() {
      fakeFacebook.friendlyRequest(3, 1);
      fakeFacebook.deleteRequest(3, 1);
      assert.equal(fakeFacebook.getUserById(3).requests.includes(1), false);
      assert.equal(fakeFacebook.getUserById(1).pending.includes(3), false);
      assert.equal(fakeFacebook.areFriends(3, 1), false);
    });
});
