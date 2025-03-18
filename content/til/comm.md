---
title: 'Using comm as an Alternative to diff'
date: 2025-03-14
summary: 'A look at how `comm` can be used to compare files, and how it differs from `diff`'
tags: ['linux', 'shell', 'cli', 'text-processing', 'tools']
---

Today I discovered the `comm` command—an alternative way to compare files. Unlike `diff`, `comm` is particularly useful for working with sorted data.

## The Problem

Every so often, I need to compare two sets of data, such as information from Service A vs B. My goal is to quickly identify what data exists in one but not the other.

## What I Used to Do

I used to rely on `diff` with a set of specific flags:

```bash
diff --new-line-format="%L" --unchanged-line-format="" a.sorted b.sorted > missing.txt
```

### Explanation:

- `--new-line-format="%L"` → Prints lines unique to the first file.
- `--unchanged-line-format=""` → Hides common lines.

## A Simpler Alternative: `comm`

With `comm`, I can achieve the same result more concisely:

```bash
comm -23 a.sorted b.sorted > missing.txt
```

### Explanation:

- `-3` → Suppresses the third column (lines common to both files), leaving only unique entries from each file.

## `comm` vs `diff`

While both `comm` and `diff` compare files line by line, they serve different purposes:

| Feature                  | `comm`                                                    | `diff`                                                               |
| ------------------------ | --------------------------------------------------------- | -------------------------------------------------------------------- |
| **Comparison Basis**     | Works on sorted files                                     | Works on any files                                                   |
| **Sorting Required?**    | Yes                                                       | No                                                                   |
| **Output Format**        | Three-column output (unique & common)                     | Contextual differences                                               |
| **Suppressing Output**   | Can hide columns (`-1`, `-2`, `-3`)                       | No direct way to suppress lines                                      |
| **Finding Unique Lines** | `comm -23 file1 file2`                                    | `diff --new-line-format="%L" --unchanged-line-format="" file1 file2` |
| **Finding Common Lines** | `comm -12 file1 file2`                                    | `diff file1 file2 \| grep '^ '`                                      |
| **Best Used For**        | Comparing sorted lists and extracting unique/common lines | Identifying line-by-line differences                                 |

## My Takeaways

For this specific task, I now prefer `comm` because it’s simpler and more intuitive. A key advantage is that it forces me to remember that files **must** be sorted—something I often forget when using `diff`, leading to unexpected results.
