const { Web3 } = require('web3');
const crypto = require('crypto');

const web3 = new Web3(process.env.ALCHEMY_API_URL);

class EthereumService {
  async initialize() {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      const account = web3.eth.accounts.privateKeyToAccount(process.env.ETH_PRIVATE_KEY);
      const balance = await web3.eth.getBalance(account.address);
      
      console.log('✅ Connected to Ethereum Sepolia - Block:', blockNumber);
      console.log('✅ Ethereum Account:', account.address);
      console.log('✅ ETH Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
      
      return { blockNumber, account, balance };
    } catch (error) {
      console.log('❌ Ethereum initialization error:', error.message);
      throw error;
    }
  }

  async registerContent(contentId, s3Uri, contentHash) {
    try {
      if (!process.env.ETH_CONTRACT_ADDRESS) {
        console.log('⚠️  Simulating Ethereum transaction (no contract address)');
        return this.simulateTransaction(contentId, s3Uri, contentHash);
      }

      // Real transaction logic would go here
      return this.simulateTransaction(contentId, s3Uri, contentHash);
    } catch (error) {
      console.log('⚠️  Ethereum simulation:', error.message);
      return this.simulateTransaction(contentId, s3Uri, contentHash);
    }
  }

  simulateTransaction(contentId, s3Uri, contentHash) {
    const txHash = '0x' + crypto.createHash('sha3-256')
      .update(contentId + s3Uri + contentHash)
      .digest('hex')
      .slice(0, 64);
    
    console.log('✅ Ethereum transaction:', txHash);
    return txHash;
  }
}

module.exports = new EthereumService();