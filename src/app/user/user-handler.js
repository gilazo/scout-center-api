var User = require('./user-model');

module.exports = deps => {
    var app = deps.express();
    var bodyParser = deps.bodyParser;
    var hashService = deps.hashService;
    var saltService = deps.saltService;
    var decryptService = deps.decryptService;
    
    app.use(bodyParser.json());
    
    app.get('/', (req, res) => {
        decryptService.decryptAuthorizationHeader(req, credentials => {
            if (!credentials) return res.status(404).end();                        

            User.findOne({ 'username': credentials.name }, (err, user) => {
                if (err || !user) return res.status(404).end();
                
                user = user.toObject();
                
                ['salt', 'password']
                    .filter(property => user.hasOwnProperty(property))
                    .forEach(property => delete user[property]);                    
                
                res.status(302).send(user); 
            });
        }); 
    });
    
    app.get('/ranks', (req, res) => {
        res.status(302).send([{ name: 'purple' }]);
    });
    
    app.get('/friends', (req, res) => {
        res.status(302).send([{ username: 'friend@test.com'}]);
    });
    
    app.post('/', (req, res) => {
        var user = new User(req.body);
        user.password = hashService.hashValue(user.password);
        user.salt = saltService.getSalt();
        user.password = hashService.hashValue(`${user.password}${user.salt}`);        
           
        user.save(err => {            
            if (err) {
                if (err.code === 11000) {
                    res.status(409).end();
                }
            }
            
            res.status(201).end();
        });
    });
    
    app.put('/', (req, res) => {
        res.status(200).end();
    });
    
    return app;
};
