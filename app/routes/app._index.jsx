import { useEffect, useState, useCallback } from "react";
import { useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";



import { InlineStack } from "@shopify/polaris";

import { 
  AppProvider, 
  Page, 
  Card, 
  Tabs, 
  BlockStack, 
  Text, 
  EmptyState, 
  Button, 
  ButtonGroup,
  TextField,
  Popover,
  ActionList,
  Icon
} from "@shopify/polaris";
import { SearchIcon, FilterIcon, SortIcon } from '@shopify/polaris-icons';
import enTranslations from "@shopify/polaris/locales/en.json";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  useEffect(() => {
    if (fetcher.data?.product?.id) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data?.product?.id, shopify]);

  const [selected, setSelected] = useState(0);
  const [reviewsSubTab, setReviewsSubTab] = useState(0);
  const [questionsSubTab, setQuestionsSubTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [sortPopoverActive, setSortPopoverActive] = useState(false);
  const [filterPopoverActive, setFilterPopoverActive] = useState(false);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const handleReviewsSubTabChange = useCallback(
    (selectedTabIndex) => setReviewsSubTab(selectedTabIndex),
    [],
  );

  const handleQuestionsSubTabChange = useCallback(
    (selectedTabIndex) => setQuestionsSubTab(selectedTabIndex),
    [],
  );

  const toggleSortPopover = useCallback(
    () => setSortPopoverActive((active) => !active),
    [],
  );

  const toggleFilterPopover = useCallback(
    () => setFilterPopoverActive((active) => !active),
    [],
  );

  const tabs = [
    { id: "reviews", content: "Reviews" },
    { id: "review-requests", content: "Reviews requests" },
    { id: "customer-questions", content: "Customers questions" },
  ];

 // Sub-tabs for Reviews
  const reviewsSubTabs = [
    { id: "all-reviews", content: "All Reviews" },
    { id: "product reviews", content: "Product Reviews" }, 
    { id: "store reviews", content: "Store Reviews" },
    { id: "spam", content: "Spam" },
    { id: "archive", content: "Archive" },
  ];

  // Sub-tabs for Customer Questions
  const questionsSubTabs = [
    { id: "all-questions", content: "All Questions" },
    { id: "with answers", content: "With Answers" },
    { id: "without answers", content: "Without Answers" },
  ];
  // Sort options
  const sortActivator = (
    <Button
      onClick={toggleSortPopover}
      disclosure
      icon={SortIcon}
    >
      Sort
    </Button>
  );

  // Filter options
  const filterActivator = (
    <Button
      onClick={toggleFilterPopover}
      icon={FilterIcon}
    >
      Filter
    </Button>
  );

  // Render content based on selected tab
  const renderTabContent = () => {
    switch (selected) {
      case 0: // Reviews
        return (
          <>
            <BlockStack gap="400">
              <InlineStack align="end">
                <ButtonGroup>
                  <Button>Import</Button>
                  <Button>Publish and moderate</Button>
                  <Button>Edit product review groups</Button>
                  <Button>Add product</Button>
                </ButtonGroup>
              </InlineStack>
            </BlockStack>
            
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <div style={{ flex: 1 }}>
                    <Tabs
                      tabs={reviewsSubTabs}
                      selected={reviewsSubTab}
                      onSelect={handleReviewsSubTabChange}
                    />
                  </div>
                  <InlineStack gap="200">
                    <div style={{ width: '200px' }}>
                      <TextField
                        value={searchValue}
                        onChange={setSearchValue}
                        placeholder="Search reviews"
                        prefix={<Icon source={SearchIcon} />}
                        autoComplete="off"
                      />
                    </div>
                    <Popover
                      active={filterPopoverActive}
                      activator={filterActivator}
                      onClose={toggleFilterPopover}
                    >
                      <ActionList
                        items={[
                          { content: '5 stars', onAction: () => console.log('5 stars') },
                          { content: '4 stars', onAction: () => console.log('4 stars') },
                          { content: '3 stars', onAction: () => console.log('3 stars') },
                          { content: '2 stars', onAction: () => console.log('2 stars') },
                          { content: '1 star', onAction: () => console.log('1 star') },
                        ]}
                      />
                    </Popover>
                    <Popover
                      active={sortPopoverActive}
                      activator={sortActivator}
                      onClose={toggleSortPopover}
                    >
                      <ActionList
                        sections={[
                          {
                            title: 'Sort by',
                            items: [
                              { content: 'Created date', onAction: () => console.log('Created') },
                              { content: 'Rating', onAction: () => console.log('Rating') },
                            ],
                          },
                          {
                            title: 'Order',
                            items: [
                              { content: 'Ascending', onAction: () => console.log('Ascending') },
                              { content: 'Descending', onAction: () => console.log('Descending') },
                            ],
                          },
                        ]}
                      />
                    </Popover>
                  </InlineStack>
                </InlineStack>

                <EmptyState
                  heading={`View all of your ${reviewsSubTabs[reviewsSubTab].content.toLowerCase()}`}
                  action={{ content: 'Track review requests' }}
                  secondaryAction={{
                    content: 'Import reviews',
                    url: 'https://help.shopify.com',
                  }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>You don't have any reviews yet. You can import your existing reviews from other review apps, or send review requests to your customers.</p>
                </EmptyState>
              </BlockStack>
            </Card>
          </>
        );
      
      case 1: // Review Requests (No sub-tabs)
        return (
          <>
            <BlockStack gap="400">
              <InlineStack align="end">
                <ButtonGroup>
                  <Button variant="primary">Send review request</Button>
                  <Button>Configure automation</Button>
                  <Button>View templates</Button>
                </ButtonGroup>
              </InlineStack>
            </BlockStack>
            
            <Card>   
              <EmptyState
                heading="Manage your review requests"
                action={{ content: 'Send first request' }}
                secondaryAction={{
                  content: 'Learn about review requests',
                  url: 'https://help.shopify.com',
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Automatically send review requests to customers after they receive their orders. Set up automation rules to maximize your response rate.</p>
              </EmptyState>
            </Card>
          </>
        );
      
      case 2: // Customer Questions
        return (
          <>
            <BlockStack gap="400">
              <InlineStack align="end">
                <ButtonGroup>
                  <Button>Answer question</Button>
                  <Button>Manage FAQ</Button>
                  <Button>Settings</Button>
                </ButtonGroup>
              </InlineStack>
            </BlockStack>
            
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <div style={{ flex: 1 }}>
                    <Tabs
                      tabs={questionsSubTabs}
                      selected={questionsSubTab}
                      onSelect={handleQuestionsSubTabChange}
                    />
                  </div>
                  <InlineStack gap="200">
                    <div style={{ width: '200px' }}>
                      <TextField
                        value={searchValue}
                        onChange={setSearchValue}
                        placeholder="Search questions"
                        prefix={<Icon source={SearchIcon} />}
                        autoComplete="off"
                      />
                    </div>
                    <Popover
                      active={filterPopoverActive}
                      activator={filterActivator}
                      onClose={toggleFilterPopover}
                    >
                      <ActionList
                        items={[
                          { content: 'Product related', onAction: () => console.log('Product') },
                          { content: 'Shipping related', onAction: () => console.log('Shipping') },
                          { content: 'General inquiry', onAction: () => console.log('General') },
                        ]}
                      />
                    </Popover>
                    <Popover
                      active={sortPopoverActive}
                      activator={sortActivator}
                      onClose={toggleSortPopover}
                    >
                      <ActionList
                        sections={[
                          {
                            title: 'Sort by',
                            items: [
                              { content: 'Created date', onAction: () => console.log('Created') },
                            ],
                          },
                          {
                            title: 'Order',
                            items: [
                              { content: 'Ascending', onAction: () => console.log('Ascending') },
                              { content: 'Descending', onAction: () => console.log('Descending') },
                            ],
                          },
                        ]}
                      />
                    </Popover>
                  </InlineStack>
                </InlineStack>

                <EmptyState
                  heading={`${questionsSubTabs[questionsSubTab].content} questions appear here`}
                  action={{ content: 'Enable Q&A feature' }}
                  secondaryAction={{
                    content: 'Setup FAQ',
                    url: 'https://help.shopify.com',
                  }}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                >
                  <p>Allow customers to ask questions about your products. You can answer them directly or set up an FAQ section to handle common questions automatically.</p>
                </EmptyState>
              </BlockStack>
            </Card>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
   <AppProvider i18n={enTranslations}>

      <Page title="Reviews">
        <BlockStack gap="400">
          <Card>
            <Tabs
              tabs={tabs}
              selected={selected}
              onSelect={handleTabChange}
            />
          </Card>
          
          <Text variant="headingLg" as="h2">
            {tabs[selected].content}
          </Text>
          
          {renderTabContent()}
        </BlockStack>
      </Page>
    </AppProvider>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};