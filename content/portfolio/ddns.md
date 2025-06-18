---
title: 'DDNS Manager'
summary: 'Self-hosted Dynamic DNS manager with Cloudflare integration and automated IP updates'
description: 'A Go-based web application that simplifies DNS record management through Cloudflare API with automatic IP detection and scheduled updates for dynamic DNS scenarios'
source: https://git.mz.uy/marianozunino/ddns
position: 0
language: 'GoLang'
---

#### Overview

DDNS Manager is a self-hosted web application that provides (or at least it aims to) an intuitive interface for managing DNS records through Cloudflare's API.

It's designed to replace services like FreeDNS to control your dynamic DNS setup.

#### Motivation

For years, I relied on [FreeDNS (afraid.org)](https://freedns.afraid.org/) for my dynamic DNS needs. While it served me well, I grew frustrated with several limitations:

- The interface felt outdated and cumbersome for creating new domains
- Registering wildcard domains (`*.example.com`) required a paid subscription
- Limited control over DNS record management
- No modern API integration or automation features

Since I was already using Cloudflare's free tier for my domains, I realized I could build a better solution that leverages their excellent API while providing the exact interface I wanted.

This project also gave me the perfect opportunity to experiment with Alpine AJAX, which I'd been wanting to try for a while. The combination of Alpine.js and its AJAX plugin provides a clean way to build interactive interfaces without complex JavaScript frameworks.

#### Solution

DDNS Manager is built with Go using the Echo framework and Templ for server-side templating. The application provides:

**Technical Implementation:**
- **Backend**: Go with Echo framework for robust HTTP handling
- **Frontend**: Alpine.js with Alpine AJAX for reactive UI without complex JavaScript
- **Database**: SQLite for lightweight configuration storage
- **Templating**: Templ for type-safe, compiled templates
- **Scheduling**: Robfig/cron for automated IP updates

#### How I Use It

I deploy DDNS Manager on my home server using [Dokploy](/til/2025/03/dokploy-a-simple-docker-deployment-solution/).

The setup is straightforward:

1. Configure Cloudflare API token with `Zone.DNS:Edit` permissions
2. Add your zone ID and domain settings
3. Set update schedule (I use every 6 hours)
4. Manage records through the clean web interface

The application automatically detects when my ISP changes my IP address and updates all relevant A records.
For new subdomains, I can quickly add them through the web interface without dealing with Cloudflare's dashboard.

#### Why This Works Better

Compared to FreeDNS and similar services:

- **Complete Control**: I own the infrastructure and data
- **Modern Interface**: Clean, actually feels good to use (to me)
- **API Integration**: Leverages Cloudflare's robust API instead of screen scraping
- **Automation**: Flexible scheduling options with proper error handling
- **Cost Effective**: Free tier of Cloudflare is more than sufficient for personal use



{{< zoomable-image src="/images/portfolio/ddns.jpg"
                   alt="Screenshot of DDNS"
                   caption="Screenshot of DDNS" >}}
