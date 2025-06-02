---
title: 'From Ansible to Simple Shell Scripts: Building a Custom Dev Tool'
date: '2025-06-02'
summary: 'Why I stopped using Ansible for machine setup and built a simple script runner instead'
tags: ['golang', 'shell', 'ansible', 'automation', 'devops', 'cli', 'productivity']
---

## The Ansible Problem

I used Ansible to set up my computers for years. It's powerful, but it became annoying to figure out simple tasks like "replace a line in a file". Yes, once you learn how Ansible works, it's fine. But I was spending too much time learning Ansible instead of just solving my problems with shell scripts.

Why learn a complex tool when I can just write bash scripts?

## The Solution: A Simple Script Runner

Instead of fighting with Ansible, I built a simple Go tool called `dev`. It makes running shell scripts easy.

Here's the project structure:

```
.
├── bin/
│   └── dev-linux-amd64
├── logs/
│   ├── backup.log
│   ├── base.log
│   ├── dev.log
│   └── test.log
├── runs/
│   ├── base
│   ├── boot
│   ├── docker
│   ├── forbi
│   ├── paru
│   └── services
├── dev
├── go.mod
├── go.sum
├── main.go
└── README.md
```

## How It Works

The tool is simple:

1. **Put scripts in runs/**: All executable scripts go in the `runs/` folder
2. **Run them easily**: Use `dev run <script>` to run any script
3. **Find scripts**: `dev run tools` runs all scripts with "tools" in the name
4. **See logs**: All output goes to `logs/` folder so you can debug
5. **List scripts**: `dev ls` shows all available scripts

### Example Usage

```bash
# List all available scripts
dev ls

# Run a specific script
dev run base

# Run scripts with arguments
dev run docker -- --force

# Run all scripts matching a pattern
dev run tools

# Create a new script template
dev new my-script
```

## Key Features

### Smart Script Detection
The tool finds all executable files in the `runs/` folder automatically:

```go
func findScripts(filters []string) ([]Script, error) {
    var scripts []Script

    // Walk through runs/ directory
    err := filepath.Walk(config.RunsDir, func(path string, info os.FileInfo, err error) error {
        // Check if file is executable
        if info.Mode().IsRegular() && (info.Mode()&0o111) != 0 {
            scripts = append(scripts, Script{
                Path:    path,
                Name:    filepath.Base(path),
                RelPath: relPath,
                Desc:    getDescription(path),
            })
        }
        return nil
    })

    return scripts, err
}
```

### Auto-Build
The wrapper script builds the Go binary when needed:

```bash
#!/usr/bin/env bash
# Build if binary doesn't exist or source is newer
if [[ ! -f "$BINARY" ]] || [[ "main.go" -nt "$BINARY" ]]; then
    echo "Building dev tool..."
    go build -o "$BINARY" main.go
fi

# Run the binary
exec "$BINARY" "$@"
```

### Git Integration
The `push` command does everything:

```bash
# Commit changes, scan for secrets, and push
dev push
```

This will:
- Commit any changes you made
- Run security scan (GitLeaks)
- Push to git

## Why This Works Better

### 1. **Simple**
Instead of learning Ansible, I just write bash scripts. Need to replace a line? Use `sed`. Need to install packages? Use the package manager.

### 2. **Easy to Debug**
With Ansible, debugging was hard. With shell scripts, I can see exactly what commands run.

### 3. **Flexible**
Shell scripts can handle weird cases without fighting a framework.

### 4. **Works Everywhere**
The same scripts work on any machine with bash. No need to install Ansible.

## Example Script

Here's what a typical configuration script looks like:

```bash
#!/usr/bin/env bash
# NAME: Base system configuration

set -euo pipefail

echo "Configuring base system..."

# Install essential packages
sudo pacman -S --needed \
    git vim tmux curl wget \
    base-devel linux-headers

# Configure git if not already done
if ! git config --global user.name &>/dev/null; then
    git config --global user.name "Your Name"
    git config --global user.email "your@email.com"
fi

# Set up dotfiles
if [[ ! -d "$HOME/.config" ]]; then
    mkdir -p "$HOME/.config"
fi

echo "✅ Base configuration completed"
```

## Why Go Instead of Pure Shell?

I actually tried to build this tool with just shell scripts first. But then I needed to work with arrays to handle multiple scripts and arguments. I follow a simple rule: **"Once you need arrays in bash, move to another language"**.

Bash arrays are confusing and break easily. Go makes handling lists of scripts, arguments, and filters much cleaner and safer.

## The Bottom Line

For setting up my computers, this simple approach beats Ansible:

- **Faster**: No need to translate ideas into Ansible syntax
- **Easier to debug**: Direct shell output and simple logs
- **Better organized**: Scripts are organized by what they do
- **No dependencies**: Just bash and the tools you already use

Sometimes the simple solution is the best solution. Instead of learning a complex tool for basic tasks, I built exactly what I needed: a way to organize and run shell scripts easily.

The tool is fast and does exactly what I need without the complexity that made Ansible annoying.

You can check out the full source code at: https://git.mz.uy/marianozunino/dev
