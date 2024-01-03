import { Request, Response, NextFunction } from 'express';

async function studentMiddleware(
   req: Request,
   res: Response,
   next: NextFunction
) {
   // Todo add authentication with jwt logic here

   next();
}

module.exports = studentMiddleware;
