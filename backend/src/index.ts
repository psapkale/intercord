import express, { Request, Response } from 'express';

const app = express();

// Define a route
app.get('/', (req: Request, res: Response) => {
   res.send('Hello');
});

// Start the server
app.listen(3000, () => {
   console.log('Server listening on port 3000');
});
