#!/bin/sh
# Drop Claude/Cursor attribution trailers and reject commits authored as those tools.
set -eu

file=${1:?commit message file required}

tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

grep -viE '^(co-authored-by:.*(claude|cursor)|made-with:[[:space:]]*cursor)([[:space:]]|$)' "$file" >"$tmp" || true
cat "$tmp" >"$file"
trap - EXIT
rm -f "$tmp"

ident=$(git var GIT_AUTHOR_IDENT)
name=${ident%% <*}
email=$(printf '%s\n' "$ident" | sed -n 's/.*<\([^>]*\)>.*/\1/p')

case "$email" in
cursoragent@cursor.com | *@anthropic.com)
	echo "Commits must be authored by the repository author, not Claude or Cursor." >&2
	exit 1
	;;
esac

case "$name" in
Cursor | Cursor\ * | Claude | Claude\ *)
	echo "Commits must be authored by the repository author, not Claude or Cursor." >&2
	exit 1
	;;
esac
