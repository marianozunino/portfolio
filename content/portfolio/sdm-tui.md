---
title: 'SDM TUI'
summary: A terminal UI wrapping the StrongDM (sdm) CLI for a better DX under Linux
source: https://git.mz.uy/marianozunino/sdm-tui
description: 'Project: A terminal UI wrapping the StrongDM (sdm) CLI for a better DX under Linux'
position: 1
language: 'GoLang'
aliases:
  - /portfolio/sdm-ui/
---

#### Overview

SDM TUI is a custom wrapper around StrongDM (SDM) designed to improve the developer experience (DX) on Linux.

#### Motivation

While working for an employer who utilized StrongDM for service access management,
I encountered limitations with the available tools. SDM offers both a CLI and a GUI,
but the GUI was only available for macOS at the time. Although I generally prefer
using the CLI, managing hundreds of connections via the GUI became necessary and
cumbersome on Linux.

Initially, I used a combination of CLI tools such as `sdm`, `grep`, `column`,
and `fzf` to streamline the workflow. This solution, while functional, fell short
of my expectations.

#### Solution

I faced two options:

- Write a shell script to handle the complexities.
- Develop a wrapper using a general-purpose language.

Given the limitations of shell scripting, particularly with handling arrays, I
opted for the latter approach. This decision allowed me to leverage existing
libraries to build a robust solution.

#### Implementation

It's written in Go with [Bubble Tea](https://github.com/charmbracelet/bubbletea)
for the TUI, plus Bubbles and Lip Gloss for the widgets and styling.

It wraps the `sdm` CLI so I can browse and filter the resources, connect with one
keypress (it copies the address to the clipboard), disconnect one or all of them,
and log in again when the session expires. It also sends a desktop notification
with `notify-send` when something changes.

The first version used rofi as a GUI. I moved it to a TUI because the terminal is
where I actually spend my time, and it just feels better (to me).
