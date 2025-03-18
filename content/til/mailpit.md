---
title: 'Mailpit: A Simple SMTP Mock Server'
date: 2025-03-13T11:33:20-03:00
summary: 'How to easily mock an SMTP server with Mailpit for development environments'
tags: ['docker', 'email', 'development', 'devops']
---

Today I found a better solution for testing emails in our development/staging environments.

## The Issue

Our service uses a "magic link" login system. This means that whenever users want to log in, they receive an email with a link that grants them access without needing a password.

Our client didn't want to use our production email service in the development environment, so our initial quick-and-dirty solution was simply logging the "access links" in the dev environment.

This was inconvenient since we had to go into Kibana and search through logs to find login attempts. Not very developer-friendly!

## The Solution

I discovered that there are services that can "mock" an SMTP server, allowing you to integrate email testing directly into your development workflow. After exploring options, I settled on [Mailpit](https://github.com/axllent/mailpit), which provides a lightweight SMTP server with a web interface.

I got it up and running with this simple Docker Compose setup:

```yaml
services:
  mailpit:
    restart: unless-stopped
    image: axllent/mailpit:latest
    container_name: mailpit
    hostname: mailpit
    ports:
      - '1025:1025' # SMTP server port
      - '8025:8025' # Web UI port
    environment:
      - PUID=${PUID}
      - PGID=${PGID}
      - TZ=${TZ}
      - MP_SMTP_AUTH_ACCEPT_ANY=true
      - MP_SMTP_AUTH_ALLOW_INSECURE=true
      - MP_UI_AUTH=user:user
```

The setup is straightforward:

- Port 1025 for the SMTP server (your application connects here)
- Port 8025 for the web UI to view captured emails
- Basic authentication for the UI (username: user, password: user)

Now, when our application sends emails in the development environment, they're captured by Mailpit and displayed in a clean interface. No more digging through logs!

## The Result

This gives us a nice UI for reviewing all emails sent during development:

{{< zoomable-image src="/images/til/mailpit.jpg"
                   alt="Mailpit UI Screenshot"
                   caption="Mailpit UI showing captured emails" >}}

This solution has made our development workflow much smoother. Developers can easily test the magic link login flow and preview how emails look without sending actual emails or searching through logs.
