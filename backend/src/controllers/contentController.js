const awsService = require('../services/awsService');
const ethereumService = require('../services/ethereumService');
const aptosService = require('../services/aptosService');
const aiService = require('../services/aiService');
const crypto = require('crypto');

class ContentController {
  async generateContent(req, res) {
    try {
      const { prompt, contentType = "social-media" } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      console.log("\n🚀 STARTING MULTI-BLOCKCHAIN CONTENT PIPELINE");
      console.log("Prompt:", prompt);

      // 1. Generate AI content
      const generatedContent = await aiService.generateContent(prompt, contentType);
      
      // 2. Upload to AWS S3
      const { s3Uri, publicUrl } = await awsService.uploadToS3(generatedContent, contentType);
      
      // 3. Create cryptographic hashes
      const contentHash = crypto.createHash('sha256').update(generatedContent).digest('hex');
      const contentId = `content-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      
      // 4. Register on blockchains
      const ethTxHash = await ethereumService.registerContent(contentId, s3Uri, contentHash);
      const aptosTxHash = await aptosService.registerContent(contentId, s3Uri, contentHash);
      
      console.log("✅ PIPELINE COMPLETED SUCCESSFULLY!");

      res.json({
        success: true,
        message: "🎉 Content registered on multiple blockchains!",
        hackathon_prizes: {
          aws: "✅ $250 - AWS Services & Deployment",
          ethereum: "✅ $100 - Devfolio Ethereum Integration", 
          aptos: "✅ $25 - Aptos Participation Prize"
        },
        data: {
          content: { 
            text: generatedContent, 
            type: contentType, 
            length: generatedContent.length 
          },
          verification: { 
            contentId, 
            contentHash, 
            timestamp: new Date().toISOString() 
          },
          blockchain: {
            ethereum: { 
              transaction: ethTxHash, 
              explorer: `https://sepolia.etherscan.io/tx/${ethTxHash}`,
              network: "Sepolia Testnet"
            },
            aptos: { 
              transaction: aptosTxHash, 
              explorer: `https://explorer.aptoslabs.com/txn/${aptosTxHash}?network=devnet`,
              network: "Aptos Devnet"
            }
          },
          storage: { 
            aws_s3: { 
              uri: s3Uri, 
              public_url: publicUrl,
              bucket: process.env.AWS_BUCKET_NAME
            } 
          }
        }
      });

    } catch (error) {
      console.error("❌ Pipeline error:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async verifyContent(req, res) {
    try {
      const { contentId, contentHash, content } = req.body;
      
      if (!contentId || !contentHash) {
        return res.status(400).json({ error: "Content ID and hash are required" });
      }

      let calculatedHash = contentHash;
      if (content) {
        calculatedHash = crypto.createHash('sha256').update(content).digest('hex');
      }

      const isValid = calculatedHash === contentHash;

      res.json({
        success: true,
        verified: isValid,
        verification: {
          contentId,
          providedHash: contentHash,
          calculatedHash,
          valid: isValid,
          timestamp: new Date().toISOString()
        },
        blockchains: {
          ethereum: `https://sepolia.etherscan.io/tx/${contentId}`,
          aptos: `https://explorer.aptoslabs.com/txn/${contentId}?network=devnet`
        }
      });

    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new ContentController();