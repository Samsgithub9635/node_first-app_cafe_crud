import jwt from 'jsonwebtoken';

const jwtAuthMiddleware = (req, res, next)=>{
    // Extract the jwt token from the req header
    // jwt auth middleware
    const token = req.headers.autorization.split(' ')[1];
    if(!token) return res.staus(401).json({error: 'Unauthorized' });

    try{
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.userJWTPayload = decoded //the decoded payload came we want to send it to server
        next();
    }catch(err){
        console.error(err);
        res.staus(401).json({error: 'Invalid token!'});
    }

}


// Function to generate JWT token
const generateToken = (userData) => {
    //Generate a new JWT token using user data 
    return jwt.sign(userData, process.env.JWT_SECRET);
}

export default jwtAuthMiddleware;