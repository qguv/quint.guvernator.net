---
layout: default
title: "UNIX: userland and the shell"
---

[Quint G<small>UVERNATOR</small>](http://quint.guvernator.net) for [ACM @ W&M](http://wm.acm.org/)

presented 16 March 2017

## what are coreutils and the shell

- GUI file managers are built on top of coreutils binaries (GNU/BSD)
- you can just run the coreutils directly in a shell (e.g. bash)
  - reads command/s, runs, prints result, repeat
  - alternatively: interactive matrix of monospaced text
- syntax: binary space arg1 space arg2 space ...

## exercises

Run in a terminal next to a Finder window in the same directory to see results:

    touch filename
    ls
    cp
    mv
    rm
    ln -s
    mkdir filename
    cd
    pwd

But the shell does more flexible things too!

    cat filename
    echo "text"

## more theory

- every command can take an arbitrary amount of text as input (`stdin`) and spit output on `stdout`
- by default:
  - `stdin` is empty
  - `stdout` is connected to the terminal
- you can take the contents of files as input: "taking a file as `stdin`"
- you can put the output of a command into a file: "redirecting `stdout` to file"
- you can feed the output of a command and feed it as input to another: "piping"
- `stderr` is like `stdout` but usually connected to a terminal in case something goes wrong

## more exercises

    echo "hello" > hello.txt
    echo "world" >> hello.txt

    echo "angry message" | tr a-z A-Z
    echo "NICE MESSAGE" | tr A-Z a-z
    echo "angry message" | tr a-z A-Z > email.txt
    rm email.txt

    tr a-z A-Z < hello.txt > HELLO.txt

    echo "proprietary software sucks" | lolcat
    yes "proprietary software sucks" | head | lolcat
    yes "proprietary software sucks" | lolcat

## take over the matrix (of text)

    mosh / ssh
    nvim
    htop
    tmux
    sl

## job control

    ^C
    ^Z
    bg
    fg
    some_command &

## other neat stuff

    pbpst
    curl
