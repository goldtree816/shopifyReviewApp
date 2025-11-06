import { authenticate } from "../shopify.server";
import { boundary } from "@shopify/shopify-app-react-router/server";
import enTranslations from "@shopify/polaris/locales/en.json";
import { 
  AppProvider,
  Card, 
  BlockStack, 
  EmptyState, 
} from "@shopify/polaris";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Settings() {
  return (
    <AppProvider i18n={enTranslations}>
    <s-page heading="Settings">
      
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