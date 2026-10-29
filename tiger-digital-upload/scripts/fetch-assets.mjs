/**
 * Regenerates public/ client logos, team headshots and result graphics from
 * the original Squarespace CDN uploads.
 *
 * The Next Set Digital logo, favicon and banners are NOT generated here. They
 * are designed artwork shipped in the brand kit and committed under
 * public/brand/ and app/, so nothing regenerates or recolours them.
 * Runs before `next build` only when public/clients/mp-copiers.png is missing
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
  // joe.webp is NOT listed here: Joe supplied a new headshot directly in
  // September 2026 and the committed file is the only copy. Regenerating from
  // this script would overwrite it with the old Squarespace portrait.

  marvin: "7de0c4db-e8f4-43ca-990e-e2ea5123a31e/marvin+final.png",
  kyle: "353e523b-fd43-4119-924b-c13625bb7c3f/kyle+final.png",
  santiago: "c2b1df53-57e6-4a48-b7e5-0960446d1e0d/santi+final.png",
  gina: "2e5efc0e-49f1-42bc-8ec6-8cb6011839e7/Gina.png",
};

/**
 * Clients added after the Squarespace era. Their logos are not in Joe's old
 * uploads, so these are absolute URLs on the clients' own sites. Same
 * processing as the CDN logos: trim, fit to the tile, palette PNG.
 */
// Not listed below: municipal-maintenance. Joe supplied that logo directly
// rather than from a URL, so public/clients/municipal-maintenance.png is the
// only copy. Keep it when regenerating; this script will not recreate it.
const externalLogos = {
  "willco-air-conditioning": "https://willcoairconditioning.com/wp-content/uploads/2025/02/Group.svg",
  "resource-renewal":
    "https://images.squarespace-cdn.com/content/v1/685ac2832036200192ff3403/95903e38-9e63-4ccc-856d-c341fcfcff2c/Artboard+1.png?format=1500w",
  "viperjet-drain": "https://static.wixstatic.com/media/4ccdaa_f7e871ab67744927be028e1e5957cfdc~mv2.png",
};

const NAVY = { r: 0x23, g: 0x32, b: 0x60 }; // Swell
const SKY = { r: 0xa4, g: 0xb8, b: 0xd6 }; // First Light

if (existsSync("public/clients/mp-copiers.png")) {
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
// Team photos are NOT regenerated here any more. The committed files are 4:5
// portrait crops taken from inside the old oval portraits, which is what the
// team grid renders. Running the loop below would put the superseded ovals back
// and undo the crops, so it is intentionally disabled; `team` and
// `recolourRing` are kept for reference on where the originals came from.
void team;
void recolourRing;
console.log("team photos: skipped (committed crops are final)");
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

  // The two map panels that used to be cropped out of this graphic are gone:
  // the heat map was removed from the site in September 2026.
  console.log("result graphics");
}

