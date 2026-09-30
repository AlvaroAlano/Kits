import { defineConfig } from 'astro/config';

export default defineConfig({
  // No GitHub Pages o site fica numa subpasta (/Kits); a publicação define BASE_PATH.
  // No computador fica na raiz: http://localhost:4321/
  base: process.env.BASE_PATH || '/',
  // 'class' permite que uma peça estilize a raiz de um componente filho (ex.: <Foto class="hero__foto">)
  scopedStyleStrategy: 'class',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
