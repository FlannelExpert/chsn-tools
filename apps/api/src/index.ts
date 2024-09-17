import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';
import { fetchFont, getHexColor } from './utils'
import { buildSvg } from './tricode';

export type Env = {
  FONT_URL: string,
  DATABASE_URL: string,
  DATABASE_AUTH_TOKEN: string,
}

export const router = new Hono<{ Bindings: Env }>()

router.get('/', (c) => {
  return c.text('Hello Hono!')
})

router.get('/logo/tri/:tri/:colorPrimary/:colorSecondary?', async (c) => {
  const tri = c.req.param('tri');
  const colorPrimary = getHexColor(c.req.param('colorPrimary'));
  const colorSecondary = getHexColor(c.req.param('colorSecondary') ?? 'white');

  // return c.json({tri, colorPrimary, colorSecondary})
  if (!colorPrimary && !colorSecondary) return c.text('Invalid Colors', 500);
  if (!colorPrimary) return c.text('Invalid Primary Color', 500);
  if (!colorSecondary) return c.text('Invalid Primary Color', 500);

  const font = await fetchFont(c.env.FONT_URL);
  const svg = await buildSvg(font, tri, colorPrimary, colorSecondary);

  return c.text(svg);
})


export const api = new Hono().route('/', router);

export type Router = typeof router;



// const app = new Hono<{ Bindings: Env }>()

// app.get('/', (c) => {
//   const test = `${c.env.DATABASE_URL}`
//   return c.text(test)
// })

// app.get('/logo/tri/:tri/:colorPrimary/:colorSecondary?', async (c) => {
//   const tri = c.req.param('tri');
//   const colorPrimary = getHexColor(c.req.param('colorPrimary'));
//   const colorSecondary = getHexColor(c.req.param('colorSecondary') ?? 'white');

//   if (!colorPrimary && !colorSecondary) return c.text('Invalid Colors', 500);
//   if (!colorPrimary) return c.text('Invalid Primary Color', 500);
//   if (!colorSecondary) return c.text('Invalid Primary Color', 500);

//   // const font = await fetchFont(fontUrl);
// })

export default router
