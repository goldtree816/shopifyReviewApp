import { useCallback, useRef, useState } from "react";
import { AppProvider, Layout, Card, BlockStack, Text, Button, InlineStack, ChoiceList, Checkbox, Select } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import Papa from 'papaparse';
import ImportReviewsPage from "./app.import_review";


// SelectProductIdentifier Component

function SelectProductIdentifier({ csvData, mappings, onBack, onNext }) {
  const [selected, setSelected] = useState(['Product id']);
  const [pushed, setPushed] = useState('Product id');

  const options = [
    { label: 'Product id', value: 'Product id' },
    { label: 'Review body', value: 'Review body' },
    { label: 'Rating', value: 'Rating' },
    { label: 'Review title', value: 'Review title' },
    { label: 'Review date', value: 'Review date' },
    { label: 'Reviewer name', value: 'Reviewer name' },
    { label: 'Reviewer email', value: 'Reviewer email' },
    { label: 'Product handle', value: 'Product handle' },
    { label: 'Picture_url', value: 'Picture_url' },
  ];

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingXl">Select product identifier</Text>

              <div style={{
                padding: '12px',
                backgroundColor: csvData && csvData.length > 0 ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${csvData && csvData.length > 0 ? '#86efac' : '#fca5a5'}`,
                borderRadius: '4px'
              }}>
                <Text variant="bodySm">
                  Data Status: {csvData && csvData.length > 0 ? ` ${csvData.length} rows loaded` : ' No data loaded'}
                </Text>
              </div>
            </BlockStack>

            <Card>
              <BlockStack gap="400">
                <Text variant="bodySm">Choose how we match products in your file to the products in your store.</Text>

                <Select
                  label="Match products using"
                  options={[
                    { label: 'Product id', value: 'Product id' },
                    { label: 'Product URL', value: 'Product URL' },
                    { label: 'Product handle', value: 'Product handle' },
                    { label: 'Product SKU', value: 'Product SKU' },
                  ]}
                  value={selected[0]}
                  onChange={(value) => setSelected([value])}
                />

                <Select
                  label="Product ID column in your file"
                  options={options}
                  value={pushed}
                  onChange={setPushed}
                />
              </BlockStack>
            </Card>
          </Card>

          <InlineStack gap="200">
            <Button onClick={onBack}>Back</Button>
            <Button variant="primary" onClick={() => {
              if (!csvData || csvData.length === 0) {
                alert('No data available');
                return;
              }
              onNext({
                selectedIdentifier: selected[0],
                identifierColumn: pushed,
                csvData,
                mappings
              });
            }}>Next</Button>
          </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}


// MapProduct Component

function MapProduct({ csvData, mappings, onBack }) {
  if (!csvData || csvData.length === 0) {
    return (
      <AppProvider i18n={enTranslations}>
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingXl">Map Product</Text>
              </BlockStack>

              <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
              }}>
                <Text variant="bodyMd" tone="subdued"> No data available</Text>
              </div>

              <InlineStack gap="200">
                <Button onClick={onBack}>Back</Button>
              </InlineStack>
            </Card>
          </Layout.Section>
        </Layout>
      </AppProvider>
    );
  }

  const groupedByProduct = {};
  csvData.forEach((row) => {
    const productId = row[mappings?.productId] || 'No Product ID';
    if (!groupedByProduct[productId]) {
      groupedByProduct[productId] = { productId, reviews: [], count: 0 };
    }
    groupedByProduct[productId].reviews.push({
      reviewBody: row[mappings?.reviewBody] || 'No review body',
      rating: row[mappings?.rating] || 'N/A',
    });
    groupedByProduct[productId].count += 1;
  });

  const productList = Object.values(groupedByProduct);

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingXl">Map Product</Text>

              <div style={{
                padding: '12px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #86efac',
                borderRadius: '4px'
              }}>
                <Text variant="bodySm"> {csvData.length} rows, {productList.length} products</Text>
              </div>
            </BlockStack>

            {productList.length > 0 ? (
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f6f6f7', borderBottom: '2px solid #ddd' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Product ID</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Reviews</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Sample Review</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Rating</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Product</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '12px 16px' }}>{product.productId}</td>
                        <td style={{ padding: '12px 16px' }}>{product.count}</td>
                        <td style={{ padding: '12px 16px', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {product.reviews[0]?.reviewBody || 'No review'}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>{product.reviews[0]?.rating || 'N/A'}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <input type="text" placeholder="Search products" style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
                <Text variant="bodyMd" tone="subdued">No products found</Text>
              </div>
            )}
          </Card>

          <InlineStack gap="200">
            <Button onClick={onBack}>Back</Button>
            <Button variant="primary">Import</Button>
          </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}


// ManualReviewsImport - COMPLETE COMPONENT

export default function ManualReviewsImport() {
  const [reviews, setReviews] = useState(['Product reviews']);
  const [checked, setChecked] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentPage, setCurrentPage] = useState('manualReviews');
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

  const fileInputRef = useRef(null);

  const handleReviews = useCallback((value) => setReviews(value), []);
  const handleChecked = useCallback((newChecked) => setChecked(newChecked), []);

  const handleDownload = useCallback(() => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/files/blocklist.csv';
      link.download = 'blocklist.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  }, []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
      setUploadedFile(file);
    }
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    fileInputRef.current.value = '';
  };

  const handleBack = () => {
    setCurrentPage('importReviews');
  };

  const handleMapFile = () => {
    if (uploadedFile) {
      setCurrentPage('mapFileColumns');
    } else {
      alert('Please upload a file first');
    }
  };

  const handleBackFromMapFileColumns = () => {
    console.log('Back button from MapFileColumns clicked');
    setCurrentPage('manualReviews');
  };

  const handleBackFromSelectProductIdentifier = () => {
    setCurrentPage('mapFileColumns');
  };

  const handleProductNext = (data) => {
    setCsvData(data.csvData);
    setMappings(data.mappings);
    setCurrentPage('mapProduct');
  };

  const handleBackFromMapProduct = () => {
    setCurrentPage('productIdentifier');
  };

  //  PAGE: ImportReviews
  if (currentPage === 'importReviews') {
    return <ImportReviewsPage />;
  }

  //  PAGE: MapFileColumns
  if (currentPage === 'mapFileColumns') {
    return (
      <MapFileColumnsPage
        uploadedFile={uploadedFile}
        csvData={csvData}
        columns={columns}
        mappings={mappings}
        onBack={handleBackFromMapFileColumns}
        onUploadFile={setUploadedFile}
        onSetCsvData={setCsvData}
        onSetColumns={setColumns}
        onSetMappings={setMappings}
        onNext={() => setCurrentPage('productIdentifier')}
      />
    );
  }

  //  PAGE: SelectProductIdentifier
  if (currentPage === 'productIdentifier') {
    return (
      <SelectProductIdentifier
        csvData={csvData}
        mappings={mappings}
        onBack={handleBackFromSelectProductIdentifier}
        onNext={handleProductNext}
      />
    );
  }

  //  PAGE: MapProduct
  if (currentPage === 'mapProduct') {
    return (
      <MapProduct
        csvData={csvData}
        mappings={mappings}
        onBack={handleBackFromMapProduct}
      />
    );
  }

  //  PAGE: Manual Reviews (Default)
  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingSm">Upload file</Text>
              <Text variant="bodyMd" tone="subdued">
                Download a sample file to prepare your import in the expected format, or simply upload your own spreadsheet. Please ensure your file includes both review rating and review content. These fields are mandatory.
              </Text>
              <InlineStack gap="400">
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Downloading...' : 'Download CSV sample'}
                </Button>
                <Button> Copy GoogleSheet template</Button>
              </InlineStack>
            </BlockStack>

            <BlockStack gap="800">
              <Text variant="bodyMd">
                Upload your file below. In the next steps, you'll be able to match columns, adjust date formats, and assign reviews to products
              </Text>

              <Button variant="primary" onClick={handleUploadClick}>
                Upload File
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />

              {uploadedFile && (
                <div
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    padding: '12px',
                    backgroundColor: '#fff',
                  }}
                >
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="100">
                      <Text variant="bodySm" fontWeight="semibold">
                        {uploadedFile.name}
                      </Text>
                      <Text tone="subdued" variant="bodySm">
                        Uploaded on {new Date().toLocaleDateString()}
                      </Text>
                    </BlockStack>
                    <Button
                      variant="primary"
                      onClick={handleDeleteFile}
                      accessibilityLabel="Delete file"
                    >
                      Delete file
                    </Button>
                  </InlineStack>
                </div>
              )}

              <Text variant="headingSm">Import reviews as</Text>
              <ChoiceList
                choices={[
                  {
                    label: 'Product reviews',
                    value: 'Product reviews',
                  },
                  {
                    label: 'Store reviews',
                    value: 'Store reviews',
                  },
                ]}
                selected={reviews}
                onChange={handleReviews}
              />

              <Checkbox
                label="I confirm my reviews are genuine and I have permission to import them"
                checked={checked}
                onChange={handleChecked}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      <InlineStack gap="200">
        <Button onClick={handleBack}>Back</Button>
        <Button variant="primary" onClick={handleMapFile}>
          Next
        </Button>
      </InlineStack>
    </AppProvider>
  );
}


// MapFileColumns Page Component (Inline)

function MapFileColumnsPage({
  uploadedFile,
  csvData,
  columns,
  mappings,
  onBack,
  onUploadFile,
  onSetCsvData,
  onSetColumns,
  onSetMappings,
  onNext,
}) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUploadFile(file);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data.length === 0) {
            alert('The uploaded file is empty');
            return;
          }

          const filteredData = results.data.filter(row => Object.values(row).some(val => val));
          onSetCsvData(filteredData);

          const filteredColumns = Object.keys(results.data[0] || {}).filter(col => col.trim() !== '' && !col.startsWith('_'));
          onSetColumns(filteredColumns);

          const autoMappings = {};
          const mappingRules = [
            { key: 'reviewTitle', patterns: ['review_title', 'review title', 'title', 'headline'] },
            { key: 'reviewBody', patterns: ['review_body', 'review body', 'body', 'content', 'review'] },
            { key: 'rating', patterns: ['rating', 'rate', 'stars', 'score'] },
            { key: 'reviewDate', patterns: ['review_date', 'review date', 'date', 'created_at', 'posted_date'] },
            { key: 'reviewerName', patterns: ['reviewer_name', 'reviewer name', 'name', 'author'] },
            { key: 'reviewerEmail', patterns: ['reviewer_email', 'reviewer email', 'email', 'customer_email'] },
            { key: 'reply', patterns: ['reply', 'response', 'admin_reply'] },
            { key: 'productId', patterns: ['product_id', 'product id', 'pid'] },
            { key: 'productHandle', patterns: ['product_handle', 'product handle', 'handle', 'slug'] },
            { key: 'picture_urls', patterns: ['picture_url', 'picture_urls', 'image_url', 'photo'] },
          ];

          mappingRules.forEach(rule => {
            const matchedColumn = filteredColumns.find(col =>
              rule.patterns.some(pattern => col.toLowerCase().includes(pattern.toLowerCase()))
            );
            if (matchedColumn) {
              autoMappings[rule.key] = matchedColumn;
            }
          });

          onSetMappings(autoMappings);
        },
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = () => {
    onUploadFile(null);
    onSetCsvData([]);
    onSetColumns([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const fieldConfig = [
    { key: 'reviewTitle', label: 'Review title' },
    { key: 'reviewBody', label: 'Review body' },
    { key: 'rating', label: 'Rating (Required)' },
    { key: 'reviewDate', label: 'Review date' },
    { key: 'reviewerName', label: 'Reviewer name' },
    { key: 'reviewerEmail', label: 'Reviewer email' },
    { key: 'reply', label: 'Reply' },
    { key: 'productId', label: 'Product id' },
    { key: 'productHandle', label: 'Product handle' },
    { key: 'picture_urls', label: 'Picture_url' },
  ];

  const columnOptions = [
    { label: 'Select a column', value: '' },
    ...columns.map(col => ({ label: col, value: col })),
  ];

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="500">
              <div>
                <Text variant="headingXl">Map File Columns</Text>
              </div>

              <BlockStack gap="400">
                <Text variant="bodyMd" tone="subdued">Upload your CSV file here</Text>
                <Button variant="primary" onClick={handleUploadClick}>Upload File</Button>
                <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} style={{ display: 'none' }} />

                {uploadedFile && (
                  <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px', backgroundColor: '#fafafa' }}>
                    <InlineStack align="space-between" blockAlign="center">
                      <BlockStack gap="100">
                        <Text variant="bodySm" fontWeight="semibold"> {uploadedFile.name}</Text>
                        <Text tone="subdued" variant="bodySm">Uploaded on {new Date().toLocaleDateString()}</Text>
                        {csvData.length > 0 && <Text tone="subdued" variant="bodySm">📊 {csvData.length} rows parsed</Text>}
                      </BlockStack>
                      <Button variant="primary" onClick={handleDeleteFile}>Delete file</Button>
                    </InlineStack>
                  </div>
                )}
              </BlockStack>

              {csvData.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f6f6f7', borderBottom: '2px solid #ddd' }}>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Field Name</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, width: '300px' }}>Select Column</th>
                        <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Sample Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fieldConfig.map((field, index) => (
                        <tr key={field.key} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                          <td style={{ padding: '12px 16px' }}>{field.label}</td>
                          <td style={{ padding: '8px 16px' }}>
                            <Select
                              label=""
                              options={columnOptions}
                              value={mappings[field.key]}
                              onChange={(value) => onSetMappings(prev => ({ ...prev, [field.key]: value }))}
                            />
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {mappings[field.key] ? csvData[0][mappings[field.key]] : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f6f6f7', borderRadius: '8px' }}>
                  <Text variant="bodyMd" tone="subdued">📤 Upload a CSV file to see the data mapping table</Text>
                </div>
              )}
            </BlockStack>
          </Card>

          <InlineStack gap="200">
            <Button onClick={() => {
              console.log('Back clicked, calling onBack');
              onBack();
            }}>Back</Button>
            <Button variant="primary" onClick={() => {
              if (csvData.length === 0) {
                alert('Please upload a CSV file first');
                return;
              }
              onNext();
            }}>Next</Button>
          </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}