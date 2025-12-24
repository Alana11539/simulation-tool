// src/data/attackData.jsx

const attackData = [
  {
    id: "phishing",
    numericId: "1",
    name: "Phishing Attack",
    description:
      "A phishing attack tricks users into revealing sensitive information like private keys, passwords, or wallet credentials by pretending to be a legitimate entity.",
    howItWorks:
      "Attackers send fake emails, messages, or create fake websites that look identical to trusted sources. When users enter their sensitive data, attackers steal it immediately.",
    steps: [
      "Attacker sends a fake email or message.",
      "User clicks the malicious link.",
      "User enters private key or password on fake page.",
      "Attacker captures the credentials.",
      "Funds are stolen from the wallet or account."
    ],
    realWorldCases:
      "1. Mt. Gox Phishing emails (2011-2014). \n2. Fake MetaMask extension attacks. \n3. Social media crypto giveaway scams.",
    prevention:
      "1. Never share private keys or passwords. \n2. Always verify website URLs. \n3. Enable 2FA and use hardware wallets. \n4. Avoid clicking unknown links.",
    additionalNotes:
      "Phishing attacks are the most common crypto scams. They rely on human error rather than technical hacking. Awareness and verification are key."
  },
  {
    id: "fiftyOne",
    numericId: "51",
    name: "51% Attack",
    description:
      "A 51% attack occurs when a single entity or group controls more than 50% of the network's mining or validating power, allowing them to manipulate transactions.",
    howItWorks:
      "With majority control, attackers can rewrite transaction history, double-spend coins, or prevent new transactions from confirming.",
    steps: [
      "Attacker gains majority hashing or staking power.",
      "Attacker mines conflicting blocks.",
      "Double spends cryptocurrency.",
      "Other network participants reject legitimate blocks controlled by attacker.",
      "Network integrity is compromised temporarily."
    ],
    realWorldCases:
      "1. Bitcoin Gold (2018) suffered 51% attacks multiple times. \n2. Ethereum Classic (2019) had several double-spend attacks.",
    prevention:
      "1. Increase network decentralization. \n 2. Monitor large mining pools. \n3. Use strong consensus protocols. \n4. Encourage community vigilance.",
    additionalNotes:
      "51% attacks are rare on large networks like Bitcoin but more common on smaller PoW or PoS blockchains with low participation."
  },
  {
    id: "exchange",
    numericId: "3",
    name: "Exchange Hack",
    description:
      "Exchange hacks occur when attackers exploit vulnerabilities in centralized cryptocurrency exchanges to steal user funds.",
    howItWorks:
      "Hackers use software vulnerabilities, insider access, or phishing attacks to compromise hot wallets and withdraw user funds.",
    steps: [
      "Attacker identifies a vulnerability in exchange systems.",
      "Attacker gains access to hot wallets.",
      "Funds are transferred to attacker-controlled addresses.",
      "Exchange may suspend operations, delaying detection."
    ],
    realWorldCases:
      "1. Mt. Gox (2014) lost over $450 million worth of Bitcoin. \n2. Coincheck (2018) lost $530 million in NEM tokens. \n3. Bitfinex (2016) lost 120,000 BTC.",
    prevention:
      "1. Store most funds in cold wallets. \n2. Conduct regular security audits. \n3. Use multi-signature wallets. \n4. Limit hot wallet exposure.",
    additionalNotes:
      "Centralized exchanges are prime targets for hackers due to the concentration of funds. Security protocols must be extremely strict."
  },
  {
    id: "hotwallet",
    numericId: "4",
    name: "Hot Wallet Attack",
    description:
      "Hot wallet attacks target cryptocurrency wallets connected to the internet, which are more vulnerable to hacks compared to cold wallets.",
    howItWorks:
      "Attackers use malware, phishing, or social engineering to access private keys in hot wallets and drain funds.",
    steps: [
      "User keeps significant funds in an online wallet.",
      "Attacker uses malware or phishing to steal credentials.",
      "Attacker transfers funds to their own wallet.",
      "Victim loses assets instantly."
    ],
    realWorldCases:
      "1. Binance hot wallet hack (2019) lost 7,000 BTC. \n2. Various DeFi platform wallet compromises.",
    prevention:
      "1. Store large assets in cold wallets. \n2. Limit hot wallet balances. \n3. Enable multi-factor authentication. \n4. Regularly update wallet software.",
    additionalNotes:
      "Hot wallets are convenient but inherently risky. They should only store small, operational amounts for trading or DeFi interactions."
  },
  {
    id: "sybil",
    numericId: "5",
    name: "Sybil Attack",
    description:
      "A Sybil attack happens when an attacker creates multiple fake identities to gain influence or manipulate a network, such as voting or consensus systems.",
    howItWorks:
      "Attackers flood the network with fake nodes to skew votes, validate fraudulent transactions, or manipulate reputation systems.",
    steps: [
      "Attacker creates multiple fake nodes or accounts.",
      "Fake nodes gain voting power in network decisions.",
      "Attacker influences consensus or reputation unfairly.",
      "Network may accept fraudulent transactions or block legitimate ones."
    ],
    realWorldCases:
      "1. BitTorrent networks in early 2000s experienced Sybil attacks. \n2. Early Ethereum and P2P blockchains had testing issues with Sybil nodes.",
    prevention:
      "1. Use identity verification. \n2. Apply stake-based validation. \n3. Monitor network activity for abnormal nodes. \n4. Limit influence per node.",
    additionalNotes:
      "Sybil attacks exploit weak identity systems. Modern blockchain networks mitigate this using staking, proof-of-authority, or decentralized identity protocols."
  }
];

export default attackData;
