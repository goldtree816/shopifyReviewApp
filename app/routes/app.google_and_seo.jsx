import { useState } from 'react';

export default function GoogleAndSeo() {
  const [sections] = useState([
    {
      id: 1,
      title: 'Judge.me Reviews Site',
      status: 'Off',
      statusColor: '#626364',
      description: 'Get featured on the Judge.me Reviews platform to showcase your products and reviews to more shoppers, improve SEO and increase your conversions.',
      buttonText: 'Manage',
    },
    {
      id: 2,
      title: 'SEO Rich Snippets',
      status: 'On',
      statusColor: '#31a462',
      description: 'Show your reviews in Google Search results when people search for your products. These will include the star rating and number of reviews.',
      buttonText: 'Manage',
    },
    {
      id: 3,
      title: 'Google Shopping',
      status: 'Off',
      statusColor: '#626364',
      description: 'Boost your Google product listings—both free and paid—with aggregated star ratings and review counts. Stand out in search results and increase conversion, at no extra cost.',
      buttonText: 'Manage',
    },
    {
      id: 4,
      title: 'Google Business Profile',
      status: 'Not syncing',
      statusColor: '#f59e0b',
      description: '',
      buttonText: 'Manage',
    },
  ]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', backgroundColor: '#f6f6f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#202223', margin: '0' }}>Sell more with Judge.me</h3>
        <button style={{ fontSize: '24px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#626364' }}>⋯</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sections.map((section) => (
          <div key={section.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#202223', margin: '0' }}>{section.title}</h2>
                <span style={{
                  display: 'inline-flex',
                  backgroundColor: section.status === 'On' ? '#d3f9d8' : section.status === 'Not syncing' ? '#fef3c7' : '#e5e7eb',
                  color: section.statusColor,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  {section.status}
                </span>
              </div>
              <button style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #d9d9d9',
                backgroundColor: '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#202223',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f6f6f7';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fff';
              }}>
                {section.buttonText}
              </button>
            </div>
            {section.description && (
              <p style={{ fontSize: '14px', color: '#626364', margin: '0', lineHeight: '1.5' }}>
                {section.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}