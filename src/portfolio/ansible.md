---
layout: 'portfolio.njk'
title: 'Ansible Config'
permalink: /ansible/
summary: "My ansible linux config"
description: 'My ansible linux config'
source: https://github.com/marianozunino/ansible
position: 99
hidden: false
---
#### Overview

This project contains my Ansible configuration for quickly bootstrapping Linux systems.

#### Motivation

Setting up a new system from scratch can be time-consuming and repetitive.
To streamline this process, I created an Ansible configuration that automates
the setup of my preferred environment. This ensures consistency and saves time
whenever I (rarely) need to configure a new machine or reconfigure an existing one.

#### Solution

The Ansible configuration includes various playbooks and roles tailored to my specific requirements.
These playbooks handle tasks such as:

- Installing essential packages and software
- Configuring system settings and preferences
- Setting up development environments
- Managing user accounts and permissions
