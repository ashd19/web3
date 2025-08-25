import { createWalletClient, createPublicClient, custom } from "https://esm.sh/viem"

let isConnected = false;
let addresses = [];

const connectButton = document.getElementById("connectButton");
const balanceResult = document.getElementById("balanceResult");
const fundedAmountResult = document.getElementById("fundedAmountResult");

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        isConnected = true;
        const walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });

        addresses = await walletClient.requestAddresses();
        connectButton.innerHTML = `Connected: ${addresses[0]}`;
    } else {
        connectButton.innerHTML = `Please install MetaMask`;
    }
}

async function getBalance() {
    if (!isConnected) return alert("Please connect wallet first");

    const publicClient = createPublicClient({
        transport: custom(window.ethereum)
    });

    const balance = await publicClient.getBalance({ address: addresses[0] });
    balanceResult.innerHTML = `Balance: ${balance / 10n**18n} ETH`;
}
async function fund() {
    if (!isConnected) return alert("Please connect wallet first");

    const amountInput = document.getElementById("fundedamount").value;
    if (!amountInput) return alert("Please enter amount");

    const amount = Number(amountInput);
    if (isNaN(amount)) return alert("Please enter a valid number");

    const walletClient = createWalletClient({
        account: addresses[0],
        transport: custom(window.ethereum)
    });

    try {
        const hash = await walletClient.sendTransaction({
            to: "0x00Bd67C393E1fCb9E8265a7ED1b7F6300b185083", // replace with your address
            value: BigInt(amount) * 10n ** 18n
        });

        fundedAmountResult.innerHTML = `Tx sent: <a href="https://sepolia.etherscan.io/tx/${hash}" target="_blank">${hash}</a>`;
    } catch (err) {
        console.error(err);
        fundedAmountResult.innerHTML = `Error: ${err.message}`;
    }
}


window.connect = connect;
window.getBalance = getBalance;
window.fund = fund;
