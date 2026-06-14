---
title: 'My Journey into NixOS'
date: 2025-11-01
summary: 'My journey migrating from Arch Linux to NixOS and what I learned along the way'
tags: ['linux', 'shell', 'cli', 'os', 'nix', 'nixos']
---

This isn't really a single "TIL" entry. Instead, it's a collection of things I learned over about a month while migrating completely from Arch Linux to NixOS.

## Background

I've used Arch Linux for a long time, and I love it. The KISS philosophy is great, and the community around it and the AUR is amazing.

I never had trouble finding packages for Arch, so I never needed to look for a replacement. If it works, don't touch it.

## The Problem

Lately I've had to reinstall my system on several machines. While some distros make this easier (like CachyOS), it always ended up being a manual process. Installing packages manually, configuring services, user settings, SSH keys, YubiKeys, and so on.

I tried writing scripts to simplify this, but they always had issues or needed changes for each hardware setup.

## Entering NixOS

I had tried NixOS at least twice before, but I never fully understood it. This time, I found a YouTube channel [@tony-btw](https://www.youtube.com/@tony-btw) whose videos finally made it click for me.

## My Takeaways

NixOS solves the problem of installing the system on both existing and new machines. Its "reproducible" philosophy is great.

However, not everything is perfect. The system is complex, which is the opposite of what Arch proposes.

For example, managing multiple versions of Node, Java, and other tools is easy in Arch (or any other distro) thanks to tools like [mise](https://mise.jdx.dev/). But these tools don't work by default in NixOS.

I tried many things—flakes, direnv, and more. Finally, I learned that in NixOS you can configure nix-ld to use binaries from other distributions:

```nix
  programs.nix-ld.enable = true;
  programs.nix-ld.libraries = with pkgs; [
    stdenv.cc.cc
    glib
    zlib
    openssl
    curl
    libGL
    libxcb
    freetype
    fontconfig
    gtk3
    nss
    nspr
  ];
```

### A Better Tool: `nh`

One tool I love using is [`nh`](https://github.com/nix-community/nh) (Yet Another Nix Helper). It replaces common NixOS commands with a simpler interface.

It makes working with NixOS much easier. Instead of remembering long `nixos-rebuild` commands, I can use simple `nh` commands for system updates, searching packages, and cleaning up.

### Version Controlling My System

Being able to version control my entire system configuration is wild, and I love it. All my system settings are in a [git repository](https://git.mz.uy/marianozunino/nixos), which means I can track changes, roll back if needed, and easily replicate my setup on new machines.

I even created a simple alias called `nu` (short for "nix-up") that commits my NixOS changes and pushes them to a bare repository on one of my VPS. This makes it easy to keep my system configuration backed up and synced across machines.

### The Snapshots

Don't even get me started on snapshots. I used BTRFS with snapshots on Arch, but honestly, they never felt fully trustworthy. Not because BTRFS isn't reliable, but let's call it a skill issue on my part. When something broke, the existing snapshots didn't feel as reliable as they should.

Now, with NixOS... In my first days of trying to get my system to the point I liked, I broke it, rebooted, chose an old entry from the boot menu, and tada! It worked perfectly on the first try.

### No More Package Clutter

What about that feeling of clutter? You install something and promise yourself "if I don't like it or need it, I'll uninstall it." We all know that's the biggest lie. It's like the comments we leave as tech debt in our code.

With NixOS, that's a problem from the past. You can try packages using `nix-shell` or `nix shell` and that's it. Even if you add it to your confcig files, it still requires you to commit your files to make it "fully persistent." This means if I just do a `git restore` and rebuild, the offending software will be gone. No more orphaned packages cluttering up my system.

In the end, I can say that today NixOS is my favorite operating system.
