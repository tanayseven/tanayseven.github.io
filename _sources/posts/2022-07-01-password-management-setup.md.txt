# Password management setup

```{post}
:tags: linux, password manager, passwords, security 
:category: Security
:author: tanay
```

As promised in the previous blog post. I'm going to write a manual-like document around setting up KeepassXC. This will
be a continuously updated document as and how I learn more and better ways to do things. This also means that you are free to
comment below regarding anything you know. I've split the text into sections for Linux, Windows, Mac and Android, so you
can directly skip to the necessary sections. The other things that are platform independent are marked as common.

![Password Manager](./images/password-management-setup/password-manager.png)

```{admonition} Edited on 2023-03-05
:class: note

- I've removed the [**rclone**](https://rclone.org/) section from this document since I've moved from rclone to 
[**Syncthing**](https://syncthing.net/) for cross-device synchronization. A separate post for rclone for backup will
be added in the future.

- The link to the post of Syncthing and how it was setup be me will appear here

- The link to setup backup mechanism using rclone will appear here

[The older version of this post is available in the Wayback Machine](https://web.archive.org/web/20230305141100/https://tanayseven.com/posts/2022-07-01-password-management-setup.html)
```

## Prerequisites to setup

1. Knowledge of Shell (for Linux)
2. A desktop running Linux/Mac/Windows
3. Syncthing setup and running
4. A mobile running Android
5. A pair of [Yubikeys](https://www.yubico.com/products/yubikey-5-overview/) (I highly recommend a pair instead of a single one)

## Installation of software 

### Linux (Arch)

Install KeePassXC (Arch Linux)

```shell
sudo pacman -S keepassxc 
```

### Mac/Windows

Download and install [KeePassXC](https://keepassxc.org/download/)

### Android

Install [KeePass2 Android Password Safe](https://play.google.com/store/apps/details?id=keepass2android.keepass2android) from Google Play

## Setting up Yubikey

```{figure} ./images/password-management-setup/yubikey.jpg
:width: 500
:alt: Yubikey image
:align: center
```

- Select Slot 2 to program
- Select program multiple keys

```{figure} ./images/password-management-setup/yubikey-setup.png
:width: 700
:alt: Yubikey setup screenshot
:align: center
```

## Setting up KeePassXC

You need to decide a sufficiently strong password as the master password. In order to do that, do read my previous blog post [linked here](./2022-05-09-your-passwords-are-not-stored-safely.md)

1. Create a new database
```{figure} ./images/password-management-setup/kpxc-1-new-database.png
:width: 500
:alt: KeePassXC create a new database
:align: center
```

2. Give a database name
```{figure} ./images/password-management-setup/kpxc-2-new-database-name.png
:width: 500
:alt: KeePassXC give a database name and description
:align: center
```

3. Choose database encryption settings
   Enter this as this and that as that
```{figure} ./images/password-management-setup/kpxc-3-choose-encrption-settings.png
:width: 500
:alt: KeePassXC choose encryption settings
:align: center
```

4. Enter master password (that you decided as stated at the start of this section)
```{figure} ./images/password-management-setup/kpxc-4-enter-master-password.png
:width: 500
:alt: KeePassXC enter the master password
:align: center
```

5. Select Yubikey setup
   Add additional protection
   Yubikey configure Slot-2 
   Click Done
```{figure} ./images/password-management-setup/kpxc-5-select-yubikey-setup.png
:width: 500
:alt: KeePassXC select Yubikey setup
:align: center
```

```{figure} ./images/password-management-setup/kpxc-6-select-yubikey-add-challenge-response.png
:width: 500
:alt: KeePassXC Yubikey add challenge response
:align: center
```

```{figure} ./images/password-management-setup/kpxc-7-insert-yubikey-and-refresh.png
:width: 500
:alt: KeePassXC insert Yubikey and hit refresh
:align: center
```

6. Select the Syncthing sync directory to save the database
   Touch the Yubikey
```{figure} ./images/password-management-setup/kpxc-8-save-database-file.png
:width: 500
:alt: KeePassXC save database file to password manage setup
:align: center
```

```{figure} ./images/password-management-setup/kpxc-9-touch-yubikey.png
:width: 500
:alt: KeePassXC touch the yubikey to actually save the password
:align: center
```

Your database file should now be saved in a Syncthing synchronised location. If you've done everything correctly to this
point, you're all setup!

Once this is done, you can open the file synchronised via Syncthing in the other devices. Just make sure you don't cause
a conflict by keeping multiple files and saving them on top of each other.

If you have any questions, please ask them in the comments box below.

```{eval-rst}
.. include:: ../lib/comments.rst
```
