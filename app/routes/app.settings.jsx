import { useState } from 'react';
import ImportReviewsPage from './app.import_review';
import RequestReviewsPage from './app.request_review';
import RequestSchedulingPage from './app.request_scheduling';
import EmailTemplatesPage from './app.email_templates';
import ProductManagementPage from './app.product_management';
import PublishingModerationPage from './app.publishing_moderation';
import WidgetsPage from './app.widgets';


const SidebarNav = ({ activeSection, onNavigate, searchQuery, onSearchChange }) => {
  const menuItems = [
    { id: 'import', label: 'Import reviews'},
    { id: 'request', label: 'Request reviews'},
    { id: 'scheduling', label: 'Request scheduling'},
    { id: 'templates', label: 'Email templates'},
    { id: 'products', label: 'Product management'},
    { id: 'publishing', label: 'Publishing and moderation'},
  ];

  return (
    <div
      style={{
        width: '240px',
        backgroundColor: '#f5f5f5',
        borderRight: '1px solid #e0e0e0',
        padding: '16px',
        height: '100vh',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Search box */}
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '16px' }} />

      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#999', marginBottom: '8px', textTransform: 'uppercase' }}>
          REVIEW COLLECTION
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                border: 'none',
                backgroundColor: activeSection === item.id ? '#e8f2ff' : 'transparent',
                color: activeSection === item.id ? '#0066cc' : '#333',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeSection === item.id ? '600' : '400',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.target.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
            <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '16px' }} />

      <div>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#999', marginBottom: '8px', textTransform: 'uppercase' }}>
          REVIEW DISPLAY
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => onNavigate('widgets')}
            style={{
              width: '100%',
              padding: '8px 12px',
              textAlign: 'left',
              border: 'none',
              backgroundColor: activeSection === 'widgets' ? '#e8f2ff' : 'transparent',
              color: activeSection === 'widgets' ? '#0066cc' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeSection === 'widgets' ? '600' : '400',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (activeSection !== 'widgets') {
                e.target.style.backgroundColor = '#f0f0f0';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'widgets') {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            Widgets
          </button>
          <button
            onClick={() => onNavigate('groups')}
            style={{
              width: '100%',
              padding: '8px 12px',
              textAlign: 'left',
              border: 'none',
              backgroundColor: activeSection === 'groups' ? '#e8f2ff' : 'transparent',
              color: activeSection === 'groups' ? '#0066cc' : '#333',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeSection === 'groups' ? '600' : '400',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (activeSection !== 'groups') {
                e.target.style.backgroundColor = '#f0f0f0';
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== 'groups') {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            Product groups
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('import');
  const [searchQuery, setSearchQuery] = useState('');

  const renderContent = () => {
    switch (activeSection) {
      case 'import':
        return <ImportReviewsPage />;
      case 'request':
        return <RequestReviewsPage />;
      case 'scheduling':
        return <RequestSchedulingPage />;
      case 'templates':
        return <EmailTemplatesPage />;
      case 'products':
        return <ProductManagementPage />;
      case 'publishing':
        return <PublishingModerationPage />;
      case 'widgets':
        return <WidgetsPage/>;
      
      default:
        return <ImportReviewsPage />;
    }
  };

  const getHeading = () => {
    const headings = {
      'import': 'Import reviews',
      'request': 'Request reviews',
      'scheduling': 'Request scheduling',
      'templates': 'Email templates',
      'products': 'Product management',
      'publishing': 'Publishing and moderation',
      'widgets': 'Widgets',
      'groups': 'Product groups',
    };
    return headings[activeSection] || 'Settings';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <SidebarNav 
        activeSection={activeSection} 
        onNavigate={setActiveSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600', margin: 0 }}>
            {getHeading()}
          </h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}