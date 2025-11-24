import { useState } from 'react';
import loox from '../icons/loox.svg';
import yotpo from '../icons/yotpo.svg';
import air from '../icons/air.svg';
import arereview from '../icons/arereview.svg';
import klaviyo from '../icons/klaviyo.svg';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Card, Text, BlockStack, Button, Layout, Box } from "@shopify/polaris";

const ImportCard = ({ title, description, logos, onImport }) => {
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>{title}</h3>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {logos.map((logo, index) => (
          <div
            key={index}
            style={{
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '6px',
            }}
          >
            <img
              src={logo}
              alt="review platform"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
          </div>
        ))}
      </div>

      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
        {description}
      </p>

      <button 
        onClick={onImport}
        style={{
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Import from apps
      </button>
    </div>
  );
};

const SpreadsheetCard = ({ title, description, icon, onImport }) => {
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '6px',
            flexShrink: 0,
          }}
        >
          <img
            src={icon}
            alt="spreadsheet"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
        </div>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{title}</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {description}
          </p>
        </div>
      </div>

      <button 
        onClick={onImport}
        style={{
          backgroundColor: '#0066cc',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        Import from a spreadsheet
      </button>
    </div>
  );
};

const ImportReviewsPage = () => {
  const handleImportFromApps = () => {
    console.log('Import from review apps');
  };

  const handleImportFromSpreadsheet = () => {
    console.log('Import from spreadsheet');
  };

  const reviewPlatformLogos = [
    loox,
    yotpo,
    air,
    arereview,
    klaviyo,
  ];

  const sheetsIcon = 'https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png';

  return (
    <div>
      <ImportCard
        title="From review apps"
        description="Bring your reviews from Loox, Yotpo, Air Reviews, Shopify, Klaviyo, Arerereviews and others."
        logos={reviewPlatformLogos}
        onImport={handleImportFromApps}
      />

      <SpreadsheetCard
        title="From a spreadsheet"
        description="Import your own reviews from a spreadsheet format."
        icon={sheetsIcon}
        onImport={handleImportFromSpreadsheet}
      />

      <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
        <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" alt="settings" style={{ maxWidth: '200px', marginBottom: '20px' }} />
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Configure your settings</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
          Customize your review app settings, configure email templates, and manage your preferences here.
        </p>
        <button 
          style={{
            backgroundColor: '#0066cc',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            marginRight: '8px'
          }}
        >
          Get started
        </button>
        <a href="https://help.shopify.com" style={{
          color: '#0066cc',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Learn more
        </a>
      </div>
    </div>
  );
};


// for request review page
const RequestReviewsPage = () => (
  <AppProvider i18n={enTranslations}>
    <Layout>
      <Layout.Section>
        {/* Schedule requests card */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              Email review requests
            </Text>

            {/* Schedule requests */}
            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Schedule requests for previous Shopify orders
                </Text>

                <Text variant="bodyMd" color="subdued">
                  Schedule review requests in batch for orders placed before you installed the app.
                </Text>

                <Button variant="primary">Schedule requests</Button>
              </BlockStack>
            </Card>

            {/* Manual requests card */}
            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Send manual requests
                </Text>

                <Text variant="bodyMd" color="subdued">
                  Send manual review requests to a single customer or multiple customers via spreadsheet CSV.
                </Text>

                <Box display="flex" gap="300">
                  <Button>Single request</Button>
                  <Button variant="primary">Multiple requests</Button>
                </Box>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
    <Layout>
      <Layout.Section>
        {/* Schedule requests card */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              Collection channels
            </Text>

            {/* Schedule requests */}
            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Manage email review requests
                </Text>

                <Text variant="bodyMd" color="subdued">
                  Collect review request via email on autopilot.
                </Text>

               
              </BlockStack>
            </Card>
            {/* for links and QR code*/}
            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Links, QR codes and point of sale review collection
                </Text>

                <Text variant="bodyMd" color="subdued">
                  Share QR codes or links in print, point of sale material, communications or on receipts so your customers can write a review.
                </Text>

                <box display='flex' >
                  <Button variant="primary">Manage</Button>
                </box>
              </BlockStack>
            </Card>

            {/* SMS requests card */}
            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  SMS requests
                </Text>

                <Text variant="bodyMd" color="subdued">
                  Send manual review requests to a single customer or multiple customers via spreadsheet CSV.
                </Text>

                <Box display="flex" gap="300">
                  <Button variant="primary">Manage</Button>
                </Box>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm"  as="h3" > 
                  Push notications
                </Text>

                <Text variant='bodyMd' color="subdued" > 
                 Integrate with PushOwl to send review requests and remind customers to submit pictures.
                </Text>

              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h2" >
                  WhatsApp and email marketing integrations  
                </Text>
                <Text variant='bodyMd' color="subdued" >
                  Send review requests via Klaviyo, Dondy, Reviewbit and others.
                </Text>
                <Box display="flex" gap="300">
                  <Button variant="primary">Manage</Button>
                </Box>
              </BlockStack>
            </Card>

          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>
  </AppProvider>
);





// for Request scheduling page
const RequestSchedulingPage = () => (
  <AppProvider i18n={enTranslations}>
    <Layout>
      <Layout.Section>
      <Card>

      </Card>
      </Layout.Section>
    </Layout>
  </AppProvider>
);


// for Email templates page
const EmailTemplatesPage = () => (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingSm">
                Email templates
              </Text>
              <Card>
                <BlockStack gap="300">
                  <Text variant="headingSm">
                    Review request and reminder emails
                  </Text>
                  <Text>
                    Create and customize your review requests emails.
                  </Text>
                  <Card>
                    <BlockStack gap="300">
                      <Text variant="headingSm">
                        Smart Email Template
                      </Text>
                      <Text>
                        Smart styling
                      </Text>
                    </BlockStack>
                  </Card>
                </BlockStack>
              </Card>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      <layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
            <Text variant="headingSm">
              Post-review notifications
            </Text>
            <Card>
              <BlockStack gap="400">
                <Text variant="bodyMd" >
                  Review confirmation
                </Text>
                <Text variant="bodyMd" tone="critical">
                  Send web visitor a confirmation email when they leave a review.
                </Text>
                <Box display="flex" gap="300">
                  <Button >Edit</Button>
                </Box>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="400">
                <Text variant="bodyMd" >
                  Reply notification
                </Text>
                <Text variant="bodyMd" tone="critical">
                  Notify reviewer by email when you reply to their review.
                </Text>
                <Box display="flex" gap="300">
                  <Button >Edit</Button>
                </Box>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="400">
                <Text variant="bodyMd" >
                  Media reminder
                </Text>
                <Text variant="bodyMd" tone="critical">
                  Send a reminder email if customers leave a review without a picture or video.
                </Text>
                <Box display="flex" gap="300">
                  <Button >Edit</Button>
                </Box>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="340">
                <Text variant="bodyMd" >
                  Q&A notification
                </Text>
                <Text variant="bodyMd" tone="critical">
                  Notify customers when you reply to their questions.
                </Text>
                <Box display="flex" gap="400">
                  <Button >Edit</Button>
                </Box>
              </BlockStack>
            </Card>
            </BlockStack>
          </Card>
          <Card>
             <Layout>
                <Layout.Section>
                   <BlockStack gap="400">
                    <Text variant="headingSm">Discounts and rewards</Text>
                  
                      <Card>
                          <BlockStack gap="300">
                            <Text variant="bodyMd" >
                              Coupon
                            </Text>
                            <Text variant="bodyMd" tone="critical">
                              Manage the emails used to send coupon discounts to your loyal customers.
                            </Text>
                            <Box display="flex" gap="400">
                              <Button >Edit</Button>
                            </Box>
                          </BlockStack>  
                      </Card>
                      <Card>
                          <BlockStack gap="300">
                            <Text variant="bodyMd" >
                              Coupon reminder
                            </Text>
                            <Text variant="bodyMd" tone="critical">
                              Send a reminder email to customers who have not used their coupon.
                            </Text>
                            <Box display="flex" gap="400">
                              <Button >Edit</Button>
                            </Box>
                          </BlockStack>  
                      </Card>
                      <Card>
                          <BlockStack gap="300">
                            <Text variant="bodyMd" >
                              Referral customer reward
                            </Text>
                            <Text variant="bodyMd" tone="critical">
                              Manage emails to send rewards to customers that successfully referred a friend (for two-way incentives only).
                            </Text>
                            <Box display="flex" gap="400">
                              <Button >Edit</Button>
                            </Box>
                          </BlockStack>  
                      </Card>

                    </BlockStack>  
                </Layout.Section>
              </Layout>
            
          </Card>
        </Layout.Section>
      </layout>  
    </AppProvider> 
);

// for Product Management Page

const ProductManagementPage = () => (
  <AppProvider i18n={enTranslations}>
    <Layout>
      <Layout.Section>
        <Card>

        </Card>
      </Layout.Section>
    </Layout>
  </AppProvider>
);


// for Publishing Moderation Page
const PublishingModerationPage = () => (
  <AppProvider i18n={enTranslations}>
    <Layout>
      <Layout.Section>
        <Card>
          
        </Card>
      </Layout.Section>
    </Layout>
  </AppProvider>
);

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
              <span>{item.icon} {item.label}</span>
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

export default function JudgemeApp() {
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
      default:
        return <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px' }}>Page under development</div>;
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
    };
    return headings[activeSection] || 'Judge.me Reviews';
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