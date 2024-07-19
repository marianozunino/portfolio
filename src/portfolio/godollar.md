---
layout: 'portfolio.njk'
title: 'Go Dollar'
permalink: /go-dollar/
summary: "Go Dollar: Fetching Historical US Dollar Prices from the INE"
description: 'Project: Go Dollar allows fetching historical US Dollar Prices from the INE'
source: https://github.com/marianozunino/goashot
position: 3
hidden: false
---
#### Overview

Go Dollar is a GoLang project designed to fetch the US Dollar price from the [INE](https://www.gub.uy/instituto-nacional-estadistica/) for recent years.

#### Motivation

Previously, a website provided the historical exchange rates of the US Dollar against the local currency (UYU).
When this service was no longer available, I created Go Dollar to fill the gap, allowing users to access this data.

#### Solution

Developed using GoLang, Go Dollar scrapes data from an XLS file provided by INE.
The project then exposes a basic API to serve the historical exchange rates, making it easy for users to retrieve and utilize this information.

