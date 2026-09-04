/**
 * Regenerates public/ brand assets from the original Squarespace CDN uploads.
 * Runs before `next build` only when public/tiger-head.png is missing
 * (i.e. a source-only deploy). In the git repo the outputs are committed,
 * so this is a no-op there.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const CDN = "https://images.squarespace-cdn.com/content/v1/67a184b1b896914951f20157/";
const logos = {
  "mp-copiers": "790c7d27-feb8-4b91-aa2b-a2ad45b6da6d/285912_fea7b73d267045d9a3fe205fb376e65a%7Emv2.png",
  "water-runner": "6edf744d-2046-4346-842f-a61e6b5042d8/Untitled+design+%2883%29.png",
  "tra-cal": "7efc3870-d851-4147-bd21-26ef3b6105a8/Untitled+design+%2885%29.png",
  "chiro-jobs": "0988c891-dae7-4379-afb6-a4e89ef27414/CHP+%285%29.png",
  "american-discount-fence": "ca13f699-fe26-4ddb-ac6d-66c453a0ff10/Tiger+Digital+-7.png",
  "wright-choice-therapy": "6c1b50cf-3315-433e-9f2b-3ddc56453c36/Untitled+design+%2864%29.png",
  "tea-connect": "694f9e52-fd07-459d-90a8-79018e324c8c/Tiger+Digital+-3.png",
  "barrio-costero": "f33eafa2-8e27-439a-a07b-74fc15163ff6/Untitled+design+%2862%29.png",
  "cherry-hill-painting": "07963463-0c52-45f7-97f4-9b68e7a6cd27/CHP+%284%29.png",
  "anderson-market": "7a6ae459-bc0e-4504-a490-b95ed02a64a4/Tiger+Digital+-10.png",
  "reyla": "2d6d2092-5b80-45c9-9403-bd3e5c9b76f7/Untitled+design+%2861%29.png",
  "ryfe": "35932a1c-6756-44d7-96ea-636908e8fa70/CHP+%286%29.png",
  "laylow": "fb72c22a-7c05-4205-b45f-d91681c865ac/Untitled+design+%2863%29.png",
  "miss-to-mrs": "bbe3f91d-62af-45cb-bd75-1c285302d643/Tiger+Digital+-2.png",
  "live-long": "fae8a7e7-67e7-4390-9d4d-97002e2b1455/Tiger+Digital+-4.png",
  "inspiration-mobility": "be63c7de-d2b9-49d5-838f-c860657b7748/Untitled+design+%2886%29.png",
  "dkp-gastro": "6b042a76-51a2-4b5b-8424-1822de4b20dc/Untitled+design+%2888%29.png",
};
const team = {
  joe: "e29ac263-e711-47f2-92eb-e66540196eec/joe+final.png",
  marvin: "7de0c4db-e8f4-43ca-990e-e2ea5123a31e/marvin+final.png",
  kyle: "353e523b-fd43-4119-924b-c13625bb7c3f/kyle+final.png",
  santiago: "c2b1df53-57e6-4a48-b7e5-0960446d1e0d/santi+final.png",
  gina: "2e5efc0e-49f1-42bc-8ec6-8cb6011839e7/Gina.png",
};
const LOGO = "198dcc8b-e78e-4e9c-9dba-0c3dfef8013a/tiger+logo+main.png";

/**
 * Clients added after the Squarespace era. Their logos are not in Joe's old
 * uploads, so these are absolute URLs on the clients' own sites. Same
 * processing as the CDN logos: trim, fit to the tile, palette PNG.
 */
const externalLogos = {
  "willco-air-conditioning": "https://willcoairconditioning.com/wp-content/uploads/2025/02/Group.svg",
  "resource-renewal":
    "https://images.squarespace-cdn.com/content/v1/685ac2832036200192ff3403/95903e38-9e63-4ccc-856d-c341fcfcff2c/Artboard+1.png?format=1500w",
  "viperjet-drain": "https://static.wixstatic.com/media/4ccdaa_f7e871ab67744927be028e1e5957cfdc~mv2.png",
};

const NAVY = { r: 0x1f, g: 0x33, b: 0x63 };
const SKY = { r: 0x9f, g: 0xb9, b: 0xd9 };

