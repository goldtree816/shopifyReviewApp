import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import enTranslations from "@shopify/polaris/locales/en.json";
import loox from '../icons/loox.svg';
import yotpo from '../icons/yotpo.svg';
import air from '../icons/air.svg';
import arereview from '../icons/arereview.svg';
import klaviyo from '../icons/klaviyo.svg';
import { 
  AppProvider,
  Card, 
  BlockStack,
  InlineStack,
  Text,
  Button,
  EmptyState,
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

const ImportCard = ({ title, description, logos, onImport }) => {
  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h3">
          {title}
        </Text>
        
        <InlineStack gap="200" wrap>
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
        </InlineStack>

        <Text variant="bodyMd" tone="subdued">
          {description}
        </Text>

        <Button primary onClick={onImport}>
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
        <InlineStack gap="300" align="start">
          <div
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
              src={icon}
              alt="spreadsheet"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
          </div>
          <BlockStack gap="100">
            <Text variant="headingMd" as="h3">
              {title}
            </Text>
            <Text variant="bodyMd" tone="subdued">
              {description}
            </Text>
          </BlockStack>
        </InlineStack>

        <Button primary onClick={onImport}>
          Import from a spreadsheet
        </Button>
      </BlockStack>
    </Card>
  );
};

export default function Settings() {
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

  const sheetsIcon =
    'https://www.gstatic.com/images/branding/product/1x/sheets_48dp.png';

  return (
    <AppProvider i18n={enTranslations}>
      <s-page heading="Import reviews">
        <BlockStack gap="500">
          {/* Display Loox logo at the top */}
          

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
        </BlockStack>

        <Card>
          <BlockStack gap="400">      
            <EmptyState
              heading="Configure your settings"
              action={{ content: 'Get started' }}
              secondaryAction={{
                content: 'Learn more',
                url: 'https://help.shopify.com',
              }}
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Customize your review app settings, configure email templates, and manage your preferences here.</p>
            </EmptyState>
          </BlockStack>
        </Card>
      </s-page>
    </AppProvider>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};