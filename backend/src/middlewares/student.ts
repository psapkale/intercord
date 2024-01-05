import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

async function studentMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   // Todo add authentication with jwt logic here
   const token: string | undefined = req.headers.authorization;
   if (!token) {
      return;
   }
   const words: string[] = token.split(' ');
   const jwtToken: string = words[1];

   const decoded: JwtPayload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET
   ) as JwtPayload;

   const { username } = decoded;

   if (!username) {
      return res.status(403).json({ message: 'You are not authenticated' });
   }

   next();
}

module.exports = studentMiddleware;
