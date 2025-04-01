import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const token = req.cookies.token

    if(!token) {
        return res.json({err: 'user not logged in'})
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next()
    } catch(err) {
        res.json({err: 'invalid token'})
    }

    
}