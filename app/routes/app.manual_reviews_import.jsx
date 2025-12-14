import React, { useCallback, useRef, useState } from "react";

import { AppProvider, Layout, Card, BlockStack, Text, Button, InlineStack, ChoiceList, Checkbox   } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';



export default function ManualReviewsImport(){

    const [reviews, setReviews] = useState(['Product reviews']);
    const handleReviews = useCallback((value) => setReviews(value), []);
    
    
    const [checked, setChecked] = useState(true);
    const handleChecked = useCallback( (newChecked) => setChecked(newChecked), [] );

    const [isDownloading, setIsDownloading] = useState(false);
    
    //  Download existing CSV from public folder
  const handleDownload = useCallback(() => {
    setIsDownloading(true);

    try {
      // Create link element
      const link = document.createElement('a');
      
      // Set the file URL from public folder
      link.href = '/files/blocklist.csv';
      
      // Set the download file name
      link.download = 'blocklist.csv';
      
      // Add link to body
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Remove link from body
      document.body.removeChild(link);
      
      setIsDownloading(false);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  }, []);



    const[uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef  = useRef(null);


    const handleFileUpload = useCallback((event) => {
        const file = event.target.current?.[0];

        if (file){
            setUploadedFile({
                name: file.name,
                size: file.size,
                uploadAt: new Date().toLocaleDateString(),
            });
        }
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return(
         <AppProvider i18n={enTranslations}>

            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack  gap="400">
                            <Text variant="headingSm"> Upload file</Text>  
                            <Text variant="bodyMd" tone="subdued">
                                Download a sample file to prepare your import in the expected format, or simply upload your own spreadsheet. Please ensure your file includes both review rating and review content. These fields are mandatory.
                            </Text>
                            <InlineStack gap="400">
                                <Button variant="primary"
                                 onClick={handleDownload}
                                 disabled={isDownloading}
                            
                            > Download CSV sample</Button>
                            <Button > Copy GoogleSheet template</Button></InlineStack>

                        </BlockStack>

                        <BlockStack gap="800">

                            {/*  for file upload */}

                            <Text variant="bodyMd">
                                Upload your file below. In the next steps, you'll be able to match columns, adjust date formats, and assign reviews to products
                            </Text>
                            <Button variant="primary" onClick={handleUploadClick}> Upload File</Button>
                            
                            <input
                            ref={fileInputRef}
                            type="file"
                            accept=".txt,.csv,.pdf"
                            onChange={handleFileUpload}
                            
                            />

                        {/* display file uploaded info */}
 
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
                            variant="primary"
                            onClick={handleDeleteFile}
                            accessibilityLabel="Delete file"
                          >
                           Delete file 
                          </Button>
                        </InlineStack>
                      </div>
                    )}


                            <Text variant="headingSm">Import reveiws as</Text>
                            <ChoiceList
                                choices ={[
                                    {
                                        label: 'Product reviews',
                                        value: 'Product reviews',
                                    },

                                    {
                                        label: 'Store reviews',
                                        value: 'Store reviews',
                                    }
 

                                ]}
                                selected ={reviews}
                                onChange ={handleReviews}
                                
                            />
                            <Checkbox

                            label="I confirm my reviews are genuine and I have permission to import them"
                            checked={checked}
                            onChange={handleChecked}
                           
                            
                            />   

                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
         </AppProvider>
    )
}