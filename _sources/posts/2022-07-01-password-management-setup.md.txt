# Password management setup

```{post}
:tags: linux, password manager, passwords, security 
:category: Security
:author: tanay
```

As promised in the previous blog post. I'm going to write a manual-like document around setting up KeepassXC. This will
be a continuously updated document as and how I more and better ways to do things. This also means that you are free to
comment below regarding anything you know. I've split the text into sections for Linux, Windows, Mac and Android, so you
can directly skip to the necessary sections. The other things that are platform independent are marked as common.

![Password Manager](./images/password-management-setup/password-manager.png)


## Prerequisites to setup

1. Knowledge of Shell (for Linux/Mac/Android) or Command Line (for Windows)
2. A desktop running Linux/Mac/Windows
3. A mobile running Android
4. A [Dropbox](https://www.dropbox.com/) account (Free one is fine)
5. A pair of [Yubikeys](https://www.yubico.com/products/yubikey-5-overview/) (I highly recommend a pair instead of a single one)

## Installation of software 

### Linux (Arch)

Install Rclone and KeePassXC (Arch Linux)

```shell
sudo pacman -S rclone keepassxc 
```

### Mac

Download and install [KeePassXC](https://keepassxc.org/download/)

Install Rclone

```shell
brew install rclone
```

### Windows

Download and install [KeePassXC](https://keepassxc.org/download/)

Install [Rclone](https://rclone.org)

Make sure it's accessible from the commandline. Add the directory that has `rclone.exe` to your path

Download [NSSM](https://nssm.cc). Add the directory that had `nssm.exe` to your path

### Android

- Download and install the Android App repository [F-Droid](https://f-droid.org) Note: make sure you don't install this from the app store, but download and install an APK.
- Install [Termux](https://f-droid.org/en/packages/com.termux/) from F-Droid
- Install [Termux Widget](https://f-droid.org/en/packages/com.termux.widget/) from F-Droid
- Open Termux app to enter commands to install packages (P.S. I'd recommend plugging a USB keyboard to your Phone/Tablet)
- Install Rclone
  ```shell
  pkg install rclone
  ```
- Create shortcuts to copy from Dropbox to local device (downstream) and local device to Dropbox (upstream)
  ```shell
  echo "#\!/data/data/com.termux/files/usr/bin/bash\nrclone copy /data/data/com.termux/files/home/dropbox dropbox:" > .shortcuts/upload-dropbox-directory
  echo "#\!/data/data/com.termux/files/usr/bin/bash\nrclone copy dropbox: /data/data/com.termux/files/home/dropbox" > .shortcuts/download-dropbox-directory
  ```
- Make both the above scripts executable by running
  ```shell
  chmod +x .shortcuts/upload-dropbox-directory
  chmod +x .shortcuts/download-dropbox-directory
  ```
- Create a Termux Widget on your home-screen as shown in the image below. It should have links to both the above scripts
  ```{image} images/password-management-setup/home-screen-with-scripts.jpg
  :alt: Termux Widget Screenshot
  :align: center
  :width: 300
  ```
- Install [KeePass2 Android Password Safe](https://play.google.com/store/apps/details?id=keepass2android.keepass2android) from Google Play

## Setup Rclone

Setup Rclone by linking it to Dropbox

```shell
rclone config
```

Select `n` for *New remote*

```{text}
e) Edit existing remote  
n) New remote  
d) Delete remote  
r) Rename remote  
c) Copy remote  
s) Set configuration password  
q) Quit config  
e/n/d/r/c/s/q> n
```

Enter a new name for the remote, I chose the name `dropbox`

```{text}
name> dropbox
```

You'll be asked to choose a storage to configure, choose Dropbox if that's what you're using. This should be the
choice `12`.

```{text}
Option Storage.  
Type of storage to configure.  
Choose a number from below, or type in your own value.
.
.
.
11 / Compress a remote 
   \ (compress) 
12 / Dropbox 
   \ (dropbox) 
13 / Encrypt/Decrypt a remote 
   \ (crypt)
.
.
.
Storage> 12
```

Leave the `client_id` blank and `client_secret` blank by simply pressing `Enter` twice

```
Option client_id.  
OAuth Client Id.  
Leave blank normally.  
Enter a value. Press Enter to leave empty.  
client_id>
Option client_secret.  
OAuth Client Secret.  
Leave blank normally.  
Enter a value. Press Enter to leave empty.  
client_secret>
```

Press `Enter` again twice to select default values for advanced config and auto config. After this the browser should
open asking you to login into your Dropbox

```
Edit advanced config?  
y) Yes  
n) No (default)  
y/n>   
Use auto config?  
* Say Y if not sure  
* Say N if you are working on a remote or headless machine  
  
y) Yes (default)  
n) No  
y/n>
2022/06/12 21:25:16 NOTICE: If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth?state=yijGsPLKwSDAKDd2F338tEpQ
2022/06/12 21:25:16 NOTICE: Log in and authorize rclone for access
2022/06/12 21:25:16 NOTICE: Waiting for code...
```

Enter your Dropbox `username` and `password` and hit Login.

```{figure} ./images/password-management-setup/rclone-dropbox-login.png
:width: 500
:alt: Rclone asks for dropbox permission screenshot
:align: center
```

After this rclone will ask your permission to access Dropbox; hit `Allow`

```{figure} ./images/password-management-setup/rclone-dropbox-permissions.png
:width: 500
:alt: Rclone asks for dropbox permission screenshot
:align: center
```

It should show the success page after you allow. You can now close this page

```{figure} ./images/password-management-setup/rclone-successful-login.png
:width: 500
:alt: Rclone successful
:align: center
```

Go back to your terminal screen and press `Enter` for the default option to save your config

```
2022/06/12 21:30:47 NOTICE: Got code
--------------------
[dropbox]
type = dropbox
token = {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c","token_type":"bearer","refresh_token":"SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c","expiry":"2022-06-13T01:30:48.577367245+05:30"}
--------------------
y) Yes this is OK (default)
e) Edit this remote
d) Delete this remote
y/e/d>
```

After that press `q` on the following page to quit config

```
Current remotes:

Name                 Type
====                 ====
dropbox              dropbox

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q>q
```

## Mount Dropbox using Rclone

### Linux with Systemd

Create a script file in
```
 /etc/systemd/system/mount-dropbox.service
```

Opening the file in an editor to edit it
```
➜  ~ sudo nvim /etc/systemd/system/dropbox-mount.service
[sudo] password for tanay:
```

Enter the details as follows in that file
```
[Unit]
Description=Dropbox Mount
After=NetworkManager-wait-online
StartLimitIntervalSec=1

[Service]
Type=simple
Restart=always
RestartSec=1
User=tanay
ExecStart=/usr/bin/env rclone mount dropbox: ${HOME}/dropbox
```

Create a directory as a mountpoint for mounting dropbox
```
mkdir $HOME/dropbox
```

Start the newly created service
```
➜  ~ sudo systemctl start dropbox-mount
```

Check the status of the newly started application
```
➜  ~ sudo systemctl status dropbox-mount
● dropbox-mount.service - Dropbox Mount
    Loaded: loaded (/etc/systemd/system/dropbox-mount.service; disabled; vendor preset: disabled)
    Active: active (running) since Sun 2022-06-26 22:19:39 IST; 5min ago
  Main PID: 25548 (rclone)
     Tasks: 18 (limit: 38047)
    Memory: 19.2M
       CPU: 586ms
    CGroup: /system.slice/dropbox-mount.service
            └─25548 rclone mount dropbox: /home/tanay/dropbox

Jun 26 22:19:39 sevenelements systemd[1]: Started Dropbox Mount.
```

If everything went well, then it should say: active (running)

Now you can go ahead and enable the service to be started every time your computer restarts:
```
➜  ~ sudo systemctl enable dropbox-mount
Created symlink /etc/systemd/system/multi-user.target.wants/dropbox-mount.service → /etc/systemd/system/dropbox-mount.service.
```

### MacOS using Launchd

Create a launchd file: 
```
touch ~/Library/LaunchAgents/<your-reverse-domain>.mount-dropbox.plist
```
Eg:
```
touch ~/Library/LaunchAgents/com.tanayseven.mount-dropbox.plist
```

Open the file to be edited:
```
vim ~/Library/LaunchAgents/<your-reverse-domain>.mount-dropbox.plist
```

Eg:
```
vim ~/Library/LaunchAgents/com.tanayseven.mount-dropbox.plist
```

Copy-paste the following template into the file:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string><your-reverse-domain><your-reverse-domain>.mount-dropbox.plist</string>
    <key>RunAtLoad</key>
    <true/>
    <key>StartInterval</key>
    <integer>20</integer>
    <key>StandardErrorPath</key>
    <string>/Users/<your-username>/dropbox-mac/stderr.log</string>
    <key>StandardOutPath</key>
    <string>/Users/<your-username>/dropbox-mac/stdout.log</string>
    <key>EnvironmentVariables</key>
    <dict>
      <key>PATH</key>
      <string><![CDATA[/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin]]></string>
    </dict>
    <key>WorkingDirectory</key>
    <string>/Users/<your-username>/</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/rclone</string>
      <string>mount</string>
      <string>dropbox:</string>
      <string>/Users/<your-username>/Dropbox</string>
    </array>
  </dict>
</plist>
```

After substituting the values, eg:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.tanayseven.mount-dropbox.plist</string>
    <key>RunAtLoad</key>
    <true/>
    <key>StartInterval</key>
    <integer>20</integer>
    <key>StandardErrorPath</key>
    <string>/Users/tanayprabhudesai/dropbox-mac/stderr.log</string>
    <key>StandardOutPath</key>
    <string>/Users/tanayprabhudesai/dropbox-mac/stdout.log</string>
    <key>EnvironmentVariables</key>
    <dict>
      <key>PATH</key>
      <string><![CDATA[/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin]]></string>
    </dict>
    <key>WorkingDirectory</key>
    <string>/Users/tanayprabhudesai/</string>
    <key>ProgramArguments</key>
    <array>
      <string>/usr/local/bin/rclone</string>
      <string>mount</string>
      <string>dropbox:</string>
      <string>/Users/tanayprabhudesai/Dropbox</string>
    </array>
  </dict>
</plist>
```

Load the service using:
```
launchctl load ~/Library/LaunchAgents/<your-reverse-domain>.mount-dropbox.plist
```

Eg:
```
launchctl load ~/Library/LaunchAgents/com.tanayseven.mount-dropbox.plist
```

You should now see your service running:
```
launchctl list | grep mount-dropbox
```

In case it’s not running, you can check the error at:
```
cat ~/dropbox-mac/stderr.log
```
Rclone will print all the errors in the log file above


### Windows using NSSM

First download NSSM and add it to your path:

Run the following command
```
C:\Users\Tanay PrabhuDesai>nssm install Dropbox-Mount
Administrator access is needed to install a service.
```

It will first ask for admin privileges, provide it admin privileges.

This is how the screen should look:

```{figure} ./images/password-management-setup/nssm-1-application-blank-fields.png
:width: 500
:alt: NSSM Application Blank Fields
:align: center
```

Enter the following details:
Path: C:\rclone\rclone.exe
Or enter your rclone installation path above
Enter the startup directory as your user directory
Startup directory: C:\Users\<Your Name>
In the Arguments, enter the arguments that you want to pass to the rclone command which would be as follows:
```
mount dropbox: "C:\Users\<Your Name>\Dropbox"
```
The filled up fields under Application tab should look as follows:

```{figure} ./images/password-management-setup/nssm-2-application-filled.png
:width: 500
:alt: NSSM Appplication filled
:align: center
```

Go to Details tab:
Enter the following details:
Display name: Dropbox-Mount
Description: Entire dropbox mounted
Startup type: Automatic

```{figure} ./images/password-management-setup/nssm-3-details-filled.png
:width: 500
:alt: NSSM details filled
:align: center
```

For the Log on fields:
Select “This account” and enter your user’s login and password twice

```{figure} ./images/password-management-setup/nssm-4-log-on-details-filled.png
:width: 500
:alt: NSSM log-on details filled
:align: center
```

Enter the following under Dependencies:
```
Tcpip
Dhcp
Dnscache
```

```{figure} ./images/password-management-setup/nssm-5-dependencies-filled.png
:width: 500
:alt: NSSM Dependencies filled
:align: center
```

In the Process tab set it to “High” Priority

```{figure} ./images/password-management-setup/nssm-6-process-filled.png
:width: 500
:alt: NSSM Process priority filled
:align: center
```

Click “Install service”

Click start and type "Services" and open it, you should see the following with `Mount-Dropbox` being one of the items in the list

```{figure} ./images/password-management-setup/nssm-7-service-seen-in-list.png
:width: 500
:alt: NSSM Service seen in list
:align: center
```

If it's not running click the `Start` button as shown below

```{figure} ./images/password-management-setup/nssm-8-service-start-link.png
:width: 500
:alt: NSSM Service start link
:align: center
```

Click on that service and then click on “Start”. The service should start running in the background as seen in the following screenshot

```{figure} ./images/password-management-setup/nssm-9-service-running.png
:width: 500
:alt: NSSM Service running
:align: center
```

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

6. Select the Dropbox sync directory to save the database
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

Your database file should now be saved in a Dropbox synchronised location. If you've done everything correctly to this point, you're all setup!

```{eval-rst}
.. include:: ../lib/comments.rst
```
