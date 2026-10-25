import "dotenv/config";
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';
import mailRoutes from './routes/file.routes.js'

const app = express();


app.get('/', (req, res) => {
  res.send('codemailer API is running');
});

const PORT = 5000;
app.use(express.json());


app.use('/api/auth', authRoutes); //mounting the auth routes to the app
app.use('/api/files', fileRoutes); //mounting the auth routes to the app
app.use('/api/files', mailRoutes); //mounting the auth routes to the app


connectDB();
// port is a variable so use $
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});