import {
  createWalletClient,
  createPublicClient,
  custom,
  parseEther,
  defineChain,
} from "https://esm.sh/viem";
import { contractAddress, abi } from "./contants.js";
import { formatEther } from "https://esm.sh/viem";
let isConnected = false;
let addresses = [];

const connectButton = document.getElementById("connectButton");
const balanceResult = document.getElementById("balanceResult");
const fundedAmount = document.getElementById("fundedamount");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // First ensure chain is added and switched
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x7A69", // 31337
            chainName: "Anvil Local",
            rpcUrls: ["http://127.0.0.1:8545"],
            nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });

      const walletClient = createWalletClient({
        transport: custom(window.ethereum),
      });

      addresses = await walletClient.requestAddresses();
      isConnected = true;
      connectButton.innerHTML = `Connected: ${addresses[0]}`;
      console.log("Connected:", addresses[0]);
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  } else {
    connectButton.innerHTML = `Please install MetaMask`;
  }
}

async function getBalance() {
  if (!isConnected) return alert("Please connect wallet first");

  const publicClient = createPublicClient({
    transport: custom(window.ethereum),
  });

  const balance = await publicClient.getBalance({ address: addresses[0] });
  console.log("Connected address:", addresses[0]);
  console.log("Raw balance (wei):", balance.toString());
  console.log("Formatted balance (ETH):", formatEther(balance));

  balanceResult.innerHTML = `Balance: ${formatEther(balance)} ETH`;
}

async function fund() {
  if (!isConnected) return alert("Please connect wallet first");

  const amountInput = document.getElementById("fundedamount").value;
  if (!amountInput) return alert("Please enter amount");

  const amount = Number(amountInput);
  if (isNaN(amount)) return alert("Please enter a valid number");

  const ethAmount = fundedAmount.value;
  console.log("Funding with amount: ", ethAmount);

  const walletClient = createWalletClient({
    account: addresses[0],
    transport: custom(window.ethereum),
  });

  const [connnectedAccount] = await walletClient.requestAddresses();
  const currentChain = await getCurrentChain(walletClient);

  let publicClient = createPublicClient({
    transport: custom(window.ethereum),
  });
  // since we recieve array of addresses , we need to get the first one

  await publicClient.simulateContract({
    address: contractAddress,
    abi: abi,
    functionName: "fund",
    account: connnectedAccount,
    chain: currentChain, // get current chain
    value: parseEther(ethAmount),
  });
}

window.connect = connect;
window.getBalance = getBalance;
window.fund = fund;

async function getCurrentChain(client) {
  const chain = await client.getChainId();
  const currentChain = defineChain({
    id: chain,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"],
      },
    },
  });
  return currentChain;
}
