const crypto = require('crypto');

class AptosService {
  constructor() {
    this.privateKey = crypto.randomBytes(32).toString('hex');
    this.address = '0x' + crypto.createHash('sha3-256').update(this.privateKey).digest('hex').slice(-64);
  }

  async initialize() {
    console.log('✅ Aptos Simulation Account:', this.address);
    return { address: this.address, privateKey: this.privateKey };
  }

  async registerContent(contentId, s3Uri, contentHash) {
    console.log('🔐 Simulating Aptos transaction...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const txHash = '0x' + crypto.createHash('sha3-256')
      .update(contentId + s3Uri + contentHash + Date.now())
      .digest('hex')
      .slice(0, 64);
    
    console.log('✅ Aptos transaction simulated:', txHash);
    return txHash;
  }
}

module.exports = new AptosService();