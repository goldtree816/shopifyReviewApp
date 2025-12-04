import { Layout, Card, Text, BlockStack, Button, Box } from "@shopify/polaris";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

export default function RequestReviewsPage() {
  return (
    <AppProvider i18n={enTranslations}>
    <Layout>
      <Layout.Section>
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              Email review requests
            </Text>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Schedule requests for previous Shopify orders
                </Text>

                <Text variant="bodyMd" tone="subdued">
                  Schedule review requests in batch for orders placed before you installed the app.
                </Text>

                <Button variant="primary">Schedule requests</Button>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Send manual requests
                </Text>

                <Text variant="bodyMd" tone="subdued">
                  Send manual review requests to a single customer or multiple customers via spreadsheet CSV.
                </Text>

                <Box display="flex" gap="300">
                  <Button>Single request</Button>
                  <Button variant="primary">Multiple requests</Button>
                </Box>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              Collection channels
            </Text>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Manage email review requests
                </Text>

                <Text variant="bodyMd" tone="subdued">
                  Collect review request via email on autopilot.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Links, QR codes and point of sale review collection
                </Text>

                <Text variant="bodyMd" tone="subdued">
                  Share QR codes or links in print, point of sale material, communications or on receipts so your customers can write a review.
                </Text>

                <Box display="flex">
                  <Button variant="primary">Manage</Button>
                </Box>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  SMS requests
                </Text>

                <Text variant="bodyMd" tone="subdued">
                  Send manual review requests to a single customer or multiple customers via spreadsheet CSV.
                </Text>

                <Box display="flex" gap="300">
                  <Button variant="primary">Manage</Button>
                </Box>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  Push notifications
                </Text>

                <Text variant="bodyMd" tone="subdued">
                  Integrate with PushOwl to send review requests and remind customers to submit pictures.
                </Text>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm" as="h3">
                  WhatsApp and email marketing integrations
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Send review requests via Klaviyo, Dondy, Reviewbit and others.
                </Text>
                <Box display="flex" gap="300">
                  <Button variant="primary">Manage</Button>
                </Box>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Layout.Section>
    </Layout>

  </AppProvider>
  );
}