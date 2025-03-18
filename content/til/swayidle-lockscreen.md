---
title: 'Swayidle Lockscreen'
date: 2025-03-13T01:05:40-03:00
summary: 'How to setup swayidle and swaylock for automatic screen locking and power management in Sway'
tags: ['linux', 'sway', 'wayland', 'desktop']
---

Today I finally configured swayidle properly on my Sway setup. I wanted my computer to automatically lock, turn off displays and eventually suspend after periods of inactivity.

## The Setup

First step was creating the swayidle configuration file at `~/.config/swayidle/config`:

```bash
timeout 300 '~/.bin/lock'
timeout 600 'swaymsg "output * power off"' resume 'swaymsg "output * power on"'
timeout 600 'systemctl suspend-then-hibernate'
before-sleep '~/.bin/lock'
after-resume 'swaymsg "output * power on"'
```

This does the following:

- After 5 minutes (300s) of inactivity, run my lock script
- After 10 minutes (600s), turn off all displays
- After 10 minutes, also suspend the system (I use suspend-then-hibernate for longer battery life)
- Before the system goes to sleep, make sure to lock
- After resuming, turn the displays back on

> Note: Timeouts count from when swayidle starts, even when chained

## Sway Configuration

I added this line to my `~/.config/sway/config` to make sure swayidle starts with Sway:

```bash
exec swayidle -w
```

The `-w` flag makes it wait for command to finish.

## Lock Script

But the real magic happens in my `~/.bin/lock` script, which creates a pretty screenshot-based lock screen:

```bash
#!/bin/bash
swaylock -f \
	--screenshots \
	--clock \
	--indicator \
	--indicator-radius 150 \
	--indicator-thickness 7 \
	--font-size 24 \
	--effect-blur 7x5 \
	--effect-vignette 0.5:0.5 \
	--ring-color 9ccfd8 \
	--ring-ver-color f6c177 \
	--ring-wrong-color eb6f92 \
	--key-hl-color eb6f92 \
	--line-color 00000000 \
	--inside-color 191724aa \
	--inside-ver-color 191724aa \
	--inside-wrong-color 191724aa \
	--separator-color 00000000 \
	--text-color e0def4 \
	--text-ver-color e0def4 \
	--text-wrong-color e0def4 \
	--text-caps-lock-color f6c177 \
	--grace 2 \
	--fade-in 0.2
```

This captures my screen, applies a blur and vignette effect, and shows a nice clock with a password indicator. The colors are from my Rose Pine theme.

## Lock Screen Preview

Here's how my lock screen looks with the blur and vignette effects:

{{< zoomable-image src="/images/til/swayidle-lockscreen.png"
                   alt="Sway Lock Screen"
                   caption="My customized lock screen with blur effect and Rose Pine theme colors" >}}
