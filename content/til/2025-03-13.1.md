---
title: 'Hugo Learnings: Layouts and Templates'
date: 2025-03-13
summary: 'My notes on Hugo template structure and how it actually works'
tags: ['hugo', 'webdev', 'static-site']
---

Today I had to figure out how Hugo layouts system works. Honestly, it was more confusing than I expected with all these folders and template hierarchies.

## The Basics

Hugo has this thing called "lookup order" which decides what template to use. It's like a waterfall:

1. First it looks for super specific templates
2. Then less specific ones
3. Then default ones

The main template types:

- `baseof.html` - This is like the skeleton. Every page uses this.
- `single.html` - For individual content pages (like one project)
- `list.html` - For sections that show multiple items (like portfolio listing)

## Layout Folders

The folder structure matters a lot. In my portfolio I had:

- `_default/` - These are fallback templates
- `portfolio/` - Special templates just for portfolio items
- `til/` - Special templates for my TIL posts

Hugo tries to find the most specific template first. So for my portfolio items, it checks:
1. `layouts/portfolio/single.html`
2. If missing, falls back to `layouts/_default/single.html`

## Confusing Parts

I had duplicate templates in my repo (`about.html` in two places) which was bad. Only need to keep the one in `_default/`.

Also the `permalink` stuff in `config.yaml` completely changes your URLs structure. Originally I had:

```yaml
permalinks:
  portfolio: /:filename/
```

This means portfolio items skip the /portfolio/ part in URL. Getting rid of this folder name in URL is nice but can be confusing.

## Config Settings

Other interesting config settings:

```yaml
taxonomies:
  tag: "tags"
```

This makes Hugo create tag pages automatically.

```yaml
disableKinds:
  - "taxonomy"
  - "term"
```

But then I disabled those pages! So I defined tags but don't create separate pages for them - I should probably fix this if I want tag navigation.

## Template Variables

In templates you use:
- `.Title` - Page title
- `.Content` - The main content
- `.RelPermalink` - URL for internal links
- `.Params.X` - Custom frontmatter values

For example, in my portfolio template I use:

```html
{{ if .Params.source }}
<a class="port-link" href="{{ .Params.source }}">
  Source <i class="fa-regular fa-file-code"></i>
</a>
{{ end }}
```

This checks if source exists in frontmatter before showing link.

## Summary

Hugo is powerful but confusing with its many layers of templates. The most important things:

1. Understand the lookup order
2. Keep template structure clean (no duplicates)
3. Be careful with permalinks config

Once you figure this stuff out, it's actually very flexible. But documentation could be better for beginners.
