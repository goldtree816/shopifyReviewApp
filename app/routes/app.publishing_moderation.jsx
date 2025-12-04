import { useState, useCallback, useRef } from 'react';
import { Layout, Card, Text, BlockStack, ChoiceList, Button, Badge, InlineStack, TextField } from "@shopify/polaris";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

export default function PublishingModerationPage() {
  const [webReviewsSelected, setWebReviewsSelected] = useState(['no restriction']);
  const [personalInfoSelected, setPersonalInfoSelected] = useState(['Censor personal information and publish review']);
  const [profanityEnabled, setProfanityEnabled] = useState(true);
  const [profanityFilterMode, setProfanityFilterMode] = useState(['Replace banned words with asterisks (***) and publish review']);
  const [blocklistWords, setBlocklistWords] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [useStandardBlocklist, setUseStandardBlocklist] = useState(true);
  const fileInputRef = useRef(null);

  const handleWebReviewsChange = useCallback((value) => setWebReviewsSelected(value), []);
  const handlePersonalInfoChange = useCallback((value) => setPersonalInfoSelected(value), []);
  const handleProfanityFilterChange = useCallback((value) => setProfanityFilterMode(value), []);
  const handleBlocklistWordsChange = useCallback((value) => setBlocklistWords(value), []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toLocaleDateString(),
      });
    }
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = useCallback(() => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingSm">Personal information</Text>
              <Text>
                Define how reviews containing personal information, such as emails, addresses and names, appear on your store.
              </Text>

              <ChoiceList
                choices={[
                  {
                    label: 'Censor personal information and publish review',
                    value: 'Censor personal information and publish review',
                  },
                  {
                    label: 'Hide review containing personal information',
                    value: 'Hide review containing personal information',
                  },
                ]}
                selected={personalInfoSelected}
                onChange={handlePersonalInfoChange}
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <ChoiceList
              title="Web reviews"
              choices={[
                { label: 'No restriction', value: 'no restriction' },
                {
                  label: 'Only buyers who have received a review request email and API users',
                  value: 'Only buyers who have received a review request email and API users',
                },
                {
                  label: 'Only buyers who have received a review request email',
                  value: 'Only buyers who have received a review request email',
                },
              ]}
              selected={webReviewsSelected}
              onChange={handleWebReviewsChange}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          {/* Profanity Filter Card */}
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between" blockAlign="center">
                <BlockStack gap="100">
                  <Text variant="headingMd">Profanity filter</Text>
                  <Badge tone="success">Awesome</Badge>
                </BlockStack>
                <input
                  type="checkbox"
                  checked={profanityEnabled}
                  onChange={(e) => setProfanityEnabled(e.target.checked)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
              </InlineStack>

              <Text>
                Block new reviews containing swear words and offensive phrases.{' '}
                <a href="#" style={{ color: '#0071E3' }}>
                  Learn more
                </a>
              </Text>

              <BlockStack gap="300">
                <Text variant="headingSm">Profanity filter mode</Text>

                <ChoiceList
                  choices={[
                    { label: 'Disabled', value: 'Disabled' },
                    {
                      label: 'Replace banned words with asterisks (***) and publish review',
                      value: 'Replace banned words with asterisks (***) and publish review',
                    },
                    {
                      label: 'Replace banned words with asterisks (***) and hide review',
                      value: 'Replace banned words with asterisks (***) and hide review',
                    },
                    {
                      label: 'Hide reviews containing banned words',
                      value: 'Hide reviews containing banned words',
                    },
                  ]}
                  selected={profanityFilterMode}
                  onChange={handleProfanityFilterChange}
                />

                <Text tone="subdued" variant="bodySm">
                  Reviews with profanity will be censored and marked as Unpublished in the Reviews
                  Dashboard.
                </Text>
              </BlockStack>

              {/* Custom Blocklist Section */}
              <BlockStack gap="300">
                <Text variant="headingSm">Custom blocklist</Text>

                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', backgroundColor: '#f9fafb' }}>
                  <BlockStack gap="300">
                    <InlineStack gap="200">
                      <Button onClick={handleUploadClick} variant="secondary">
                         Upload custom blocklist
                      </Button>
                      <Button variant="secondary">
                         Export list
                      </Button>
                    </InlineStack>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.csv"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />

                    {uploadedFile && (
                      <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px', backgroundColor: '#fff' }}>
                        <InlineStack align="space-between" blockAlign="center">
                          <BlockStack gap="100">
                            <Text variant="bodySm" fontWeight="semibold">
                              {uploadedFile.name}
                            </Text>
                            <Text tone="subdued" variant="bodySm">
                              Uploaded on {uploadedFile.uploadedAt}
                            </Text>
                          </BlockStack>
                          <Button
                            variant="tertiary"
                            onClick={handleDeleteFile}
                            accessibilityLabel="Delete file"
                          >
                            🗑️
                          </Button>
                        </InlineStack>
                      </div>
                    )}
                  </BlockStack>
                </div>
              </BlockStack>

              {/* Manual Blocklist Input */}
              <BlockStack gap="300">
                <Text variant="headingSm">Blocklist words or phrases</Text>

                <TextField
                  label=""
                  placeholder="Add your words here"
                  value={blocklistWords}
                  onChange={handleBlocklistWordsChange}
                  multiline={4}
                />

                <Text tone="subdued" variant="bodySm">
                  Add each word or phrase on a separate line by using Enter.
                </Text>

                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={useStandardBlocklist}
                    onChange={(e) => setUseStandardBlocklist(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Text variant="bodySm">Use standard blocklist (Default)</Text>
                </label>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}



