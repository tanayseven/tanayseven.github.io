Continuous Integration and Deployment
=====================================

.. image:: https://github.com/tanayseven/personal-website/workflows/CI/badge.svg
    :target: https://github.com/tanayseven/personal-website/actions?query=workflow%3ACI
    :alt: CI

.. image:: https://api.netlify.com/api/v1/badges/12c02181-a429-42f0-becb-fc25eaae57e8/deploy-status
    :target: https://app.netlify.com/sites/tanay-personal-website-pre-prod/deploys
    :alt: Netlify Status

.. image:: https://img.shields.io/github/languages/code-size/tanayseven/tanayseven.github.io?label=Build%20size&style=flat-square
    :target: https://github.com/tanayseven/tanayseven.github.io
    :alt: Prod build 

.. image:: https://img.shields.io/website?down_color=red&down_message=DOWN&label=Production&style=flat-square&up_color=green&up_message=UP&url=https%3A%2F%2Ftanayseven.com
    :target: https://tanayseven.com
    :alt: Prod deployment status

.. image:: https://img.shields.io/github/license/tanayseven/personal_website?color=blue&label=License&style=flat-square
    :target: https://www.mit.edu/~amini/LICENSE.md
    :alt: License


Website Performance Report (Lighthouse)
=======================================

.. image:: https://tanayseven-badges-personal-website.netlify.app/lighthouse_best-practices.svg
    :target: https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Ftanayseven.com%2F&strategy=mobile&category=best-practices&utm_source=lh-chrome-ext
    :alt: Best Practices

.. image:: https://tanayseven-badges-personal-website.netlify.app/lighthouse_performance.svg
    :target: https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Ftanayseven.com%2F&strategy=mobile&category=performance&utm_source=lh-chrome-ext
    :alt: Performance

.. image:: https://tanayseven-badges-personal-website.netlify.app/lighthouse_accessibility.svg
    :target: https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Ftanayseven.com%2F&strategy=mobile&category=accessibility&utm_source=lh-chrome-ext
    :alt: Accessibility

.. image:: https://tanayseven-badges-personal-website.netlify.app/lighthouse_seo.svg
    :target: https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Ftanayseven.com%2F&strategy=mobile&category=seo&utm_source=lh-chrome-ext
    :alt: SEO


Static Website Generator
========================

.. image:: personal_site.png
    :alt: Personal website picture

This repository contains a very small yet powerful static website generator which is used to make static website by
using reusable components that will be used across the website and uses ``make`` as a tool to have incremental builds of
the website. The attempt is to keep things very clean and do it the "Unix way" by representing everything in files. This
repository is currently used to build my personal website and is open for other to use to build their website as it is
MIT license. This website uses Jinja2 as a templating engine for generating the intermediate components and websites.
Please submit a pull request if you want to fix any issue or submit any feature you feel to be missing.

Inspired from the following websites:

1.  `Nelkinda`_
2.  `alice_maz`_

.. _Nelkinda: http://nelkinda.com

.. _alice_maz: https://www.alicemaz.com/


Tanay's Personal Website
------------------------

To know how to do different actions using the make file, please use ``make help``

Advantages of using ``make`` and other design choices in this project
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.  **Incremental building** make offers incremental building and or compiling of files. This means that if there are
    multiple files, then it will build the necessary files purely based on the changes that have been recently made.
    Performing a ``make build`` will run this incremental build since it is the property of the GNU-Make tool. It also
    uses ``rsync`` to perform the incremental build for static assets that do not need compilation/building.

2.  **Serving website locally** has a command called ``make serve`` which expects the ``_build`` directory to exist and
    if it exists then it just starts a server to serve the contents of that directory, else it actually performs a build
    and then serves the files from that directly in that server.

3.  **Watch build** there is a command called ``make watch-build`` which can be used to harness the power of both
    incremental build and that of serve. This leads to both easy and fast modification to your website on your local
    machine.

4.  **Deploying the website** has a command to deploy the website to the static website that is hosted on github pages.
    This command performs ``rsync`` of the files to the the actual repository and then does a commit in that repository
    and pushes the newly committed changes to the repository which automatically makes it live on the website.

5.  **Splitting web pages into components** The use of Jinja2 helps me to split the Makefile into components into
    multiple directories in ``templates/components/`` directory, this makes the components be reusable across different
    pages in the website.

6.  **Minification of CSS and JS** The JS and CSS is minified before making it available to the website to use.

7.  **High speed parallel builds** The main advantage of using make is that the project is built very fast simply with
    the use of the ``-j`` flag as command argument


LICENSE
~~~~~~~

The MIT License (MIT)

Copyright (c) 2018-2021 Tanay PrabhuDesai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
