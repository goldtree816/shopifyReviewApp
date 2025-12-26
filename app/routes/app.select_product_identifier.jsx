import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Layout, Card, Text, BlockStack, ChoiceList, Select, InlineStack, Button } from "@shopify/polaris";
import { useState, useCallback } from 'react';

export default function SelectProductIdentifier({ csvData, mappings, onBack, setCurrentPage }) {
  console.log('=== SelectProductIdentifier ===');
  console.log('csvData received:', csvData);
  console.log('csvData type:', typeof csvData);
  console.log('csvData length:', csvData ? csvData.length : 'undefined');
  console.log('mappings received:', mappings);

  const [selected, setSelected] = useState(['Product id']);
  const handleChange = useCallback((value) => setSelected(value), []);

  const [pushed, setPushed] = useState('Product id');
  const handlePushedChange = useCallback((value) => setPushed(value), []);

  const handleBackClick = () => {
    console.log('🔙 Back clicked');
    if (onBack) {
      onBack();
    }
  };

  const handleNext = () => {
    console.log('➡️ Next clicked in SelectProductIdentifier');
    console.log('Checking csvData:');
    console.log('  - csvData:', csvData);
    console.log('  - csvData is array:', Array.isArray(csvData));
    console.log('  - csvData length:', csvData ? csvData.length : 'N/A');

    // ✅ STRICT validation
    if (!csvData) {
      console.error('❌ csvData is null/undefined');
      alert('❌ No data available. csvData is null/undefined. Please go back and upload a file.');
      return;
    }

    if (!Array.isArray(csvData)) {
      console.error('❌ csvData is not an array:', typeof csvData);
      alert('❌ Invalid data format. Please go back and upload a file.');
      return;
    }

    if (csvData.length === 0) {
      console.error('❌ csvData is empty');
      alert('❌ No data available. Array is empty. Please go back and upload a file.');
      return;
    }

    console.log('✅ Data validation passed. Proceeding to MapProduct');
    console.log('🔀 Setting currentPage to mapProduct');
    
    // ✅ Use setCurrentPage from parent to navigate
    setCurrentPage('mapProduct');
  };

  const options = [
    { label: 'Product id', value: 'Product id' },
    { label: 'Review body', value: 'Review body' },
    { label: 'Rating (Required)', value: 'Rating (Required)' },
    { label: 'Review title', value: 'Review title' },
    { label: 'Review date', value: 'Review date' },
    { label: 'Reviewer name', value: 'Reviewer name' },
    { label: 'Reviewer email', value: 'Reviewer email' },
    { label: 'Product handle', value: 'Product handle' },
    { label: 'Picture_url', value: 'Picture_url' },
  ];

  //  Show data status
  const dataStatus = csvData && Array.isArray(csvData) && csvData.length > 0
    ? ` ${csvData.length} rows loaded`
    : ' No data loaded';

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingXl">Select product identifier</Text>
              
              {/* Show data status */}
              <div style={{
                padding: '12px',
                backgroundColor: csvData && csvData.length > 0 ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${csvData && csvData.length > 0 ? '#86efac' : '#fca5a5'}`,
                borderRadius: '4px'
              }}>
                <Text variant="bodySm">
                  Data Status: {dataStatus}
                </Text>
              </div>
            </BlockStack>

            <Card>
              <BlockStack gap="400">
                <Text variant="bodySm">
                  Choose how we match products in your file to the products in your store. 
                  Please ensure the values match your store products for accurate review imports.
                </Text>

                <ChoiceList
                  title="Match products using"
                  choices={[
                    { label: 'Product id', value: 'Product id' },
                    { label: 'Product URL', value: 'Product URL' },
                    { label: 'Product handle', value: 'Product handle' },
                    { label: 'Product SKU', value: 'Product SKU' },
                    {
                      label: 'Manual product mapping (by reference column)',
                      value: 'Manual product mapping (by reference column)',
                    },
                  ]}
                  selected={selected}
                  onChange={handleChange}
                />

                <Select
                  label="Product ID column in your file"
                  options={options}
                  onChange={handlePushedChange}
                  value={pushed}
                />
              </BlockStack>
            </Card>
          </Card>

          <InlineStack gap="200">
            <Button onClick={handleBackClick}>Back</Button>
            <Button 
              variant="primary" 
              onClick={handleNext}
              disabled={!csvData || !Array.isArray(csvData) || csvData.length === 0}
            >
              Next
            </Button>
          </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}