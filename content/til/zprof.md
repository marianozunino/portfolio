---
title: 'Speeding Up zsh Startup with zprof and zsh-defer'
date: '2025-03-19T12:11:52-03:00'
summary: 'How I diagnosed and fixed slow zsh startup times using zprof and lazy loading'
tags: ['zsh', 'shell', 'cli', 'linux', 'productivity', 'performance']
---

## The Problem

I noticed my zsh shell was taking several seconds to start up, which was frustrating each time I opened a new terminal. Instead of just accepting the delay, I decided to investigate.

## Diagnosing with zmodload zsh/zprof

To find the bottleneck, I used `zmodload zsh/zprof` at the beginning of my `.zshrc` file and added `zprof` at the end to print performance statistics. This showed me which plugins and configurations were causing the slowdown.

I was using the [zap](https://github.com/zap-zsh/zap) plugin manager, which is quite simple, but some of my plugins were taking too long to load. This led me to look for faster alternatives (**not blaming zap at all!**)

## Finding a Solution

My search for better performance led me to [sheldon](https://github.com/rossmacarthur/sheldon), a blazingly fast plugin manager. But the real game-changer was discovering [zsh-defer](https://github.com/romkatv/zsh-defer), which lets you lazy-load plugins.

## zsh-defer: The Game Changer

After using sheldon with zsh-defer for a few weeks, I was happy with the speed improvements. However, I wasn't thrilled about having a separate directory just for sheldon's configuration. Being the engineer I am, I decided to build my own solution combining the best of both worlds.

## My Custom Setup

Here's my streamlined `.zshrc`:

```bash
source $ZDOTDIR/init.zsh
# Initialize completions with defer
autoload -Uz compinit
if [ "$(date +'%j')" != "$(stat -f '%Sm' -t '%j' ~/.zcompdump 2>/dev/null)" ]; then
    zsh-defer compinit
else
    zsh-defer compinit -C
fi
```

And the heart of my solution, `init.zsh`:

```bash
PLUGIN_DIR="$HOME/.local/share/zsh/plugins"
PLUGIN_LOCK="$PLUGIN_DIR/.plugins.lock"
[ -d "$PLUGIN_DIR" ] || mkdir -p "$PLUGIN_DIR"

# Reinstall function
update-plugins() {
  rm -fr "$PLUGIN_DIR"
  echo "Plugin lock removed. Restart your shell to reinstall plugins."
}

# Define plugins: "github_repo name"
plugins=(
  "romkatv/zsh-defer"
  "zsh-users/zsh-autosuggestions"
  ...
  "zsh-users/zsh-syntax-highlighting"
)

# Only install plugins if lock file doesn't exist
if [ ! -f "$PLUGIN_LOCK" ]; then
  for plugin in "${plugins[@]}"; do
    plugin_name=${plugin##*/}
    if [ ! -d "$PLUGIN_DIR/$plugin_name" ]; then
      git clone --quiet "https://github.com/$plugin" "$PLUGIN_DIR/$plugin_name" --depth=1
    fi
  done
  date > "$PLUGIN_LOCK"
fi

# Source plugins
source "$PLUGIN_DIR/zsh-defer/zsh-defer.plugin.zsh"
source "$PLUGIN_DIR/zsh-autosuggestions/zsh-autosuggestions.zsh"
...

# Source config files
source "$ZDOTDIR/opts.zsh"
...

# Defer loading
zsh-defer source "$PLUGIN_DIR/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"
for config in mise.zsh tmux.zsh functions.zsh alias.zsh keymap.zsh path.zsh pnpm.zsh opts.zsh; do
  zsh-defer source "$ZDOTDIR/$config"
done


```

## The Results

After implementing these changes, I ran zprof again to check the performance:

```
num  calls                time                       self            name
-----------------------------------------------------------------------------------
 1)    1           2.83     2.83   30.88%      2.83     2.83   30.88%  autopair-init
 2)    1           1.77     1.77   19.27%      1.77     1.77   19.27%  enable-fzf-tab
 3)    1           1.71     1.71   18.65%      1.71     1.71   18.65%  check_maintenance
 4)    1           0.62     0.62    6.79%      0.62     0.62    6.79%  _history-substring-search-function-callable
```

The key improvements in my approach:

1. **Simple plugin management** - No external manager needed, just a basic script that clones plugins
2. **Strategic loading** - Critical plugins load synchronously, while others are deferred
3. **Performance monitoring** - Using zprof to validate the improvements
4. **Easy maintenance** - A simple function to reinstall plugins when needed

My shell now starts almost instantly, and I get all the functionality I need without the wait. The best part is that this solution is lightweight and doesn't depend on complex plugin managers.
