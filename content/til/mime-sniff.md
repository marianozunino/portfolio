---
title: 'MIME Sniffing'
date: 2025-03-15T10:54:57-03:00
summary: 'How browsers and servers detect file types by examining binary patterns'
tags: ['webdev', 'golang', 'http']
---

Content type detection is something that from time to time I have to include in a project.
I never really cared about how it works, I just wanted to get the job done. So often that led to a Google search like:

```bash
npm mime-type
```

And that would point me to a npm package that would do the job for me. One `npm i` and I could call the job done.

## Golang http.DetectContentType

While implementing my [version](https://github.com/marianozunino/dump) of `0x0.st`, once again I was looking for a way to get the content type of a file.

It was no surprise that the amazing Golang stdlib had a `http.DetectContentType` function that would do the job for me, and being curious, I ventured into the signature of the function.

And there it was, a link to the [SPEC](https://mimesniff.spec.whatwg.org) that goes into great details about how the detection works. It also outlines how critical it is to be able to detect, let alone provide, the correct content type, and the security implications of not being able to properly do that.

{{< zoomable-image src="/images/til/http-DetectContentType.jpg"
                   alt="Screenshot of http.DetectContentType"
                   caption="Screenshot of http.DetectContentType" >}}

## Long story short

- Read the first X bytes of the file (`Byte Pattern`)
- Match against a list of mime types (`Pattern Mask`)
- If there is a match, return the mime type
- Otherwise, return application/octet-stream

## Practical example

Reading the first X bytes of the file

```bash
$ hexdump -C unknown.file | head -n 3
00000000  ff d8 ff e0 00 10 4a 46  49 46 00 01 01 00 00 01
00000010  00 01 00 00 ff db 00 43  00 08 06 06 07 06 05 08
00000020  07 07 07 09 09 08 0a 0c  14 0d 0c 0b 0b 0c 19 12
```

Matching against a list of [known mime types](https://www.garykessler.net/library/file_sigs.html).
In this particular case, the first bytes match with the following pattern:

```
FF D8 FF E0 xx xx 4A 46 49 46 00
```

Which corresponds to the `FIF, JPE, JPEG, JPG` mime types.

## Dumb Go example

```go
package main
import (
	"bufio"
	"encoding/hex"
	"fmt"
	"net/http"
	"os"
	"strings"
)
func main() {
	f, _ := os.Open("unknown.file")
	defer f.Close()
	reader := bufio.NewReader(f)
	b, _ := reader.Peek(8)
	fmt.Println(strings.ToUpper(hex.EncodeToString(b)))
	contentType := http.DetectContentType(b)
	fmt.Println(contentType)
}
```

```bash
$ go run .
FFD8FFE000104A46
image/jpeg
```

In the `http/sniff.go` file you can find the actual logic behind the detection and the table of mime types.

```go
  ...
  &exactSig{[]byte("\xFF\xD8\xFF"), "image/jpeg"},
  ...
```

So, my takeaway here: **Golang has this shit built-in**
