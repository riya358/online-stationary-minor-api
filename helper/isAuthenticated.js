const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    if (authHeader == null) return
    next({ status: 401, message: 'authorization missing' });

    next();

    // jwt.verify(authHeader, Constant.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return next({ status: 403, message: err.message })
    //     req.user = user;
    //     next()
    // })
}