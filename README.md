# Fish-Frenzy-Game

## Description
An adorable game where you can play as your chosen kitty, aiming to catch as many fish as you can while evading the Big Bad Wolf. A single encounter with the wolf means you're caught, so the player must be swift and strategic. The user controls the kitty's movements with the WASD keys, and they must select their preferred kitty from the dropdown above before starting. There is also a feature to adjust the game difficulty with a click and the RIGHT ARROW key. This game was developed using HTML, CSS, and the p5.js library.

## Game Demo

## Process & Takeaways

### Inspiration 
This game offered a very exciting and interesting learning experience. To start, I knew I wanted to create a game where the user plays as a cute character, which is why I decided for the main character to be a cat! After this decision, I remembered a game I used to play all the time when I was bored called Bad Icecream. This game consists of a grumpy-looking ice cream character that moves through a pixelated frozen-wonderland in order to collect fruit. This little guy is then chased by some big monster and acts as an obstacle to the ice cream guy's search for fruit. As the user progresses through the levels, the game gets harder with more obstacles and an even faster monster. I wanted to incorporate some of these qualities and decided that my user would be on the search for moving fish that move left and right throughout the screen. The user must control the kitty using WASD keys and collect as many fish as they can as there is no time limit unlike in Bad Icecream. However, like in Bad Icecream, there is a villain: the Wolf. This wolf chases the character while they try to collect fish, and once the kitty is caught: it's GAME OVER. Since Bad Icecream gets harder as the user goes through the levels, I wanted to make the game get harder without having to create different maps for every level. Thus, I want to provide an easy, medium, or EXTREME game-mode where the Wolf gets even faster as the game-mode gets harder.

### Implementation

I had to use the Object Oriented Programming aspect of JS in order to create classes for each object like the kitty, wolf, and all the fish. Each of these classes have constructors and functions that ensure the object has what it needs to operate as it should. 

<p align="center">
  <i>A code snippet of the Cat class</i>
</p>

<p align="center">
  <img src="https://github.com/saharbueno/Fish-Frenzy-Game/assets/69322388/beb2a968-c559-45df-a0ab-a884f5500621.png" width="450">
</p>

Moreover, one of the most challenging parts of this game was handling all of the game states. I had to make sure that events in the game where triggered exactly when they needed to be, such as when the user picks a cat and is ready to play, when the wolf catches the user, and when the user clicks to go back to the start screen. The hardest thing to implement was how to allow the user to pick a new cat to play with. To do this, I had to make sure the user's cat pick was cleared after every game, and I made it a requirement for the user to pick another cat before the user's click could trigger a new game. 

### Game Design

I wanted to make this game unique and something that I would want to play in my own free time, so I decided to design my own characters. I sketched out what ideas I had for my game, which you can see below:

![sketch](https://github.com/saharbueno/Fish-Frenzy-Game/assets/69322388/8f3f3745-a64c-4792-b124-677f98868c42)

Having this initial design helped me a lot in being able to fully flesh out the design and character art. You can find the final character designs below: 

![dukefluffykins](https://github.com/saharbueno/Fish-Frenzy-Game/assets/69322388/475fbecf-a5cd-45ba-9c40-25933ac0190a)
![happypaws](https://github.com/saharbueno/Fish-Frenzy-Game/assets/69322388/05a90cba-f5e9-4fb3-a1fa-7ca796e62d32)
![mrsoftpaws](https://github.com/saharbueno/Fish-Frenzy-Game/assets/69322388/87c95378-f60a-45b3-80ee-14e22c14046b)
![wolfR](https://github.com/saharbueno/Fish-Frenzy-Game/assets/69322388/f6ba66c2-c6b5-4ea0-b68a-a6567e3583e8)

Seeing the game come together was really rewarding and I loved that I was involved in every part of the process from first brainstorming the game idea, to designing the atmosphere and experience, to implementing the logic to make the game really come to life. 


<p align="center">
  <i>Visit my site <a href="https://i6.cims.nyu.edu/~sb8249/interactive/assignment03/assignment03.html">HERE</a></i>
</p>

<p align="center">
  <i>˚ʚ♡ɞ˚ Thanks for visiting! ˚ʚ♡ɞ˚</i>
</p>

<p align="center">
  <img src="https://media.giphy.com/media/3UPNs8vXyJESQ/giphy.gif" alt="Happy">
</p>
