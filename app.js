require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connectDB } = require('./src/infrastructure/repositories/database/mongo/config');

// 👉 importa swagger ANTES de usarlo
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/presentation/swagger.config');

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Swagger UI (puede ir antes o después de las rutas, pero antes del listen)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const productRoutes = require('./src/presentation/routes/product.routes');
const userRoutes = require('./src/presentation/routes/user.routes');
const roleRoutes = require('./src/presentation/routes/role.routes');
const authRoutes = require('./src/presentation/routes/auth.routes'); // Importar rutas de autenticación

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/auth', authRoutes); // Usar rutas de autenticación

// Rutas de Orders
const orderRoutes = require('./src/presentation/routes/order.routes');
app.use('/api/v1/orders', orderRoutes);

// Healthcheck Endpoint (para probar)
app.get('/api/v1/healthcheck', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
});
