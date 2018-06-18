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
At the moment, only an OSX installer is available.

1. Download the latest [OctoPi image](https://octoprint.org/download/) and follow the instructions there to burn it to your microSD card
2. Using the `octopi-init` software here, configure that microSD card from your workstation, ejecting it when finished
3. Put the microSD card into the Raspberry Pi and boot it to continue

[![OSX download image](https://user-images.githubusercontent.com/15971213/41556200-dfa23e6c-72ee-11e8-981f-8883d89ee4f1.png)](https://github.com/OutsourcedGuru/octopi-init/raw/master/dist/octopi-init-1.0.6.dmg)
