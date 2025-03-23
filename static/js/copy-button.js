function addCopyButtons(clipboard) {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
        const button = document.createElement("button");
        button.className = "copy-code-button";
        button.type = "button";
        button.innerText = "Copy";

        button.addEventListener("click", () => {
            const text = codeBlock.textContent.trim();

            clipboard.writeText(text).then(
                () => {
                    button.blur();
                    button.innerText = "Copied!";
                    setTimeout(() => {
                        button.innerText = "Copy";
                    }, 2000);
                },
                (error) => {
                    button.innerText = "Error";
                    console.error("Copy failed:", error);
                }
            );
        });

        const pre = codeBlock.parentNode;
        if (pre.parentNode.classList.contains("highlight")) {
            const highlight = pre.parentNode;
            highlight.parentNode.insertBefore(button, highlight);
        } else {
            pre.parentNode.insertBefore(button, pre);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (navigator && navigator.clipboard) {
        addCopyButtons(navigator.clipboard);
    } else {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js";
        script.integrity = "sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=";
        script.crossOrigin = "anonymous";
        script.onload = () => {
            addCopyButtons(clipboard);
        };
        document.body.appendChild(script);
    }
});
