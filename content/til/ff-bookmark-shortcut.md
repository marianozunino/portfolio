---
title: 'Firefox Bookmark Shortcuts: A Game-Changer for Navigation'
date: 2025-04-16
summary: 'How to use keyword shortcuts in Firefox bookmarks for lightning-fast navigation'
tags: ['firefox', 'productivity', 'browser', 'shortcuts', 'tips']
---

## The Hidden Feature I Wish I'd Known Earlier

A few months ago, I discovered a Firefox feature that completely changed how I use bookmarks: keyword shortcuts. Firefox lets you assign keywords to bookmarks, allowing you to access sites directly from the address bar with just a few keystrokes.

## The Problem with Traditional Bookmarks

Before discovering this feature, I had two problems:

1. My bookmark toolbar was cluttered with dozens of icons
2. Finding specific bookmarks in folders required too many clicks

Sure, I could use the awesome bar's search, but that still required typing part of the site name and hoping Firefox's algorithm would suggest the right one.

## How to Set Up Bookmark Keywords

Adding a keyword to your Firefox bookmarks is simple:

1. Create or locate a bookmark in your Firefox bookmarks
2. Right-click on the bookmark
3. Select "Edit Bookmark"
4. In the dialog box, enter your desired shortcut in the "Keyword" field
5. Click "Save"

{{< figure src="/images/til/firefox-bookmark-keywords.jpg" title="Firefox bookmark properties dialog" width="500px" >}}

## How to Use Bookmark Keywords

Once set up, using keywords is simple:

1. Click in the address bar (or press Ctrl+L)
2. Type your keyword and press Enter

Firefox immediately navigates to the associated bookmark. No autocomplete needed, no waiting, just instant navigation.

## My Favorite Keyword Shortcuts

Here are some of my most-used shortcuts:

- `mz` → Takes me to my personal site (mzunino.com.uy)
- `ghmz` → Opens my GitHub repositories
- `mail` → Opens my webmail client
- `cal` → Opens Google Calendar
- `jira` → Opens our company's JIRA dashboard
- `docs` → Opens our company's Confluence docs

## Why This Changed Everything

This approach has several benefits:

1. **Cleaner UI**: I no longer need bookmarks in my toolbar, giving me more viewport space
2. **Muscle memory**: Typing `mail` + Enter becomes as automatic as Ctrl+T for a new tab
3. **Efficiency**: Accessing bookmarks is now faster than clicking icons or navigating menus
4. **Consistency**: These shortcuts work very similarly to shell aliases, so the mental model transfers well - I know, this sounds far-fetched, but I have to convince myself that it's true

## Power User Trick: Bookmark with Parameters

You can take this a step further with parameterized bookmarks. For example, I have a bookmark for searching our company documentation with the keyword `docs`. The URL is:

```
https://company-docs.example.com/search?q=%s
```

When I type `docs kubernetes` in the address bar, Firefox replaces `%s` with "kubernetes" and navigates to the search results.

This works for any site with a predictable search URL pattern:
- My GitHub repositories: `https://github.com/marianozunino?tab=repositories&q=%s`
  - search for my `dotfiles` repository: `ghmz dot <Enter>`

{{< figure src="/images/til/firefox-bookmark-keywords-ghmz.jpg" title="Firefox bookmark with parameters" width="500px" >}}

