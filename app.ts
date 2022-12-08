#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";

let sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    })
}

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        `
              Welcome to the guess the number game \n        
        `
    );
    await sleep();
    rainbowTitle.stop();


    console.log(gradient.pastel.multiline(figlet.textSync("Guess the Number Game", { horizontalLayout: 'full' })))

    let getUserName = await inquirer.prompt([{
        name: "user_name",
        type: 'string',
        message: "hey! user, please enter your name: ",
        default() {
            return "Player-1";
        },
    }])


    console.log('\n');
    console.log(
        `${chalk.greenBright(`Hello ${getUserName.user_name} \n`)}
         ${chalk.cyan.bold(`You have three levels in this game ${chalk.blue.bold("1) easy")} ${chalk.blue.bold("2) medium")} and ${chalk.blue.bold("3) hard")}`)}          
         ${chalk.hex('#FFA500').bold(`You have 6 chances to guess the correct number and ${chalk.green.bold("if you guess the right number you win.")}`)} 
         ${chalk.hex('#FFA500').bold(`if you win the game cli will ask to do you want to continue? press y or n`)}
         ${chalk.red.bold(`if you lose the game is over`)}         
        `
    );
}

await welcome()

// easy level
let randomNumber: number = Math.floor(Math.random() * 25);
// medium level
let randomMediumNumber: number = Math.floor(Math.random() * 50);
// hard level
let randomNumberThree: number = Math.floor(Math.random() * 100);

let score: number = 0
let chances: number = 5;
let secondChance: number = 5;
let thirdChance: number = 5;

let easyLevel = async () => {
    let result = await inquirer.prompt([
        {
            name: "userInput",
            type: 'number',
            message: "guess a number: ",
            validate: (answer) => {
                if (isNaN(answer)) {
                    return "Please enter a valid number";
                }
                return true;
            },
        }
    ])

    return result
}
async function excuteRandomNumber() {
    console.log(`${chalk.cyan.bold(`You have to guess a number between 1 to 25`)}  `)
    do {
        let { userInput } = await easyLevel()

        if (randomNumber === userInput) {
            console.log(`${chalk.green.bold("Hurray!!, you guessed the right number...!!!")}`);
            score += 10
            console.log(`${chalk.cyan.bold(`your score is ${score}`)}`)
            break;
        }
        else if (chances == 0) {
            console.log(`${chalk.bgRed("Game over, you lose!")}`);
            process.exit(1);
        }
        else {
            chances--;
        }
    } while (chances >= 0);
}
/*********************************************************************/

let mediumLevel = async () => {
    console.log(`${chalk.cyan.bold(`You have to guess a number between 1 to 50`)}`)
    let result = await inquirer.prompt([
        {
            name: "userInput",
            type: 'number',
            message: "guess a number: ",
            validate: (answer) => {
                if (isNaN(answer)) {
                    return "Please enter a valid number";
                }
                return true;
            },
        }
    ])

    return result
}

async function excuteRandomNumberTwo() {
    do {
        let { userInput } = await mediumLevel()

        if (randomMediumNumber === userInput) {
            console.log(`${chalk.green.bold("Hurray!!, you guessed the right number...!!!")}`);
            score += 10
            console.log(`${chalk.cyan.bold(`your score is ${score}`)}`)
            break;
        }

        else if (secondChance == 0) {
            console.log(`${chalk.bgRed("Game over, you lose!")}`);
            process.exit(1);
        }
        else {
            secondChance--;
        }
    } while (secondChance >= 0);
}
/*********************************************************************/
let hardLevel = async () => {
    console.log(`${chalk.cyan.bold(`You have to guess a number between 1 to 100`)}`)
    let result = await inquirer.prompt([
        {
            name: "userInput",
            type: 'number',
            message: "guess a number: ",
            validate: (answer) => {
                if (isNaN(answer)) {
                    return "Please enter a valid number";
                }
                return true;
            },
        }
    ])

    return result
}

async function excuteRandomNumberThree() {
    do {
        let { userInput } = await hardLevel()

        if (randomNumberThree === userInput) {
            console.log(`${chalk.green.bold("Hurray!!, you guessed the right number...!!!")}`);
            score += 10
            console.log(`${chalk.cyan.bold(`your score is ${score}`)}`)
            break;
        }

        else if (thirdChance == 0) {
            console.log(`${chalk.bgRed("Game over, you lose!")}`);
            process.exit(1);
        }
        else {
            thirdChance--;
        }
    } while (thirdChance >= 0);
}

/*********************************************************************/

async function chooseTheLevel() {
    let result = await inquirer.prompt([
        {
            type: "list",
            name: "choose_a_level",
            message: "choose a level",
            choices: ['Easy', 'Medium', 'Hard']
        }
    ])

    switch (result.choose_a_level) {
        case "Easy":
            await excuteRandomNumber()
            break;
        case "Medium":
            await excuteRandomNumberTwo()
            break;
        case "Hard":
            await excuteRandomNumberThree()
            break;
        default:
            return 'please choose a valid level'
    }
}

async function askAgain() {
    do {

        await chooseTheLevel()
        var again = await inquirer.prompt({
            type: "input",
            name: "restart",
            message: "Do you want to continue? press y or n: "
        })
    } while (again.restart === "y" || again.restart === "Y" || again.restart === "yes" || again.restart === "YES");
}

await askAgain()