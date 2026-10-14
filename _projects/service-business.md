---
layout: page
title: Service Business Static Site
description: Simple static site
img: assets/img/projects/wallinstall.png
img_alt: service_site_screenshot
importance: 1
category: web
---

## Overview

Simple static site for small service business with a simple web form that submits using Google App Script and Google Sheet for client data collection. The site is hosted using a Cloudflare Worker and directly updated from a GitHub repository. 
#### Security features
1. Cloudflare Turnstile. The form loads the Turnstile widget. Each submission carries a one-time cf-turnstile-response token, and the widget resets after every submit.
2. Honeypot field. A hidden input that humans never see; bots fill it in.
3. Timestamp (ts). Sent with each submission for rate limiting.
4. Same-origin backend proxy. The browser never talks to Google directly. It posts to /api/contact,a Cloudflare Pages Function, which forwards to Apps Script.

## Links

- [Live demo](https://wallinstall.ca)
- [Source on GitHub](https://github.com/kozig/wall_install)

## Screenshots

{% include figure.liquid path="assets/img/projects/wallinstall.png" class="img-fluid rounded" alt="screenshot1_of_service_business" %}

{% include figure.liquid path="assets/img/projects/wallinstall_form.png" class="img-fluid rounded" alt="screenshot2_of_service_business" %}
