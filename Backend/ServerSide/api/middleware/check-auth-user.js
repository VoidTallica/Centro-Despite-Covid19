const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        //split(" ")[1] para separar o bearer da key
        const decoded = jwt.verify(token, process.env.JWT_KEY_USER)
        req.userData = decoded;
        next();
    } catch (error) {
        try{
            const token = req.headers.authorization.split(" ")[1];
            //split(" ")[1] para separar o bearer da key
            const decoded = jwt.verify(token, process.env.JWT_KEY_ADMIN)
            req.userData = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                message : 'Auth failed'
            });
        }
    };
}