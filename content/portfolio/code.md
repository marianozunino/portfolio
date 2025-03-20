---
title: 'Code'
summary: 'CLI tool for quickly navigating and opening development projects in Neovim with MRU tracking'
description: 'A Go-based command-line utility that simplifies navigation between projects by providing fuzzy finding capabilities and tracking most recently used projects, optimized for Sway, kitty, and Neovim.'
source: https://github.com/marianozunino/code
position: 0
language: 'GoLang'
---

#### Overview

Code is a simple CLI tool I made to help me open my coding projects faster. It remembers which projects I use most often and works with my favorite tools like Neovim, Sway window manager, and kitty terminal.

#### Motivation

I got tired of typing long folder paths all the time. When you work on lots of projects, it's annoying to keep searching through folders just to open something. I wanted a tool that would:

- Remember my favorite projects
- Let me search quickly
- Work with my usual tools
- Handle windows nicely

#### Solution

I built Code in Go to scan my folders for Git projects and show them in a simple list I can search through. The main features:

- Quick fuzzy search to find any project
- Keeps track of recently used projects
- Opens stuff directly in Neovim
- Works with Sway to manage windows
- Can use either fuzzel (GUI) or fzf (terminal)
- Handles tmux sessions too

I can switch between different search interfaces using simple Lua config files:

```lua
-- fuzzel configuration (GUI)
return {
    command = function()
        return {
            command = "fuzzel",
            args = { "--dmenu", "--prompt=Project: " }
        }
    end,
    show = function(text)
        return "📘 " .. text
    end,
    process_output = function(text)
        return text:gsub("^📘%s*", "")
    end
}
```

Using it is super simple:

```bash
# Just run 'code' to see list of projects
code

# Or specify which folder to look in
code ~/Projects
```

I have it bound to a keyboard shortcut in my Sway config, so I can press `$mod+t` anytime to quickly open a project:

```bash
bindsym {
    # Other keybindings...
    $mod+t        exec ~/.bin/code -s ~/.bin/fuzzel.lua
    # More keybindings...
}
```

Which looks like this when I trigger it:

{{< zoomable-image src="/images/portfolio/code.jpg"
                   alt="Screenshot of Fuzzel"
                   caption="Screenshot of Fuzzel" >}}

On selection, it will spawn a new Kitty terminal with its own Tmux session and open the project in Neovim plus an empty vertical pane.

But, if the project is already open, it will just switch to that window:

{{< zoomable-image src="/images/portfolio/code-2.jpg"
                   alt="Screenshot of Kitty"
                   caption="Screenshot of Kitty" >}}

> Is it over kill?
>
> Yes
>
> I love it
