SICP Challenge
==============

.. post::
    :tags: scheme, sicp, challenge, coding
    :category: SICP
    :author: tanay

Almost over a year back I started reading the long-awaited book from my bucket list, "Structure and Interpretation of Computer Programs".  When I was reading the book, quite a lot of the things in the book were already known to me and therefore it started to get boring. But then I searched on the internet why so many people read the book SICP. The problem was not the reason behind reading the book but the problem was the approach towards the book. The book is not designed to be just read as if it is a novel but you also need to solve the problems in the book. This made me go back to the book again.

.. figure:: images/sicp-wizard.png
  :width: 500
  :alt: SICP Wizard (cover page of the SICP book)
  :align: center

Why SICP?
---------

Although I told the method was wrong because I was just reading the book, I decided that I will try to solve every problem given in the book's exercise section. Therefore I have set up a Github repository that will have all the code snippets of the exercises that I solve, irrespective if that exercise needs me to write code or not.

The other reason for me going ahead with SICP is that it teaches Computer Science and understanding the computer as an abstract machine used to manipulate information.

That stuff is old and outdated
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

"This thing is outdated!", "That thing is outdated!", these are some of the most common words that you can hear in the software industry. But is something really outdated? Well, I consider 'outdated' a very heavy word to be used so casually and I personally think that outdated is a very subjective term. "Is C outdated?", "Is JavaScript outdated?", well, it depends... Depends on? Depends on what you actually want to do with that language. The browser that you are using right now will have most of its core written in C or C++ and will still be maintained. But if you are writing a web application backend, is C a good choice? If you have read SICP you will realize that the book is not at all about Scheme, but about the abstract concepts, even the authors say that the book is not about and does not teach Scheme. Even if some institutes like Massachusetts Institute of Technology themselves have stopped teaching this course, I don't consider it outdated and therefore am going for it.

Studying that same stuff... Again?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Well, now you might say that I've already studied Computer Science in my career then why study the same stuff again? It has been ages since I've done any Computer Science, and at times I'm missing all of that while writing software for clients at a software consultancy. Also, I've heard that the book has most of the programs in an immutable way because Scheme by design pushes towards immutability, which I think is very different from the way Computer Science was taught to me with C and all mutation through. In addition to that, I feel that everyone who writes software should not forget the fundamentals and even if it is repeating the same things again, it stays in memory and can be applied whenever needed in the future.

But then why Scheme?
~~~~~~~~~~~~~~~~~~~~

My initial thought regarding programming language was to use Clojure because I had used ClojureScript in a software project for making a front-end app deployed to Android using Cordova. So I went ahead with Clojure as my choice of language. After a while, I realized that Clojure as a language is very vast than as compared to Scheme, also it has many things already implemented and ready to use out of the box. I'm not saying that Clojure is a bad choice as a language. It is a pretty good choice to go with if you are making something like a web application. You can also go with a full stack approach using Clojure on the backend and ClojureScript on the front end, and the list just goes on.

But I decided to choose MIT-Scheme after trying Clojure because when I had a look at the language, it looked very small, something you can just get going with within a couple of hours. Another reason is that you can just copy/paste the examples from the book and then run them using the MIT-Scheme interpreter.

Aim and Expected Result
~~~~~~~~~~~~~~~~~~~~~~~

So my aim is to finish the whole book in the entire year of 2018 by doing a little bit of SICP every day. And that does not mean just reading the book but also solving the exercises extensively. I've set up a GitHub repository for solving all these problems and pushing the code online. I've also set up a testing framework which can run all the tests when run using make therefore we know if all the code is working or not at any given point in time. This GitHub repository is hooked up to Travis-CI which will show if everything is passing or not in the repository. What I expect by the end of this is a difference in the way I think while writing code and a difference in the way I think about Computer Science. As a follow-up post to this post, I will be writing a tutorial for super-fast learning MIT-Scheme to get started with SICP. I might also write posts for how I approached problems that I felt difficult to solve in SICP.
