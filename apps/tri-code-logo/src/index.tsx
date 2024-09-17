import { Hono } from 'hono';
import { renderer } from './renderer';
import { getHexColor, fetchFont, getBaseUrl, makeFakeTri } from './utils';
import { buildSvg } from './tricode';

const app = new Hono();

app.use(renderer);

app.get('/:tri/:colorPrimary/:colorSecondary?', async (c) => {
  const tri = c.req.param('tri');
  const colorPrimary = getHexColor(c.req.param('colorPrimary'));
  const colorSecondary = getHexColor(c.req.param('colorSecondary') ?? 'white');

  if (!colorPrimary && !colorSecondary) return c.text('Invalid Colors', 500);
  if (!colorPrimary) return c.text('Invalid Primary Color', 500);
  if (!colorSecondary) return c.text('Invalid Primary Color', 500);

  const baseURL = getBaseUrl(c.req.url, c.req.path);
  const fontUrl = new URL('/static/UnitedSansSmCdBk.otf', baseURL);
  const font = await fetchFont(fontUrl);

  const svg = await buildSvg(font, tri, colorPrimary, colorSecondary);

  return c.html(svg);
});

export default app;
