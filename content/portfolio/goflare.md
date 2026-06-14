---
title: 'Goflare'
summary: 'Dynamic DNS updater for Cloudflare with a Vue frontend, successor of my DDNS Manager'
description: 'A single binary Go app that keeps Cloudflare DNS records updated with your public IP. Multiple IP providers with fallback, static records, and a Vue 3 web UI'
source: https://git.mz.uy/marianozunino/goflare
position: -2
language: 'GoLang'
---

#### Overview

Goflare is a self-hosted dynamic DNS updater for Cloudflare. It checks my public IP every so often and updates the DNS records when it changes, all through a small web interface to manage zones and records.

It's basically the next version of my [DDNS Manager](/portfolio/ddns/). Same idea, but rebuilt with a proper frontend and a few things I wanted to fix.

#### Motivation

DDNS Manager worked fine, but after using it for a while there were some things I wanted to improve:

- A real single page frontend instead of server rendered templates
- Better IP detection, with more than one provider in case one is down
- Mark some records as **static** so they are not touched by the automatic updates
- Keep it as a single binary that serves both the API and the UI

So instead of patching the old one I started again from scratch.

#### Stack

- **Backend**: Go, talking directly to the Cloudflare API
- **Frontend**: Vue 3 with Tailwind and shadcn-vue
- **Database**: SQLite (WAL mode)
- **Scheduling**: cron for the IP checks
- **Auth**: session based, you create the account on first run
- **Deploy**: single binary, also ready for Docker / Docker Compose

#### How it works

A scheduled task gets my public IP from one of several providers (if one fails it tries the next), and compares it with the records I have configured. If it changed, it updates them on Cloudflare. Records marked as static are left alone, which is useful for the ones that should not follow my dynamic IP.

#### Why it's better than the old one

- A proper Vue frontend instead of templates
- More than one IP provider, so it does not break if one is down
- Static records to protect the ones I don't want to change
- One binary for everything, easier to deploy
