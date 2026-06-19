import { writeFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("❌ REPLICATE_API_TOKEN manquant. export REPLICATE_API_TOKEN=... puis relancer.");
  process.exit(1);
}

const MODEL = "black-forest-labs/flux-schnell";
const ENDPOINT = `https://api.replicate.com/v1/models/${MODEL}/predictions`;
const OUT_DIR = "public/images";

// Palette/lumière commune : atelier chaud, lumière dorée, photoréaliste
const COMMON =
  "warm golden workshop light, cinematic automotive photography, dark teal and amber palette, candid, natural imperfections, 35mm film grain, photorealistic, 4K, no plastic look, no CGI, no text, no watermark";

const IMAGES = [
  {
    file: "hero.webp",
    aspect_ratio: "16:9",
    prompt: `Interior of a clean professional car repair garage, a mechanic in dark uniform working under a lifted car on a hoist, sparks of warm light, ${COMMON}`,
  },
  {
    file: "service-tires.webp",
    aspect_ratio: "4:3",
    prompt: `Close-up of stacked new car tires and a mechanic's hands mounting a tire on an alloy wheel in a garage, ${COMMON}`,
  },
  {
    file: "service-brakes.webp",
    aspect_ratio: "4:3",
    prompt: `Mechanic hands replacing a brake disc and caliper on a car wheel hub, tools nearby, detailed metal parts, ${COMMON}`,
  },
  {
    file: "service-alignment.webp",
    aspect_ratio: "4:3",
    prompt: `Mechanic pouring fresh motor oil during an oil change service under a car engine bay, focused hands, ${COMMON}`,
  },
  {
    file: "editorial.webp",
    aspect_ratio: "3:2",
    prompt: `Portrait of an experienced car mechanic standing confidently in his garage, arms crossed, tools and lifted car behind, ${COMMON}`,
  },
  {
    file: "cta.webp",
    aspect_ratio: "16:9",
    prompt: `A car parked inside a tidy auto repair shop at dusk, warm garage lights glowing, wide angle, ${COMMON}`,
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function exists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function generate(item, isTest = false) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    body: JSON.stringify({
      input: {
        prompt: item.prompt,
        aspect_ratio: item.aspect_ratio,
        num_outputs: 1,
        output_format: "webp",
        output_quality: 90,
        go_fast: true,
        num_inference_steps: 4,
      },
    }),
  });

  if (res.status === 429) {
    const retry = Number(res.headers.get("retry-after") || 10);
    console.log(`⏳ 429 — attente ${retry + 2}s...`);
    await sleep((retry + 2) * 1000);
    return generate(item, isTest);
  }

  if (!res.ok) {
    const txt = await res.text();
    console.error(`❌ Erreur ${res.status} pour ${item.file}: ${txt}`);
    if (res.status === 402) {
      console.error("→ 402 : pas de crédit Replicate, ou crédit sur un autre compte que la clé.");
    }
    process.exit(1);
  }

  const data = await res.json();
  const url = Array.isArray(data.output) ? data.output[0] : data.output;
  if (!url) {
    console.error(`❌ Pas d'URL de sortie pour ${item.file}:`, JSON.stringify(data));
    process.exit(1);
  }
  const img = await fetch(url);
  const buf = Buffer.from(await img.arrayBuffer());
  await writeFile(`${OUT_DIR}/${item.file}`, buf);
  console.log(`✅ ${item.file} (${buf.length} octets)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  // Test : première image seulement
  const first = IMAGES[0];
  if (await exists(`${OUT_DIR}/${first.file}`)) {
    console.log(`↷ ${first.file} déjà présent, test ignoré.`);
  } else {
    console.log("🔬 Test sur la 1re image...");
    await generate(first, true);
    console.log("✅ Test OK — génération du reste.");
    await sleep(12000);
  }

  for (const item of IMAGES.slice(1)) {
    if (await exists(`${OUT_DIR}/${item.file}`)) {
      console.log(`↷ ${item.file} déjà présent, ignoré.`);
      continue;
    }
    await generate(item);
    await sleep(12000);
  }

  console.log("🎉 Terminé.");
}

main();
