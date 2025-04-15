---
title: 'Migrating from LaTeX to Typst'
date: '2025-04-15'
summary: 'How switching from LaTeX to Typst made my CV creation simpler, faster, and more enjoyable'
tags: ['typst', 'latex', 'document-creation', 'typesetting', 'productivity']
---

## The LaTeX Problem

For years, I've used LaTeX for my CV. It worked well enough, but came with a host of frustrations:

- Slow compile times (especially with complex documents)
- Cryptic error messages that would take forever to debug
- Cumbersome syntax for custom functions and formatting
- Package conflicts that seemed to arise out of nowhere
- A steep learning curve for anything beyond basic usage

While LaTeX is powerful, these pain points had me looking for alternatives... let alone the installation on itself.

## Enter Typst

Recently, I decided to migrate my CV from LaTeX to [Typst](https://typst.app/), and the difference was immediately noticeable.

Typst is a modern typesetting system designed as an alternative to LaTeX. It offers:

- Lightning-fast compilation times (we're talking milliseconds)
- A cleaner, more intuitive syntax
- Excellent error messages that actually tell you what went wrong
- Built-in versioning and collaboration tools
- No dependency hell from conflicting packages

## The Migration Process

Converting my LaTeX CV to Typst was surprisingly straightforward. Here's a before-and-after comparison of a section:

**LaTeX version:**

```latex
\section{Experience}
\begin{itemize}
  \item \textbf{Senior Software Engineer} \hfill 2020 - Present
  \begin{itemize}
    \item Bla bla
    \item Yada yada
  \end{itemize}
\end{itemize}
```

**Typst version:**

```typst
= Experience

#entry(
  [Senior Software Engineer],
  [2020 - Present],
  list(
    [Bla bla],
    [Yada yada]
  )
)
```

Where `entry` is a simple function I defined:

```typst
#let entry(title, date, details) = {
  grid(
    columns: (1fr, auto),
    gutter: 0.5em,
    align: (start, end),
    text(weight: "light", 1.1em, title),
    text(date, style: "italic")
  )
  pad(left: 1em, details)
}
```

## What I Love About Typst

### 1. Fast Iteration Cycles

The near-instant compilation times changed my workflow completely. With LaTeX, I would make a few changes, then wait several seconds (or even minutes with complex documents) to see the results.

With Typst, I can see changes as I type, which makes fine-tuning a document much more efficient.

#### Neovim Integration

I integrated Typst with my Neovim setup using the excellent [typst-preview.nvim](https://github.com/chomosuke/typst-preview.nvim) plugin:

```lua
{
  "chomosuke/typst-preview.nvim",
  lazy = false, -- or ft = 'typst'
  version = "1.*",
  opts = {}, -- lazy.nvim will implicitly calls `setup {}`
},
```

The real-time preview is mind-blowing - changes appear instantly in the preview window **even without saving the document**!
This is a game-changer for productivity, especially compared to the clunky compile-preview-edit cycle I was used to with LaTeX.

### 3. Error Messages That Make Sense

When I make a mistake, which happens all the time, I get clear, helpful error messages:

```
error: unexpected type: expected length, found color
  --> cv.typ:15:10
   |
15 |   stroke: blue,
   |           ^^^^ did you mean to use a different type?
```

Compare that to the infamous "Undefined control sequence" errors in LaTeX...

## The Downsides

To be fair, there are a few areas where Typst still lags behind LaTeX:

1. **Ecosystem Size**: LaTeX has decades of packages and templates
3. **Advanced Math**: While Typst handles most math well, LaTeX still has an edge with very complex equations

But for my CV and most of my document needs, these limitations weren't relevant.

## Conclusion

Migrating from LaTeX to Typst has been one of those _**very rare**_ transitions where almost everything is better. The speed alone makes it worthwhile, but the cleaner syntax, better error handling, and intuitive programming model push it over the top.

{{< zoomable-image
  src="/images/til/typst-vs-latex.jpg"
  alt="Comparison of Typst and LaTeX code side by side"
  caption="Typst (left) vs LaTeX (right)" >}}
