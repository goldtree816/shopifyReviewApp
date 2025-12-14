import { useState, useCallback } from 'react';
import {
  Card,
  TextField,
  Button,
  Popover,
  ActionList,
  Tag,
  InlineStack,
  BlockStack,
  Text,
  Tabs,
  RadioButton,
  Checkbox,
  Box,
  Page,
  Layout,
  Badge,
} from '@shopify/polaris';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

export default function SocialSharingPage() {

 const [sections] = useState([
    {
      id: 1,
      title: 'Share your reviews on Facebook, Instagram and X',
      status: 'Off',
      statusColor: '#626364',
      description: 'Share your reviews across your social media channels. Connect your Facebook Page, Instagram, or X account to Judge.me and automatically share reviews according to your chosen criteria. You can share reviews manually from your Reviews Dashboard.',
      buttonText: 'Learn more',
      hasImage: true,
      imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Connect',
      status: 'Off',
      statusColor: '#626364',
      description: 'Connect your Facebook account to start fetching posts from your Instagram account.',
      buttonText: '',
      hasImage: false,
    },
  ]);


  const [activeTab, setActiveTab] = useState(0);
  const [templateText, setTemplateText] = useState(
    '[[ review_rating_emoji ]] [[ review_rating ]] star review from [[ reviewer_name ]]: [[ review_title ]]\n\n[[ review_body ]]\n\n[[ product_url ]]'
  );
  const [templateStatus, setTemplateStatus] = useState('awesome');
  const [includePhoto, setIncludePhoto] = useState(false);
  const [randomPhoto, setRandomPhoto] = useState(true);
  const [includeProductImage, setIncludeProductImage] = useState(false);

  const [enableAutomatic, setEnableAutomatic] = useState(false);
  const [percentage, setPercentage] = useState('0');
  const [minimumRating, setMinimumRating] = useState('all-reviews');
  const [onlyPhotos, setOnlyPhotos] = useState(false);
  const [verifiedBuyers, setVerifiedBuyers] = useState(false);
  const [timeInterval, setTimeInterval] = useState('');

  const tabs = [
    { id: 0, content: 'Facebook', panelID: 'facebook-panel' },
    { id: 1, content: 'Instagram', panelID: 'instagram-panel' },
    { id: 2, content: 'X', panelID: 'x-panel' },
  ];

  const handleTabChange = useCallback((selectedTabIndex) => {
    setActiveTab(selectedTabIndex);
  }, []);

  return (
    <AppProvider i18n={enTranslations}>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px', backgroundColor: '#f6f6f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* First Card with Image */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)' }}>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            {/* Image Section */}
            <div style={{ flex: '0 0 35%', minHeight: '240px', backgroundColor: '#e5f5e5' }}>
              <img 
                src={sections[0].imageUrl}
                alt="Social media reviews"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Content Section */}
            <div style={{ flex: '1', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#202223', margin: '0' }}>
                    {sections[0].title}
                  </h2>
                  <span style={{
                    display: 'inline-flex',
                    backgroundColor: '#e5e7eb',
                    color: '#626364',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    whiteSpace: 'nowrap',
                  }}>
                    {sections[0].status}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#626364', margin: '0', lineHeight: '1.6' }}>
                  {sections[0].description}
                </p>
              </div>

              <button style={{
                alignSelf: 'flex-start',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #d9d9d9',
                backgroundColor: '#fff',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#202223',
                transition: 'all 0.2s ease',
                marginTop: '16px',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f6f6f7';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fff';
              }}>
                {sections[0].buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#202223', margin: '0' }}>
                  {sections[1].title}
                </h2>
                <span style={{
                  display: 'inline-flex',
                  backgroundColor: '#e5e7eb',
                  color: '#626364',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                  {sections[1].status}
                </span>
              </div>

              <p style={{ fontSize: '14px', color: '#626364', margin: '0', lineHeight: '1.6' }}>
                {sections[1].description}
              </p>
            </div>

            <div style={{ marginLeft: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#626364" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>


            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px', backgroundColor: '#f6f6f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto' }}>
                <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#202223', margin: '0' }}>Automatic push criteria</h1>
                    <span style={{ display: 'inline-flex', backgroundColor: '#d3f9d8', color: '#2f8554', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>✓ Awesome</span>
                </div>

                <p style={{ fontSize: '14px', color: '#626364', marginBottom: '24px', margin: '8px 0 24px 0' }}>
                Automatically push reviews to your connected social media accounts.
                </p>

                <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                    <input
                    type="radio"
                    id="enable"
                    name="automatic"
                    checked={enableAutomatic}
                    onChange={() => setEnableAutomatic(true)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="enable" style={{ fontSize: '14px', color: '#626364', cursor: 'pointer', margin: '0' }}>
                    Enable automatic social push
                    </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <input
                    type="radio"
                    id="disabled"
                    name="automatic"
                    checked={!enableAutomatic}
                    onChange={() => setEnableAutomatic(false)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <label htmlFor="disabled" style={{ fontSize: '14px', color: '#626364', cursor: 'pointer', margin: '0' }}>
                    Disabled
                    </label>
                </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#202223', marginBottom: '12px' }}>
                    Choose percentage of new review to post
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                    type="text"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    style={{
                        flex: '1',
                        padding: '10px 12px',
                        fontSize: '14px',
                        border: '1px solid #d9d9d9',
                        borderRadius: '4px',
                        color: '#202223',
                    }}
                    />
                    <span style={{ fontSize: '14px', color: '#626364', fontWeight: '500' }}>%</span>
                </div>
                <p style={{ fontSize: '13px', color: '#626364', marginTop: '8px', margin: '8px 0 0 0' }}>
                    Only non-imported reviews will be posted. Reviews will be shared to your social media page 30 minutes after submission.
                </p>
            </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#202223', marginBottom: '12px' }}>
            Minimum review rating
          </label>
          <select
            value={minimumRating}
            onChange={(e) => setMinimumRating(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              color: '#202223',
              backgroundColor: '#fff',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23626364%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              backgroundSize: '18px',
              paddingRight: '36px',
            }}
          >
            <option value="all-reviews">All reviews</option>
            <option value="4-5-stars">4-5 stars</option>
            <option value="5-stars">5 stars only</option>
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <input
              type="checkbox"
              id="photos"
              checked={onlyPhotos}
              onChange={(e) => setOnlyPhotos(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="photos" style={{ fontSize: '14px', color: '#626364', cursor: 'pointer', margin: '0' }}>
              Only post reviews with photos
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              id="verified"
              checked={verifiedBuyers}
              onChange={(e) => setVerifiedBuyers(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="verified" style={{ fontSize: '14px', color: '#626364', cursor: 'pointer', margin: '0' }}>
              Only post reviews from verified buyers
            </label>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#202223', marginBottom: '12px' }}>
            Time interval
          </label>
          <select
            value={timeInterval}
            onChange={(e) => setTimeInterval(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              fontSize: '14px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              color: '#202223',
              backgroundColor: '#fff',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23626364%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 10px center',
              backgroundSize: '18px',
              paddingRight: '36px',
            }}
          >
            <option value="">Select time interval</option>
            <option value="immediately">Immediately</option>
            <option value="30-minutes">30 minutes</option>
            <option value="1-hour">1 hour</option>
            <option value="daily">Daily</option>
          </select>
        </div>

      </div>
    </div>
      <Page
        title="Push Template"
        subtitle="The template will be used for manual and automatic pushes. If you're pushing reviews manually from the Reviews Dashboard, you can still edit the content of the post from the confirmation screen."
      >
        <Layout>
          <Layout.Section>
            <Card>
                
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingMd">Push template</Text>
                  <Badge tone="success">Awesome</Badge>
                </InlineStack>

                <Tabs
                  tabs={tabs}
                  selected={activeTab}
                  onSelect={handleTabChange}
                >
                  {activeTab === 0 && (
                    <Box paddingBlockStart="400">
                      <BlockStack gap="400">
                        <Text variant="headingSm">Facebook push template</Text>

                        <Box>
                          <TextField
                            label="Template content"
                            value={templateText}
                            onChange={setTemplateText}
                            multiline={4}
                            autoComplete="off"
                          />
                        </Box>

                        <Box paddingBlockStart="200">
                          <Button>Add variables</Button>
                        </Box>
                      </BlockStack>
                    </Box>
                  )}

                  {activeTab === 1 && (
                    <Box paddingBlockStart="400">
                      <BlockStack gap="400">
                        <Text variant="headingSm">Instagram push template</Text>

                        <Box>
                          <TextField
                            label="Template content"
                            value={templateText}
                            onChange={setTemplateText}
                            multiline={4}
                            autoComplete="off"
                          />
                        </Box>

                        <Box paddingBlockStart="200">
                          <Button>Add variables</Button>
                        </Box>
                      </BlockStack>
                    </Box>
                  )}

                  {activeTab === 2 && (
                    <Box paddingBlockStart="400">
                      <BlockStack gap="400">
                        <Text variant="headingSm">X push template</Text>

                        <Box>
                          <TextField
                            label="Template content"
                            value={templateText}
                            onChange={setTemplateText}
                            multiline={4}
                            autoComplete="off"
                          />
                        </Box>

                        <Box paddingBlockStart="200">
                          <Button>Add variables</Button>
                        </Box>
                      </BlockStack>
                    </Box>
                  )}
                </Tabs>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Reviews with photos</Text>

                <BlockStack gap="300">
                  <Box>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Checkbox
                        checked={includePhoto}
                        onChange={setIncludePhoto}
                      />
                      <Text variant="bodyMd">
                        Include a photo of the review
                      </Text>
                    </label>
                  </Box>

                  {includePhoto && (
                    <BlockStack gap="200" paddingInlineStart="400">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RadioButton
                          label="Automatically pick a random photo if the review contains more than one"
                          id="random-photo"
                          name="photo-option"
                          checked={randomPhoto}
                          onChange={() => setRandomPhoto(true)}
                        />
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RadioButton
                          label="Include the product image"
                          id="product-image"
                          name="photo-option"
                          checked={!randomPhoto}
                          onChange={() => setRandomPhoto(false)}
                        />
                      </label>
                    </BlockStack>
                  )}
                </BlockStack>

                <Text variant="bodySm" tone="subdued">
                  If the review doesn't contain photos, we'll pick the product image automatically.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <InlineStack gap="200">
              <Button variant="primary">Save</Button>
              <Button>Cancel</Button>
            </InlineStack>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

