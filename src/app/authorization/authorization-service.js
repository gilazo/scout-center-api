var User = require('../user/user-model');

module.exports = deps => {
    var hashService = deps.hashService;
    
    var service = {
        authorize: authorize
    };
    
    return service;
  
    function authorize(credentials, callback) {        
        if (!credentials || !credentials.name || !credentials.pass) return callback(false);        
        
        User.findOne({ 'username': credentials.name }, (err, user) => {            
            if (err || !user) return callback(false);
            
            var hash = hashService.hashValue(credentials.pass);
            hash = hashService.hashValue(`${hash}${user.salt}`);                                   
            
            if (hash !== user.password) return callback(false);
            
            callback(true);
        });
    }
};
