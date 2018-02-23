var users = [
    {
      name: "Carlo",
      surname: "Leonardi",
      id: 0,
      posts: [],
      requests: [],
      pending: [],
      friends: []
    },
    {
      name: "Mario",
      surname: "Merola",
      id: 1,
      posts: [],
      requests: [],
      pending: [],
      friends: []
    },
    {
      name: "Pippo",
      surname: "Baudo",
      id: 2,
      posts: [],
      requests: [],
      pending: [],
      friends: []
    },
    {
      name: "Gianni",
      surname: "Celeste",
      id: 3,
      posts: [],
      requests: [],
      pending: [],
      friends: []
    }];
var counter = 4;
var counterPost = 0;

exports.signup = function (newUser) {
    newUser.id = counter++;
    newUser.posts = [];
    newUser.requests = [];
    newUser.pending = [];
    newUser.friends = [];
    users.push(newUser);
}

exports.getAll = function () {
    return users;
}

exports.getAllTokens = function () {
    var tokens = [];
    for(var i=0; i< users.length; i++) {
        tokens.push(users[i].id);
    }
    return tokens;
}

exports.getUserById = function (id) {
    for(var i=0; i< users.length; i++) {
        if (users[i].id === id) {
            return users[i];
        }
    }
    return null;
}

exports.createPost = function (id, newPost) {
    var user = this.getUserById(id);
    newPost.id = counterPost++;
    if (user !== null) {
        user.posts.push(newPost);
    }
}

exports.friendlyRequest = function (idSend, idReceive) {
    if (this.areFriends(idSend, idReceive)){
        return;
    }
    var sender = this.getUserById(idSend);
    var receiver = this.getUserById(idReceive);
    if (sender != null && receiver != null) {
        sender.requests.push(idReceive);
        receiver.pending.push(idSend);
    }
    return;
}

exports.acceptRequest = function (idReceive, idSend) {
    if (this.areFriends(idSend, idReceive)){
        return;
    }
    var sender = this.getUserById(idSend);
    var receiver = this.getUserById(idReceive);
    if (sender != null && receiver != null) {
        var indexToRemovePending = receiver.pending.indexOf(idSend);
        receiver.pending.splice(indexToRemovePending, 1);

        var indexToRemoveRequest = sender.requests.indexOf(idReceive);
        sender.requests.splice(indexToRemoveRequest, 1);

        sender.friends.push(idReceive);
        receiver.friends.push(idSend);
    }
    return;
}

exports.showPosts = function (idSend, idToShowPosts) {
    var myFriend = this.getUserById(idToShowPosts);
    if(myFriend.friends.includes(idSend)) {
        return myFriend.posts;
    }
    return null;
}

exports.removePosts = function (id, postId) {
    var me = this.getUserById(id);
    for (var i=0; i < me.posts.length; i++) {
      if (postId === me.posts[i].id) {
          return me.posts.splice(i, 1);
      }
    }
    return null;
}

exports.deleteRequest = function (idSend, idReceive) {
    var sender = this.getUserById(idSend);
    var receiver = this.getUserById(idReceive);
    if (sender != null && receiver != null) {
        var indexToRemovePending = receiver.pending.indexOf(idSend);
        receiver.pending.splice(indexToRemovePending, 1);

        var indexToRemoveRequest = sender.requests.indexOf(idReceive);
        sender.requests.splice(indexToRemoveRequest, 1);
    }
}

exports.areFriends = function (id1, id2) {
    var user1 = this.getUserById(id1);
    return user1.friends.includes(id2);
}
