import { toHex } from 'color2k';

export function getBaseUrl(url: string, path: string) {
  return url.replace(path, '');
}

export async function fetchFont(url: string | URL): Promise<ArrayBuffer> {
  const fontResponse = await fetch(url);
  return await fontResponse.arrayBuffer();
}

export function makeFakeTri(length: number = 3) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function getHexColor(color: string) {
  try {
    return toHex(`#${color}`);
  } catch (error) {
    return null;
  }
}
