---
layout: 'portfolio.njk'
title: 'Go Ashot'
permalink: /go-ashot/
summary: "Go Ashot: Managing Custom Food Orders with GoLang"
source: https://github.com/marianozunino/goashot
position: 3
hidden: false
---
#### Overview

Go Ashot is a GoLang project that allows users to place food orders on [Rappi.com.uy](https://www.rappi.com.uy/).

#### Motivation

At a previous workplace, we had a tradition called "Shawarma Friday," where the company would order Shawarma for everyone. Each employee could customize their order, but Rappi's platform did not support custom orders efficiently. This led to the tedious process of someone manually collecting everyone's order preferences.

#### Solution

Go Ashot was developed to automate and streamline the process of customizing and placing food orders on Rappi. The project scrapes necessary data from the Rappi site, such as topping IDs, and stores it in a JSON file that acts as a database. It then provides an internal "MVC" layer for managing the food orders.

Once all the orders are ready, corporate can place the collective order directly on Rappi's site.

