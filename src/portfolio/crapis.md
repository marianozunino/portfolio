---
layout: 'portfolio.njk'
title: 'Crapis (RESP Implementation)'
permalink: /crapis/
summary: 'A Go project for RESP (Redis Serialization Protocol).'
source: https://github.com/marianozunino/crapis
description: 'A basic implementation of the Redis Serialization Protocol (RESP) in Go for learning and exploration.'
position: 0
hidden: false
---

## Crapis

### Overview

Crapis is a Go-based project that implements the RESP (REdis Serialization Protocol). RESP is a binary-safe protocol used by Redis for client-server communication, and this project provides a basic structure for reading and parsing RESP-encoded data.

### Motivation

Crapis was created as a learning project to understand and implement the Redis Serialization Protocol (RESP) from scratch. The project is based on a tutorial, "Build Redis from Scratch," which guided the development of this simplified RESP implementation. By working on this project, the goal was to deepen the understanding of how Redis handles communication and to explore the internal workings of RESP.

### Solution

Crapis implements the fundamental components of RESP, including the ability to parse different RESP data types such as:

- Simple Strings
- Errors
- Integers
- Bulk Strings
- Arrays

The project also handles errors for invalid inputs, making it a robust starting point for building applications that need to communicate using the RESP protocol.

