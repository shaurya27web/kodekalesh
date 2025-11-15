exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            status: "AWS_DEPLOYED",
            project: "AptChain Content Proof - Hackathon",
            hackathon_prizes: {
                aws: "YES - $250 QUALIFIED",
                ethereum: "YES - $100 QUALIFIED", 
                aptos: "YES - $25 QUALIFIED"
            },
            services: ["Lambda", "S3"],
            region: "us-west-2",
            timestamp: new Date().toISOString()
        })
    };
};
