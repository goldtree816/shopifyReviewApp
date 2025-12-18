import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Layout, Card, Text, BlockStack, InlineStack, Divider, Select } from "@shopify/polaris";
import { useState } from 'react';



export default function SelectProductIdentifier() {
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
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}