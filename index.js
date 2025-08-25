import {createWalletClient , custom ,  } from "https://esm.sh/viem"

const connectButton = document.getElementById("connectButton");
const balanceResult = document.getElementById("balanceResult");


//  1 ] To connect to wallet 
let isConnected = false;    


async function connect() {
    if (window.ethereum !== "undefined") {
        isConnected = true;
        const walletClient = createWalletClient(
         { transport : custom(window.ethereum)}

        );
         const addresses = await walletClient.requestAddresses();
        
        connectButton.innerHTML = `Successfully connected to ${addresses[0]} `;
        
        
    } else {
        connectButton.innerHTML = `Please install MetaMask `;
    }

}

//  2 ] To get balance
                    async function getBalance() {
                        if (isConnected) {
                            const walletClient = createWalletClient(
                            { transport : custom(window.ethereum)}
                            );
                            const addresses = await walletClient.requestAddresses();
                            const address = addresses[0];
                            const balance = await walletClient.requestBalance(address);
                            balanceResult.innerHTML = `Balance : ${balance} ETH `;
                            console.log(balance);
                        } else {
                        balanceResult.innerHTML = `Please connect to wallet `;
                        }
                        
                    }


window.connect = connect;
window.getBalance = getBalance;  