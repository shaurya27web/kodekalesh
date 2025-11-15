// ContentProductionManager.js - Enhanced
const GenerationLoading = ({ currentStep }) => {
  const steps = [
    { id: 1, text: 'Analyzing content requirements...', icon: '🔍' },
    { id: 2, text: 'Generating AI content...', icon: '🤖' },
    { id: 3, text: 'Quality assurance check...', icon: '✅' },
    { id: 4, text: 'Multi-language optimization...', icon: '🌐' },
    { id: 5, text: 'Uploading to AWS S3...', icon: '☁️' },
    { id: 6, text: 'Creating cryptographic hashes...', icon: '🔒' },
    { id: 7, text: 'Registering on Ethereum...', icon: '⛓️' },
    { id: 8, text: 'Registering on Aptos...', icon: '⚡' },
    { id: 9, text: 'Finalizing content delivery...', icon: '🎯' }
  ];

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return React.createElement('div', { className: 'generation-loading enhanced' },
    React.createElement('div', { className: 'loading-header' },
      React.createElement('div', { className: 'loading-spinner enhanced' },
        React.createElement('div', { className: 'spinner-ring' }),
        React.createElement('div', { className: 'progress-text' }, `${progress}%`)
      ),
      React.createElement('h4', null, 'AI Content Pipeline Processing...'),
      React.createElement('p', { className: 'loading-subtitle' }, 
        'Transforming your content strategy with intelligent automation'
      )
    ),
    React.createElement('div', { className: 'loading-steps enhanced' },
      steps.map(step =>
        React.createElement('div', {
          key: step.id,
          className: `loading-step ${currentStep >= step.id ? 'completed' : ''} ${currentStep === step.id ? 'current' : ''}`
        },
          React.createElement('div', { className: 'step-indicator' },
            React.createElement('div', { className: 'step-icon' },
              currentStep >= step.id ? '✓' : step.icon
            ),
            currentStep === step.id && React.createElement('div', { className: 'pulse-animation' })
          ),
          React.createElement('div', { className: 'step-content' },
            React.createElement('div', { className: 'step-text' }, step.text),
            React.createElement('div', { className: 'step-progress' },
              React.createElement('div', { 
                className: 'progress-bar',
                style: { width: currentStep >= step.id ? '100%' : '0%' }
              })
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'loading-features' },
      React.createElement('div', { className: 'feature-tag' }, '🚀 10x Faster Creation'),
      React.createElement('div', { className: 'feature-tag' }, '🌐 50+ Languages'),
      React.createElement('div', { className: 'feature-tag' }, '🔒 Blockchain Verified'),
      React.createElement('div', { className: 'feature-tag' }, '⚡ Real-time Processing')
    )
  );
};