if (existsSync("public/logo.png")) {
  console.log("assets present, skipping fetch");
  process.exit(0);
}

async function get(path, w = 1000) {
  const res = await fetch(`${CDN}${path}?format=${w}w`, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return Buffer.from(await res.arrayBuffer());
}

mkdirSync("public/clients", { recursive: true });
mkdirSync("public/team", { recursive: true });
mkdirSync("public/results", { recursive: true });

/**
 * The headshots ship from Squarespace with the old orange oval baked into the
 * pixels. Repaint that ring navy without touching the person inside it.
 *
 * Colour alone is not a safe test: skin, red hair and warm backgrounds all sit
 * close enough to the ring's hue to get caught, which turns faces blotchy. The
 * reliable signal is geometry. Each photo is trimmed tight to its oval, so in
 * normalised elliptical coordinates the ring sits at rho 0.97 to 1.13 while no
 * part of a face reaches past 0.60. Gate on rho first, then on orange hue, and
 * ramp by saturation so the antialiased edge of the stroke stays smooth.
 */
async function recolourRing(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  for (let y = 0; y < h; y++) {
    const dy = (y - h / 2) / (h / 2);
    for (let x = 0; x < w; x++) {
      const dx = (x - w / 2) / (w / 2);
      if (Math.hypot(dx, dy) < 0.92) continue; // well clear of the face
      const i = (y * w + x) * ch;
      const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
      if (mx === 0 || d === 0) continue;
      const sat = d / mx;
      if (sat < 0.35) continue;
      let hue;
      if (mx === r) hue = ((60 * ((g - b) / d)) % 360 + 360) % 360;
      else if (mx === g) hue = 60 * ((b - r) / d) + 120;
      else hue = 60 * ((r - g) / d) + 240;
      if (hue < 8 || hue > 50) continue; // orange only
      const t = Math.min(1, (sat - 0.35) / 0.2);
      data[i] = Math.round(data[i] * (1 - t) + NAVY.r * t);
      data[i + 1] = Math.round(data[i + 1] * (1 - t) + NAVY.g * t);
      data[i + 2] = Math.round(data[i + 2] * (1 - t) + NAVY.b * t);
    }
  }
  return sharp(data, { raw: { width: w, height: h, channels: ch } }).png().toBuffer();
}

for (const [name, path] of Object.entries(logos)) {
  const buf = await get(path);
  const out = await sharp(buf).ensureAlpha().trim().resize({ width: 260, height: 130, fit: "inside" }).png({ palette: true, colors: 64 }).toBuffer();
  writeFileSync(`public/clients/${name}.png`, out);
  console.log("logo", name);
}
for (const [name, url] of Object.entries(externalLogos)) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // libvips rasterises SVG at its nominal size, which is far too small here.
  const input = new URL(url).pathname.endsWith(".svg")
    ? sharp(buf, { density: 300 })
    : sharp(buf);
  const out = await input
    .ensureAlpha()
    .trim()
    .resize({ width: 260, height: 130, fit: "inside" })
    .png({ palette: true, colors: 64 })
    .toBuffer();
  writeFileSync(`public/clients/${name}.png`, out);
  console.log("logo", name);
}
for (const [name, path] of Object.entries(team)) {
  const buf = await get(path, 1500);
  const trimmed = await sharp(buf).ensureAlpha().trim().resize({ width: 480, height: 800, fit: "inside" }).png().toBuffer();
  const out = await sharp(await recolourRing(trimmed)).webp({ quality: 72 }).toBuffer();
  writeFileSync(`public/team/${name}.webp`, out);
  console.log("team", name);
}
const SEAL = 1024;
const INNER_R = 431; // inner ring radius
const FILL = 0.86; // how much of the inner circle the head occupies

