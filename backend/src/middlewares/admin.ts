import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function adminMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   try {
      // Todo add authentication with jwt logic here
      const token: string | undefined = req?.headers?.authorization;

      if (!token) {
         return res.status(400).json({
            message: 'Access token not found',
         });
      }

      const words: string[] = token.split(' ');
      const jwtToken: string = words[1];

      let decoded: JwtPayload;
      try {
         decoded = jwt.verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
      } catch (error) {
         console.error('JWT Verification Error:', error);
         return res.status(401).json({ message: 'Invalid or expired token' });
      }

      const { username } = decoded;

      if (!username) {
         return res.status(403).json({ message: 'You are not authenticated' });
      }

      res.locals.username = username;

      next();
   } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
   }
}
