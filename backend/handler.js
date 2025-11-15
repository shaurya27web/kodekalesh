exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            status: "AWS_DEPLOYED",
            project: "AptChain Content Proof",
            hackathon_prizes: {
                aws: "âœ… $250 - QUALIFIED",
                ethereum: "âœ… $100 - QUALIFIED", 
                aptos: "âœ… $25 - QUALIFIED"
            },
            services: ["Lambda", "API Gateway", "S3"],
            timestamp: new Date().toISOString()
        })
    };
};
