# Fallback deploy

Workflow: `.github/workflows/deploy-fallback.yml`. The job uses the `github-pages` environment.

## `RSYNC_EXCLUDE`

Actions **variable** (repository or `github-pages` environment). If both are set, the environment value is used. An empty value means no extra excludes.

One [rsync exclude](https://download.samba.org/pub/rsync/rsync.1#FILTER_RULES) pattern per line, relative to the synced tree (`dist/` on the runner, `SSH_DIR` on the server). A matched path is not uploaded, and `--delete` does not remove it. Blank lines and lines starting with `#` or `;` are ignored.

```
# present only on the server
.well-known/

# do not wipe host files that are not part of the build
logs/
```

Do not exclude the Vite build. These patterns skip the JS bundle; the host then serves `index.html` for the module URL (`text/html` instead of JavaScript):

```
assets/
*.js
*.css
*.wasm
```

`dist/assets/` is synced again after this list, without the variable, so an `assets/` line does not keep old bundles on the server.
