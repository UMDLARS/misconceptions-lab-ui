# I can trust people to keep my security interests in mind

<hr>

## Overview
A classic mistake that programmers often make is to assume that people will only use their systems as the programmers expect them to. This assumption allows programmers to ignore issues that could arise from a system being used in an unexpected way. Unfortunately, this is a dangerous assumption. In reality, not all users are benevolent or act in good faith; some of them are actively malicious, looking for ways to exploit systems for their own benefit. Some users are unauthorized, perhaps having gained access to the system through another vulnerability, but sometimes authorized users have bad intentions (this is also known as an “insider attack”). Additionally, sometimes users are acting in good faith, but do things that the programmer did not anticipate, resulting in unexpected outcomes that can leak or corrupt data, damage hardware, deny service, or have other negative effects.

The solution to this problem is well-known, and takes the form of input validation and input sanitization. Input validation is making sure that input matches a required form or type. For example, ensuring that input meant to be a number is composed only of digits and not any other symbols. Input sanitization takes valid input and ensures that the input cannot do anything malicious or undesired. For example, input sanitization for an online “comment section” is responsible for making sure that HTML entered into a comment is shown as HTML in the comment, and not interpreted as HTML, which would modify the web page. 

<hr>

![Header Image](assets/images/20130326163535-0_0.jpg)

<hr>

## Examples
### Code Injection
In an old-school attack known as Code Injection, users purposefully paste a block of code into a web form input field where a developer would never expect code to exist. This [XKCD comic](https://xkcd.com/327/) explores how user input can destroy a database. For further reading here is an [explanation](https://www.explainxkcd.com/wiki/index.php/Little_Bobby_Tables) of the XKCD comic. 

### Buffer Overflow
A buffer overflow attack closely mimics a code injection attack. In this scenario, a user exploits the limited size of memory given to a function. The very last line of code in a function is the return address, which tells the computer where the next executable code exists. If a user writes a large piece of executable code in a buffer, then keeps writing beyond the end of that buffer, they can possibly overwrite the return address. If they rewrite the return address to point to the beginning of their injected code, the computer will execute everything the user wrote! Read more about buffer overflows [here](https://medium.com/@amannagpal4/buffer-overflow-attack-and-its-evolution-519db3c396ad), or check out [Computerphile's video](https://www.youtube.com/watch?v=1S0aBV-Waeo) on buffer overflows if you want to see a live demonstration. 

### Samy Worm
Back in the days of MySpace, a 20-year-old named Samy Kamkar launched a successful cross-site scripting attack known as the "Samy Worm," which created a pop-up saying "but most of all, Samy is my hero" and automatically sent Samy a friend request. While the vulnerability lay within web browsers, MySpace took most of the heat and eventually found a way to patch the bug themselves. Samy released an explanation of the exploit, which is archived [here](https://web.archive.org/web/20160305044015/http://samy.pl/popular/tech.html). 

<hr>

## Activity
 In this activity, you play the role of a user of a fabulous new android, the BakeBot 5000 -- a robot capable of parsing recipes written in a special language and baking splendiferous comestibles. Unfortunately, the original developer of the BakeBot made the assumption that, since people would never ask BakeBot to do anything weird, the developer didn’t need to protect BakeBot from any kind of edge cases resulting from malicious or unexpected input. Your task is to find all the ways that BakeBot can be misused. Each time you find something bad that BakeBot can do, you can set a constraint that is used to make sure that BakeBot’s input fits within the required parameter. Once you’ve found all the edge cases and set all the constraints, you’ve completed the activity!

Congratulations! You've just been hired as a Quality Assurance Inspector to test the latest in home innovation: The BakeBot 5000! Unfortunately, you suspect the software development team has naively assumed users would only enter meaningful input. Try using the BakeBot 5000, and see if you can find a vulnerability in its programming. 

<app-bakebot></app-bakebot>

<hr>

## See Also
[Common Vulnerabilities and Exposures CVE](http://cve.mitre.org/)

<hr>

![Image](assets/images/jon-moore-bBavss4ZQcA-unsplash.jpg)

<hr>

![Image](assets/images/zhen-hu-Fhz5QhZmn_M-unsplash.jpg)

<hr>

## Check Understanding

<app-lab-check [questions]="
    [
      {prompt: '1) Which of the following is an example of invalid input?',
        options: [
          'BAKE AT 350 FOR -60 MINUTES',
          'ADD &=^',
          'Both A and B are invalid',
          'Neither is invalid'
        ],
        answer: '1',
        result: ' '},
      {prompt: '2) Suppose a user enters: BAKE AT 400 FOR 35 MNITUES. What should BakeBot do?',
        options: [
          'Shutdown before the user enters something more dangerous.',
          'Assume the user meant "minutes," so bake for 35 minutes',
          'Show an error message',
          'Any of the above is sufficient.'
        ],
        answer: '2',
        result: ' '}
    ]
"></app-lab-check>
