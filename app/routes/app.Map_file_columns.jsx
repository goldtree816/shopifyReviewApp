import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Layout, Card, Text, BlockStack, InlineStack, Divider, Select, Button } from "@shopify/polaris";
import { useState } from 'react';
import Papa from 'papaparse';
import SelectProductIdentifier from './app.select_product_identifier';

export default function MapFileColumns() {
  const [csvData, setCsvData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [mappings, setMappings] = useState({
    reviewTitle: '',
    reviewBody: '',
    rating: '',
    reviewDate: '',
    reviewerName: '',
    reviewerEmail: '',
    reply: '',
    productId: '',
    productHandle: '',
    picture_urls: '',

  });

  const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data.filter(row => Object.values(row).some(val => val)));
        const filteredColumns = Object.keys(results.data[0] || {}).filter(col => col.trim() !== '' && !col.startsWith('_'));
        setColumns(filteredColumns);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
      },
    });
  }
};

  const handleMappingChange = (field, value) => {
    setMappings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getPreviewData = (columnName) => {
    if (!columnName || csvData.length === 0) return '';
    return csvData[0][columnName] || '';
  };

  const fieldConfig = [
    { key: 'reviewTitle', label: 'Review title', width: '400px' },
    { key: 'reviewBody', label: 'Review body', width: '500px' },
    { key: 'rating', label: 'Rating (Required)', width: '400px' },
    { key: 'reviewDate', label: 'Review date', width: '400px' },
    { key: 'reviewerName', label: 'Reviewer name', width: '400px' },
    { key: 'reviewerEmail', label: 'Reviewer email', width: '400px' },
    { key: 'reply', label: 'Reply', width: '400px' },
    { key: 'productId', label: 'Product id', width: '400px' },
    { key: 'productHandle', label: 'Product handle', width: '400px' },
    { key: 'picture_urls', label: 'Picture_url', width: '500px' },
   
  ];

  const columnOptions = [
    { label: 'Select a column', value: '' },
    ...columns.map(col => ({ label: col, value: col })),
  ];


//   Handling Next page
   const [NextPage, setNextPage] = useState(0);

       const handleSelectPoductIdentifier = () => {
        setNextPage('ProductIdentifier');
    
    };

    if (NextPage === 'ProductIdentifier') {
        return <SelectProductIdentifier/>;
    }

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div style={{ marginBottom: '16px' }}>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  style={{ padding: '8px' }}
                />
              </div>

              <Text variant="bodyMd">
                Select columns from your CSV to match with review fields, or choose to ignore them.
              </Text>

              <BlockStack gap="800">
                {fieldConfig.map((field, index) => (
                  <div key={field.key}>
                    <InlineStack blockAlign="stretch">
                      <Placeholder width="106px" label={field.label} />
                      <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                        <Select
                          label=""
                          options={columnOptions}
                          value={mappings[field.key]}
                          onChange={(value) => handleMappingChange(field.key, value)}
                          style={{ flex: 1 }}
                        />
                        <Placeholder
                          width={field.width}
                          padding="0"
                          label={getPreviewData(mappings[field.key]) || ''}
                          showBorder
                        />
                      </div>
                    </InlineStack>
                    {index < fieldConfig.length - 1 && <Divider />}
                  </div>
                ))}
              </BlockStack>
            </BlockStack>
          </Card>

          <InlineStack gap="200" >
                <Button>Back</Button>
                <Button onClick={handleSelectPoductIdentifier}>Next</Button>
            </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
};

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  minHeight = 'auto',
  padding = '10px 0px ',
  showBorder = false,
}) => {
  return (
    <div
      style={{
        padding: padding,
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
        minHeight: minHeight,
        borderInlineStart: showBorder
          ? '1px dashed var(--p-color-bg-surface-success)'
          : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text-info-on-bg-fill)',
        }}
      >
        <Text
          as="h2"
          variant="bodyMd"
          fontWeight="medium"
          tone="text-inverse"
        >
          {label}
        </Text>
      </div>
    </div>
  );
};