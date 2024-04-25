import { Hono } from 'hono';
import { Home, Page } from '@controller/home';

const app = new Hono();

app.get('/', Home);
app.get('/:slug', Page);

export default app;
