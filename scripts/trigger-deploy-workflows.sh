#!/bin/sh

set -eu

if ! command -v gh >/dev/null 2>&1; then
	echo "GitHub CLI (gh) is not installed. See https://cli.github.com/" >&2
	exit 1
fi

echo "Triggering Vercel redeploy..."
gh workflow run vercel-redeploy.yml

echo "Triggering fallback deploy (rsync)..."
gh workflow run deploy-fallback.yml

echo
echo "Workflows started. Open runs:"
echo "  gh run list --workflow=vercel-redeploy.yml --limit 1"
echo "  gh run list --workflow=deploy-fallback.yml --limit 1"
echo "  gh run watch"
