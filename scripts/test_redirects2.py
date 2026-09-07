import urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

slugs = [
    "10-contoh-pupuk-hayati-dan-peran-pentingnya-bagi-kesuburan-tanah",
    "insektisida-alami-anti-resistensi-hadir-dari-klaten",
    "panduan-pupuk-organik-cair-untuk-tanaman-cabai-agar-berbuah-lebat",
]

# Use GET with redirect handling
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise urllib.error.HTTPError(newurl, code, msg, headers, fp)

opener = urllib.request.build_opener(NoRedirect, urllib.request.HTTPSHandler(context=ctx))

for slug in slugs:
    url = f"https://www.centrabiotechindonesia.com/id/blog/{slug}"
    try:
        req = urllib.request.Request(url)
        req.add_header("User-Agent", "Mozilla/5.0")
        resp = opener.open(req, timeout=15)
        print(f"  {resp.getcode()} {slug[:50]}...")
    except urllib.error.HTTPError as e:
        location = e.headers.get("Location", "no-redirect-location")
        print(f"  {e.code} {slug[:50]}... -> {location}")
    except Exception as e:
        print(f"  ERR {slug[:50]}... -> {e}")
