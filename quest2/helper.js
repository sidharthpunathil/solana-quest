const { airDropSol } = require("./solana")

function randomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);   
}

function totalAmtTobePaid(amount) {
    return amount;
}

function getReturnAmount(invest, stake) {
    return invest * stake
}

// normal function

// async function checkBalanceAndAirdrop(userpublickey, userWallet) {

//     let gwb = await getWalletBalance(userPublicKey)
//     console.log(`Wallet Balance: ${gwb}`)

//     await airDropSol(userWallet, 1);

//     gwb = await getWalletBalance(userPublicKey)
//     console.log(`Wallet Balance: ${gwb}`)

// };

// async function

const checkBalanceAndAirdrop = async (userpublickey, userWallet) => {

    let gwb = await getWalletBalance(userpublickey);
    console.log(`Wallet Balance: ${gwb}`);

    console.log("Airdropping");
    await airDropSol(userWallet, 1);

    gwb = await getWalletBalance(userPublicKey);
    console.log(`Wallet Balance: ${gwb}`);
}


module.exports = {randomNumber, totalAmtTobePaid, getReturnAmount, checkBalanceAndAirdrop};