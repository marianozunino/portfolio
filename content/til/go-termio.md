---
title: 'Building a Terminal Raw Mode Input Reader in Go'
date: '2025-03-26T09:15:00-03:00'
summary: 'How to implement terminal raw mode in Go for capturing keystrokes without waiting for Enter'
tags: ['golang', 'terminal', 'linux', 'syscall', 'cli']
---

## The Problem

Most terminal applications wait for the user to press Enter before processing input. This is called "canonical" or "cooked" mode and it's the default behavior. But that's a total buzzkill when you're trying to build something snappy that reacts to every keystroke.

To fix this, you gotta put the terminal in "raw mode" - basically telling the terminal "hey, gimme those keystrokes right away, don't wait around for Enter!"

## The Solution

In Go, we can implement raw mode by directly interfacing with terminal settings using syscalls, referencing the [termios interface](https://www.man7.org/linux/man-pages/man3/termios.3.html):

```go
package main

import (
	"fmt"
	"os"
	"syscall"
	"unsafe"
)

// termios holds the terminal attributes
type termios struct {
	Iflag  uint32
	Oflag  uint32
	Cflag  uint32
	Lflag  uint32
	Cc     [20]byte
	Ispeed uint32
	Ospeed uint32
}

// enableRawMode switches the terminal to raw mode and returns the original state
func enableRawMode() (*termios, error) {
	fd := int(syscall.Stdin)
	var oldState termios

	// Get the current terminal attributes
	_, _, errno := syscall.Syscall(syscall.SYS_IOCTL,
		uintptr(fd), uintptr(syscall.TCGETS),
		uintptr(unsafe.Pointer(&oldState)))
	if errno != 0 {
		return nil, errno
	}

	// Modify the attributes to enable raw mode
	newState := oldState
	// Disable canonical mode (ICANON) and echo (ECHO)
	newState.Lflag &^= syscall.ICANON | syscall.ECHO

	// Set the new terminal attributes
	_, _, errno = syscall.Syscall(syscall.SYS_IOCTL,
		uintptr(fd), uintptr(syscall.TCSETS),
		uintptr(unsafe.Pointer(&newState)))
	if errno != 0 {
		return nil, errno
	}

	return &oldState, nil
}

// disableRawMode restores the terminal to its original state
func disableRawMode(oldState *termios) error {
	fd := int(syscall.Stdin)
	_, _, errno := syscall.Syscall(syscall.SYS_IOCTL,
		uintptr(fd), uintptr(syscall.TCSETS),
		uintptr(unsafe.Pointer(oldState)))
	if errno != 0 {
		return errno
	}
	return nil
}

// readInput reads a keypress in raw mode
func readInput() ([]byte, int) {
	buf := make([]byte, 3)
	oldState, err := enableRawMode()
	if err != nil {
		fmt.Printf("Failed to enable raw mode: %v\n", err)
		return buf, -1
	}
	defer disableRawMode(oldState)

	n, err := os.Stdin.Read(buf[:])
	if err != nil {
		fmt.Printf("Error reading key: %v\n", err)
		return buf, -1
	}
	return buf, n
}

func main() {
	fmt.Println("Press any key (Ctrl+C to exit):")

	for {
		buf, n := readInput()
		if n > 0 {
			fmt.Printf("Captured: %v (bytes: %v)\n", string(buf[:n]), buf[:n])

			// Example: detect Escape key (27)
			if buf[0] == 27 {
				if n == 1 {
					fmt.Println("ESC key pressed")
				} else {
					// Special keys like arrows produce escape sequences
					fmt.Println("Special key sequence")
				}
			}

			// Example: detect Ctrl+D (4)
			if buf[0] == 4 {
				fmt.Println("Ctrl+D pressed, exiting...")
				return
			}
		}
	}
}
```

## Breaking Down the Code

Let's unpack what's going on here:

### Enabling Raw Mode

Here's what we're doing:

1. Grab the current terminal settings using `TCGETS` ioctl
2. Clone these settings so we don't mess up the original
3. Hack the Local flags by turning off:
   - `ICANON`: This is the "wait for Enter" flag - kill it!
   - `ECHO`: This makes the terminal print what you type - we're ditching that too
4. Slap those new settings onto the terminal with `TCSETS` ioctl

### Reading Input

With raw mode fired up, we can snag single keystrokes on the fly without the user having to hit `Enter`.

## More Terminal Flag Magic

For fancier stuff, you might wanna tweak these other flags too:

- `ISIG`: This handles those Ctrl+C and Ctrl+Z shortcuts - turn it off and they're just regular keypresses
- `IXON`: Controls whether Ctrl+S freezes output (and Ctrl+Q unfreezes it)
- `IEXTEN`: Deals with special character combos like Ctrl+V
- `ICRNL`: This one converts Enter key to newline

## Making it Work Everywhere

Heads up: this code is Linux-only. If you need your app to run on Windows and Mac too, check out these handy packages:

- [`golang.org/x/term`](https://pkg.go.dev/golang.org/x/term) - the official package, solid choice
- [`github.com/eiannone/keyboard`](https://github.com/eiannone/keyboard) - super easy to use

With the `x/term` package, you can cut all that syscall boilerplate down to:

```go
oldState, err := term.MakeRaw(int(os.Stdin.Fd()))
if err != nil {
    // handle error
}
defer term.Restore(int(os.Stdin.Fd()), oldState)
```

Way cleaner, right?

## Real-World Example: 2048 Game

I actually used this technique to build a [terminal version of the 2048 game](https://github.com/marianozunino/go-2048). Here's the movement handler that processes raw keypresses:

```go
func readMovement() Movement {
	buf, size := readInput()
	// Interpret the key
	if size == 3 && buf[0] == 27 && buf[1] == 91 {
		// Arrow keys
		switch buf[2] {
		case 65: // Up arrow
			return Up
		case 66: // Down arrow
			return Down
		case 67: // Right arrow
			return Right
		case 68: // Left arrow
			return Left
		}
	} else if size == 1 {
		// Single character keys
		switch buf[0] {
		case 'w', 'k':
			return Up
		case 's', 'j':
			return Down
		case 'd', 'l':
			return Right
		case 'a', 'h':
			return Left
		case 'q': // Quit
			fmt.Println("Exiting game...")
			os.Exit(0)
		}
	}
	return Nop
}
```

This function handles both arrow keys (which generate 3-byte sequences) and WASD/HJKL style keyboard controls. The game feels responsive because the player doesn't need to press Enter after every move - it's just like playing a normal game with instant feedback.
