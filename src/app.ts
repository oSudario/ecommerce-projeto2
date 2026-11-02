import express from 'express';
import type { OrderController } from './controllers/OrderController';
import { container } from './container/container';
import { TYPES } from './container/types';

const app = express();
const orderController = container.get<OrderController>(TYPES.OrderController);
app.use(express.json());
app.post('/orders', orderController.processOrder);

export default app;
