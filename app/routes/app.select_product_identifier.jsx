import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { Layout, Card, Text, BlockStack, ChoiceList, Select, InlineStack, Button   } from "@shopify/polaris";
import { useState, useCallback  } from 'react';
import MapProduct from './app.map_products';


export default function SelectProductIdentifier() {

    const [selected, setSelected] = useState(['Product id']);

    const handleChange = useCallback((value) => setSelected(value), []);
    

     const [pushed, setPushed] = useState('Product id');

    const handlePushedChange = useCallback((value) => setPushed(value), [], );

    const [NextPage, setNextPage] = useState(0);
    
           const handleMapProduct = () => {
            setNextPage('Map product');
        
        };
    
        if (NextPage === 'Map product') {
            return <MapProduct/>;
        }

    const options = [
        {label: 'Product id', value: 'Product id'},
        {label: 'Review body', value: 'Review body'},
        {label: 'Rating (Required)', value: 'Rating (Required)'},
        {label: 'Review title', value: 'Review title'},
        {label: 'Review date', value: 'Review date'},
        {label: 'Reviewer name', value: 'Reviewer name'},
        {label: 'Reviewer email', value: 'Reviewer email'},
        {label: 'Product handle', value: 'Product handle'},
        {label: 'Picture_url', value: 'Picture_url'},
    ];

    return (
    <AppProvider i18n={enTranslations}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
                <Text variant="headingXl">Select product identifier</Text>
            </BlockStack>
            <Card>
                <BlockStack gap="400">
                    <Text variant="bodySm">Choose how we match products in your file to the
                         products in your store. Please ensure the values
                          match your store products for accurate review imports.</Text>
                    <ChoiceList
                        title="Match products using"
                        choices={[
                            {label: 'Product id', value: 'Product id'},
                            {label: 'Product URL', value: 'Product URL'},
                            {label: 'Product handle', value: 'Product handle'},
                            {label: 'Product SKU', value: 'Product SKU'},
                            {label: 'Manual product mapping (by reference column)', value: 'Manual product mapping (by reference column)'},
                        ]}
                        selected={selected}
                        onChange={handleChange}
                    />    

                    <Select
                        label="Product ID column in your file"
                        options={options}
                        onChange={handlePushedChange}
                        value={pushed}
                    />
  
                </BlockStack>
            </Card>
          </Card>

           <InlineStack gap="200" >
                <Button>Back</Button>
                <Button onClick={handleMapProduct}>Next</Button>
            </InlineStack>
        </Layout.Section>
      </Layout>
    </AppProvider>
  );
}