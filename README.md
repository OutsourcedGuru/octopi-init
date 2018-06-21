# octopi-init
A Node.js & Electron application for easily configuring your freshly-imaged OctoPi microSD adapter

> **Node.js** is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side.
>
> **Electron** is an open-source framework for developing executable cross-platform desktop applications.
>
> **OctoPrint** is the leading web software for controlling 3D printers, created/maintained by Gina Häußge
>
> **OctoPi** is a Raspberry-specific distro of OctoPrint, maintained by Guy Sheffer

## Overview
Getting started with OctoPrint—as loaded on a Raspberry Pi computer—involves installing an OctoPi image and then some configuration work before this computer can bootup. This application hopes to make that configuration step much easier by introducing a desktop application to perform this step.

![octopi-init opening screen](https://user-images.githubusercontent.com/15971213/41556511-dd25bbd6-72ef-11e8-9d92-1a31a12eddaf.png)

## Installation
At the moment, only an OSX installer is available. Two Linux versions are available (AppImage and deb), which only require a small amount of work to get going.

1. Download the latest [OctoPi image](https://octoprint.org/download/) and follow the instructions there to burn it to your microSD card
2. Using the `octopi-init` software here, configure that microSD card from your workstation, ejecting it when finished
3. Put the microSD card into the Raspberry Pi and boot it to continue

[![OSX download image](https://user-images.githubusercontent.com/15971213/41556200-dfa23e6c-72ee-11e8-981f-8883d89ee4f1.png)](https://github.com/OutsourcedGuru/octopi-init/raw/master/dist/octopi-init-1.0.8.dmg)

[![Linux/Ubuntu/Debian/SUSE AppImage download (x86_64)](https://user-images.githubusercontent.com/15971213/41729839-28274afa-752f-11e8-9174-0cee16fb5506.png)](https://github.com/OutsourcedGuru/octopi-init/raw/master/dist/octopi-init-1.0.8-x86_64.AppImage) [![deb amd64 download image](https://user-images.githubusercontent.com/15971213/41729756-e2902e26-752e-11e8-9cb2-75f576888bd8.png)](https://github.com/OutsourcedGuru/octopi-init/raw/master/dist/octopi-init_1.0.8_amd64.deb)

## Linux installation
After downloading the **AppImage** file, you'll minimally need to mark the file so that it can be executed.

Make it executable by running `chmod a+x octopi-init*.AppImage` then execute it with `./octopi-init*.AppImage`

Alternately, for the `deb` file image, you'd want to install it with `sudo apt install ~/Downloads/octipi-init-1.0.8_amd64.deb`, for example.

## Apple warning message
When running `octopi-init` the first time, you'll need to Ctl-Click the application and select `Open`. Otherwise, you'll see a confusing warning like this:

![screen shot 2018-06-18 at 1 02 29 pm](https://user-images.githubusercontent.com/15971213/41559125-f7d8549a-72f7-11e8-9157-db60a31b4451.png)

It's just Apple trying to make $99 per developer per year as part of their business model. As suggested, Ctl-Click the program and choose `Open` to see:

![screen shot 2018-06-18 at 1 05 23 pm](https://user-images.githubusercontent.com/15971213/41559252-604a3bf6-72f8-11e8-9c49-680552881067.png)

Then just click the `Open` button again and you should be good to go. You won't have to repeat this again, in theory.

|Description|Version|Author|Last Update|
|:---|:---|:---|:---|
|octopi-init|v1.0.8|OutsourcedGuru|June 19, 2018|

|Donate||Cryptocurrency|
|:-----:|---|:--------:|
| ![eth-receive](https://user-images.githubusercontent.com/15971213/40564950-932d4d10-601f-11e8-90f0-459f8b32f01c.png) || ![btc-receive](https://user-images.githubusercontent.com/15971213/40564971-a2826002-601f-11e8-8d5e-eeb35ab53300.png) |
|Ethereum||Bitcoin|