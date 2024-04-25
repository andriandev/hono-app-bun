import { Hono } from 'hono';
import { etag } from 'hono/etag';
import { cors } from 'hono/cors';

const app = new Hono();

// Cors mode
app.use('*', cors());

// Cache code
app.use('*', etag());

app.use('*', async (c, next) => {
  // X-Response-Time header
  const start = Date.now();
  await next();
  const ms = Date.now() - start;

  c.header('X-Response-Time', `${ms}ms`);
});

export default app;
