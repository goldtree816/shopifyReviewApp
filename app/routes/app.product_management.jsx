import { useState, useCallback } from 'react';
import { Card, TextField, Button, Popover, ActionList, Tag, InlineStack, BlockStack, Text, EmptyState, Box } from "@shopify/polaris";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';


export default function ProductManagementPage() {
  const [searchValue, setSearchValue] = useState('');
  const [popoverActive, setPopoverActive] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
  const filterOptions = [
    { label: 'Review request', value: 'review_request' },
    { label: 'Product group', value: 'product_group' },
    { label: 'In store', value: 'in_store' },
    { label: 'Type', value: 'type' },
    { label: 'Vendor', value: 'vendor' }
  ];

  const togglePopover = useCallback(() => {
    setPopoverActive((active) => !active);
  }, []);

  const handleFilterAdd = useCallback((filterValue) => {
    if (!activeFilters.includes(filterValue)) {
      setActiveFilters([...activeFilters, filterValue]);
    }
    setPopoverActive(false);
  }, [activeFilters]);

  const handleFilterRemove = useCallback((filterToRemove) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  }, [activeFilters]);

  const handleClearAll = useCallback(() => {
    setActiveFilters([]);
    setSearchValue('');
  }, []);

  const getFilterLabel = (value) => {
    const filter = filterOptions.find(f => f.value === value);
    return filter ? filter.label : value;
  };

  const availableOptions = filterOptions.filter(
    option => !activeFilters.includes(option.value)
  );

  const activator = (
    <Button onClick={togglePopover} disclosure>
      Add filter
    </Button>
  );

  return (
    <AppProvider i18n={enTranslations}>
    <Card>
      <BlockStack gap="400">
        <InlineStack gap="300" align="start">
          <Box minWidth="400px">
            <TextField
              placeholder="Search by product or vendor"
              value={searchValue}
              onChange={setSearchValue}
              autoComplete="off"
              clearButton
              onClearButtonClick={() => setSearchValue('')}
            />
          </Box>
          
          <Popover
            active={popoverActive}
            activator={activator}
            onClose={togglePopover}
          >
            <ActionList
              items={availableOptions.map(option => ({
                content: option.label,
                onAction: () => handleFilterAdd(option.value)
              }))}
            />
          </Popover>

          {activeFilters.length > 0 && (
            <Button plain onClick={handleClearAll}>
              Cancel
            </Button>
          )}
        </InlineStack>

        {activeFilters.length > 0 && (
          <InlineStack gap="200">
            {activeFilters.map((filter) => (
              <Tag key={filter} onRemove={() => handleFilterRemove(filter)}>
                {getFilterLabel(filter)}
              </Tag>
            ))}
          </InlineStack>
        )}

        <Box paddingBlockStart="800" paddingBlockEnd="800">
          <EmptyState
            heading="We could not find any products"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <Text variant="bodyMd" tone="subdued">
              Please try changing the search terms or filters
            </Text>
            <Box paddingBlockStart="400">
              <Button>View all products</Button>
            </Box>
          </EmptyState>
        </Box>
      </BlockStack>
    </Card>
    </AppProvider>
  );
}