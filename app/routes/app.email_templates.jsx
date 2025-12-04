import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Layout, Card, Text, BlockStack, Button, Box } from "@shopify/polaris";



export default function EmailTemplatesPage() {
  return (
     <AppProvider i18n={enTranslations}>
    <Layout>
      <Layout.Section>
        <Card>
          <BlockStack gap="400">
            <Text variant="headingSm">
              Email templates
            </Text>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingSm">
                  Review request and reminder emails
                </Text>
                <Text>
                  Create and customize your review requests emails.
                </Text>
                <Card>
                  <BlockStack gap="300">
                    <Text variant="headingSm">
                      Smart Email Template
                    </Text>
                    <Text>
                      Smart styling
                    </Text>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Layout.Section>

      <Layout.Section>
        <Card>
          <BlockStack gap="400">
            <Text variant="headingSm">
              Post-review notifications
            </Text>
            <Card>
              <BlockStack gap="400">
                <Text variant="bodyMd">
                  Review confirmation
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Send web visitor a confirmation email when they leave a review.
                </Text>
                <Box display="flex" gap="300">
                  <Button>Edit</Button>
                </Box>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="400">
                <Text variant="bodyMd">
                  Reply notification
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Notify reviewer by email when you reply to their review.
                </Text>
                <Box display="flex" gap="300">
                  <Button>Edit</Button>
                </Box>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="400">
                <Text variant="bodyMd">
                  Media reminder
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Send a reminder email if customers leave a review without a picture or video.
                </Text>
                <Box display="flex" gap="300">
                  <Button>Edit</Button>
                </Box>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="340">
                <Text variant="bodyMd">
                  Q&A notification
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Notify customers when you reply to their questions.
                </Text>
                <Box display="flex" gap="400">
                  <Button>Edit</Button>
                </Box>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingSm">Discounts and rewards</Text>
          
            <Card>
              <BlockStack gap="300">
                <Text variant="bodyMd">
                  Coupon
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Manage the emails used to send coupon discounts to your loyal customers.
                </Text>
                <Box display="flex" gap="400">
                  <Button>Edit</Button>
                </Box>
              </BlockStack>  
            </Card>
            <Card>
              <BlockStack gap="300">
                <Text variant="bodyMd">
                  Coupon reminder
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Send a reminder email to customers who have not used their coupon.
                </Text>
                <Box display="flex" gap="400">
                  <Button>Edit</Button>
                </Box>
              </BlockStack>  
            </Card>
            <Card>
              <BlockStack gap="300">
                <Text variant="bodyMd">
                  Referral customer reward
                </Text>
                <Text variant="bodyMd" tone="subdued">
                  Manage emails to send rewards to customers that successfully referred a friend (for two-way incentives only).
                </Text>
                <Box display="flex" gap="400">
                  <Button>Edit</Button>
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