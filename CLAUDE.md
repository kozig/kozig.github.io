# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal portfolio + blog built on the **al-folio** Jekyll theme (https://github.com/alshedivat/al-folio), deployed to GitHub Pages at `https://kozig.github.io/`. al-folio is a **template-fork** theme — unlike a gem-based theme, all layouts, includes, sass, and assets live directly in this repo and are maintained here.

History: this repo previously used the Chirpy theme; in May 2026 it was migrated to al-folio on the `al-folio-migration` branch. Only the bones of al-folio were copied (no academic features like books, teachings, bibliography, news, or publications).

## Commands

Install dependencies (Ruby gems + npm packages for purgecss):

```
bundle install
npm install -g purgecss
```

Local dev server (live reload on `127.0.0.1:4000`):

```
bundle exec jekyll serve
```

Production build (matches CI):

```
JEKYLL_ENV=production bundle exec jekyll build
```

Purge unused CSS after a production build (CI does this automatically):

```
purgecss -c purgecss.config.js
```

System dependency: **ImageMagick** must be installed locally for `jekyll-imagemagick` to work (`sudo apt-get install imagemagick` on Debian/Ubuntu). CI installs it automatically.

## Deploy pipeline

`.github/workflows/deploy.yml` runs on push to `main`/`master`:
1. Checks out the repo.
2. Sets up Ruby 3.3.5 and Python 3.13 (Python is used by `nbconvert` for Jupyter notebook posts).
3. `apt-get install imagemagick` + `pip3 install nbconvert`.
4. `JEKYLL_ENV=production bundle exec jekyll build`.
5. Runs purgecss against `_site/`.
6. Pushes `_site/` to the **`gh-pages` branch** via `JamesIves/github-pages-deploy-action@v4`.

**Important:** al-folio's deploy expects GitHub Pages settings to be: **Source = Deploy from a branch**, **branch = `gh-pages`**, **folder = `/ (root)`**. This is different from how Chirpy was deployed (which used the "GitHub Actions" source). When merging the migration branch to `main`, update the repo's Pages settings before the first deploy, or it will fail to publish.

## Architecture notes that aren't obvious from a glance

- **Pages = top-level routes.** Each `_pages/*.md` with `nav: true` becomes a navbar item, ordered by `nav_order`. Currently: `about.md` (landing, permalink `/`, layout `about`), `projects.md` (`/projects/`), `blog.md` (`/blog/`). `404.md` is the error page.
- **Projects collection.** `_projects/*.md` files render into the projects page grid. Front-matter contract: `title`, `description` (card text), `img` (card background — path under `assets/img/`), `importance` (sort key — lower number = first), `category` (used by `display_categories` on the projects page for grouping). Body is the detail-page content.
- **Posts.** Same `_posts/YYYY-MM-DD-slug.md` convention as Chirpy. al-folio expects `layout: post`, `date` with full timezone offset (`-0500`, not `-500`), and prefers space-separated tags/categories rather than YAML arrays (both work though).
- **Socials are configured in `_data/socials.yml`,** not `_config.yml`. Uses the `jekyll-socials` plugin schema (e.g. `github_username`, `linkedin_username`). The "social: true" toggle in `_pages/about.md` front-matter controls whether they render on the home page.
- **Lots of academic plumbing is still in the Gemfile and config** (`jekyll-scholar`, `_bibliography/`, `_data/cv.yml`, `_data/coauthors.yml`, etc.). These are dormant — no source files reference them — but the gems still install. They can be stripped later for faster builds; leave for now unless build times become painful.
- **Collections declared in `_config.yml`** include `books`, `news`, `teachings`, `projects`. We only have `_projects/`. The others resolve to empty collections; Jekyll won't fail.
- **`jekyll-archives-v2`** generates `/blog/:year/`, `/blog/tag/:name/`, `/blog/category/:name/` automatically from post front-matter — no source files for these.
- **Asset sizes.** ~18MB of theme JS/CSS/fonts live under `assets/{js,css,fonts,webfonts}/`. These are required and shouldn't be deleted.

## Authoring posts

Filename `_posts/YYYY-MM-DD-slug.md`. Required front-matter:

```yaml
---
layout: post
title: Post title here
date: 2026-05-22 10:15:00 -0500
description: One-line summary used in lists and meta tags.
categories: security        # space-separated string OR YAML list
tags: bloodhound azure      # space-separated string OR YAML list
---
```

Posts land at `/blog/:year/:title/` (permalink defined globally in `_config.yml`).

## Authoring projects

One file per project in `_projects/`. Use `_projects/example-app.md` as the template. Drop screenshots into `assets/img/projects/<slug>.png` and reference them with `img:` in front matter (card) and the `figure.liquid` include in the body.

```yaml
---
layout: page
title: My App
description: Short pitch shown on the projects index card.
img: assets/img/projects/my-app.png
importance: 1
category: web
---
```

Lower `importance` sorts first. `category` groups projects on the projects index when `display_categories` is set on `_pages/projects.md`.

## What I should NOT do without asking

- Don't enable `jekyll-scholar` features (citations, bibliography) unless asked — they require BibTeX setup and aren't part of this site's content model.
- Don't add `_books/`, `_teachings/`, `_news/`, or `_bibliography/` content without asking — those are al-folio's academic features and adding files would surface them in the nav unintentionally.
- Don't slim the Gemfile or remove unused plugins without testing builds end-to-end — many are referenced by includes that may not be obvious.
- Don't push to `main` from the migration branch without first updating the GitHub Pages source setting on the repo (see Deploy pipeline above).
