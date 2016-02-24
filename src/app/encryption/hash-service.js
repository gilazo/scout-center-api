const crypto = require('crypto');

module.exports = () => {
    const hash = crypto.createHash('md5');
    
    const service = {
        hashValue: hashValue
    };
    
    return service;
    
    function hashValue(value) {
        return hash.update(value).digest('hex');
    }
};
