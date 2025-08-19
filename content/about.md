---
title: About Me
description: "I'm Mariano, a software engineer from Montevideo, Uruguay. I studied Computer Science at FING after several years working as an IT Technician — a background that still helps me a lot when dealing with infrastructure."
type: about
layout: about
---

Hello!

I'm Mariano, a software engineer from Montevideo, Uruguay. After several years working as an IT Technician, I pursued a Technologist Degree in Computer Science at <a href="https://www.fing.edu.uy/" target="_blank">FING</a>. That hands-on background with infrastructure still proves useful in my work today.

I’m always curious and love diving into new areas of computer science. While I wouldn’t call myself a bookworm, I enjoy reading compelling books, especially those related to programming and systems.

Building side projects is another passion of mine. Some are just for fun, others grow into useful products. For the latter, I often collaborate with my brother <a href="https://totozunino.github.io/portfolio/" target="_blank">Mathias</a>.

In addition to software development, I have a strong interest in teaching and sharing knowledge. As a professor at FING, I strive to train and inspire students. My favorite subject to teach is _Data Structures and Algorithms (EDA)_ — it’s where I get to see students sharpen their problem-solving skills and start thinking like computer scientists.

Outside of work, I spend time with my two lovely dogs 🐶❤️: <a href="/images/rocco.jpg">Rocco</a> and <a href="/images/mora.jpg">Mora</a>. Here’s a photo of them together: <a href="/images/babies.jpg">Dogs</a>.

## Contact

- [CV](/cv/cv.pdf)
- Email me at <span id="email"></span>
- <a href="https://github.com/marianozunino" target="_blank">Github</a>
- <a href="https://linkedin.com/in/mariano-z" target="_blank">LinkedIn</a>

<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function() {
        var user = "marianoz";
        var domain = "posteo";
        var tld = "net";

        var email = user + "@" + domain + "." + tld;

        var emailLink = document.createElement("a");
        emailLink.href = `mailto:${email}?subject=Hello!&body=Hi%20Mariano!`;
        emailLink.textContent = user + " [at] " + domain + " [dot] " + tld;

        document.getElementById("email").appendChild(emailLink);
    });
</script>
