// CampaignSystem.js - Enhanced
import React, { useState } from 'react';

const Icon = ({ name, size = 20, className = '' }) => {
  const icons = {
    content: React.createElement('div', { className: 'icon-content' }, '📄'),
    published: React.createElement('div', { className: 'icon-published' }, '✅'),
    pending: React.createElement('div', { className: 'icon-pending' }, '⏳'),
    campaign: React.createElement('div', { className: 'icon-campaign' }, '🎯'),
    analytics: React.createElement('div', { className: 'icon-analytics' }, '📊'),
    rules: React.createElement('div', { className: 'icon-rules' }, '⚡'),
    generate: React.createElement('div', { className: 'icon-generate' }, '✨'),
    performance: React.createElement('div', { className: 'icon-performance' }, '📈'),
    security: React.createElement('div', { className: 'icon-security' }, '🛡️'),
    add: React.createElement('div', { className: 'icon-add' }, '+'),
    delete: React.createElement('div', { className: 'icon-delete' }, '×'),
    check: React.createElement('div', { className: 'icon-check' }, '✓'),
    warning: React.createElement('div', { className: 'icon-warning' }, '!'),
    info: React.createElement('div', { className: 'icon-info' }, 'i'),
    calendar: React.createElement('div', { className: 'icon-calendar' }, '📅'),
    chart: React.createElement('div', { className: 'icon-chart' }, '▰'),
    engagement: React.createElement('div', { className: 'icon-engagement' }, '👥'),
    trend: React.createElement('div', { className: 'icon-trend' }, '📈'),
    prediction: React.createElement('div', { className: 'icon-prediction' }, '🔮'),
    language: React.createElement('div', { className: 'icon-language' }, '🌐'),
    format: React.createElement('div', { className: 'icon-format' }, '🎬'),
    ai: React.createElement('div', { className: 'icon-ai' }, '🧠'),
    target: React.createElement('div', { className: 'icon-target' }, '🎯'),
    rocket: React.createElement('div', { className: 'icon-rocket' }, '🚀')
  };

  return React.createElement('div', { 
    className: `icon ${className}`,
    style: { width: size, height: size }
  }, icons[name] || React.createElement('div', { className: 'icon-default' }, '•'));
};

