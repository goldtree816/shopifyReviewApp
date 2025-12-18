import  { useCallback, useRef, useState } from "react";
import { AppProvider,  Layout, Card, BlockStack, Text, Button, InlineStack, ChoiceList, Checkbox, Box   } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import MapFileColumns from "./app.Map_file_columns";

export default function ManualReviewsImport(){

    const [reviews, setReviews] = useState(['Product reviews']);
    const handleReviews = useCallback((value) => setReviews(value), []);
    
    const [checked, setChecked] = useState(true);
    const handleChecked = useCallback( (newChecked) => setChecked(newChecked), [] );

    const [isDownloading, setIsDownloading] = useState(false);
    
    const handleDownload = useCallback(() => {
      setIsDownloading(true);
      try {
        const link = document.createElement('a');
        link.href = '/files/blocklist.csv';
        link.download = 'blocklist.csv';
        document.body.appendChild(link);
        link.click();
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
        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
        }
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteFile = () => {
        setUploadedFile(null);
        fileInputRef.current.value = '';
    };

    const [NextPage, setNextPage] = useState(0);

    const handleBack = () => {
        if (NextPage > 0) setNextPage(NextPage - 1);
    };

    const handleMapFile = () => {
        if (uploadedFile) {
            setNextPage('map');
        } else {
            alert('Please upload a file first');
        }
    };
  
    if (NextPage === 'map') {
        return <MapFileColumns uploadedFile={uploadedFile}/>;
    }
  
    return(
         <AppProvider i18n={enTranslations}>
          <Box style={{marginBottom:"10px"}}>
            <Button>Back</Button>
          </Box>
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

                            <Text variant="bodyMd">
                                Upload your file below. In the next steps, you'll be able to match columns, adjust date formats, and assign reviews to products
                            </Text>
                            <Button variant="primary" onClick={handleUploadClick}> Upload File</Button>
                            
                            <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            onChange={handleFileUpload}
                            style={{display: 'none'}}
                            />

                    {uploadedFile && (
                      <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px', backgroundColor: '#fff' }}>
                        <InlineStack align="space-between" blockAlign="center">
                          <BlockStack gap="100">
                            <Text variant="bodySm" fontWeight="semibold">
                              {uploadedFile.name}
                            </Text>
                            <Text tone="subdued" variant="bodySm">
                              Uploaded on {new Date().toLocaleDateString()}
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
                    </Card >
                </Layout.Section>
            </Layout>
            <InlineStack gap="200" >
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleMapFile}>Next</Button>
            </InlineStack>
         </AppProvider>
    )
}