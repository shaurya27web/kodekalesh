const { Web3 } = require('web3');

const configureBlockchain = () => {
  const web3 = new Web3(process.env.ALCHEMY_API_URL);
  
  const contractABI = [
    {
      "inputs": [
        {"internalType": "string", "name": "_contentId", "type": "string"},
        {"internalType": "string", "name": "_s3Uri", "type": "string"},
        {"internalType": "string", "name": "_contentHash", "type": "string"}
      ],
      "name": "registerContent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  return { web3, contractABI };
};

module.exports = { configureBlockchain };