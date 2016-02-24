const crypto = require('crypto');

module.exports = () => {
    var service = {
        getSalt: getSalt
    };
    
    return service;
    
    function getSalt() {
        return crypto.randomBytes(128).toString('base64');
    }
};
