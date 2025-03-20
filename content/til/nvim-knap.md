---
title: 'Nvim Knap: Real-time PDF Preview for Markdown and LaTeX'
date: '2025-03-20T13:07:01-03:00'
summary: 'Setting up automatic PDF preview for Markdown files using Knap plugin in Neovim'
tags: ['neovim', 'markdown', 'pandoc', 'latex', 'productivity']
---

## The Problem

When writing LaTeX documents in Neovim, I've been using [vimtex](https://github.com/lervag/vimtex) which offers a complete suite of tools:
syntax highlighting, snippets, compilation, and live PDF preview with [Zathura](https://pwmt.org/projects/zathura/) (or anyother of my choice).

However, when writing Markdown files that I need to convert to PDF using Pandoc, I couldn't find a similar seamless workflow.
I was using plugins like [markdown-preview.nvim](https://github.com/iamcco/markdown-preview.nvim) and [render-markdown.nvim](https://github.com/MeanderingProgrammer/render-markdown.nvim), but still missed the automatic save-and-preview functionality for the generated PDFs.

## Enter Knap

I discovered the [Knap](https://github.com/frabjous/knap) plugin (Kevin's Neovim Auto-Previewer), which provides a flexible way to monitor specific file types and execute custom commands for compilation and preview.

## The Solution

Here's my Knap configuration using lazy.nvim:

```lua
return {
  {
    "frabjous/knap",
    lazy = false,
    config = function()
      -- Configure KNAP settings
      vim.g.knap_settings = {
        mdoutputext = "pdf",
        mdtopdf = "pandoc -o %outputfile% --pdf-engine=xelatex",
        mdtopdfviewerlaunch = "zathura %outputfile%",
        mdtopdfviewerrefresh = "none",
        mdtopdfbufferasstdin = true,
      }

      -- Set up keymappings for all markdown files
      vim.api.nvim_create_autocmd("FileType", {
        pattern = { "markdown", "pandoc", "md" },
        callback = function()
          vim.keymap.set("n", "<lejder>kt", function()
            require("knap").toggle_autopreviewing()
          end, { buffer = true, desc = "KNAP toggle auto-preview" })
        end,
      })
    end,
  },
}
```

## How It Works

With this setup:

1. Knap is configured to output PDF files from Markdown using Pandoc with XeLaTeX as the PDF engine
2. It uses Zathura as the PDF viewer
3. When editing Markdown files, I can press `<leader>kt` to toggle automatic previewing
4. After toggling it on, every time I save my Markdown file, Knap automatically runs Pandoc to generate a PDF and refreshes the viewer

## How It looks

{{< zoomable-image src="/images/til/nvim-knap.jpg"
                   alt="KNAP In Action"
                   caption="KNAP In Action" >}}

So, yay!
