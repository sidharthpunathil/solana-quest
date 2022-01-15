const web3 = require("@solana/web3.js");
const ps = require("prompt-sync");

const {randomNumber, totalAmtTobePaid, getReturnAmount, checkBalanceAndAirdrop} = require("./helper")
const { getWalletBalance, transferSOL } = require("./solana");

const prompt = ps({sigint: true});

// Generating Wallet

// const userWallet2=web3.Keypair.generate();
// console.log(userWallet2);

const treasury = [
    97,  85, 105,  34, 167,  82, 138, 121, 114, 160,  24,
    119,  75, 190, 180,  20,  45, 144,  21,  93,  69, 101,
    253, 140, 171,   1,  84, 114, 199,   4,  20,  37,  55,
    227, 147,  17,  60,  58, 170, 248, 124, 101,  53,  60,
    202, 212, 110,  37, 150, 139, 186, 227,  74,  82, 114,
    149, 165, 160,  35, 239,  39, 172,   6, 155
  
]

const userSecretKey = [

    81, 255, 159,  93, 238,  82, 185, 146, 166, 173, 163,
    139, 241,  79,  10, 175, 131,   6, 219, 171, 251,  77,
    215, 118, 118,  90, 132,  28, 115, 109, 206,  99,  30,
    224,  23, 224,  98, 241, 160, 196,  42,  94,  58, 199,
    179, 232, 241, 130, 177, 190, 248,  89, 183,   0, 124,
    77,  23, 244,  41,  33, 143, 132, 249, 232

    // 235,  98, 161, 104,  96,  59, 124,  50,  55,  79,  85,
    // 251, 249,  90, 222, 100, 123,   6, 243,  91, 197,  30,
    // 114, 189,  23,  37,  18,  96, 125,  71, 143, 217, 153,
    // 207, 174,  18, 108, 149, 103, 110, 207, 108, 161, 110,
    // 191,  56, 110, 166,  17, 115, 204, 213,  12, 104, 175,
    // 176, 174,  92,  75, 207,  87,  40,  87, 143

]

// Generating wallet from secret key

const userWallet = web3.Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
const treasuryWallet = web3.Keypair.fromSecretKey(Uint8Array.from(treasury));
const userPublicKey = new web3.PublicKey(userWallet._keypair.publicKey).toString();


// * Used for Testing
// checkBalanceAndAirdrop(userPublicKey, userWallet)

// TODO: Ask for Ratio
// TODO: Ask for Sol to be Staked
//Ask Public Key

const main = async () => {

    let logo = "█▀ █▀█ █░░ █▀ ▀█▀ ▄▀█ █▄▀ █▀▀\n▄█ █▄█ █▄▄ ▄█ ░█░ █▀█ █░█ ██▄"
    
    console.log(logo);

    console.log(`User Public key ${userPublicKey}`);

    console.log("Max bidding amount is 2 SOL")
    try {

    let gwb = await getWalletBalance(userPublicKey);
    let amount = prompt("Enter total amount to be paid: ");

    if(gwb < amount) {
        throw "low wallet balance"
    }

    console.log(`Wallet Balance is: ${gwb}`)

    if (parseFloat(amount) > 2){
        throw "Max bid amount exceeded";
    }
    
    // * staking ratio need to be added dynamically 
    // let ratio = prompt("What is the ratio of staking");

    console.log("You need to pay 2 SOL as stake");
    console.log("Your stake ratio is 1:1.25");
    console.log("You will gain 2.5 for gussing correctly");
    let guess = prompt("Guess random number between 1 to 6 (1 and 6 are included): ");

    const generated = randomNumber(1,6);

    if(guess == generated) {
        console.log(`The guess of ${guess} is True`);
        const amountOfSol  = getReturnAmount(amount, 1.25);

        let signature = await transferSOL(treasuryWallet, userWallet, amountOfSol);
        console.log(`Transaction signature: ${signature}`)

        let gwb = await getWalletBalance(userPublicKey);
        console.log(`Wallet Balance is: ${gwb}`)
    } else {
        console.log(`The guess of ${guess} is False, The correct guess was ${generated}`);
        const amountOfSol = totalAmtTobePaid(amount);
        
        let signature = await transferSOL(userWallet, treasuryWallet, amountOfSol);
        console.log(`Transaction signature: ${signature}`)

        let gwb = await getWalletBalance(userPublicKey);
        console.log(`Wallet Balance is: ${gwb}`)
    }

    } catch (err) {
        console.log(err);
    }
};

main();