module.exports = () => {
    var service = {
        getRanks: getRanks
    };
    
    return service;
    
    function getRanks(callback) {
        callback([{}]);
    }    
};
