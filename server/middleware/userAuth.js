import jwt from 'jsonwebtoken'

export const getUser=async(req , res , next )=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:"token expired"});

        }

        const userData=jwt.verify(token,process.env.SECRET_TEXT);
        req.user=userData;
        next()
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}