# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Jekyll **portfolio + blog** built on the **Chirpy** theme (gem `jekyll-theme-chirpy ~> 7.1`), published to GitHub Pages at `https://kozig.github.io/`. Generated from `chirpy-starter`, so most theme files (layouts, includes, sass) live inside the gem — only the override/config surface is checked in.

The site started as a Chirpy blog and was repurposed: the landing page (`/`) is now a portfolio of web apps; the blog feed lives at `/blog/`.

## Commands

Install dependencies once after cloning:

```
bundle
```

Local dev server (live reload on `127.0.0.1:4000`):

```
bash tools/run.sh                # dev mode
bash tools/run.sh -p             # production mode (JEKYLL_ENV=production)
bash tools/run.sh -H 0.0.0.0     # bind to all interfaces
```

Build + test exactly like CI does (production build into `_site`, then htmlproofer with external links disabled):

```
bash tools/test.sh
```

Run htmlproofer directly against an existing `_site/`:

```
bundle exec htmlproofer _site --disable-external \
  --ignore-urls "/^http:\/\/127.0.0.1/,/^http:\/\/0.0.0.0/,/^http:\/\/localhost/"
```

## Deploy pipeline

`.github/workflows/pages-deploy.yml` runs on push to `main` or `master` (and via `workflow_dispatch`). It uses Ruby 3.3, builds with `JEKYLL_ENV=production`, runs htmlproofer, and deploys to GitHub Pages. **A push to the default branch is a production deploy** — work on feature branches and merge intentionally.

`paths-ignore` covers `.gitignore`, `README.md`, `LICENSE` only; any other file change will trigger a build.

## Architecture notes that aren't obvious from a glance

- **Portfolio vs. blog split.**
  - `index.html` uses `layout: projects` — bio content in the body + auto-rendered card grid of every file in `_projects/`.
  - `_projects/` is a Jekyll collection (declared in `_config.yml`). Each `.md` is one project; permalink is `/projects/:name/`. Default layout is `project`.
  - `_tabs/blog.md` uses `layout: home` (Chirpy's post listing) so posts surface at `/blog/`.
  - Project front-matter contract: `title`, `description` (1–2 sentences, used on the card), `screenshot` (path), `live_url`, `repo_url` (optional), `tech` (array, optional), `status` (`Live` / `In progress`, optional — drives card pill color), `order` (int, sort key for the grid).
- **Custom layouts** (`_layouts/projects.html`, `_layouts/project.html`) extend the theme's `page` layout. They are simple and intentionally separate from anything in the gem; safe to edit without worrying about theme updates.
- **Topbar override.** `_includes/topbar.html` shadows the gem's include. Differences from upstream: breadcrumb is suppressed on the landing page (anything where `page.layout` is `home`/`projects` or `page.url == '/'`); the topbar-title also treats `projects` like `home` (shows the site title rather than the layout name); the search input is rendered inline at the left and styled via `.topbar-search` rather than Chirpy's click-to-expand flow. When updating Chirpy, re-diff this file against the upstream `_includes/topbar.html` for any new conditional branches.
- **Custom styles** live in `assets/css/jekyll-theme-chirpy.scss`. That file `@import "main"` (the theme's SCSS) then appends portfolio-specific rules (`.portfolio-grid`, `.portfolio-card`, `.project-hero`, etc.). Do not delete the front-matter `---` block at the top — Jekyll needs it to process the SCSS.
- **Theme files are not in the repo.** Layouts, includes, sass, and most assets come from the `jekyll-theme-chirpy` gem. Use `bundle info --path jekyll-theme-chirpy` to find them. To override a theme file, copy it from the gem into the matching path here.
- **`_plugins/posts-lastmod-hook.rb`** shells out to `git rev-list` / `git log` per post to populate `last_modified_at`. It only works when the build has full git history — CI sets `fetch-depth: 0` for this reason. If you add a workflow or build script elsewhere, preserve that.
- **`_tabs/`** is a Jekyll collection (declared in `_config.yml` under `collections.tabs`) — each `.md` becomes a top-level nav page at `/<title>/`. Order is controlled by an `order:` front-matter key.
- **Posts permalink is fixed** to `/posts/:title/` in `_config.yml` defaults. The config comment warns not to change this without updating link references project-wide.
- **`jekyll-archives`** generates `/categories/:name/` and `/tags/:name/` listing pages — there are no source files for these; they come from front-matter `categories`/`tags` on posts.
- **PWA is enabled** (`pwa.enabled: true`). Builds emit a service worker; if you add a path that should not be cached offline, add it under `pwa.cache.deny_paths`.
- **Analytics:** Google Analytics ID `G-QX4PBPYN12` plus a GoatCounter pageview script are wired into `_config.yml`. Edits there ship to prod.
- **`tools/` and `Templates_Obsidian/`** — only `tools` is in the `exclude:` list. `Templates_Obsidian/post_template.md` will be picked up by Jekyll if it gains valid front matter; treat it as a source file, not a scratch folder.

## Authoring posts

- Filename format Jekyll requires: `_posts/YYYY-MM-DD-slug.md` (single `.md`).
- Front-matter starter is in `Templates_Obsidian/post_template.md`. Required keys in practice: `title`, `date`, `categories`, `tags`.
- Posts go live the moment they land on the default branch. Use `_drafts/` (comments auto-disabled per `_config.yml` defaults) for in-progress work.

## Authoring projects

- One file per project in `_projects/`. Use `_projects/example-app.md` as the template — it documents every supported front-matter field.
- Screenshots: `assets/img/projects/<slug>.png`. The card uses a 16:9 aspect ratio (object-fit: cover) — anything renders, but landscape images look best.
- `order` controls grid position (ascending). Leave gaps (10, 20, 30) so you can insert without renumbering.
- Body markdown becomes the project detail page at `/projects/<slug>/`. The layout auto-renders the screenshot as a hero and the `live_url` / `repo_url` as links above the body — don't repeat them in the body.
