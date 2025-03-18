---
title: 'Dokploy: A Simple Docker Deployment Solution'
date: 2025-03-15
tags: ['homelab', 'linux', 'hosting', 'docker', 'self-hosting']
summary: "The deployment solution that I wasn't looking for"
---

## My Current Setup

### Hardware

- Raspberry Pi 4 with an external SSD

### OS

- DietPi

## Current Orchestration

I have a folder structure that looks like this:

```
.
├── traefik
│   ├── config
│   ├── data
│   └── docker-compose.yml
├── uptime-kuma
│   ├── data
│   └── docker-compose.yml
├── vaultwarden
│   ├── data
│   └── docker-compose.yml
└── many more...
    ├── data
    └── docker-compose.yml
```

The basic idea is to have one docker-compose file per service, and another main file that includes all of them:

```yaml
include:
  - path: './traefik/docker-compose.yml'
  - path: './vaultwarden/docker-compose.yml'
  - path: './uptime-kuma/docker-compose.yml'
  # many more...
networks:
  traefik:
    name: traefik
```

Traefik is my entry point for all services. Thanks to Docker's label system, I can easily configure domains (either local or external) for each service.

## The Problem

This setup works perfectly when I'm deploying services that already have a Docker image published on a registry. But now I wanted to deploy some of my own applications.

For my own projects, I used to deploy on [Fly.io](https://fly.io), which is great, but I wanted to keep everything in-house.

## Options

### Dokku

This looked like a great option, but I wanted to keep using my already deployed services (all my docker-compose files). Making Dokku work alongside my existing setup seemed complicated.

Maybe it was just a skill issue thinng, but I couldn't find a way to make it work without re-deploying all my services or doing some complex crap.

### Dokploy

I found Dokploy by chance, probably from a Reddit post or Hacker News. After reading the docs, it promised to be a simple solution and exactly what I needed.

And it was! Installation was super easy:

```bash
curl -sSL https://dokploy.com/install.sh | sh
```

After creating the admin account on the website, I was done. I could copy/paste all my docker-compose files and even keep the same network bindings that my services already had.

One really cool thing, is that it creates a Webhook endpoint for each service, so by configuring that on GitHub I get deploys at the glance of a push. **No github actions needed!**

{{< zoomable-image src="/images/til/dokploy.jpg"
                   alt="Dokploy"
                   caption="Dokploy - With a random app deployed" >}}

## Why Dokploy Works For Me

- **Simple setup**: No complex configuration needed
- **Works with existing services**: Didn't have to change my current docker-compose setup
- **Easy deployment**: Can deploy my own apps alongside third-party services.
- **Uses Traefik**: Integrates perfectly with my existing Traefik setup

Now I can deploy both third-party services and my own applications on my crappy homelab without any hassle.
