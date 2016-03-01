var User = require('../user/user-model');

module.exports = deps => {
    var auth = deps.auth;
    var config = deps.config;
    var db = deps.db;
    var hashService = deps.hashService;
    
    var service = {
        authorize: authorize,
        getCurrentUser: getCurrentUser
    };
    
    return service;
  
    function authorize(req, callback) {
        var credentials = getCurrentUser(req);
        
        if (!credentials || !credentials.name || !credentials.pass) return callback(false);
        
        db.connect(config.db.url);
        
        User.findOne({ 'username': credentials.name }, (err, user) => {
            db.connection.close();                        
            
            if (err || !user) return callback(false);
            
            var hash = hashService.hashValue(credentials.pass);
            hash = hashService.hashValue(`${hash}${user.salt}`);                                   
            
            if (hash !== user.password) return callback(false);
            
            callback(true);
        });
    }
    
    function getCurrentUser(req) {        
        return auth(req);
    }
};
