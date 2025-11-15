import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../App';
import { Wand2, Languages, Image as ImageIcon, Download, RefreshCw, AlertCircle, Sparkles, Key, Shield, CheckCircle, XCircle, AlertTriangle, Type, FileText, Heading } from 'lucide-react';

const GenerateCard = ({ onGenerate }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('English');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imagePrompt, setImagePrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [error, setError] = useState('');
  const [imageStyle, setImageStyle] = useState('realistic');
  const [generatedText, setGeneratedText] = useState('');
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const { colors } = useTheme();

  // New states for enhanced content generation
  const [generatedHeadline, setGeneratedHeadline] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGeneratingHeadline, setIsGeneratingHeadline] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [contentType, setContentType] = useState('social-media'); // social-media, blog, ad-copy, etc.

  // Authentication verification states
  const [verificationResults, setVerificationResults] = useState({
    similarity: null,
    watermark: null,
    integrity: null
  });
  const [isVerifying, setIsVerifying] = useState(false);

  // Card styles
  const cardStyles = {
    container: {
      background: colors.cardGradient,
      padding: '2rem',
      borderRadius: '24px',
      border: `1px solid ${colors.border}`,
      backdropFilter: 'blur(20px)',
    },
    heading: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginBottom: '2rem',
    },
    input: {
      width: '100%',
      padding: '1rem 1.5rem',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      color: colors.text,
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    textarea: {
      width: '100%',
      padding: '1rem 1.5rem',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      color: colors.text,
      fontSize: '1rem',
      minHeight: '100px',
      resize: 'vertical',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    select: {
      width: '100%',
      padding: '1rem 1.5rem',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      color: colors.text,
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '1.25rem 2rem',
      background: colors.gradient,
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
      marginBottom: '1rem',
    },
    imageButton: {
      width: '100%',
      padding: '1rem 2rem',
      background: 'transparent',
      color: colors.text,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      marginBottom: '1.5rem',
    },
    textButton: {
      width: '100%',
      padding: '1rem 2rem',
      background: 'transparent',
      color: colors.text,
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      marginBottom: '1rem',
    },
    smallButton: {
      padding: '0.75rem 1.5rem',
      background: 'transparent',
      color: colors.text,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      flex: 1,
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: '500',
      color: colors.text,
      marginBottom: '0.5rem',
    },
    imagePreview: {
      width: '100%',
      maxHeight: '400px',
      objectFit: 'cover',
      borderRadius: '12px',
      border: `1px solid ${colors.border}`,
      marginBottom: '1rem',
    },
    textPreview: {
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '1.5rem',
      color: colors.text,
      fontSize: '0.95rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
      whiteSpace: 'pre-wrap',
    },
    error: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: '#ef4444',
      padding: '1rem',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    imageActions: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    actionButton: {
      flex: 1,
      padding: '0.75rem 1.5rem',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      color: colors.text,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    styleSelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    contentTypeSelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    styleButton: {
      padding: '0.75rem',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      color: colors.text,
      cursor: 'pointer',
      fontSize: '0.8rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    activeStyle: {
      background: colors.gradient,
      color: 'white',
      borderColor: 'transparent',
    },
    apiStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: colors.textSecondary,
      fontSize: '0.8rem',
      marginTop: '1rem',
    },
    sectionDivider: {
      height: '1px',
      background: colors.border,
      margin: '2rem 0',
      opacity: 0.5,
    },
    debugInfo: {
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      color: '#3b82f6',
      padding: '0.75rem',
      borderRadius: '8px',
      fontSize: '0.8rem',
      marginBottom: '1rem',
    },
    contentSection: {
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    contentHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: colors.text,
      marginBottom: '1rem',
    },
    generationSteps: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    stepRow: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
    },
  };

  // Verification styles
  const verificationStyles = {
    section: {
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '12px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    heading: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: colors.text,
      marginBottom: '1rem',
    },
    verificationGrid: {
      display: 'grid',
      gap: '1rem',
    },
    verificationItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      background: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
    },
    statusIcon: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    success: {
      background: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
    },
    error: {
      background: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    loading: {
      background: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
    },
    content: {
      flex: 1,
    },
    title: {
      fontWeight: '600',
      marginBottom: '0.25rem',
    },
    message: {
      fontSize: '0.875rem',
      opacity: 0.8,
    },
  };

  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Arabic', 'Portuguese'];
  
  const imageStyles = [
    { id: 'realistic', label: 'Realistic' },
    { id: 'digital-art', label: 'Digital Art' },
    { id: 'photographic', label: 'Photographic' },
    { id: 'anime', label: 'Anime' },
  ];

  const contentTypes = [
    { id: 'social-media', label: 'Social Media', icon: FileText },
    { id: 'blog-post', label: 'Blog Post', icon: FileText },
    { id: 'ad-copy', label: 'Ad Copy', icon: Type },
  ];

  // Gemini API Integration
  const generateWithGemini = async (prompt, systemInstruction = '') => {
    const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      console.warn('Gemini API key not configured. Using mock data.');
      return generateMockContent(prompt);
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          systemInstruction: systemInstruction ? {
            parts: [{
              text: systemInstruction
            }]
          } : undefined,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error);
      return generateMockContent(prompt);
    }
  };

  // Enhanced Content Generation Functions
  const generateHeadlineWithGemini = async (topic, language, contentType) => {
    const prompt = `Generate 3 compelling headlines for ${contentType} about "${topic}" in ${language}. Make them engaging, click-worthy, and optimized for the platform. Format as a numbered list.`;
    
    const systemInstruction = `You are an expert content strategist and copywriter. Create attention-grabbing headlines that drive engagement.`;
    
    return await generateWithGemini(prompt, systemInstruction);
  };

  const generateContentWithGemini = async (topic, language, contentType, headline = '') => {
    let prompt = '';
    let systemInstruction = '';

    switch (contentType) {
      case 'social-media':
        prompt = `Create engaging social media content about "${topic}" in ${language}. ${headline ? `Use this headline as inspiration: ${headline}` : ''}
        
        Format as follows:
        # [Catchy Title]
        
        ## Main Post
        [Engaging content with emojis - 2-3 paragraphs]
        
        ## Key Points
        • Point 1
        • Point 2  
        • Point 3
        
        ## Hashtags
        #relevant #hashtags
        
        ## Call to Action
        [Compelling CTA]`;
        
        systemInstruction = `You are a social media expert. Create viral-worthy content that drives engagement and shares. Use appropriate emojis and modern language.`;
        break;

      case 'blog-post':
        prompt = `Write a comprehensive blog post about "${topic}" in ${language}. ${headline ? `Use this headline: ${headline}` : ''}
        
        Format as follows:
        # [Blog Title]
        
        ## Introduction
        [Engaging introduction]
        
        ## Main Content
        [3-4 detailed paragraphs with subheadings]
        
        ## Key Takeaways
        • Key point 1
        • Key point 2
        • Key point 3
        
        ## Conclusion
        [Summarizing conclusion with call to action]`;
        
        systemInstruction = `You are a professional blogger and content writer. Create informative, well-structured blog posts that provide value to readers.`;
        break;

      case 'ad-copy':
        prompt = `Create compelling advertising copy about "${topic}" in ${language}. ${headline ? `Use this headline: ${headline}` : ''}
        
        Format as follows:
        # [Attention-Grabbing Headline]
        
        ## Primary Ad Copy
        [Persuasive text highlighting benefits]
        
        ## Key Features/Benefits
        • Benefit 1
        • Benefit 2
        • Benefit 3
        
        ## Call to Action
        [Urgent and compelling CTA]
        
        ## Target Audience
        [Description of ideal customer]`;
        
        systemInstruction = `You are a professional copywriter specializing in advertising. Create persuasive, conversion-focused copy that drives action.`;
        break;

      default:
        prompt = `Create content about "${topic}" in ${language}`;
    }

    return await generateWithGemini(prompt, systemInstruction);
  };

  // Mock ML Verification Functions
  const verifyContentSimilarity = async (content) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const similarityScore = Math.random() * 100;
    const isSimilar = similarityScore > 70;
    
    return {
      score: similarityScore,
      isSimilar: isSimilar,
      message: isSimilar 
        ? `Content is ${similarityScore.toFixed(1)}% similar to existing sources`
        : `Content is original (${similarityScore.toFixed(1)}% similarity)`,
      status: isSimilar ? 'warning' : 'success'
    };
  };

  const applyWatermarkAndVerify = async (content, imageUrl) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const hasWatermark = Math.random() > 0.2;
    
    return {
      hasWatermark: hasWatermark,
      watermarkId: `WM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: hasWatermark 
        ? 'Digital watermark applied successfully'
        : 'Watermark application failed',
      status: hasWatermark ? 'success' : 'error'
    };
  };

  const verifyContentIntegrity = async (originalContent, currentContent) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const isTampered = Math.random() > 0.8;
    
    return {
      isTampered: isTampered,
      tamperingScore: isTampered ? Math.random() * 50 + 50 : Math.random() * 10,
      message: isTampered 
        ? 'Content integrity compromised - possible tampering detected'
        : 'Content integrity verified - no tampering detected',
      status: isTampered ? 'error' : 'success'
    };
  };

  // Run all verification checks
  const runAuthenticityVerification = async (content, imageUrl) => {
    setIsVerifying(true);
    
    try {
      const [similarityResult, watermarkResult, integrityResult] = await Promise.all([
        verifyContentSimilarity(content),
        applyWatermarkAndVerify(content, imageUrl),
        verifyContentIntegrity(content, content)
      ]);

      const results = {
        similarity: similarityResult,
        watermark: watermarkResult,
        integrity: integrityResult
      };

      setVerificationResults(results);
      return results;
    } catch (error) {
      console.error('Verification failed:', error);
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  // Mock API Functions
  const generateImageWithStableDiffusion = async (prompt, style = 'realistic') => {
    console.log('🎨 Generating image for:', prompt, 'with style:', style);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return getMockImage(prompt, style);
  };

  // Mock generators
  const generateMockContent = (prompt) => {
    return `# Generated Content for: ${prompt}

This is mock content that would be generated by the Gemini API. In production, this would be real AI-generated content based on your prompt.

## Features:
• AI-powered content generation
• Multiple content types supported
• Language customization
• SEO optimized

## Next Steps:
Add your Gemini API key to enable real AI content generation.`;
  };

  const getMockImage = (prompt, style) => {
    const mockImages = {
      realistic: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=512&h=512&fit=crop',
      'digital-art': 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=512&h=512&fit=crop',
      photographic: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=512&h=512&fit=crop',
      anime: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=512&h=512&fit=crop'
    };
    return mockImages[style] || mockImages.realistic;
  };

  const generateHash = (text) => {
    return '0x' + Array.from(text)
      .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
      .toString(16)
      .slice(0, 64);
  };

  // Enhanced Content Generation Handlers
  const handleGenerateHeadline = async () => {
    if (!title.trim()) {
      setError('Please enter a topic for headline generation');
      return;
    }

    setIsGeneratingHeadline(true);
    setError('');

    try {
      const headline = await generateHeadlineWithGemini(title, language, contentType);
      setGeneratedHeadline(headline);
    } catch (err) {
      setError(err.message || 'Failed to generate headline. Please try again.');
    } finally {
      setIsGeneratingHeadline(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!title.trim()) {
      setError('Please enter a topic for content generation');
      return;
    }

    setIsGeneratingContent(true);
    setError('');

    try {
      const content = await generateContentWithGemini(title, language, contentType, generatedHeadline);
      setGeneratedContent(content);
    } catch (err) {
      setError(err.message || 'Failed to generate content. Please try again.');
    } finally {
      setIsGeneratingContent(false);
    }
  };

  // Image Generation Handler
  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      setError('Please enter a prompt for image generation');
      return;
    }

    setIsGeneratingImage(true);
    setError('');

    try {
      const imageUrl = await generateImageWithStableDiffusion(imagePrompt, imageStyle);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleRegenerateImage = async () => {
    if (imagePrompt.trim()) {
      await handleGenerateImage();
    }
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `vericreate-${imagePrompt.slice(0, 20)}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleGenerateCompletePackage = async () => {
    if (!title.trim()) return;
    
    setIsGenerating(true);
    setError('');

    try {
      // Generate headline if not already generated
      let finalHeadline = generatedHeadline;
      if (!finalHeadline) {
        finalHeadline = await generateHeadlineWithGemini(title, language, contentType);
      }

      // Generate content if not already generated
      let finalContent = generatedContent;
      if (!finalContent) {
        finalContent = await generateContentWithGemini(title, language, contentType, finalHeadline);
      }

      // Generate image if prompt is provided but no image yet
      let finalImage = generatedImage;
      if (imagePrompt.trim() && !finalImage) {
        finalImage = await generateImageWithStableDiffusion(imagePrompt, imageStyle);
      }

      // Run authenticity verification
      const verification = await runAuthenticityVerification(finalContent, finalImage);

      const content = {
        title,
        language,
        contentType,
        headline: finalHeadline,
        content: finalContent,
        image: finalImage || getMockImage(title, imageStyle),
        timestamp: new Date().toISOString(),
        hash: generateHash(title + language + Date.now()),
        imagePrompt: imagePrompt,
        imageStyle: imageStyle,
        verification: verification
      };

      onGenerate(content);
    } catch (err) {
      setError('Failed to generate content package: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Rest of the component remains the same...
  // [Include all the helper functions and JSX from previous implementation]

  const getOverallStatusColor = () => {
    const results = verificationResults;
    if (!results.similarity) return 'rgba(59, 130, 246, 0.1)';
    
    const hasError = Object.values(results).some(r => r?.status === 'error');
    const hasWarning = Object.values(results).some(r => r?.status === 'warning');
    
    if (hasError) return 'rgba(239, 68, 68, 0.1)';
    if (hasWarning) return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(34, 197, 94, 0.1)';
  };

  const getOverallStatusMessage = () => {
    const results = verificationResults;
    const hasError = Object.values(results).some(r => r?.status === 'error');
    const hasWarning = Object.values(results).some(r => r?.status === 'warning');
    
    if (hasError) return '⚠️ Content verification failed - review issues above';
    if (hasWarning) return '⚠️ Content verification passed with warnings';
    return '✅ All authenticity checks passed successfully';
  };

  const renderVerificationSection = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      style={verificationStyles.section}
    >
      <div style={verificationStyles.heading}>
        <Shield size={20} color={colors.primary} />
        Authenticity Verification
      </div>

      <div style={verificationStyles.verificationGrid}>
        {/* Similarity Detection */}
        <motion.div
          style={{
            ...verificationStyles.verificationItem,
            ...(verificationResults.similarity 
              ? verificationStyles[verificationResults.similarity.status]
              : verificationStyles.loading)
          }}
        >
          <div style={verificationStyles.statusIcon}>
            {isVerifying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%' }}
              />
            ) : verificationResults.similarity ? (
              verificationResults.similarity.status === 'success' ? (
                <CheckCircle size={20} color="#22c55e" />
              ) : verificationResults.similarity.status === 'warning' ? (
                <AlertTriangle size={20} color="#f59e0b" />
              ) : (
                <XCircle size={20} color="#ef4444" />
              )
            ) : (
              <Shield size={20} />
            )}
          </div>
          <div style={verificationStyles.content}>
            <div style={verificationStyles.title}>Content Similarity Check</div>
            <div style={verificationStyles.message}>
              {isVerifying 
                ? 'Analyzing content originality...' 
                : verificationResults.similarity?.message || 'Ready to verify'}
            </div>
          </div>
        </motion.div>

        {/* Watermark Verification */}
        <motion.div
          style={{
            ...verificationStyles.verificationItem,
            ...(verificationResults.watermark 
              ? verificationStyles[verificationResults.watermark.status]
              : verificationStyles.loading)
          }}
        >
          <div style={verificationStyles.statusIcon}>
            {isVerifying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%' }}
              />
            ) : verificationResults.watermark ? (
              verificationResults.watermark.status === 'success' ? (
                <CheckCircle size={20} color="#22c55e" />
              ) : (
                <XCircle size={20} color="#ef4444" />
              )
            ) : (
              <Key size={20} />
            )}
          </div>
          <div style={verificationStyles.content}>
            <div style={verificationStyles.title}>Digital Watermarking</div>
            <div style={verificationStyles.message}>
              {isVerifying 
                ? 'Applying invisible signature...' 
                : verificationResults.watermark?.message || 'Ready to watermark'}
            </div>
          </div>
        </motion.div>

        {/* Integrity Check */}
        <motion.div
          style={{
            ...verificationStyles.verificationItem,
            ...(verificationResults.integrity 
              ? verificationStyles[verificationResults.integrity.status]
              : verificationStyles.loading)
          }}
        >
          <div style={verificationStyles.statusIcon}>
            {isVerifying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%' }}
              />
            ) : verificationResults.integrity ? (
              verificationResults.integrity.status === 'success' ? (
                <CheckCircle size={20} color="#22c55e" />
              ) : (
                <XCircle size={20} color="#ef4444" />
              )
            ) : (
              <Shield size={20} />
            )}
          </div>
          <div style={verificationStyles.content}>
            <div style={verificationStyles.title}>Content Integrity</div>
            <div style={verificationStyles.message}>
              {isVerifying 
                ? 'Checking for tampering...' 
                : verificationResults.integrity?.message || 'Ready to verify integrity'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Verification Status Summary */}
      {verificationResults.similarity && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: getOverallStatusColor(),
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}
        >
          {getOverallStatusMessage()}
        </motion.div>
      )}
    </motion.div>
  );

  const hasGeminiKey = !!process.env.REACT_APP_GEMINI_API_KEY && process.env.REACT_APP_GEMINI_API_KEY !== 'your_gemini_api_key_here';
  const hasStableDiffusionKey = !!process.env.REACT_APP_STABLE_DIFFUSION_API_KEY && process.env.REACT_APP_STABLE_DIFFUSION_API_KEY !== 'your_stability_ai_key_here';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={cardStyles.container}
    >
      <h2 style={cardStyles.heading}>
        <Wand2 size={28} color={colors.primary} />
        AI Content & Image Generation
      </h2>

      {/* Debug Information */}
      <div style={cardStyles.debugInfo}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Key size={16} />
          <strong>API Status:</strong>
        </div>
        <div>Gemini AI: {hasGeminiKey ? '✅ Connected' : '❌ Not Configured'}</div>
        <div>Stable Diffusion: {hasStableDiffusionKey ? '✅ Connected' : '❌ Not Configured'}</div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={cardStyles.error}
        >
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}

      <div style={cardStyles.inputGroup}>
        {/* Content Topic */}
        <div>
          <label style={cardStyles.label}>Content Topic *</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your content topic or theme..."
            style={cardStyles.input}
          />
        </div>

        {/* Language Selection */}
        <div>
          <label style={{ ...cardStyles.label, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Languages size={16} />
            Content Language
          </label>
          <motion.select
            whileFocus={{ scale: 1.02 }}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={cardStyles.select}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang} style={{ background: colors.surface, color: colors.text }}>
                {lang}
              </option>
            ))}
          </motion.select>
        </div>

        {/* Content Type Selection */}
        <div>
          <label style={cardStyles.label}>
            <FileText size={16} style={{ marginRight: '0.5rem' }} />
            Content Type
          </label>
          <div style={cardStyles.contentTypeSelector}>
            {contentTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setContentType(type.id)}
                  style={{
                    ...cardStyles.styleButton,
                    ...(contentType === type.id && cardStyles.activeStyle),
                  }}
                >
                  <IconComponent size={14} style={{ marginRight: '0.25rem' }} />
                  {type.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Content Generation Section */}
        <div style={cardStyles.contentSection}>
          <div style={cardStyles.contentHeader}>
            <Sparkles size={20} color={colors.primary} />
            AI Content Generation (Gemini)
          </div>

          <div style={cardStyles.generationSteps}>
            {/* Step 1: Generate Headline */}
            <div style={cardStyles.stepRow}>
              <motion.button
                onClick={handleGenerateHeadline}
                disabled={isGeneratingHeadline || !title.trim()}
                whileHover={{ scale: isGeneratingHeadline || !title.trim() ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...cardStyles.smallButton,
                  background: isGeneratingHeadline || !title.trim() ? colors.border : colors.surface,
                  cursor: isGeneratingHeadline || !title.trim() ? 'not-allowed' : 'pointer',
                  opacity: isGeneratingHeadline || !title.trim() ? 0.7 : 1,
                }}
              >
                <AnimatePresence mode="wait">
                  {isGeneratingHeadline ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%' }}
                      />
                      Generating Headlines...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="generate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Heading size={16} />
                      Generate Headlines
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Step 2: Generate Full Content */}
              <motion.button
                onClick={handleGenerateContent}
                disabled={isGeneratingContent || !title.trim()}
                whileHover={{ scale: isGeneratingContent || !title.trim() ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  ...cardStyles.smallButton,
                  background: isGeneratingContent || !title.trim() ? colors.border : colors.surface,
                  cursor: isGeneratingContent || !title.trim() ? 'not-allowed' : 'pointer',
                  opacity: isGeneratingContent || !title.trim() ? 0.7 : 1,
                }}
              >
                <AnimatePresence mode="wait">
                  {isGeneratingContent ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%' }}
                      />
                      Writing Content...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="generate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <FileText size={16} />
                      Generate Full Content
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Gemini API Status */}
            <div style={cardStyles.apiStatus}>
              {hasGeminiKey ? (
                <>
                  <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
                  Gemini AI API Connected
                </>
              ) : (
                <>
                  <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }} />
                  Using Demo Content - Add Gemini API Key for Real AI Generation
                </>
              )}
            </div>

            {/* Generated Headline Preview */}
            {generatedHeadline && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div style={cardStyles.textPreview}>
                  <strong>📰 Generated Headlines:</strong>
                  <br />
                  {generatedHeadline}
                </div>
              </motion.div>
            )}

            {/* Generated Content Preview */}
            {generatedContent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div style={cardStyles.textPreview}>
                  <strong>📝 Generated Content:</strong>
                  <br />
                  {generatedContent}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div style={cardStyles.sectionDivider} />

        {/* Image Generation Section */}
        <div>
          <label style={cardStyles.label}>
            <ImageIcon size={16} style={{ marginRight: '0.5rem' }} />
            AI Image Generation (Stable Diffusion)
          </label>
          
          {/* Image Style Selector */}
          <div style={cardStyles.styleSelector}>
            {imageStyles.map((styleObj) => (
              <motion.button
                key={styleObj.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setImageStyle(styleObj.id)}
                style={{
                  ...cardStyles.styleButton,
                  ...(imageStyle === styleObj.id && cardStyles.activeStyle),
                }}
              >
                {styleObj.label}
              </motion.button>
            ))}
          </div>

          <textarea
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder={`Describe the ${imageStyle} image you want to generate... (e.g., "modern abstract background with tech elements")`}
            style={cardStyles.textarea}
          />
          
          <motion.button
            onClick={handleGenerateImage}
            disabled={isGeneratingImage || !imagePrompt.trim()}
            whileHover={{ scale: isGeneratingImage || !imagePrompt.trim() ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              ...cardStyles.imageButton,
              background: isGeneratingImage || !imagePrompt.trim() ? colors.border : colors.surface,
              cursor: isGeneratingImage || !imagePrompt.trim() ? 'not-allowed' : 'pointer',
              opacity: isGeneratingImage || !imagePrompt.trim() ? 0.7 : 1,
            }}
          >
            <AnimatePresence mode="wait">
              {isGeneratingImage ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: '18px', height: '18px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%' }}
                  />
                  Generating {imageStyle} Image...
                </motion.div>
              ) : (
                <motion.div
                  key="generate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Sparkles size={18} />
                  Generate {imageStyle.charAt(0).toUpperCase() + imageStyle.slice(1)} Image
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Stable Diffusion API Status */}
          <div style={cardStyles.apiStatus}>
            {hasStableDiffusionKey ? (
              <>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
                Stable Diffusion API Connected
              </>
            ) : (
              <>
                <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }} />
                Using Demo Images - Add Stable Diffusion API Key for Real Generation
              </>
            )}
          </div>

          {/* Generated Image Preview */}
          {generatedImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={generatedImage} 
                alt="AI Generated" 
                style={cardStyles.imagePreview}
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.src = getMockImage(imagePrompt, imageStyle);
                }}
              />
              
              {/* Image Actions */}
              <div style={cardStyles.imageActions}>
                <motion.button
                  onClick={handleRegenerateImage}
                  disabled={isGeneratingImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={cardStyles.actionButton}
                >
                  <RefreshCw size={16} />
                  Regenerate
                </motion.button>
                
                <motion.button
                  onClick={handleDownloadImage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={cardStyles.actionButton}
                >
                  <Download size={16} />
                  Download
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Authenticity Verification Section */}
      {renderVerificationSection()}

      {/* Generate Complete Content Package Button */}
      <motion.button
        onClick={handleGenerateCompletePackage}
        disabled={!title.trim() || isGenerating}
        whileHover={{ scale: !title.trim() || isGenerating ? 1 : 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        style={{
          ...cardStyles.button,
          background: !title.trim() || isGenerating ? colors.border : colors.gradient,
          cursor: !title.trim() || isGenerating ? 'not-allowed' : 'pointer',
          boxShadow: !title.trim() || isGenerating ? 'none' : `0 8px 32px ${colors.primary}40`,
        }}
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ width: '20px', height: '20px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%' }}
              />
              Generating Complete Content Package...
            </motion.div>
          ) : (
            <motion.div
              key="generate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <Wand2 size={20} />
              Generate Complete Content Package
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default GenerateCard;