Scheme Crash Course
===================

.. post:: 19, September 2018
  :tags: scheme, crash course, programming, sicp, dr. racket
  :category: SICP
  :author: tanay


This crash course on Scheme that I'm writing is the kind of course that I would had liked before starting
to read SICP. This crash course is geared towards people who are already familiar with some programming
language and want to start with SICP but are not really comfortable Scheme or any LISP for that matter.
All the Python code in this blog is Python 3 compatible and all the Scheme code is MIT-Scheme compatible.

The whole blog post is written in such a way that you should be able to pick up Scheme in an hour or so
by typing out the programs in an online Scheme interpreter and see how the things work there. The examples
here are in two languages namely Python and obviously Scheme. Every concept here is first introduced in
Python and then a exact implementaion is shown in Scheme. The main reason for choosing Python is that it
is very easy and looks a lot like pseudocode and for those who don't know the language can easily
undrstand the code.

.. figure:: images/scheme.jpg
  :width: 500
  :alt: Scheme Logo
  :align: center


Arithematic operations
######################

Since Scheme is a LISP it does not have operators that we can use in a infix notation, so we have operators
like :code:`+`, :code:`-`, :code:`*`, :code:`/` which have to be used in prefix notation.
To make this easier let's visualize these operators to be nothing but functions, which they actually are
and makes much more sense when think them to be like that.

We will therefore assume that the languages that we are comparing Scheme do not have arithematic operators
but have functions like :code:`add()`, :code:`subtract()`, :code:`multiply()`,
:code:`divide()`. Let's start writing some of these arithematic operators in Python. After the Python
block of the code the exact Scheme version of the same will be shown in the block below it.

.. code-block:: python
  :linenos:

    # (1 + 2) * (5 - 3) / 9
    divide(multiply(add(1, 2), subtract(5, 3)), 9)  # => 0.666666666666666

    # 3 + 4 + 5 + 6 + 8
    add(3, 4, 5, 6, 8)  # => 26

    # 9 * 9 - 3 - 5 - 3
    subtract(multiply(9, 9), 3, 5, 3)  # => 70

    # zero arguments
    add()  # => 0

|

.. code-block:: scheme
  :linenos:

    ; (1 + 2) * (5 - 3) / 9
    (/ (* (+ 1 2) (- 5 3)) 9)  ; => Value: 2/3

    ; 3 + 4 + 5 + 6 + 8
    (+ 3 4 5 6 8)  ; => Value: 26

    ; 9 * 9 - 3 - 5 - 3
    (- (* 9 9) 3 5 3) ; => Value: 70

    # zero arguments
    (+)  # => 0

Let's first try to understand the above code. The Python part of the code has these functions
:code:`add()`: :code:`subtract()`, :code:`multiply()`, :code:`divide()`.
There functions take any number of arguments on which the respective operation is to be
recursively performed. For exaple in <code>subtract()</code> the first argument will be taken
and one after the other all the remaining arguments of <code>subtract()</code> will be
subtracted from till ultimately just one value is left. In case if no arguments are passed
then a :code:`0` will be returned.

Now let's try to understand the Scheme code. Scheme is a typical LISP so every function call is
enclosed in parenthesis. All the arguments passed to the function are separated with spaces.
The first argument or the word that follows just after :code:`(` is the call to that function.
For eample in :code:`(+ 2 3)`, :code:`+` is the function call to add and :code:`2`
and :code:`3` are the arguments passed to that add function.


Variables
#########


.. code-block:: python

    # define a variable MAX that holds 500
    > MAX = 500
    > MAX  # => 500

    # define a constant PI that returns the value of PI
    > PI = 3.14
    > PI  # => 3.14

    # compute sum of two numbers and store it in a variable
    > SUM = 3 + 6
    > SUM  # => 9


.. code-block:: scheme

    ; define a variable MAX that holds 500
    > (define max 500)
    > max  ; => Value: 500

    ; define a constant PI that returns the value of PI
    > (define pi 3.14)
    > pi  ; => Value: 3.14

    ; compute sum of two numbers and store it in a variable
    > (define sum (+ 3 6))
    > sum  ; => Value: 9

Let's now look at these above things as variables, but name value binding. What exactly
do we mean by name value binding? Simply stating it's that when we enter that name, it is
evaluated to it's respective value that it was assigned to. This name can be later
changed in the code be reassigning another value to that variable. To prevent that,
we should take care about the kind of name that we give to the variables. Naming should
be such that we do not reassign that name to something else. In other words even
though the so called variables are not constant they should be treated as such or
else they will not maintain `referential transparency <https://en.wikipedia.org/wiki/Referential_transparency>`.

The syntax for defining a variable is very easy. Take the example of PI :code:`(define PI 3.14)`.
Whatever follows define is a new name with which we are associating a value, :code:`PI` in this
case is the name and :code:`3.14` is the value associated with it. That is simply how assigning
variables work in Scheme. The we can also evaluate an expression as a value assigned to name, this is
done for :code:`sum` in the code snippet shown above.


Functions
#########

.. code-block:: python

    # Lambda implementation of square function
    > square = lambda x: x * x
    > square(7)   #  => 49

    # Square implementation as function (syntactic sugar)
    > def square(x):
          return x * x
    > square(7)


