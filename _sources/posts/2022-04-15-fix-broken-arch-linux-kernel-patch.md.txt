# Fix of the broken Arch linux kernel patch

```{post}
:tags: arch, linux, kernel, patch, fixed
:category: Arch Linux
:author: tanay
```

Finally, I managed to solve the issue that I was facing with the Linux upgrades. I can now upgrade and start both the
LTS and the non-LTS build of Arch. So I will now write what went wrong, what I missed, and what can be thought of in the
future. Every time I force & resolve an issue like this, it's always something new about Linux that I end up learning.

```{figure} images/strong-tux.png
:width: 500
:alt: Strong Tux
:align: center
```

What did I do to resolve the issue?

- Mounted the `/boot` directory
- Ran `pacman -Syu` to upgrade all the packages
- Rebooted the machine The above worked for the failing Linux LTS kernel. How I fixed the non-LTS kernel is something
  I'll write about later.

## So, what exactly was going wrong?

So whenever the Linux Kernel is either installed or is upgraded it updates the GRUB config and re-generates it. So while
booting it could not load the necessary kernel modules and some things were not working. This was happening because the
re-generated GRUB config was not saved the right way as the `/boot` partition was not correctly mounted.

Hence, whenever you have a separate `/boot` partition it should be mounted during a Linux kernel installation. So
the `fstab` file should be mentioning the `/boot` partition in addition to the `/` partition which tells that you've
booted it.

## A more permanent fix

The `fstab` file already had an entry for the `/` partition. So all I needed to do next was to add another entry for
the `/boot` partition. This can be achieved using the following command:

```shell
sudo bash -c "genfstab -U /boot >> /etc/fstab"
```

The above update of the `fstab` file will make sure that the `/boot` partition is always mounted when you start your
computer. And then performing an update of the Linux kernel will not render your system unusable. I did another Linux
kernel update and the following is the output that I got after which my computer restarted just fine.

```
( 8/12) Updating linux initcpios...  
==> Building image from preset: /etc/mkinitcpio.d/linux.preset: 'default'  
 -> -k /boot/vmlinuz-linux -c /etc/mkinitcpio.conf -g /boot/initramfs-linux.img  
==> Starting build: 5.17.2-arch3-1  
 -> Running build hook: [base]  
 -> Running build hook: [udev]  
 -> Running build hook: [autodetect]  
 -> Running build hook: [keyboard]  
==> WARNING: Possibly missing firmware for module: xhci_pci  
 -> Running build hook: [modconf]  
 -> Running build hook: [block]  
 -> Running build hook: [encrypt]  
==> WARNING: Possibly missing firmware for module: qat_4xxx  
 -> Running build hook: [filesystems]  
 -> Running build hook: [keyboard]  
 -> Running build hook: [fsck]  
==> Generating module dependencies  
==> Creating zstd-compressed initcpio image: /boot/initramfs-linux.img  
==> Image generation successful  
==> Building image from preset: /etc/mkinitcpio.d/linux.preset: 'fallback'  
 -> -k /boot/vmlinuz-linux -c /etc/mkinitcpio.conf -g /boot/initramfs-linux-fallback.img -S autodetect  
==> Starting build: 5.17.2-arch3-1  
 -> Running build hook: [base]  
 -> Running build hook: [udev]  
 -> Running build hook: [keyboard]  
==> WARNING: Possibly missing firmware for module: xhci_pci  
 -> Running build hook: [modconf]  
 -> Running build hook: [block]  
==> WARNING: Possibly missing firmware for module: wd719x  
==> WARNING: Possibly missing firmware for module: qed  
==> WARNING: Possibly missing firmware for module: aic94xx  
==> WARNING: Possibly missing firmware for module: bfa  
==> WARNING: Possibly missing firmware for module: qla1280  
==> WARNING: Possibly missing firmware for module: qla2xxx  
 -> Running build hook: [encrypt]  
==> WARNING: Possibly missing firmware for module: qat_4xxx  
 -> Running build hook: [filesystems]  
 -> Running build hook: [keyboard]  
 -> Running build hook: [fsck]  
==> Generating module dependencies  
==> Creating zstd-compressed initcpio image: /boot/initramfs-linux-fallback.img  
==> Image generation successful  
( 9/12) Reloading system bus configuration...  
(10/12) Updating icon theme caches...  
(11/12) Updating the info directory file...  
(12/12) Updating the desktop file MIME type cache...  
:: Looking for AUR upgrades  
:: Looking for devel upgrades  
:: Resolving dependencies...  
:: Calculating conflicts...  
:: Calculating inner conflicts...
```

## The reason this issue was overlooked

So, what caused me to overlook and get stuck in this issue, not once but multiple times? One of the main differences
this time was that I had installed Linux with a separate `/boot` partition for the very first time in my life. But why
did I even have to create a `/boot` partition in the first place? The reason was that the `/` partition that I was now
creating was entirely encrypted. Therefore for GRUB to boot the `/` partition, need to have at least the `/boot` to be
un-encrypted. And so I had to leave the `/boot` to be an un-encrypted directory and therefore a separate partition.

## Fixing the other issue

Now that my Arch Linux with the LTS was booting just fine, I wanted to boot the other Linux kernel, the non-LTS one.
When I attempted to boot that from the GRUB, there was a failure to load some kernel modules. This time simply running a
kernel update was not helping as the issue persisted even after re-installing and rebooting multiple times.

The error that I was getting was the error "cannot load module 'crypto_user'". I still have to debug it more by going
into the depths of the issue. But I remembered that I had never gotten the non-LTS Linux working in the first place.

So now all I had to do was to run `sudo pacman -S linux linux-lts linux-headers linux-lts-headers`. What kernel-headers
are is another different rabbit hole to discover. But as per my understanding and putting it in simple words, they're
nothing but interfaces between the kernel and the modules/programs that it interacts with. Once I ran this command and I
restarted my Linux with the non-LTS Linux, it just restarted with nothing going wrong.

Alright... that's a wrap for today. Hope you gained some knowledge about Linux from this.

```{eval-rst}
.. include:: ../lib/comments.rst
```
