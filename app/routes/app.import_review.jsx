import loox from '../icons/loox.svg';
import yotpo from '../icons/yotpo.svg';
import air from '../icons/air.svg';
import arereview from '../icons/arereview.svg';
import klaviyo from '../icons/klaviyo.svg';
import ManualReviewsImport from './app.manual_reviews_import';
import { useState } from 'react';
import {AppProvider, Page, Card, Button, Layout, Text, Box, InlineStack, BlockStack,  Image, Link,} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

const ImportCard = ({ title, description, logos, onImport }) => {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd" fontWeight="semibold">
          {title}
        </Text>

        <InlineStack gap="300" wrap>
          {logos.map((logo, index) => (
            <Box
              key={index}
              width="56px"
              height="56px"
              background="bg-surface-secondary"
              borderRadius="200"
              paddingInline="300"
              paddingBlock="300"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                source={logo}
                alt="review platform"
                width={40}
                height={40}
              />
            </Box>
          ))}
        </InlineStack>

        <Text as="p" variant="bodyMd" tone="subdued">
          {description}
        </Text>

        <Button onClick={onImport} variant="primary" size="medium">
          Import from apps
        </Button>
      </BlockStack>
    </Card>
  );
};

const SpreadsheetCard = ({ title, description, icon, onImport }) => {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="400" alignItems="start">
          <Box
            width="56px"
            height="56px"
            background="bg-surface-secondary"
            borderRadius="200"
            paddingInline="300"
            paddingBlock="300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink="0"
          >
            <Image source={icon} alt="spreadsheet" width={40} height={40} />
          </Box>

          <BlockStack gap="200">
            <Text as="h3" variant="headingMd" fontWeight="semibold">
              {title}
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              {description}
            </Text>
          </BlockStack>
        </InlineStack>

        <Button onClick={onImport} variant="primary" size="medium">
          Import from a spreadsheet
        </Button>
      </BlockStack>
    </Card>
  );
};

const SettingsCard = () => {
  return (
    <Card>
      <BlockStack gap="400" align="center">
        <Image
          source="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          alt="settings"
          width={200}
        />
        <Text as="h3" variant="headingLg" fontWeight="semibold">
          Configure your settings
        </Text>
        <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
          Customize your review app settings, configure email templates, and
          manage your preferences here.
        </Text>
        <InlineStack gap="300">
          <Button variant="primary" size="medium">
            Get started
          </Button>
          <Link url="https://help.shopify.com">Learn more</Link>
        </InlineStack>
      </BlockStack>
    </Card>
  );
};

function ImportReviewsPageContent() {
  const [currentPage, setCurrentPage] = useState(0);

  const handleImportFromApps = () => {
    console.log('Import from review apps');
  };

  const handleImportFromSpreadsheet = () => {
    setCurrentPage('manual');
  };

  if (currentPage === 'manual') {
    return <ManualReviewsImport />;
  }

  const reviewPlatformLogos = [loox, yotpo, air, arereview, klaviyo];

  const sheetsIcon =
    'https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png';

  return (
    <Page title="Import Reviews">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
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

            <SettingsCard />
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default function ImportReviewsPage() {
  return (
    <AppProvider>
      <ImportReviewsPageContent />
    </AppProvider>
  );
}