---
title: 'SDM UI'
summary: An ugly sdm (strong DM) wrapper to get a better DX under linux
source: https://github.com/marianozunino/sdm-ui
description: 'Project: An ugly sdm (strong DM) wrapper to get a better DX under linux'
position: 1
---
#### Overview

SDM UI is a custom wrapper around StrongDM (SDM) designed to improve the developer experience (DX) on Linux.

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

SDM UI integrates the following libraries:
- **rofi**: Provides a user-friendly GUI for connection management.
- **keyring**: Manages and stores credentials securely.
- **clipper**: A clipboard manager for efficient copy-pasting.
- **bbolt**: A performant key-value database for storing connection details.

This combination resulted in a more efficient and user-friendly tool for managing
StrongDM connections on Linux.

By creating SDM UI, I improved the overall developer experience, making it easier
to manage numerous connections and enhancing productivity.
