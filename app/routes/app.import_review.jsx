import loox from '../icons/loox.svg';
import yotpo from '../icons/yotpo.svg';
import air from '../icons/air.svg';
import arereview from '../icons/arereview.svg';
import klaviyo from '../icons/klaviyo.svg';

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

export default function ImportReviewsPage() {
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
}