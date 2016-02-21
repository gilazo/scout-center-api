module.exports = {
    getUser: getUser,
    getUsers: getUsers,
    addUser: addUser,
    updateUser: updateUser
};

function getUser(username, callback) {
    callback({});
}

function getUsers(id, callback) {
    callback([{}]);
}

function addUser(user, callback) {
    callback();
}

function updateUser(user, callback) {
    callback();
}
