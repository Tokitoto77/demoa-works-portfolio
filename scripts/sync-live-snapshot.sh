#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://demoaport-2thcqzr8.manus.space}"
OUT_DIR="live-snapshot"

mkdir -p "$OUT_DIR/assets" "$OUT_DIR/images" "$OUT_DIR/docs"

HTML="$(curl -fsSL "$BASE_URL/")"
JS_PATH="$(rg -o '/assets/index-[^" ]+\.js' -m 1 <<<"$HTML")"
CSS_PATH="$(rg -o '/assets/index-[^" ]+\.css' -m 1 <<<"$HTML")"

if [[ -z "$JS_PATH" || -z "$CSS_PATH" ]]; then
  echo "Could not detect deployed asset paths from $BASE_URL" >&2
  exit 1
fi

curl -fsSL "$BASE_URL$JS_PATH" -o "$OUT_DIR$JS_PATH"
curl -fsSL "$BASE_URL$CSS_PATH" -o "$OUT_DIR$CSS_PATH"

cat > "$OUT_DIR/index.html" <<HTML_EOF
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>Demoa-works Portfolio</title>
    <meta
      name="description"
      content="LP制作とGAS連携で、集客から事務作業までを自動化。これから始める個人事業主を応援します。モニター価格¥20,000で受付中。"
    />
    <link rel="icon" type="image/png" href="/images/logo.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Poppins:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <script type="module" crossorigin src="$JS_PATH"></script>
    <link rel="stylesheet" crossorigin href="$CSS_PATH" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
HTML_EOF

rsync -a client/public/images/ "$OUT_DIR/images/"
rsync -a client/public/docs/ "$OUT_DIR/docs/"

echo "Synced deployed snapshot to $OUT_DIR"
echo "JS:  $JS_PATH"
echo "CSS: $CSS_PATH"
