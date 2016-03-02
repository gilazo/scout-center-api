module.exports = deps => {
    var auth = deps.auth;
    
    var service = {
        decryptAuthorizationHeader: decryptAuthorizationHeader
    };
    
    return service;
    
    function decryptAuthorizationHeader(req, callback) {        
        callback(auth(req));
    }
};
