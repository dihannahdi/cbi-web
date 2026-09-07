import urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

slugs = [
    "10-contoh-pupuk-hayati-dan-peran-pentingnya-bagi-kesuburan-tanah",
    "insektisida-alami-anti-resistensi-hadir-dari-klaten",
    "panduan-pupuk-organik-cair-untuk-tanaman-cabai-agar-berbuah-lebat",
    "maklon-pupuk-hayati-peluang-bisnis-menjanjikan-di-era-pertanian-ramah-lingkungan",
    "floraone-cair-terbukti-menghemat-pupuk-npk-terobosan-efisiensi-di-era-blue-ammonia",
]

for slug in slugs:
    url = f"https://www.centrabiotechindonesia.com/id/blog/{slug}"
    try:
        req = urllib.request.Request(url)
        req.method = "HEAD"
        resp = urllib.request.urlopen(req, context=ctx, timeout=10)
        status = resp.getcode()
        location = resp.headers.get("Location", "")
        actual_url = resp.geturl()
        print(f"  {status} {slug[:50]}... -> {actual_url[-50:]}")
    except urllib.error.HTTPError as e:
        location = e.headers.get("Location", "no-location")
        print(f"  {e.code} {slug[:50]}... -> {location}")
    except Exception as e:
        print(f"  ERR {slug[:50]}... -> {e}")