.. code-block:: scheme

    ;  Lambda implementation of square function
    > (define square (lambda (x) (* x x)))
    > (square 7)  ;  => Value: 49

    ; Square implementation as function (syntactic sugar)
    > (define (square x) (* x x))
    > (square 7)  ;  => Value: 49


By default in Scheme we define variable of which the value is lambda which is first shown in Python.
In Python this is not the default way we define a function. But this is again written in that way because
that's how it is done in Scheme. The second function that shows default way of implementing functions in Python.
The same is shown in Scheme which is nothing but syntactic sugar for binding lambdas to name.


Taking a decision
#################

.. code-block:: python

    # Old enough to drink string
    def old_enough(age):
        if age >= 18:
            return "Yes"
        else:
            return "No"
    old_enough(34)
    old_enough(17)

    # Check if a given number is even returns the respective string
    def is_even(number):
        if number % 2 == 0:
            return "Yes"
        else:
            return "No"
    is_even(2)
    is_even(3)


.. code-block:: scheme

    ; old enough to drink string
    > (define (old-enough age)
    >          (if (>= age 18) "Yes" "No"))
    > (old-enough 34)  ;  =>  Value: "Yes"
    > (old-enough 17)  ;  =>  Value: "No"

    ; Check if a given number is even returns the respective string
    > (define (is-even number) (if (= 0 (remainder number 2)) "Yes" "No"))
    > (is-even 2)  ;  =>  Value: "Yes"
    > (is-even 3)  ;  =>  Value: "No"

Now we have to decide if the age of the person which is entered is of legal drinking age of not. Since we're
comparing with a functional language, let's do it in Python the way we would do it in Scheme. So we define a
function called :code:`is_even()` and we pass the age to it. Inside the function has an if statement that
returns the string which is either :code:`"Yes"` or :code:`"No"` depending on if he is legal or not. The
Scheme version of this looks very similar in which :code:`if` is the function call of which the first argument
is an expression that evaluates to a boolean value. Where it :code:`(>= age 18)` checks if age is greater than
18 or not. If the expression evaluates to <code>lol</code>

.. TODO start editing from here

List: Getting length
####################


.. code-block:: python

    # Recursively iterating to get the length of the list
    def length_of_list(lst, current_length=0):
        if lst == []:
            return current_length
        return length_of_list(lst[1:], current_length+1)


.. code-block:: scheme

    ; recursively iterating to get the length of the list


List: Concatenating two lists
#############################


.. code-block:: python

    # Simply concatenating two lists
    [1, 2, 3, 4] + [5, 6, 7]

    [1, 2, 3, 4, 5, 6, 7]


.. code-block:: scheme

    ; Simply concatenating two lists (cons)


List: Appending element to list
###############################

.. code-block:: python

    # Simply appending element to list
    [1, 2, 3, 4, 5].append(6)


.. code-block:: scheme

    ; Simply appending element to list


List: Getting the first element in the list
###########################################


.. code-block:: python

    [1, 2, 3, 4, 5][0]


.. code-block:: scheme

    ; Some scheme code here

List: Getting the rest in the list
##################################


.. code-block:: python

    [1, 2, 3, 4, 5][1:]


.. code-block:: scheme

    ; Some scheme code here


List: Reversing
###############


.. code-block:: python

    # Recursively iterating to reverse the list
    def reverse_list(lst, new_lst=[]):
        if lst == []:
            return new_lst
        return reverse_list(lst[1:], list(lst[1]) + new_lst)
    # Use the reverse function provided by the language
    list(reversed([1, 2, 3, 4, 5]))  # => [5, 4, 3, 2, 1]


.. code-block:: scheme

    ; recursively iterating to reverse the list (use car, cdr and cons)

    ; Use the reverse function provided by the language


Compute factorial
#################


.. code-block:: python

    def factorial(number, current_product=1):
        if number == 1:
            return current_product
        return factorial(number-1, current_product * number)


.. code-block:: scheme

    ; some scheme code here


Compute fibonacci
#################


.. code-block:: python

    def fibonacci(count, current_list=[], previous=0, current=1):
        if len(current_list) == count:
            return current_list
        return fibonacci(count, current_list.append(previous), previous=current, current=previous+current)


.. code-block:: scheme

    ; some scheme code here

Find element in the list
########################


.. code-block:: python

    def search_element(lst, key, index=0):
        if index == len(lst):
            return None
        if lst[index] == key:
            return index
        return search_element(lst, key, index+1)


.. code-block:: scheme

    ; some scheme code ehre


Simple input and output
#######################


.. code-block:: python

    int(input()) + 45 # input an int and add 45 to it

    print("Enter your name: ")
    "Hello " + input() # output a prompt and take string input name and say hello

.. code-block:: scheme

    ; some scheme code here


Writing tests
#############


.. code-block:: python

    # Some python code here


.. code-block:: scheme

    (load "test-manager/load.scm")
    (load "src/ex_1.2.scm")

    (in-test-group
      translation-of-an-expression-into-prefix-form
      (define-test (expression-infix)
         (assert-= (expression) -37/150)))
    (run-registered-tests)
