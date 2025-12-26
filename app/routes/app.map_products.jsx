import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Layout, Card, Text, BlockStack, InlineStack, Button } from "@shopify/polaris";
import { useState } from 'react';

export default function MapProduct({ csvData, mappings, selectedIdentifier, identifierColumn, onBack, setCurrentPage }) {
  console.log('=== MapProduct ===');
  console.log('csvData:', csvData);
  console.log('csvData.length:', csvData ? csvData.length : 'undefined');
  console.log('mappings:', mappings);

  const [currentPage, setInternalPage] = useState('mapProduct');

  const handleBack = () => {
    console.log('🔙 Back clicked in MapProduct');
    if (onBack) {
      onBack();
    }
  };

  // ✅ STRICT data validation
  if (!csvData) {
    console.error('❌ MapProduct: csvData is null/undefined');
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
                marginBottom: '20px',
                border: '1px solid #fca5a5'
              }}>
                <Text variant="bodyMd" tone="subdued">
                  ❌ No data available. csvData is undefined. Please go back and upload a file.
                </Text>
              </div>

              <InlineStack gap="200">
                <Button onClick={handleBack}>Back</Button>
              </InlineStack>
            </Card>  
            </Layout.Section>
          </Layout>
        </AppProvider>
      );
    }

  if (!Array.isArray(csvData)) {
    console.error('❌ MapProduct: csvData is not an array');
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
                marginBottom: '20px',
                border: '1px solid #fca5a5'
              }}>
                <Text variant="bodyMd" tone="subdued">
                  ❌ Invalid data format. Please go back and upload a file.
                </Text>
              </div>

              <InlineStack gap="200">
                <Button onClick={handleBack}>Back</Button>
              </InlineStack>
            </Card>  
            </Layout.Section>
          </Layout>
        </AppProvider>
      );
    }

  if (csvData.length === 0) {
    console.error('❌ MapProduct: csvData is empty');
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
                marginBottom: '20px',
                border: '1px solid #fca5a5'
              }}>
                <Text variant="bodyMd" tone="subdued">
                  ❌ No data available. Array is empty. Please go back and upload a file.
                </Text>
              </div>

              <InlineStack gap="200">
                <Button onClick={handleBack}>Back</Button>
              </InlineStack>
            </Card>  
            </Layout.Section>
          </Layout>
        </AppProvider>
      );
    }

  // ✅ Data is valid - proceed with grouping
  console.log('✅ Data validation passed. Grouping data...');

  const groupedByProduct = {};

  csvData.forEach((row, index) => {
    const productId = row[mappings?.productId] || row[identifierColumn] || `Product_${index}`;

    if (!groupedByProduct[productId]) {
      groupedByProduct[productId] = {
        productId: productId,
        reviews: [],
        count: 0,
      };
    }

    groupedByProduct[productId].reviews.push({
      reviewBody: row[mappings?.reviewBody] || 'No review body',
      reviewTitle: row[mappings?.reviewTitle] || '',
      rating: row[mappings?.rating] || 'N/A',
    });

    groupedByProduct[productId].count += 1;
  });

  const productList = Object.values(groupedByProduct);

  console.log('✅ Grouped into', productList.length, 'products');

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingXl">Map Product</Text>
            </BlockStack>

            <BlockStack gap="400">
              <div style={{
                padding: '12px',
                backgroundColor: '#ecfdf5',
                border: '1px solid #86efac',
                borderRadius: '4px'
              }}>
                <Text variant="bodySm">
                  ✅ Data loaded successfully! {csvData.length} rows, {productList.length} products
                </Text>
              </div>

              <Text>
                <ul>
                  <li>✅ You can now review and adjust these matches, and add products for any unmatched reviews.</li>
                  <li>✅ Reviews without a linked product will be imported as store reviews.</li>
                  <li>Matching using: <strong>{selectedIdentifier || 'Product id'}</strong></li>
                  <li>Total rows uploaded: <strong>{csvData.length}</strong></li>
                  <li>Grouped into: <strong>{productList.length}</strong> products</li>
                </ul>
              </Text>
            </BlockStack>

            {/* Table */}
            {productList && productList.length > 0 ? (
              <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #ddd',
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: '#f6f6f7', borderBottom: '2px solid #ddd' }}>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#202223',
                        fontSize: '14px',
                      }}>
                        Product ID
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#202223',
                        fontSize: '14px',
                      }}>
                        Reviews
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#202223',
                        fontSize: '14px',
                      }}>
                        Sample Review
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#202223',
                        fontSize: '14px',
                      }}>
                        Rating
                      </th>
                      <th style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: '#202223',
                        fontSize: '14px',
                      }}>
                        Product
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {productList.map((product, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: index < productList.length - 1 ? '1px solid #e5e7eb' : 'none',
                          backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa',
                          transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f1')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#fafafa')}
                      >
                        <td style={{
                          padding: '12px 16px',
                          fontSize: '14px',
                          color: '#202223',
                          fontWeight: 500,
                        }}>
                          {product.productId}
                        </td>

                        <td style={{
                          padding: '12px 16px',
                          fontSize: '14px',
                          color: '#202223',
                        }}>
                          {product.count}
                        </td>

                        <td style={{
                          padding: '12px 16px',
                          fontSize: '13px',
                          color: '#6b7280',
                          maxWidth: '400px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                          title={product.reviews[0]?.reviewBody || ''}
                        >
                          {product.reviews[0]?.reviewBody || 'No review'}
                        </td>

                        <td style={{
                          padding: '12px 16px',
                          fontSize: '14px',
                          color: '#202223',
                          textAlign: 'center',
                        }}>
                          {product.reviews[0]?.rating || 'N/A'}
                        </td>

                        <td style={{
                          padding: '12px 16px',
                          fontSize: '14px',
                        }}>
                          <input
                            type="text"
                            placeholder="Search products"
                            style={{
                              padding: '8px 12px',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              fontSize: '14px',
                              width: '100%',
                              boxSizing: 'border-box',
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid #fca5a5'
              }}>
                <Text variant="bodyMd" tone="subdued">
                  ❌ No products found. Please go back and check your data.
                </Text>
              </div>
            )}
          </Card>

          <InlineStack gap="200">
            <Button onClick={handleBack}>Back</Button>
            <Button variant="primary">Import</Button>
          </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}