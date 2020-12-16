// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min , max){
    var value = Math.floor(Math.random() * (max -min + 1) + min);

    return value;
}

var getPlayerName = function(){
    var name = "";

    // ADD LOOP HERE WITH PROMPT AND CONDITION
    while (name === "" || name === null){
        name = window.prompt("What is your robot's name?")
    }

    console.log("Your robot's name is " + name + ".");
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function(){
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        } 
        else {
            window.alert("You don't have enough money!");
        }
    }
};

console.log(playerInfo.name,playerInfo.attack,playerInfo.health,playerInfo.money);

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
];

var fightOrSkip = function(){
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    promptFight = promptFight.toLowerCase();
    // Enter the conditional recursive function call here!
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.playerMoney = playerInfo.money - 10;
            return true;
        }
        else{
            fightOrSkip();
        }
    }
    return false;
}

var fight = function(enemy) {
    // keep track of who goes first
    var isPlayerTurn = true;

     // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    } 

    //repeat and execute as long as the enemy-robot is alive
    while(enemy.health > 0 && playerInfo.health > 0){
        if (isPlayerTurn){

            if (fightOrSkip()){
                    // if true, leave fight by breaking loop
                    console.log()
                    break;
            }
        

            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);
        
            // Log a resulting message to the console so we know that it worked.
            console.log(playerInfo.name + " attacked " + enemy.name +". " + enemy.name + " now has " + enemy.health + " health remaining.");

            //switch turn order
            isPlayerTurn = !isPlayerTurn;
        
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                break;
            } 
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");

                break;
            }
        }
        // player get's attacked first
    
        else{
            // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
        
            // Log a resulting message to the console so we know that it worked.
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
            
            //switch turn order
            isPlayerTurn = !isPlayerTurn;
            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
            } 
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }    
        }
        
    }
       
};

var startGame = function(){
    //reset player stats
    playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++){
        if (playerInfo.health > 0){
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // pick new enemy to fight based on the index of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
            // reset enemy.health before starting new fight
            pickedEnemyObj.health = randomNumber(40, 60);
            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj); 

            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length-1){
                //ask if player wants to enter shop
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                if(storeConfirm){
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

var endGame = function(){
    //if player is still alive, player wins!
    if (playerInfo.health > 0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + "." );

        // check localStorage for high score, if it's not there, use 0
        var highScore = localStorage.getItem("highscore");
        if (highScore === null) {
            highScore = 0;
        }
        // if player have more money than the high score, player has new high score!
        if (playerInfo.money > highScore) {
            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);

            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        }
        else {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }
    }

    var playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm){
        //restart game
        startGame();
    }
    else{
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
}

var shop = function(){
    //ask player what they want to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    // use switch to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
}

startGame();
