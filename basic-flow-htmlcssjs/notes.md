1] transport :

- it is a custom transport that allows you to use the ethereum object from the window object
  - this is because the ethereum object is not available in the browser
  - we need to use the ethereum object from the window object

2] So value is 1 eth but expressed in wei , like only represented

3] Anvil - it is a local ethereum node that you can use to test your dapp. - install anvil - To create the fundme-anvil.json file, run the following command in the terminal:
this creates a local ethereum node that you can use to test your dapp. - anvil --dump-state fundme-anvil.json

4]
The Multi-Chain Deployment Challenge
Smart contracts are often deployed to various blockchain networks simultaneously – perhaps a mainnet like Ethereum, a Layer 2 solution like ZKsync Era, and one or more testnets like Sepolia. A critical point to understand is that deploying the exact same smart contract code to different blockchains will almost always result in a different contract address on each chain.

5] abi

6] eth not showing issue after connecting to anvil :
You are calling getBalance() before ensuring MetaMask is switched to your Anvil chain.
That means your DApp still queries the wrong RPC → returns 0.

## You’re adding the Anvil chain after you fetch the balance:

wallet_addEthereumChain is an EIP-3085 JSON-RPC method that MetaMask (and other wallets) expose.

It lets your dApp tell the wallet:

“Hey, I need to use this custom blockchain (like your Anvil local chain). Please add it to the wallet’s list of networks and switch to it.”
