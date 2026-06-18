import { NextFunction , Response} from "express";
import { AuthRequest, IJwtPayload } from "../types/indexServer";
import Jwt  from "jsonwebtoken";
import User from "../models/user";

export const protect = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    let token: string | undefined;

    // check if the authorization header exists and starts with "Bearer"

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //extrct the token : "Bearer Token" -> "Token"
            token = req.headers.authorization.split(" ")[1];

            // verify the token using our secret
            // jwt.verify throws an error if the token is exipred or invalid
            const decoded = Jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as unknown as IJwtPayload;
            
            // Find the user in the database using the ID stored in the token
            const user = await User.findById(decoded.id).select("-password"); // "-select(-password)" means give me everythibg except the password

            if (!user) {
                res.status(401).json({ message: "User not found"});
                return;
            }

            // Attach the user to request object
            // Now any route using "protect" can access req.user
            req.user = user;

            next(); // Move to the next middleware or route handler
        } catch (error) {
            console.error(" Token verification failed:", error);
            res.status(401).json({message: "NOt authorized - invalid token"});
            return;
        }
    }

    // If no token foud at all, reject the request
    if (!token) {
        res.status(401).json({message: "Not authorized - no token provided"});
        return;
    }
};

// --- admin middleware----
// Must be after "protect" - it relies on req.user being set
// Checks if the logged-in user has admin privileges
export const admin = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
): void => {
    // req.user was set by the "protect" middleware above
    if (req.user && req.user.isAdmin) {
        next();// user is admin - allow access
    } else {
        res.status(403).json({ message: "Not authorized as admin"});
    }
};