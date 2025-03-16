---
title: 'ZSH Completion for Custom Functions'
date: 2025-03-16
summary: 'Adding file completion to custom shell functions in ZSH'
tags: ['zsh', 'shell', 'cli', 'linux', 'productivity']
---

## The Problem

I had this function that didn't trigger tab completion and it was pretty frustrating:

```zsh
function upload_file() {
  # Function that uploads a file and copies URL to clipboard
  local url="..."
  local full_response=$(curl -i -F"file=@$1" "$url")
  # Process response and copy to clipboard
}

# Create aliases
alias drop='upload_file'
alias dump='upload_file'
```

When typing `drop` and hitting Tab, nothing happened. No file completion at all. I had to type out the whole filename manually, which defeated the purpose of having a convenient upload command in the first place.

## The Solution: compdef

I've known about ZSH's completion system for a while but never bothered to learn how to use it. Turns out, the solution was surprisingly simple - I just needed to add the `compdef` command:

```zsh
# Tell ZSH to use file completion for these commands
compdef _files upload_file drop dump
```

That's it! Just one line and suddenly my commands had full file completion. Sometimes the simplest solutions are right there waiting.

## More Built-in Completion Functions

ZSH comes with many useful completion functions:

- `_files` - completes filenames
- `_directories` - completes only directories
- `_users` - completes usernames
- `_hosts` - completes hostnames
- `_processes` - completes process IDs

You can find all available completion functions in:

```zsh
ls /usr/share/zsh/functions/Completion
```

## Creating Custom Completion Functions

Sometimes you need more than what the built-in completion functions offer. For example, maybe you want to complete only certain file types, or provide context-specific options.

Here's how to create a custom completion function:

1. Create a function with an underscore prefix (convention for completion functions):

```zsh
# Complete only markdown files for my 'notes' command
_notes_completion() {
  _files -g "*.md"
}
compdef _notes_completion notes
```

For more complex completions, you can use ZSH's `compadd` to add your own completion candidates:

```zsh
_my_custom_completion() {
  local -a options
  options=(
    "option1:Description for option 1"
    "option2:Description for option 2"
    "help:Show help information"
  )

  _describe "command" options
}
compdef _my_custom_completion mycommand
```

You can even make completions context-aware:

```zsh
_deploy_completion() {
  local curcontext="$curcontext" state line
  typeset -A opt_args

  _arguments \
    '1: :->environment' \
    '2: :->service'

  case $state in
    environment)
      _values "environment" "dev" "staging" "production"
      ;;
    service)
      case $words[2] in
        dev)
          _values "service" "api" "web" "worker"
          ;;
        staging|production)
          _values "service" "api" "web" "worker" "cron" "metrics"
          ;;
      esac
      ;;
  esac
}
compdef _deploy_completion deploy
```

This would give different suggestions for the second argument based on what you entered for the first argument.

{{< zoomable-image
  src="/images/til/zsh-compdef.jpg"
  alt="ZSH Completion for Custom Functions"
  caption="ZSH Completion for Custom Functions" >}}

## The Key Insight

The important thing I learned was that ZSH's `compdef` command is the bridge between your custom functions and ZSH's completion system. Without it, ZSH has no idea what kind of completion to provide for your commands.

Now my workflow is actually useful - I can type `drop` and Tab to see all files, pick the one I want to upload, and get a shareable link copied to my clipboard without typing long filenames manually.
