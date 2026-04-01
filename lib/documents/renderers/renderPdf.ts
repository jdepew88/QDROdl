/**
 * HTML → PDF via Puppeteer (bundled Chromium).
 *
 * **VPS / Linux:** Use launch args below (`--no-sandbox`, etc.) for typical
 * container and hardened-server environments.
 *
 * **puppeteer vs puppeteer-core:**
 * - `puppeteer` downloads a compatible Chromium — simplest for private VPS deploys.
 * - `puppeteer-core` expects a system Chrome/Chromium (`executablePath`). Use when
 *   you pin browser via distro package or Docker image to save disk / control versions.
 *
 * Swapping to puppeteer-core: install `puppeteer-core`, pass `executablePath` in launch(),
 * and ensure the same flags are supported by your Chromium build.
 */

export async function renderHtmlToPdfBuffer(html: string): Promise<Buffer> {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--font-render-hinting=none",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });
    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: {
        top: "0.75in",
        bottom: "0.75in",
        left: "0.75in",
        right: "0.75in",
      },
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close().catch(() => {});
  }
}
