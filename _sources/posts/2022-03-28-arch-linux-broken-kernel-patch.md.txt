# Arch Linux Broken Kernel Patch

```{post}
:tags: arch, linux, kernel, patch, broken
:category: Arch Linux
:author: tanay
```

So recently I wanted to do a clean installation of my Arch Linux, which I did. This took a couple of hours after which I
could get a running Desktop environment. The moment I had a basic usable system, I ran a global update of all the
installed packages.

```{figure} images/sleeping-tux.png
:width: 500
:alt: Sleeping Tux
:align: center
```

Everything was working just fine until I restarted the computer; and boom! The OS refused to boot so I had to now check
the logs to know what was happening.

```shell
sudo journalctl -p 3 -b
```

The diagnosis showed me two problems:

- Display driver stopped working all of a sudden.
- The X server started throwing errors.

Before thinking in-depth I thought it was some mistake that I made when installing Arch Linux. I just wanted to do a
re-install of the operating system that I was using. So I went ahead and did just that; a fresh new install of Arch
Linux.

Did a few additional things this time, Eg: encrypting the partition, doing a minimal install, etc. Things were going
just fine while I had not restarted my computer and ran a few updates while using my laptop. A few days passed and I
finally decided to reboot my computer. Caught by shock and surprise, my computer stopped working again. Again as I did
not have too much patience to fix the issue and simply assumed that I did something wrong in installing.

I went for another round of installing the OS, this time being a bit too careful of not screwing up things. On the same
day, I completed the installation I tried re-running a full system upgrade and realized that my system stopped working
again. This time I was completely confident that it was not me. I went dropped into a TTY on the failure to boot screen
and saw the message telling me that it could not load the kernel modules.

After reading a lot of docs and forums online and trying different suggested points, the final resolution to the problem
was the broken kernel patch. I've used Arch for years now and had never encountered this issue before. So I've written
down the steps I took to fix it as follows.

I first checked which Linux kernel was installed.

```shell
uname -r
```

After running the command above, I saw that version `5.15.28-lts` was installed. I then decided to see all the cached
kernel versions from the Pacman cache.

```shell
$ cd /var/cache/pacman/pkg/
```

```shell
$ ls linux-*
linux-5.16.13.arch1-1-x86_64.pkg.tar.zst linux-firmware-20220309.cd01f85-1-any.pkg.tar.zst.sig  
linux-5.16.13.arch1-1-x86_64.pkg.tar.zst.sig           linux-firmware-whence-20220209.6342082-1-any.pkg.tar.zst  
linux-5.16.14.arch1-1-x86_64.pkg.tar.zst linux-firmware-whence-20220209.6342082-1-any.pkg.tar.zst.sig  
linux-5.16.14.arch1-1-x86_64.pkg.tar.zst.sig           linux-firmware-whence-20220309.cd01f85-1-any.pkg.tar.zst  
linux-api-headers-5.16.8-1-any.pkg.tar.zst linux-firmware-whence-20220309.cd01f85-1-any.pkg.tar.zst.sig  
linux-api-headers-5.16.8-1-any.pkg.tar.zst.sig         linux-lts-5.15.27-1-x86_64.pkg.tar.zst  
linux-firmware-20220209.6342082-1-any.pkg.tar.zst linux-lts-5.15.27-1-x86_64.pkg.tar.zst.sig  
linux-firmware-20220209.6342082-1-any.pkg.tar.zst.sig  linux-lts-5.15.28-1-x86_64.pkg.tar.zst  
linux-firmware-20220309.cd01f85-1-any.pkg.tar.zst linux-lts-5.15.28-1-x86_64.pkg.tar.zst.sig
```

The only version before version `5.15.28` was `linux-lts-5.15.27` in the list of the listed kernels. So downgraded the
patch version of the LTS kernel using the following command.

```shell
sudo pacman -U linux-lts-5.15.27-1-x86_64.pkg.tar.zst
```

Once I was done executing this and rebooted, the system started working as usual. The next step was to prevent this
issue... at least till a new version of the kernel is not released. To do that I opened the Pacman config:

```shell
sudo nvim /etc/pacman.conf
```

Changed the `IgnorePkg` line as follows:

```text
IgnorePkg   = linux linux-lts
```

Now it will ignore installing the packages `Linux` and `Linux-lts`.

I had written this post a while back and as of publishing this post I can see that there's a newer version of kernel
released which is `linux-lts 5.15.31-1`. So on one of the weekends I will un-ignore the ignored Linux kernel that I was
using and get my system working with the latest Linux version.

```{eval-rst}
.. include:: ../lib/comments.rst
```
