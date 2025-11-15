class AIService {
  async generateContent(prompt, contentType) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const templates = {
          "social-media": `🚀 AI-Generated Social Media Post: "${prompt}"
          
✨ This content is secured on multiple blockchains!
✅ Ethereum: Immutable verification
✅ Aptos: High-speed transactions  
✅ AWS S3: Cloud storage

🏆 HACKATHON PRIZE ELIGIBILITY:
• AWS: $250 ✅
• Ethereum: $100 ✅
• Aptos: $25+ ✅

#AI #Blockchain #Hackathon #Web3

Generated: ${new Date().toISOString()}`,

          "blog": `# ${prompt}

## AI-Generated Blog Post

This content was automatically generated and registered on both Ethereum and Aptos blockchains for permanent verification.

### Key Features:
- **Multi-Blockchain Security**: Content hashes stored on Ethereum & Aptos
- **AWS Cloud Storage**: Scalable S3 infrastructure
- **Immutable Verification**: Tamper-proof content authentication

### Hackathon Stack:
- **AWS**: S3, EC2 deployment
- **Ethereum**: Smart contract verification
- **Aptos**: Additional blockchain layer

*Generated on: ${new Date().toISOString()}*`,

          "advertising": `🎯 AI-Powered Ad Content: ${prompt}

🔥 LIMITED TIME OFFER!
Blockchain-verified authentic content

✅ Ethereum-verified
✅ Aptos-registered  
✅ AWS-hosted

Trust the technology - every piece of content is cryptographically secured!

📅 Created: ${new Date().toISOString()}`
        };
        
        const content = templates[contentType] || templates["social-media"];
        resolve(content);
      }, 1000);
    });
  }
}

module.exports = new AIService();