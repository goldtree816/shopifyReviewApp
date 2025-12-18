import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Layout, Card, Text, BlockStack, InlineStack, Divider, Select, Button } from "@shopify/polaris";
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function MapProduct() {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
                <Text variant="headingXl">Map product </Text>
            </BlockStack>
            <BlockStack gap="400">
                <Text><ul>
                        <li>You can now review and adjust these matches, and add products for any unmatched reviews.</li>
                        <li>Reviews without a linked product will be imported as store reviews.</li>
                    </ul>
                </Text>
            </BlockStack>
          </Card>

          <InlineStack gap="200" >
                <Button onClick={handleBack}>Back</Button>
                <Button >Import</Button>
            </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
};