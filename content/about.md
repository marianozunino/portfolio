---
title: About Me
description: "I'm Mariano, a software architect and professor from Montevideo, Uruguay. I design backend and distributed systems and teach computer science at UTU."
type: about
layout: about
---

Hello!

I'm Mariano, a software architect and professor from Montevideo, Uruguay. I work as a Software Architect at Stuzo &amp; PAR, designing and evolving backend and distributed systems. Before that, I spent several years building products as a backend engineer at companies like Vairix, Nubceo and Antel. I originally started out as an IT Technician, and that hands-on infrastructure background still helps a lot when dealing with real-world systems.

I’m always curious and love diving into new areas of computer science. While I wouldn’t call myself a bookworm, I enjoy reading compelling books, especially those related to programming and systems.

Building side projects is another passion of mine. Some are just for fun, others grow into useful products. For the latter, I often collaborate with my brother <a href="https://totozunino.github.io/portfolio/" target="_blank">Mathias</a>.

In addition to software development, I have a strong interest in teaching and sharing knowledge. I teach at <a href="https://www.utu.edu.uy/" target="_blank">UTU</a>, where I work with students on courses like Programming Principles in C and Data Structures and Algorithms. It’s where I get to see students sharpen their problem-solving skills and start thinking like computer scientists — and where I keep sharpening my own skills at explaining concepts and sharing knowledge.

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
