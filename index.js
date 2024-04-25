import { Hono } from 'hono';
import middleware from '@middleware/default';
import routes from '@router/routes';
import { resJSON } from '@helpers/function';

// Config
const app = new Hono();
const appPort = process.env.APP_PORT || 3001;
const appNode = process.env.APP_NODE || 'development';

// Middleware
app.route('/', middleware);

// Routes
app.route('/', routes);

// Custom Not Found Message
app.notFound((c) => {
  const resData = resJSON({ statusCode: 404, message: 'Page not found' });
  const statusCode = resData?.status;

  return c.json(resData, statusCode);
});

// Error handling
app.onError((err, c) => {
  const resData = resJSON({
    statusCode: 500,
    message: 'Internal server error',
  });
  const statusCode = resData?.status;

  if (appNode != 'production') {
    resData.message = err?.message;
  }

  return c.json(resData, statusCode);
});

// Run serve
const appOptions = {
  fetch: app.fetch,
  port: appPort,
};

export default appOptions;
