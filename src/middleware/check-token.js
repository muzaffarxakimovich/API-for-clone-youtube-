import JWT from "jsonwebtoken"

export default (req, res, next) => {
        const { token } = req.headers
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "unauthorized"
            })
        }
        const user = JWT.verify(token, process.env.SECRET_KEY)
        req.user = user
        console.log(user);
        next()

    
}