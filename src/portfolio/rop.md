---
layout: 'portfolio.njk'
title: 'Run on Pod (rop)'
permalink: /run-on-pod/
summary: A CLI tool for executing scripts and binaries across multiple Kubernetes clusters
source: https://github.com/marianozunino/rop
description: 'Project: A CLI tool for seamless script execution across numerous Kubernetes environments'
position: 0
hidden: false
---

#### Overview
Run on Pod (rop) is a command-line interface tool designed to simplify and standardize the execution of scripts and binaries across multiple Kubernetes clusters and environments.

#### Motivation
In my current role, we manage over 20 Kubernetes clusters. Executing scripts or binaries consistently across these diverse environments was time-consuming and error-prone. Each execution required multiple steps: selecting the right context, copying files, accessing the correct pod, and then running the file.


#### Solution
I developed Run on Pod to streamline this workflow and reduce the potential for errors.
The tool provides a unified interface for script execution across all our Kubernetes environments, automating context switching, file transfer, execution, and cleanup through a single, standardized command.

#### Implementation
Run on Pod is built using Go and leverages:
- **Cobra**: For creating a powerful and user-friendly CLI.
- **Kubernetes Go Client**: To interact with multiple Kubernetes clusters seamlessly.
- **SPDY**: For efficient file transfer to pods across different environments.

#### Key Features
- Single-command execution across multiple Kubernetes contexts
- Automatic handling of cluster-specific configurations
- Support for custom runners to accommodate different runtime environments
- Built-in safety features like confirmation prompts to prevent accidental executions
- Consistent interface for all clusters, reducing cognitive load and potential for mistakes

