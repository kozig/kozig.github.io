---
layout: post
title: Vim Layer Everywhere (in Windows) with AutoHotkey v2
date: 2026-06-05 10:00:00 -0500
description: Repurposing CapsLock as a toggle for a Vim-inspired navigation layer in any Windows app.
categories: tools
tags: autohotkey vim windows keyboard
---

[Vim Layer Everywhere](https://github.com/kozig/Vim-Layer-Everywhere) is an AutoHotkey v2 script that turns CapsLock into a toggle for a Vim-like keyboard layer so you get `hjkl` navigation and other Vim-like bindings in any application, not just your editor.

## How it works

Press **CapsLock** to toggle the layer on or off. While active:

- `h` `j` `k` `l`: left, down, up, right (arrow keys)
- `Escape` — Alt+F4's the active window instead of its default behavior

The script uses AHK v2 syntax. CapsLock's original behavior (toggling caps) is suppressed entirely, if you need caps, use `Shift`.

## Why

Vim muscle memory doesn't stay in the terminal. Reaching for arrow keys or the mouse mid-sentence breaks flow. This script makes navigation home-row-accessible everywhere — file explorers, browsers, chat apps, whatever.

## Source

[github.com/kozig/Vim-Layer-Everywhere](https://github.com/kozig/Vim-Layer-Everywhere)
