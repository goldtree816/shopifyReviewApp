import { useState, useCallback } from 'react';
import { Layout, Card, Text, BlockStack, Checkbox, Select, TextField } from "@shopify/polaris";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

export default function RequestSchedulingPage() {
  const [checked, setChecked] = useState(true);
  const [selected, setSelected] = useState('Nepal');
  
  const handleChange = useCallback((newChecked) => {
    setChecked(newChecked);
  }, []);
  
  const handleSelectChange = useCallback((value) => {
    setSelected(value);
  }, []);

  const options = [
    {label: 'Nepal', value: 'Nepal'},
    {label: 'Denmark', value: 'Denmark'},
    {label: 'Spain', value: 'Spain'},
    {label: 'Finland', value: 'Finland'},
    {label: 'France', value: 'France'},
    {label: 'United kingdom', value: 'United kingdom'},
    {label: 'Hong Kong', value: 'Hong Kong'},
    {label: 'Ireland', value: 'Ireland'},
    {label: 'Israel', value: 'Israel'},
    {label: 'Italy', value: 'Italy'},
    {label: 'Japan', value: 'Japan'},
    {label: 'South Korea', value: 'South Korea'},
    {label: 'Malaysia', value: 'Malaysia'},
    {label: 'Netherlands', value: 'Netherlands'},
    {label: 'Norway', value: 'Norway'},
    {label: 'New Zealand', value: 'New Zealand'},
    {label: 'Poland', value: 'Poland'},
    {label: 'Portugal', value: 'Portugal'},
    {label: 'Sweden', value: 'Sweden'},
    {label: 'India', value: 'India'},
  ];

  const [domesticAfterDays, setDomesticAfterDays] = useState('14');
  const [domesticFollowUpDays, setDomesticFollowUpDays] = useState('5');
  const [internationalEnabled, setInternationalEnabled] = useState(true);
  const [internationalAfterDays, setInternationalAfterDays] = useState('14');
  const [internationalFollowUpDays, setInternationalFollowUpDays] = useState('5');

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingLg">Request timing</Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingSm">Domestic orders</Text>
              <Checkbox
                label="Send requests for domestic orders"
                checked={checked}
                onChange={handleChange}
              />
              <Select
                label=""
                labelInline
                options={options}
                onChange={handleSelectChange}
                value={selected}
              />

              <BlockStack gap="300">
                <Text variant="bodyMd">After the order is fulfilled, send the review request after</Text>
                <TextField
                  type="number"
                  value={domesticAfterDays}
                  onChange={setDomesticAfterDays}
                  suffix="days"
                  autoComplete="off"
                />
              </BlockStack>

              <BlockStack gap="300">
                <Text variant="bodyMd">Follow-up requests and reminders are sent after</Text>
                <TextField
                  type="number"
                  value={domesticFollowUpDays}
                  onChange={setDomesticFollowUpDays}
                  suffix="days"
                  autoComplete="off"
                />
                <Text variant="bodySm" tone="subdued">
                  This applies for orders with more than one item and for automatic reminders (if enabled).
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingSm">International orders</Text>
              
              <Checkbox
                label="Send requests for international orders"
                checked={internationalEnabled}
                onChange={setInternationalEnabled}
              />

              <BlockStack gap="300">
                <Text variant="bodyMd">After the order is fulfilled, send the review request after</Text>
                <TextField
                  type="number"
                  value={internationalAfterDays}
                  onChange={setInternationalAfterDays}
                  suffix="days"
                  autoComplete="off"
                />
              </BlockStack>

              <BlockStack gap="300">
                <Text variant="bodyMd">Follow-up requests and reminders are sent after</Text>
                <TextField
                  type="number"
                  value={internationalFollowUpDays}
                  onChange={setInternationalFollowUpDays}
                  suffix="days"
                  autoComplete="off"
                />
                <Text variant="bodySm" tone="subdued">
                  This applies for orders with more than one item and for automatic reminders (if enabled).
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingSm">Point of sale (POS) orders</Text>
              
              <Checkbox
                label="Send requests for POS orders"
                checked={internationalEnabled}
                onChange={setInternationalEnabled}
              />

              <BlockStack gap="300">
                <Text variant="bodyMd">After the order is fulfilled, send the review request after</Text>
                <TextField
                  type="number"
                  value={internationalAfterDays}
                  onChange={setInternationalAfterDays}
                  suffix="days"
                  autoComplete="off"
                />
              </BlockStack>

              <BlockStack gap="300">
                <Text variant="bodyMd">Follow-up requests and reminders are sent after</Text>
                <TextField
                  type="number"
                  value={internationalFollowUpDays}
                  onChange={setInternationalFollowUpDays}
                  suffix="days"
                  autoComplete="off"
                />
                <Text variant="bodySm" tone="subdued">
                  This applies for orders with more than one item and for automatic reminders (if enabled).
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
  </AppProvider>
  );
}