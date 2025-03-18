---
title: About Me
description: "I'm Mariano, a software engineer from Montevideo, Uruguay. I pursued my Tecnólogo en Informática degree at Fing after several years working as an IT Technician (which comes handy when dealing with infrastructure)."
type: about
layout: about
---

Hello!

I'm Mariano, a software engineer from Montevideo, Uruguay. I pursued my Technologist Degree in Computer Science at <a href="https://www.fing.edu.uy/" target="_blank">Fing</a> after several years working as an IT Technician (which comes handy when dealing with infrastructure).

I enjoy expanding my knowledge and although I wouldn't call myself a bookworm, I love reading compelling books, especially those on computer science.

Building side projects is another passion of mine, both for enjoyment and profit. For the latter, I often collaborate with my brother <a href="https://totozunino.github.io/portfolio/" target="_blank">Mathias</a>.

In addition to my software work, I have a strong interest in teaching and sharing knowledge. As a professor at FING, I strive to contribute to the community by training and educating others.

Did I also mention that I have two lovely dogs 🐶❤️? They are named <a href="/images/rocco.jpg">Rocco</a> and <a href="/images/mora.jpg">Mora</a>! And here's a photo of them together <a href="/images/babies.jpg">Dogs</a>.

## Contact

- [CV](/cv/cv.pdf)
- Email me at <span id="email"></span>
- <a href="https://github.com/marianozunino" target="_blank">Github</a>
- <a href="https://linkedin.com/in/mariano-z" target="_blank">LinkedIn</a>

<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function() {
        // Define the email parts
        var user = "marianoz";
        var domain = "posteo";
        var tld = "net";

        // Construct the email address
        var email = user + "@" + domain + "." + tld;

        // Create the email link element
        var emailLink = document.createElement("a");
        emailLink.href = `mailto:${email}?subject=Hello!&body=Hi%20Mariano!`;

        // Display the obfuscated email address
        emailLink.textContent = user + " [at] " + domain + " [dot] " + tld;

        // Append the email link to the span
        document.getElementById("email").appendChild(emailLink);
    });
</script>
