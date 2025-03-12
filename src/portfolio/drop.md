---
layout: 'portfolio.njk'
title: 'Drop'
permalink: /drop/
summary: "Drop: A temporary file hosting service built with Go's Echo framework"
description: 'Project: Drop is a lightweight, self-hosted file sharing service inspired by 0x0.st that provides temporary file hosting with dynamic expiration'
source: https://github.com/marianozunino/drop
position: -1
hidden: false
---

#### Overview

Drop is a temporary file hosting service built with Go's Echo framework, inspired by [0x0.st](https://0x0.st/). It provides a simple, self-hosted solution for temporary file sharing with dynamic file expiration based on file size.

#### Motivation

I needed a lightweight, self-hosted solution for quickly sharing files that wouldn't require permanent storage. Existing services either had limitations on file sizes, lacked privacy features, or didn't provide the flexibility I was looking for in terms of file retention policies.

But honestly, I also just wanted to fucking build something.

#### Solution

Drop was developed as a personal file hosting service with these key features:

- **Dynamic Expiration System**: Files have retention periods that automatically adjust based on file size - smaller files stay longer, larger files expire sooner.
- **Secret URLs**: Support for hard-to-guess URLs for more private file sharing.
- **File Management**: Users can delete files or modify expiration dates using management tokens.
- **Clean Web Interface**: Simple, responsive UI built with the templ templating engine.
- **Simple API**: Straightforward multipart form-based API for programmatic access.

The project uses smart retention calculations with a configurable formula: `retention = min_age + (min_age - max_age) * pow((file_size / max_size - 1), 3)`. This ensures efficient use of storage space by automatically removing larger files more quickly while keeping smaller files available longer.

#### Implementation

Drop leverages several technologies:

- **Echo Framework**: A high-performance, minimalist Go web framework for routing and handling HTTP requests.
- **templ**: A typed templating language for Go that provides type safety and efficient rendering.
- **Expiration Manager**: A custom-built component that handles file lifecycle management based on configurable retention policies.
- **HTTP API**: Simple API for file uploads, remote URL fetching, and file management operations designed for easy access via cURL and other tools.

The solution also includes thorough testing, especially for the expiration calculation algorithm, ensuring reliability in production environments.

By building Drop, I created a practical utility that simplifies file sharing while maintaining control over data retention and server resources.

#### How I Use It

I've integrated Drop into my daily workflow with a minimal shell function:

```bash
function upload_file() {
  local url="https://dump.mz.uy"
  local full_response=$(curl -i -F"file=@$1" "$url")
  local url_response=$(echo "$full_response" | tail -n 1)
  local token=$(echo "$full_response" | grep -i "X-Token:" | awk '{print $2}' | tr -d '\r')
  echo -n "$url_response" | wl-copy
  echo "Token: $token"
}
alias drop='upload_file'
```

With this simple function, I just type `drop filename.ext` in my terminal, and the file is uploaded with the URL copied to my clipboard.
