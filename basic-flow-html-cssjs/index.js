import { createWalletClient, createPublicClient,custom} from "https://esm.sh/viem"

const sepolia = {
  id: 11155111,
  name: "Sepolia",
  network: "sepolia",
  nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.sepolia.org"] } }
};


let isConnected = false;
let addresses = [];

const connectButton = document.getElementById("connectButton");
const balanceResult = document.getElementById("balanceResult");
const fundedAmountResult = document.getElementById("fundedAmountResult");

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        isConnected = true;
        const walletClient = createWalletClient({
            transport: custom(window.ethereum),
           
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
        transport: custom(window.ethereum),
      chain: sepolia
    });

    const balance = await publicClient.getBalance({ address: addresses[0] });
    balanceResult.innerHTML = `Balance: ${balance / 10n**18n} ETH`;
}

async function fund() {
    if (!isConnected) return alert("Please connect wallet first");

    const amount = document.getElementById("fundedamount").value;
    const walletClient = createWalletClient({
        transport: custom(window.ethereum)
    });

    const hash = await walletClient.sendTransaction({
        account: addresses[0],
        to: "0x00Bd67C393E1fCb9E8265a7ED1b7F6300b185083", // put your address here
        value: BigInt(amount) * 10n ** 18n,
         chain: sepolia
    });

    fundedAmountResult.innerHTML = `Tx sent: ${hash}`;
}

window.connect = connect;
window.getBalance = getBalance;
window.fund = fund;
