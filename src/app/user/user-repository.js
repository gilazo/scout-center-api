module.exports = {
    getUser: getUser,
    getUsers: getUsers   
};

function getUser(username, callback) {
    callback({});
}

function getUsers(id, callback) {
    callback([{}]);
}
