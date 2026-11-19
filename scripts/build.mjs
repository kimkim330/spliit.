// 사용법: node scripts/build.mjs <web|app>
// <target>/ 와 shared/ 를 <target>/dist/ 로 모아, 그 폴더만으로 배포할 수 있게 만든다.
import { cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const target = process.argv[2];
if (!['web', 'app'].includes(target)) {
  console.error('사용법: node scripts/build.mjs <web|app>');
  process.exit(1);
}

const srcDir = join(root, target);
const outDir = join(srcDir, 'dist');
rmSync(outDir, { recursive: true, force: true });

for (const name of readdirSync(srcDir)) {
  if (name === 'dist' || name === 'package.json' || name === 'node_modules') continue;
  cpSync(join(srcDir, name), join(outDir, name), { recursive: true });
}
cpSync(join(root, 'shared'), join(outDir, 'shared'), { recursive: true });

// 개발용 경로(../shared/)를 배포용 경로(./shared/)로 바꾼다.
function rewrite(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { rewrite(p); continue; }
    if (!name.endsWith('.html')) continue;
    const html = readFileSync(p, 'utf8');
    writeFileSync(p, html.replaceAll('../shared/', './shared/'));
  }
}
rewrite(outDir);

console.log(`${target} 빌드 완료 → ${outDir}`);
