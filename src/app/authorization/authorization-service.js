module.exports = {
    authorize: authorize
};

function authorize(credentials, callback) {
    if (!credentials || credentials.name !== 'scout' || credentials.pass !== 'boy123') {
        return callback(false);
    }
    
    callback(true);
}
