---
layout: 'portfolio.njk'
title: 'Morpheus'
permalink: /morpheus/
summary: Morpheus is database migration tool for Neo4j written in Typescript
description: 'Project: Morpheus is database migration tool for Neo4j written in Typescript'
source: https://github.com/marianozunino/morpheus
position: 1
hidden: false
---
#### Overview

Morpheus is a modern, open-source database migration tool designed specifically for Neo4j.
Inspired by Michael Simons' [Neo4j-migrations tool](https://github.com/michael-simons/neo4j-migrations)
for Java, Morpheus aims to provide a simple, intuitive solution for managing database migrations.

#### Motivation

Although Michael's tool for Java includes binaries that eliminate the need for a
Java development environment, I sought to create a solution that could be controlled
and exposed through an API, particularly one that is usable in Node.js. This need
for flexibility and ease of integration led to the development of Morpheus.

#### Solution

Morpheus began as a CLI tool for managing migrations but quickly evolved into a
comprehensive migration tool that integrates seamlessly with Node.js.

To achieve this, I chose **NestJS** to expose the API. The resulting API is simple
and easy to use, providing effective functionality for managing migrations despite
its simplicity.

By creating Morpheus, I aimed to deliver a powerful and user-friendly tool that
enhances the migration process for Neo4j databases, making it accessible and
efficient for developers working within the Node.js ecosystem.
