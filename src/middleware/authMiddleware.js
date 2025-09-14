async function isAuthenticated(res,res,next) {
    if (req.session && req.session.userId) {
        return next();
    }else{
        res.redirect('/auth/login');
    }
}

export default {
    isAuthenticated
}