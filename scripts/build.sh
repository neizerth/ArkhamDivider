#!/bin/bash

set -euo pipefail

npx tsc -b
npx vite build
npx tsx ./scripts/prerender-seo.ts
npx tsx ./scripts/generate-sitemap.ts