// A circle drawn by hand never closes perfectly; this wobbles the radius so the
// ring reads as pressed ink rather than a vector stroke.
function wobble(cx, cy, r, amp, seed) {
  const pts = [];
  const N = 260;
  for (let i = 0; i <= N; i++) {
    const t = (i / N) * Math.PI * 2;
    const w =
      Math.sin(t * 3 + seed) * 0.55 +
      Math.sin(t * 5 + seed * 2.3) * 0.3 +
      Math.sin(t * 8 + seed * 3.7) * 0.15;
    const rr = r + w * amp;
    pts.push(`${(cx + Math.cos(t) * rr).toFixed(1)},${(cy + Math.sin(t) * rr).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

async function makeSeal(headPng, ink) {
  // Two passes: sharp reorders operations internally, so negate has to run on
  // its own image or it inverts the alpha channel instead of the pixels.
  const flat = await sharp(headPng)
    .flatten({ background: "#ffffff" })
    .greyscale()
    .threshold(70)
    .png()
    .toBuffer();
  const head0 = await sharp(flat)
    .removeAlpha()
    .negate()
    .resize({ width: 800, height: 800, fit: "inside" })
    .png()
    .toBuffer();

  // Fitting a tiger head into a circle takes two measurements, not one.
  // The bounding box alone sits the head too high (the ears reach much further
  // up than the chin reaches down); the smallest enclosing circle alone sits it
  // too low (it balances against the two ear tips). Halfway between the two
  // reads as centred. The enclosing radius also sets the scale, so the gap to
  // the ring is even the whole way round instead of the ears crowding it.
  const { data, info } = await sharp(head0).greyscale().raw().toBuffer({ resolveWithObject: true });
  const pts = [];
  let minX = info.width, maxX = -1, minY = info.height, maxY = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * info.channels] > 40) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        if (y % 2 === 0 && x % 2 === 0) pts.push(x, y);
      }
    }
  }
  // Badoiu-Clarkson: step the centre a shrinking fraction of the way toward
  // whichever point is furthest from it. Deterministic, converges fast.
  let mx = 0, my = 0;
  for (let i = 0; i < pts.length; i += 2) {
    mx += pts[i];
    my += pts[i + 1];
  }
  mx /= pts.length / 2;
  my /= pts.length / 2;
  for (let i = 1; i <= 300; i++) {
    let far = 0, farDist = -1;
    for (let j = 0; j < pts.length; j += 2) {
      const d = (pts[j] - mx) ** 2 + (pts[j + 1] - my) ** 2;
      if (d > farDist) {
        farDist = d;
        far = j;
      }
    }
    mx += (pts[far] - mx) / (i + 1);
    my += (pts[far + 1] - my) / (i + 1);
  }
  let radius = 0;
  for (let j = 0; j < pts.length; j += 2) {
    const d = Math.hypot(pts[j] - mx, pts[j + 1] - my);
    if (d > radius) radius = d;
  }

  const scale = (INNER_R * FILL) / radius;
  const head = await sharp(head0)
    .resize(Math.round(info.width * scale), Math.round(info.height * scale))
    .png()
    .toBuffer();
  const left = Math.round(SEAL / 2 - ((minX + maxX) / 2 + mx) / 2 * scale);
  const top = Math.round(SEAL / 2 - ((minY + maxY) / 2 + my) / 2 * scale);

  const rings = `<svg xmlns="http://www.w3.org/2000/svg" width="${SEAL}" height="${SEAL}">
    <rect width="${SEAL}" height="${SEAL}" fill="black"/>
    <path d="${wobble(SEAL / 2, SEAL / 2, 468, 5, 1.1)}" fill="none" stroke="white" stroke-width="11"/>
    <path d="${wobble(SEAL / 2, SEAL / 2, INNER_R, 4, 4.7)}" fill="none" stroke="white" stroke-width="7"/>
  </svg>`;

  const mask = await sharp(Buffer.from(rings))
    .composite([{ input: head, left, top, blend: "screen" }])
    .greyscale()
    .png()
    .toBuffer();

  // Letterpress texture: broad blotches where the plate lifted, plus fine speckle.
  const blotches = await sharp({
    create: { width: 110, height: 110, channels: 1, noise: { type: "gaussian", mean: 150, sigma: 60 } },
  })
    .resize(SEAL, SEAL, { kernel: "cubic" })
    .blur(2)
    .threshold(62)
    .png()
    .toBuffer();
  const speckle = await sharp({
    create: { width: SEAL, height: SEAL, channels: 1, noise: { type: "gaussian", mean: 150, sigma: 60 } },
  })
    .blur(0.6)
    .threshold(58)
    .png()
    .toBuffer();

  const inked = await sharp(mask)
    .composite([
      { input: blotches, blend: "multiply" },
      { input: speckle, blend: "multiply" },
    ])
    .greyscale()
    .raw()
    .toBuffer();

  return sharp({ create: { width: SEAL, height: SEAL, channels: 3, background: ink } })
    .joinChannel(inked, { raw: { width: SEAL, height: SEAL, channels: 1 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

{
  const buf = await get(LOGO);
  const full = sharp(buf).ensureAlpha().trim();
  const meta = await full.toBuffer({ resolveWithObject: true });
  // find the blank row between the tiger head and the wordmark so the head is never clipped
  const { data: alpha, info } = await full.clone().extractChannel("alpha").raw().toBuffer({ resolveWithObject: true });
  let h = info.height;
  for (let y = Math.round(info.height * 0.4); y < info.height; y++) {
    let ink = 0;
    for (let x = 0; x < info.width; x++) if (alpha[y * info.width + x] > 40) ink++;
    if (ink === 0) { h = y; break; }
  }
  const head = await sharp(meta.data).extract({ left: 0, top: 0, width: meta.info.width, height: h }).trim().resize({ width: 400, height: 400, fit: "inside" }).png({ palette: true, colors: 128 }).toBuffer();
  writeFileSync("public/tiger-head.png", head);
  const logo = await full.clone().resize({ width: 400, height: 560, fit: "inside" }).png({ palette: true, colors: 128 }).toBuffer();
  writeFileSync("public/logo.png", logo);

  const seal = await makeSeal(head, NAVY);
  writeFileSync("public/seal.png", seal);
  writeFileSync("public/seal-light.png", await makeSeal(head, SKY));

  // Favicon: just the rings and the tiger, no background, trimmed so the mark
  // fills the tab icon instead of floating inside the seal's own margin.
  const trimmedSeal = await sharp(seal).trim().png().toBuffer();
  writeFileSync(
    "app/icon.png",
    await sharp(trimmedSeal)
      .resize({ width: 256, height: 256, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer(),
  );
  // The Apple touch icon is the exception: iOS composites transparency onto
  // black, which would swallow navy ink, so that one keeps the paper behind it.
  writeFileSync(
    "app/apple-icon.png",
    await sharp(trimmedSeal)
      .resize({ width: 172, height: 172, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extend({ top: 4, bottom: 4, left: 4, right: 4, background: "#eae7e0" })
      .flatten({ background: "#eae7e0" })
      .png()
      .toBuffer(),
  );
  console.log("seal + icons");
}

// Real client result graphics from the services page.
{
  /**
   * The Google Ads capture is Joe's own screenshot of the client account, with
   * his red highlight underlines on it. The data stays exactly as captured;
   * only Google's UI chrome is repainted so the evidence sits in the brand
   * instead of fighting it. Orange tiles and the orange series become mid blue,
   * the grey ramp (dark tiles, second series, gridlines) is remapped onto navy,
   * and the red underlines become sky. The numbers, line shapes, axes and dates
   * are untouched.
   */
  const ads = await get("94a830c1-85d3-4ab0-ba61-4f41d9587438/Web+Study+.png", 2500);
  const MID = [0x58, 0x77, 0xa6];
  const NAVY_A = [NAVY.r, NAVY.g, NAVY.b];
  const SKY_A = [SKY.r, SKY.g, SKY.b];
  const { data: px, info: ai } = await sharp(ads)
    .flatten({ background: "#ffffff" })
    .trim({ threshold: 20 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < px.length; i += ai.channels) {
    const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    const sat = mx === 0 ? 0 : d / mx;
    if (sat > 0.3 && d > 0) {
      let hue;
      if (mx === r) hue = ((60 * ((g - b) / d)) % 360 + 360) % 360;
      else if (mx === g) hue = 60 * ((b - r) / d) + 120;
      else hue = 60 * ((r - g) / d) + 240;
      const target = hue >= 8 && hue <= 55 ? MID : hue < 8 || hue > 330 ? SKY_A : null;
      if (target) {
        const t = Math.min(1, (sat - 0.3) / 0.15);
        for (let k = 0; k < 3; k++) px[i + k] = Math.round(px[i + k] * (1 - t) + target[k] * t);
        continue;
      }
    }
    const dark = 1 - mx;
    if (dark > 0.02) for (let k = 0; k < 3; k++) px[i + k] = Math.round(255 * (1 - dark) + NAVY_A[k] * dark);
  }
  writeFileSync(
    "public/results/ads.jpg",
    await sharp(px, { raw: { width: ai.width, height: ai.height, channels: ai.channels } })
      .resize({ width: 1600, fit: "inside" })
      .jpeg({ quality: 86 })
      .toBuffer(),
  );

  // geo-grid report: crop the two map panels out of the 1920x1080 graphic
  const grid = await get("29ed640d-87be-4c84-bf28-c24236ed4f4c/Reyla++2025+Wrapped+%281%29.png", 2500);
  const g = sharp(grid).flatten({ background: "#fff" });
  const { width: W } = await g.metadata();
  const s = W / 1000;
  const box = (x0, y0, x1, y1) => ({ left: Math.round(x0 * s), top: Math.round(y0 * s), width: Math.round((x1 - x0) * s), height: Math.round((y1 - y0) * s) });
  writeFileSync("public/results/map-before.jpg", await g.clone().extract(box(84, 86, 483, 487)).resize({ width: 900, fit: "inside" }).jpeg({ quality: 82 }).toBuffer());
  writeFileSync("public/results/map-after.jpg", await g.clone().extract(box(500, 86, 899, 487)).resize({ width: 900, fit: "inside" }).jpeg({ quality: 82 }).toBuffer());
  console.log("result graphics");
}

// Running tiger GIF: downloaded, cropped to the animal, recoloured into the
// brand duotone (navy stripes on sky blue), and re-encoded small. The source is
// a 4961x3508 18-frame GIF on a white ground, far too big to ship as-is.
{
  const res = await fetch("https://i.pinimg.com/originals/f8/d2/fd/f8d2fdc95c44de27b5b9f82365123730.gif", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`gif ${res.status}`);
  const src = Buffer.from(await res.arrayBuffer());
  const strip = await sharp(src, { animated: true, limitInputPixels: false })
    .resize({ height: 320 })
    .png()
    .toBuffer();
  const meta = await sharp(strip).metadata();
  const pages = 18;
  const pageH = Math.round(meta.height / pages);
  const W = meta.width;
  // the tiger occupies this fraction of each frame; the rest is whitespace and a ground line
  const left = Math.round(0.0219 * W);
  const right = Math.round(0.9158 * W);
  const top = Math.round(0.4619 * pageH);
  const bottom = Math.round(0.828 * pageH);
  const cw = right - left;
  const ch = bottom - top;

  // duotone ramp: darkest ink -> NAVY, lightest -> SKY
  const dark = [NAVY.r, NAVY.g, NAVY.b];
  const light = [SKY.r, SKY.g, SKY.b];
  const gain = dark.map((d, i) => (light[i] - d) / 255);

  const frames = [];
  for (let i = 0; i < pages; i++) {
    const frame = await sharp(strip)
      .extract({ left, top: i * pageH + top, width: cw, height: ch })
      .png()
      .toBuffer();
    const grey = await sharp(frame).removeAlpha().greyscale().png().toBuffer();
    // key the white ground out, with a 15-level ramp so the edges stay smooth
    const alpha = await sharp(grey).linear(-17, 4250).removeAlpha().extractChannel(0).raw().toBuffer();
    const duo = await sharp(grey).toColourspace("srgb").linear(gain, dark).removeAlpha().png().toBuffer();
    frames.push(
      await sharp(duo).joinChannel(alpha, { raw: { width: cw, height: ch, channels: 1 } }).png().toBuffer(),
    );
  }
  const gif = await sharp(frames, { join: { across: 1, animated: true } })
    .gif({ colours: 48, effort: 10, delay: 60, loop: 0 })
    .toBuffer();
  writeFileSync("public/tiger-run.gif", gif);
  console.log("tiger gif", Math.round(gif.length / 1024), "KB");
}
