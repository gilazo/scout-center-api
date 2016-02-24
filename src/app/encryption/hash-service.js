var crypto = require('crypto');

module.exports = () => {    
    var service = {
        hashValue: hashValue
    };
    
    return service;
    
    function hashValue(value) {
        return crypto.createHash('md5').update(value).digest('hex');
    }
};
