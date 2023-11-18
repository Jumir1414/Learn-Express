import express from 'express';
import mainRoute from './routes/mainRoute';

const app = express();
const port = 3500;

app.use(express.json());

// Use the mainRoute as a middleware
app.use('/hello', mainRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});