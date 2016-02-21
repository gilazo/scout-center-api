module.exports = {
    getUser: getUser,
    getUserRanks: getUserRanks,
    getUsers: getUsers,
    addUser: addUser,
    updateUser: updateUser    
};

function getUser(username, callback) {
    callback({});
}

function getUserRanks(id, callback) {
    callback([{}]);
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
