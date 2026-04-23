import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Secret token for webhook verification (set in Strapi webhook)
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET || "centra-biotech-revalidate-2026";
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.centrabiotechindonesia.com';
const INDEXNOW_KEY = 'ccb7653f357e4936b9a5d5183ae215af';

/**
 * Auto-submit revalidated paths to IndexNow for instant indexing by Bing/Yandex
 */
async function autoSubmitIndexNow(paths: string[]) {
  if (paths.length === 0) return;
  const urls = [...new Set(paths)].map(p => `${BASE_URL}${p}`);
  const payload = {
    host: new URL(BASE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  };
  try {
    await Promise.allSettled([
      fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
      fetch('https://www.bing.com/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
    ]);
  } catch { /* non-blocking */ }
}

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    const secretFromHeader = authHeader?.replace("Bearer ", "");
    
    // Also check query parameter for backward compatibility
    const { searchParams } = new URL(request.url);
    const secretFromQuery = searchParams.get("secret");
    
    const secret = secretFromHeader || secretFromQuery;

    // Verify the secret
    if (secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid secret", received: secret?.substring(0, 5) + "..." },
        { status: 401 }
      );
    }

    // Parse the body to determine what to revalidate
    let body: {
      model?: string;
      entry?: {
        slug?: string;
        locale?: string;
        documentId?: string;
      };
      path?: string;
      type?: "all";
    } = {};

    try {
      body = await request.json();
    } catch {
      // Body might be empty for simple revalidation
    }

    const revalidatedPaths: string[] = [];

    // Handle Strapi webhook payload
    if (body.model) {
      const model = body.model;
      const slug = body.entry?.slug;
      
      // Revalidate based on content type
      switch (model) {
        case "product-detail-page":
          // Revalidate specific product page
          if (slug) {
            const pathId = `/id/produk-layanan/pertanian/${slug}`;
            const pathEn = `/en/produk-layanan/pertanian/${slug}`;
            revalidatePath(pathId);
            revalidatePath(pathEn);
            revalidatedPaths.push(pathId, pathEn);
          }
          // Also revalidate product listing pages and homepage
          revalidatePath("/id/produk-layanan/pertanian");
          revalidatePath("/en/produk-layanan/pertanian");
          revalidatePath("/id/produk-layanan");
          revalidatePath("/en/produk-layanan");
          revalidatePath("/id");
          revalidatePath("/en");
          revalidatedPaths.push(
            "/id/produk-layanan/pertanian",
            "/en/produk-layanan/pertanian",
            "/id/produk-layanan",
            "/en/produk-layanan",
            "/id",
            "/en"
          );
          break;

        case "blog":
          if (slug) {
            revalidatePath(`/id/blog/${slug}`);
            revalidatePath(`/en/blog/${slug}`);
            revalidatedPaths.push(`/id/blog/${slug}`, `/en/blog/${slug}`);
          }
          revalidatePath("/id/blog");
          revalidatePath("/en/blog");
          revalidatePath("/id");
          revalidatePath("/en");
          revalidatedPaths.push("/id/blog", "/en/blog", "/id", "/en");
          break;

        case "news":
          if (slug) {
            revalidatePath(`/id/news/${slug}`);
            revalidatePath(`/en/news/${slug}`);
            revalidatedPaths.push(`/id/news/${slug}`, `/en/news/${slug}`);
          }
          revalidatePath("/id/news");
          revalidatePath("/en/news");
          revalidatePath("/id");
          revalidatePath("/en");
          revalidatedPaths.push("/id/news", "/en/news", "/id", "/en");
          break;

        case "dashboard":
        case "about-us":
        case "contact":
          // Single types - revalidate homepage and specific pages
          revalidatePath("/id");
          revalidatePath("/en");
          revalidatePath("/id/about-us");
          revalidatePath("/en/about-us");
          revalidatePath("/id/contact");
          revalidatePath("/en/contact");
          revalidatedPaths.push("/id", "/en", "/id/about-us", "/en/about-us", "/id/contact", "/en/contact");
          break;

        default:
          // For any other model, revalidate homepage
          revalidatePath("/id");
          revalidatePath("/en");
          revalidatedPaths.push("/id", "/en");
      }
    }

    // Handle direct path revalidation
    if (body.path) {
      revalidatePath(body.path);
      revalidatedPaths.push(body.path);
    }

    // Handle type-based revalidation
    if (body.type === "all") {
      // Revalidate all main pages
      const mainPaths = [
        "/id",
        "/en",
        "/id/produk-layanan",
        "/en/produk-layanan",
        "/id/produk-layanan/pertanian",
        "/en/produk-layanan/pertanian",
        "/id/produk-layanan/peternakan",
        "/en/produk-layanan/peternakan",
        "/id/produk-layanan/perikanan",
        "/en/produk-layanan/perikanan",
        "/id/blog",
        "/en/blog",
        "/id/news",
        "/en/news",
        "/id/about-us",
        "/en/about-us",
        "/id/contact",
        "/en/contact",
      ];
      
      for (const path of mainPaths) {
        revalidatePath(path);
        revalidatedPaths.push(path);
      }
      
      // Revalidate all product pages
      const productSlugs = [
        "rajabio-pupuk-organik-cair",
        "floraone-pupuk-hayati",
        "biokiller-insektisida-hayati",
        "simbios-pupuk-hayati-cair",
        "floraone-pupuk-hayati-padat",
        "blackturbo-asam-humat-cair",
        "biojagat-pupuk-hayati-cair",
        "biokalsi-dolomit-pembenah-tanah",
      ];

      for (const productSlug of productSlugs) {
        revalidatePath(`/id/produk-layanan/pertanian/${productSlug}`);
        revalidatePath(`/en/produk-layanan/pertanian/${productSlug}`);
        revalidatedPaths.push(
          `/id/produk-layanan/pertanian/${productSlug}`,
          `/en/produk-layanan/pertanian/${productSlug}`
        );
      }
    }

    // If nothing specific was requested, revalidate common pages
    if (revalidatedPaths.length === 0) {
      revalidatePath("/id");
      revalidatePath("/en");
      revalidatedPaths.push("/id", "/en");
    }

    // Auto-submit to IndexNow for instant search engine discovery
    autoSubmitIndexNow(revalidatedPaths);

    return NextResponse.json({
      success: true,
      revalidated: {
        paths: [...new Set(revalidatedPaths)],
      },
      indexNow: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support GET for manual revalidation via browser
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path");
  const type = searchParams.get("type") as "all" | null;
  const slug = searchParams.get("slug");

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const revalidatedPaths: string[] = [];

  if (path) {
    revalidatePath(path);
    revalidatedPaths.push(path);
  }

  // Revalidate specific product by slug
  if (slug) {
    revalidatePath(`/id/produk-layanan/pertanian/${slug}`);
    revalidatePath(`/en/produk-layanan/pertanian/${slug}`);
    revalidatedPaths.push(
      `/id/produk-layanan/pertanian/${slug}`,
      `/en/produk-layanan/pertanian/${slug}`
    );
  }

  if (type === "all") {
    // Revalidate all product pages
    const productSlugs = [
      "rajabio-pupuk-organik-cair",
      "floraone-pupuk-hayati",
      "biokiller-insektisida-hayati",
      "simbios-pupuk-hayati-cair",
      "floraone-pupuk-hayati-padat",
      "blackturbo-asam-humat-cair",
      "biojagat-pupuk-hayati-cair",
      "biokalsi-dolomit-pembenah-tanah",
    ];

    for (const productSlug of productSlugs) {
      revalidatePath(`/id/produk-layanan/pertanian/${productSlug}`);
      revalidatePath(`/en/produk-layanan/pertanian/${productSlug}`);
      revalidatedPaths.push(
        `/id/produk-layanan/pertanian/${productSlug}`,
        `/en/produk-layanan/pertanian/${productSlug}`
      );
    }

    // Revalidate listing pages
    revalidatePath("/id/produk-layanan/pertanian");
    revalidatePath("/en/produk-layanan/pertanian");
    revalidatePath("/id");
    revalidatePath("/en");
    revalidatedPaths.push(
      "/id/produk-layanan/pertanian",
      "/en/produk-layanan/pertanian",
      "/id",
      "/en"
    );
  }

  if (revalidatedPaths.length === 0) {
    return NextResponse.json({
      message: "No path specified. Use ?path=/some/path or ?slug=product-slug or ?type=all",
      examples: [
        "/api/revalidate?secret=YOUR_SECRET&path=/id/produk-layanan/pertanian/biojagat-pupuk-hayati-cair",
        "/api/revalidate?secret=YOUR_SECRET&slug=biojagat-pupuk-hayati-cair",
        "/api/revalidate?secret=YOUR_SECRET&type=all",
      ],
    });
  }

  // Auto-submit to IndexNow for instant search engine discovery
  autoSubmitIndexNow(revalidatedPaths);

  return NextResponse.json({
    success: true,
    revalidated: {
      paths: [...new Set(revalidatedPaths)],
    },
    indexNow: true,
    timestamp: new Date().toISOString(),
  });
}
