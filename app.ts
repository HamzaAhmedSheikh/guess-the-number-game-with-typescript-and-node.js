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