const CampaignSystem = () => {
  const [campaigns, setCampaigns] = useState([
    { 
      id: 1, 
      title: 'Social Media Blitz', 
      target: 100, 
      current: 75, 
      period: 'daily',
      streak: 5,
      badge: 'creator',
      achieved: false,
      color: '#2563eb',
      type: 'social',
      aiAssist: true,
      platforms: ['Twitter', 'LinkedIn', 'Instagram']
    },
    { 
      id: 2, 
      title: 'Weekly Blog Series', 
      target: 7, 
      current: 4, 
      period: 'weekly',
      streak: 2,
      badge: 'writer',
      achieved: false,
      color: '#059669',
      type: 'blog',
      aiAssist: true,
      platforms: ['WordPress', 'Medium']
    },
    { 
      id: 3, 
      title: 'Monthly Campaign', 
      target: 50, 
      current: 25, 
      period: 'monthly',
      streak: 1,
      badge: 'strategist',
      achieved: false,
      color: '#d97706',
      type: 'comprehensive',
      aiAssist: true,
      platforms: ['All Platforms']
    }
  ]);

  const [showCampaignCreator, setShowCampaignCreator] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    target: 10,
    period: 'daily',
    type: 'social',
    platforms: []
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [achievedCampaign, setAchievedCampaign] = useState(null);
  const [analytics, setAnalytics] = useState({
    totalCampaigns: 3,
    completed: 0,
    inProgress: 3,
    successRate: '85%'
  });

  const campaignTypes = [
    { id: 'social', name: 'Social Media', icon: '📱', color: '#3b82f6' },
    { id: 'blog', name: 'Blog Content', icon: '📝', color: '#10b981' },
    { id: 'email', name: 'Email Campaign', icon: '✉️', color: '#f59e0b' },
    { id: 'video', name: 'Video Content', icon: '🎥', color: '#ef4444' },
    { id: 'comprehensive', name: 'Comprehensive', icon: '🌐', color: '#8b5cf6' }
  ];

  const platforms = ['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'WordPress', 'Medium', 'YouTube', 'TikTok'];

  const addCampaign = () => {
    const colors = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'];
    const campaignType = campaignTypes.find(type => type.id === newCampaign.type);
    
    const campaign = {
      ...newCampaign,
      id: Date.now(),
      current: 0,
      streak: 0,
      badge: 'starter',
      achieved: false,
      color: campaignType?.color || colors[Math.floor(Math.random() * colors.length)],
      aiAssist: true
    };
    
    setCampaigns([...campaigns, campaign]);
    setShowCampaignCreator(false);
    setNewCampaign({ title: '', target: 10, period: 'daily', type: 'social', platforms: [] });
    updateAnalytics([...campaigns, campaign]);
  };

  const updateProgress = (id, amount) => {
    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === id) {
        const newCurrent = campaign.current + amount;
        const achieved = newCurrent >= campaign.target;
        
        if (achieved && !campaign.achieved) {
          setAchievedCampaign(campaign);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        
        return {
          ...campaign,
          current: Math.min(newCurrent, campaign.target),
          achieved: achieved,
          streak: achieved ? campaign.streak + 1 : campaign.streak
        };
      }
      return campaign;
    });
    
    setCampaigns(updatedCampaigns);
    updateAnalytics(updatedCampaigns);
  };

  const updateAnalytics = (campaignsList) => {
    const total = campaignsList.length;
    const completed = campaignsList.filter(c => c.achieved).length;
    const inProgress = total - completed;
    const successRate = total > 0 ? Math.round((completed / total) * 100) + '%' : '0%';
    
    setAnalytics({
      totalCampaigns: total,
      completed,
      inProgress,
      successRate
    });
  };

  const getProgressPercentage = (campaign) => {
    return (campaign.current / campaign.target) * 100;
  };

  const getBadgeIcon = (badge) => {
    const badges = {
      creator: React.createElement(Icon, { name: 'content' }),
      writer: React.createElement(Icon, { name: 'generate' }),
      strategist: React.createElement(Icon, { name: 'performance' }),
      starter: React.createElement(Icon, { name: 'campaign' })
    };
    return badges[badge] || React.createElement(Icon, { name: 'campaign' });
  };

  const renderAnalytics = () => {
    return React.createElement('div', { className: 'campaign-analytics' },
      React.createElement('div', { className: 'analytics-grid' },
        React.createElement('div', { className: 'analytics-card' },
          React.createElement('div', { className: 'analytics-value' }, analytics.totalCampaigns),
          React.createElement('div', { className: 'analytics-label' }, 'Total Campaigns')
        ),
        React.createElement('div', { className: 'analytics-card' },
          React.createElement('div', { className: 'analytics-value' }, analytics.completed),
          React.createElement('div', { className: 'analytics-label' }, 'Completed')
        ),
        React.createElement('div', { className: 'analytics-card' },
          React.createElement('div', { className: 'analytics-value' }, analytics.inProgress),
          React.createElement('div', { className: 'analytics-label' }, 'In Progress')
        ),
        React.createElement('div', { className: 'analytics-card' },
          React.createElement('div', { className: 'analytics-value' }, analytics.successRate),
          React.createElement('div', { className: 'analytics-label' }, 'Success Rate')
        )
      )
    );
  };

  const renderCampaignsGrid = () => {
    return React.createElement('div', { className: 'campaigns-grid enhanced' },
      ...campaigns.map(campaign => {
        const progressPercentage = getProgressPercentage(campaign);
        const campaignType = campaignTypes.find(type => type.id === campaign.type);
        
        return React.createElement('div', { 
          key: campaign.id, 
          className: `campaign-card ${campaign.achieved ? 'achieved' : ''} ${campaign.type}` 
        },
          React.createElement('div', { className: 'campaign-header' },
            React.createElement('div', { className: 'campaign-type' },
              React.createElement('span', { className: 'type-icon' }, campaignType?.icon || '📄'),
              React.createElement('span', { className: 'type-name' }, campaignType?.name || 'Campaign')
            ),
            React.createElement('div', { className: 'campaign-title-section' },
              React.createElement('h3', null, campaign.title),
              campaign.aiAssist && React.createElement('div', { className: 'ai-badge' },
                React.createElement(Icon, { name: 'ai', size: 14 }),
                'AI Powered'
              )
            ),
            React.createElement('div', { className: 'badge' }, getBadgeIcon(campaign.badge))
          ),
          
          React.createElement('div', { className: 'campaign-platforms' },
            campaign.platforms.map((platform, index) => 
              React.createElement('span', { key: index, className: 'platform-tag' }, platform)
            )
          ),
          
          React.createElement('div', { className: 'campaign-progress enhanced' },
            React.createElement('div', { className: 'progress-ring' },
              React.createElement('svg', { width: "80", height: "80", viewBox: "0 0 120 120" },
                React.createElement('circle', {
                  cx: "60",
                  cy: "60",
                  r: "54",
                  fill: "none",
                  stroke: "#e2e8f0",
                  strokeWidth: "8"
                }),
                React.createElement('circle', {
                  cx: "60",
                  cy: "60",
                  r: "54",
                  fill: "none",
                  stroke: campaign.color,
                  strokeWidth: "8",
                  strokeLinecap: "round",
                  strokeDasharray: `${progressPercentage * 3.39} 339`,
                  transform: "rotate(-90 60 60)"
                }),
                React.createElement('text', {
                  x: "60",
                  y: "60",
                  textAnchor: "middle",
                  dy: "7",
                  fontSize: "16",
                  fontWeight: "600",
                  fill: "#1e293b"
                }, `${Math.round(progressPercentage)}%`)
              )
            ),
            
            React.createElement('div', { className: 'progress-info' },
              React.createElement('div', { className: 'amounts' },
                React.createElement('span', { className: 'current' }, `${campaign.current.toLocaleString()} items`),
                React.createElement('span', { className: 'target' }, `/ ${campaign.target.toLocaleString()}`)
              ),
              React.createElement('div', { className: 'period' }, `${campaign.period} campaign`),
              React.createElement('div', { className: 'streak' },
                React.createElement(Icon, { name: 'trend', size: 16 }),
                `${campaign.streak} week streak`
              )
            )
          ),

          !campaign.achieved ? 
            React.createElement('div', { className: 'campaign-actions enhanced' },
              React.createElement('button', {
                className: 'btn-progress',
                onClick: () => updateProgress(campaign.id, 1)
              }, '+ 1 item'),
              React.createElement('button', {
                className: 'btn-progress',
                onClick: () => updateProgress(campaign.id, 5)
              }, '+ 5 items'),
              React.createElement('button', {
                className: 'btn-progress primary',
                onClick: () => updateProgress(campaign.id, 10)
              }, 
                React.createElement(Icon, { name: 'rocket', size: 14 }),
                '+ 10 items'
              )
            )
          : React.createElement('div', { className: 'achievement-banner enhanced' },
              React.createElement(Icon, { name: 'check', size: 20 }),
              'Campaign Completed!',
              React.createElement('div', { className: 'achievement-details' },
                `Maintained ${campaign.streak} week streak`
              )
            )
        );
      })
    );
  };

  const renderCampaignCreator = () => {
    if (!showCampaignCreator) return null;

    return React.createElement('div', { className: 'modal-overlay enhanced' },
      React.createElement('div', { className: 'modal-content campaign-creator enhanced' },
        React.createElement('div', { className: 'modal-header' },
          React.createElement('h3', null, 'Create New Content Campaign'),
          React.createElement('button', { 
            onClick: () => setShowCampaignCreator(false), 
            className: 'close-button' 
          }, '×')
        ),
        
        React.createElement('div', { className: 'form-grid enhanced' },
          React.createElement('div', { className: 'form-group full-width' },
            React.createElement('label', null, 'Campaign Title'),
            React.createElement('input', {
              type: 'text',
              value: newCampaign.title,
              onChange: (e) => setNewCampaign({...newCampaign, title: e.target.value}),
              placeholder: "E.g., Daily Social Media Posts"
            })
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Target Items'),
            React.createElement('input', {
              type: 'number',
              value: newCampaign.target,
              onChange: (e) => setNewCampaign({...newCampaign, target: parseInt(e.target.value) || 0}),
              min: "1",
              placeholder: "10"
            })
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Campaign Period'),
            React.createElement('select', {
              value: newCampaign.period,
              onChange: (e) => setNewCampaign({...newCampaign, period: e.target.value})
            },
              React.createElement('option', { value: 'daily' }, 'Daily'),
              React.createElement('option', { value: 'weekly' }, 'Weekly'),
              React.createElement('option', { value: 'monthly' }, 'Monthly')
            )
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Content Type'),
            React.createElement('select', {
              value: newCampaign.type,
              onChange: (e) => setNewCampaign({...newCampaign, type: e.target.value})
            },
              campaignTypes.map(type => 
                React.createElement('option', { key: type.id, value: type.id }, type.name)
              )
            )
          ),

          React.createElement('div', { className: 'form-group full-width' },
            React.createElement('label', null, 'Target Platforms'),
            React.createElement('div', { className: 'platforms-selector' },
              platforms.map(platform => 
                React.createElement('label', { key: platform, className: 'platform-checkbox' },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: newCampaign.platforms.includes(platform),
                    onChange: (e) => {
                      const updatedPlatforms = e.target.checked 
                        ? [...newCampaign.platforms, platform]
                        : newCampaign.platforms.filter(p => p !== platform);
                      setNewCampaign({...newCampaign, platforms: updatedPlatforms});
                    }
                  }),
                  React.createElement('span', null, platform)
                )
              )
            )
          )
        ),

        React.createElement('div', { className: 'ai-features' },
          React.createElement('div', { className: 'ai-banner' },
            React.createElement(Icon, { name: 'ai', size: 20 }),
            React.createElement('div', null,
              React.createElement('strong', null, 'AI-Powered Optimization'),
              React.createElement('p', null, 'Automatically optimize content for selected platforms')
            )
          )
        ),

        React.createElement('div', { className: 'modal-actions' },
          React.createElement('button', { 
            className: 'btn-secondary', 
            onClick: () => setShowCampaignCreator(false) 
          }, 'Cancel'),
          React.createElement('button', { 
            className: 'btn-primary enhanced', 
            onClick: addCampaign 
          }, 
            React.createElement(Icon, { name: 'rocket', size: 16 }),
            'Launch Campaign'
          )
        )
      )
    );
  };

  const renderCelebration = () => {
    if (!showConfetti || !achievedCampaign) return null;

    return React.createElement('div', { className: 'celebration-modal enhanced' },
      React.createElement('div', { className: 'celebration-content' },
        React.createElement('div', { className: 'celebration-icon' },
          React.createElement(Icon, { name: 'performance', size: 48 })
        ),
        React.createElement('h2', null, '🎉 Campaign Completed!'),
        React.createElement('p', null, 
          'You have successfully completed your content campaign:'
        ),
        React.createElement('div', { className: 'achieved-campaign' },
          React.createElement('strong', null, achievedCampaign.title)
        ),
        React.createElement('div', { className: 'achievement-stats' },
          React.createElement('div', { className: 'stat' },
            React.createElement('div', { className: 'stat-value' }, achievedCampaign.current),
            React.createElement('div', { className: 'stat-label' }, 'Items Created')
          ),
          React.createElement('div', { className: 'stat' },
            React.createElement('div', { className: 'stat-value' }, achievedCampaign.streak),
            React.createElement('div', { className: 'stat-label' }, 'Week Streak')
          )
        ),
        React.createElement('div', { className: 'badge-unlocked' },
          React.createElement('div', { className: 'badge-icon' }, getBadgeIcon(achievedCampaign.badge)),
          React.createElement('div', { className: 'badge-text' }, 'Achievement Unlocked!')
        ),
        React.createElement('button', {
          className: 'btn-primary',
          onClick: () => setShowConfetti(false)
        }, 'Continue Creating')
      )
    );
  };

  return React.createElement('div', { className: 'module campaigns enhanced' },
    React.createElement('div', { className: 'module-header enhanced' },
      React.createElement('div', { className: 'module-title' },
        React.createElement(Icon, { name: 'performance', size: 28 }),
        React.createElement('div', null,
          React.createElement('h2', null, 'Content Campaigns'),
          React.createElement('p', null, 'Track and achieve your content production targets with AI-powered optimization')
        )
      )
    ),
    
    renderAnalytics(),
    
    React.createElement('div', { className: 'module-actions enhanced' },
      React.createElement('button', {
        className: 'btn-primary enhanced',
        onClick: () => setShowCampaignCreator(true)
      },
        React.createElement(Icon, { name: 'add', size: 18 }),
        'Create New Campaign'
      ),
      React.createElement('button', {
        className: 'btn-secondary'
      },
        React.createElement(Icon, { name: 'analytics', size: 18 }),
        'View Analytics'
      )
    ),
    renderCampaignsGrid(),
    renderCampaignCreator(),
    renderCelebration()
  );
};

export default CampaignSystem;