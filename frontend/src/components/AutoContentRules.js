// AutoContentRules.js - Enhanced
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
    automation: React.createElement('div', { className: 'icon-automation' }, '🤖')
  };

  return React.createElement('div', { 
    className: `icon ${className}`,
    style: { width: size, height: size }
  }, icons[name] || React.createElement('div', { className: 'icon-default' }, '•'));
};

const AutoContentRules = () => {
  const [rules, setRules] = useState([
    { 
      id: 1, 
      category: 'Social Media', 
      action: 'Generate', 
      amount: 5, 
      active: true, 
      description: 'Auto-generate 5 social posts daily',
      platforms: ['Twitter', 'LinkedIn'],
      schedule: 'daily',
      aiModel: 'GPT-4',
      performance: { executed: 45, success: 42 }
    },
    { 
      id: 2, 
      category: 'Newsletter', 
      action: 'Generate', 
      amount: 1, 
      active: true, 
      description: 'Create weekly newsletter content',
      platforms: ['Email'],
      schedule: 'weekly',
      aiModel: 'Claude-2',
      performance: { executed: 12, success: 11 }
    },
    { 
      id: 3, 
      category: 'Blog Articles', 
      action: 'Schedule', 
      amount: 2, 
      active: false, 
      description: 'Schedule 2 blog articles weekly',
      platforms: ['WordPress', 'Medium'],
      schedule: 'weekly',
      aiModel: 'GPT-4',
      performance: { executed: 8, success: 7 }
    }
  ]);
  
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [newRule, setNewRule] = useState({
    category: 'Social Media',
    action: 'Generate',
    amount: 5,
    description: '',
    schedule: 'daily',
    platforms: [],
    aiModel: 'GPT-4'
  });

  const categories = ['Social Media', 'Blog Articles', 'Video Content', 'Email Campaigns', 'Advertising Copy', 'Educational Material'];
  const actions = ['Generate', 'Schedule', 'Optimize', 'Translate', 'Repurpose'];
  const schedules = ['hourly', 'daily', 'weekly', 'monthly'];
  const aiModels = ['GPT-4', 'Claude-2', 'Gemini Pro', 'Llama-2'];
  const platforms = ['Twitter', 'LinkedIn', 'Instagram', 'Facebook', 'WordPress', 'Medium', 'Email', 'YouTube'];

  const toggleRule = (id) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const addRule = () => {
    const rule = {
      ...newRule,
      id: Date.now(),
      active: true,
      description: newRule.description || `${newRule.action} ${newRule.amount} ${newRule.category} items ${newRule.schedule}`,
      performance: { executed: 0, success: 0 }
    };
    
    setRules([...rules, rule]);
    setShowRuleBuilder(false);
    setNewRule({ 
      category: 'Social Media', 
      action: 'Generate', 
      amount: 5, 
      description: '',
      schedule: 'daily',
      platforms: [],
      aiModel: 'GPT-4'
    });
  };

  const deleteRule = (id) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const getPerformancePercentage = (performance) => {
    return performance.executed > 0 ? Math.round((performance.success / performance.executed) * 100) : 0;
  };

  const renderRulesTable = () => {
    return React.createElement('div', { className: 'rules-table enhanced' },
      React.createElement('div', { className: 'table-header enhanced' },
        React.createElement('div', null, 'Rule Description'),
        React.createElement('div', null, 'Platforms'),
        React.createElement('div', null, 'Volume'),
        React.createElement('div', null, 'Performance'),
        React.createElement('div', null, 'Status'),
        React.createElement('div', null, 'Actions')
      ),
      ...rules.map(rule => {
        const performancePercent = getPerformancePercentage(rule.performance);
        
        return React.createElement('div', { 
          key: rule.id, 
          className: `table-row enhanced ${!rule.active ? 'inactive' : ''}` 
        },
          React.createElement('div', { className: 'rule-description' },
            React.createElement('strong', null, rule.description),
            React.createElement('div', { className: 'rule-meta' },
              React.createElement('span', { className: 'ai-model' },
                React.createElement(Icon, { name: 'ai', size: 12 }),
                rule.aiModel
              ),
              React.createElement('span', { className: 'schedule' },
                React.createElement(Icon, { name: 'calendar', size: 12 }),
                rule.schedule
              )
            )
          ),
          React.createElement('div', { className: 'rule-platforms' },
            rule.platforms.map((platform, index) => 
              React.createElement('span', { key: index, className: 'platform-tag' }, platform)
            )
          ),
          React.createElement('div', { className: 'rule-amount' },
            `${rule.amount} items`
          ),
          React.createElement('div', { className: 'rule-performance' },
            React.createElement('div', { className: 'performance-bar' },
              React.createElement('div', { 
                className: 'performance-fill',
                style: { width: `${performancePercent}%` }
              })
            ),
            React.createElement('div', { className: 'performance-text' },
              `${performancePercent}% (${rule.performance.success}/${rule.performance.executed})`
            )
          ),
          React.createElement('div', { className: 'rule-status enhanced' },
            React.createElement('label', { className: 'toggle-switch enhanced' },
              React.createElement('input', {
                type: 'checkbox',
                checked: rule.active,
                onChange: () => toggleRule(rule.id)
              }),
              React.createElement('span', { className: 'slider' })
            ),
            React.createElement('span', { 
              className: `status-text ${rule.active ? 'active' : 'inactive'}` 
            }, rule.active ? 'Active' : 'Inactive')
          ),
          React.createElement('div', { className: 'rule-actions enhanced' },
            React.createElement('button', {
              className: 'btn-icon',
              onClick: () => deleteRule(rule.id),
              title: 'Delete rule'
            }, React.createElement(Icon, { name: 'delete' })),
            React.createElement('button', {
              className: 'btn-icon',
              onClick: () => {/* Edit functionality */},
              title: 'Edit rule'
            }, React.createElement(Icon, { name: 'info' }))
          )
        );
      })
    );
  };

  const renderRuleBuilder = () => {
    if (!showRuleBuilder) return null;

    return React.createElement('div', { className: 'modal-overlay enhanced' },
      React.createElement('div', { className: 'modal-content rule-builder enhanced' },
        React.createElement('div', { className: 'modal-header' },
          React.createElement('h3', null, 'Create Auto-Content Rule'),
          React.createElement('button', { 
            onClick: () => setShowRuleBuilder(false), 
            className: 'close-button' 
          }, '×')
        ),
        
        React.createElement('div', { className: 'ai-assist-banner' },
          React.createElement(Icon, { name: 'automation', size: 24 }),
          React.createElement('div', null,
            React.createElement('strong', null, 'AI-Powered Content Automation'),
            React.createElement('p', null, 'Set rules for automatic content generation and distribution')
          )
        ),
        
        React.createElement('div', { className: 'form-grid enhanced' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Content Category:'),
            React.createElement('select', {
              value: newRule.category,
              onChange: (e) => setNewRule({...newRule, category: e.target.value})
            }, categories.map(cat =>
              React.createElement('option', { key: cat, value: cat }, cat)
            ))
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Action:'),
            React.createElement('select', {
              value: newRule.action,
              onChange: (e) => setNewRule({...newRule, action: e.target.value})
            }, actions.map(action =>
              React.createElement('option', { key: action, value: action }, action)
            ))
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'AI Model:'),
            React.createElement('select', {
              value: newRule.aiModel,
              onChange: (e) => setNewRule({...newRule, aiModel: e.target.value})
            }, aiModels.map(model =>
              React.createElement('option', { key: model, value: model }, model)
            ))
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Schedule:'),
            React.createElement('select', {
              value: newRule.schedule,
              onChange: (e) => setNewRule({...newRule, schedule: e.target.value})
            }, schedules.map(schedule =>
              React.createElement('option', { key: schedule, value: schedule }, schedule)
            ))
          ),

          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, 'Volume (items):'),
            React.createElement('input', {
              type: 'number',
              value: newRule.amount,
              onChange: (e) => setNewRule({...newRule, amount: parseInt(e.target.value) || 0}),
              min: "1",
              placeholder: "Enter volume"
            })
          ),

          React.createElement('div', { className: 'form-group full-width' },
            React.createElement('label', null, 'Target Platforms:'),
            React.createElement('div', { className: 'platforms-selector' },
              platforms.map(platform => 
                React.createElement('label', { key: platform, className: 'platform-checkbox' },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: newRule.platforms.includes(platform),
                    onChange: (e) => {
                      const updatedPlatforms = e.target.checked 
                        ? [...newRule.platforms, platform]
                        : newRule.platforms.filter(p => p !== platform);
                      setNewRule({...newRule, platforms: updatedPlatforms});
                    }
                  }),
                  React.createElement('span', null, platform)
                )
              )
            )
          ),

          React.createElement('div', { className: 'form-group full-width' },
            React.createElement('label', null, 'Description (optional):'),
            React.createElement('input', {
              type: 'text',
              value: newRule.description,
              onChange: (e) => setNewRule({...newRule, description: e.target.value}),
              placeholder: `E.g., ${newRule.action} ${newRule.amount} ${newRule.category} items ${newRule.schedule}`
            })
          )
        ),

        React.createElement('div', { className: 'rule-preview' },
          React.createElement('h4', null, 'Rule Preview'),
          React.createElement('div', { className: 'preview-content' },
            React.createElement('strong', null, 
              newRule.description || `${newRule.action} ${newRule.amount} ${newRule.category} items ${newRule.schedule}`
            ),
            React.createElement('div', { className: 'preview-details' },
              `Using ${newRule.aiModel} • ${newRule.platforms.length} platforms • ${newRule.schedule} execution`
            )
          )
        ),

        React.createElement('div', { className: 'modal-actions' },
          React.createElement('button', { 
            className: 'btn-secondary', 
            onClick: () => setShowRuleBuilder(false) 
          }, 'Cancel'),
          React.createElement('button', { 
            className: 'btn-primary enhanced', 
            onClick: addRule 
          }, 
            React.createElement(Icon, { name: 'automation', size: 16 }),
            'Create Automation Rule'
          )
        )
      )
    );
  };

  const renderAutomationStats = () => {
    const totalRules = rules.length;
    const activeRules = rules.filter(rule => rule.active).length;
    const totalExecutions = rules.reduce((sum, rule) => sum + rule.performance.executed, 0);
    const successRate = totalExecutions > 0 
      ? Math.round((rules.reduce((sum, rule) => sum + rule.performance.success, 0) / totalExecutions) * 100)
      : 0;

    return React.createElement('div', { className: 'automation-stats' },
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-value' }, totalRules),
        React.createElement('div', { className: 'stat-label' }, 'Total Rules')
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-value' }, activeRules),
        React.createElement('div', { className: 'stat-label' }, 'Active Rules')
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-value' }, totalExecutions),
        React.createElement('div', { className: 'stat-label' }, 'Total Executions')
      ),
      React.createElement('div', { className: 'stat-card' },
        React.createElement('div', { className: 'stat-value' }, `${successRate}%`),
        React.createElement('div', { className: 'stat-label' }, 'Success Rate')
      )
    );
  };

  return React.createElement('div', { className: 'module content-rules enhanced' },
    React.createElement('div', { className: 'module-header enhanced' },
      React.createElement('div', { className: 'module-title' },
        React.createElement(Icon, { name: 'automation', size: 28 }),
        React.createElement('div', null,
          React.createElement('h2', null, 'AI Content Automation'),
          React.createElement('p', null, 'Automate content generation with intelligent AI-powered rules and multi-platform distribution')
        )
      )
    ),
    
    renderAutomationStats(),
    
    React.createElement('div', { className: 'module-actions enhanced' },
      React.createElement('button', {
        className: 'btn-primary enhanced',
        onClick: () => setShowRuleBuilder(true)
      },
        React.createElement(Icon, { name: 'add', size: 18 }),
        'Create Automation Rule'
      ),
      React.createElement('button', {
        className: 'btn-secondary'
      },
        React.createElement(Icon, { name: 'analytics', size: 18 }),
        'Rule Analytics'
      )
    ),
    renderRulesTable(),
    renderRuleBuilder()
  );
};

export default AutoContentRules;