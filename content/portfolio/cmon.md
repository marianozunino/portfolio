---
title: 'cmon'
summary: 'A small file watcher that auto-recompiles and reruns C/C++ projects on every save'
description: 'A single binary Go tool that watches a C/C++ project, recompiles it when a file changes and runs it again. I use it while teaching C so the class sees the effect of a change right away'
source: https://git.mz.uy/marianozunino/cmon
position: 0
language: 'GoLang'
---

#### Overview

cmon is a tiny command line tool that watches a C/C++ project and recompiles it every time you save a file. After it builds, it runs the program again. So you just edit, save, and see the result, without typing the compile command over and over.

The name is short for "C/C++ Monitor".

#### Motivation

I teach C at university, and most of the time I'm screen sharing and writing code live. The annoying part is the loop: change something, then remember the `gcc` line with all the flags, compile, run, and repeat. While I do that the class is just waiting.

I wanted something like the live reload tools we use in web development, but for plain C. I save the file and it builds and runs on its own, so the class sees the effect of the change right away. So I wrote cmon.

#### How it works

It watches the project files with `fsnotify`. When something changes it recompiles with `gcc` (or `g++`), auto detecting the include directories so I don't have to pass them by hand. If the build works it runs the program again, and on `Ctrl+C` it cleans up the running process.

#### Config

It works with zero config, but you can drop a `cmon.toml` in the project to set things like the main file, the build directory, folders to exclude, and extra compiler flags. The same options are available as command line flags too.

It's just Go in a single binary, using `fsnotify` for the watching and TOML for the config file.
