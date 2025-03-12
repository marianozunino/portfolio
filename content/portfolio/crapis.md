---
title: 'Crapis'
summary: 'RESP implementation in Go with basic Redis commands.'
source: https://github.com/marianozunino/crapis
description: 'An implementation of the Redis Serialization Protocol (RESP) in Go, featuring both reading and writing capabilities, along with basic Redis command functionality.'
position: 1
---

## Crapis

### Overview

Crapis is a Go-based project that implements the RESP (REdis Serialization Protocol). RESP is a binary-safe protocol used by Redis for client-server communication, and this project provides a structure for both reading and writing RESP-encoded data, as well as handling basic Redis commands.

### Motivation

Crapis was created as a learning project to understand and implement the Redis Serialization Protocol (RESP) from scratch. The project is based on a tutorial, "Build Redis from Scratch," which guided the development of this RESP implementation. By working on this project, the goal was to deepen the understanding of how Redis handles communication and to explore the internal workings of RESP, while also implementing basic Redis functionality.

### Solution

Crapis implements the fundamental components of RESP, including the ability to parse and encode different RESP data types such as:

- Simple Strings
- Errors
- Integers
- Bulk Strings
- Arrays

The project also includes:

- RESP writer functionality for encoding responses
- Error handling for invalid inputs
- CLI flags for server configuration
- Basic Redis commands:
  - GET: Retrieve the value of a key
  - SET: Set the value of a key
  - SETEX: Set the value and expiration of a key (uses passive strategy for simplicity)
  - PING: Test if the server is responsive

These features make Crapis a robust starting point for building applications that need to communicate using the RESP protocol or for creating simplified Redis-like servers.

### Key Features

- Full RESP implementation with both reading and writing capabilities
- Basic Redis command functionality (GET, SET, SETEX, PING)
- Configurable server with CLI flags
- Error handling and invalid input management
