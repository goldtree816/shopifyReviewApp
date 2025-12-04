import { Card, Text, BlockStack, Button, InlineStack, Layout, Badge } from "@shopify/polaris";
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';


const WidgetCard = ({ title, description, image, badge, onCustomize, onInstall, installed }) => {
  return (
    
    <div style={{ 
      border: '1px solid #e1e3e5', 
      borderRadius: '12px', 
      overflow: 'hidden',
      backgroundColor: '#fff'
    }}>
      {/* Widget Preview Image or outter layer */}
      <div style={{ 
        padding: '20px',
        backgroundColor: '#f6f6f7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '300px',
          aspectRatio: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: image.bgColor || '#fff',
          borderRadius: '8px',
          border: '2px solid #e1e3e5',
          position: 'relative',
          backgroundImage: image.pattern ? `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.03) 10px, rgba(0,0,0,0.03) 20px)` : 'none'
        }}>
          {image.content}
        </div>
      </div>

      {/* Widget Info */}
      <div style={{ padding: '20px' }}>
        <BlockStack gap="300">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text variant="headingMd" as="h3">{title}</Text>
            {badge && (
              <Badge tone="success">{badge}</Badge>
            )}
          </div>
          
          <Text variant="bodyMd" tone="subdued">
            {description}
          </Text>

          <InlineStack gap="200">
            <Button onClick={onCustomize}>Customize</Button>
            {!installed && onInstall && (
              <Button variant="primary" onClick={onInstall}>Install</Button>
            )}
          </InlineStack>
        </BlockStack>
      </div>
    </div>
  );
};

export default function WidgetsPage() {
  const handleCustomize = (widgetName) => {
    console.log(`Customize ${widgetName}`);
  };

  const handleInstall = (widgetName) => {
    console.log(`Install ${widgetName}`);
  };

  const widgets = [
    {
      id: 'review-widget',
      title: 'Review Widget',
      description: 'Collect and display product reviews on your product pages.',
      badge: null,
      installed: false,
      image: {
        bgColor: '#c8f5dc',
        pattern: true,
        content: (
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '16px', 
            borderRadius: '8px',
            width: '90%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Customer Reviews</div>
              
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: '#e1e3e5',
                  borderRadius: '4px'
                }}></div>
              ))}
            </div>
          </div>
        )
      }
    },

    {
      id: 'star-rating-badge',
      title: 'Star Rating Badge',
      description: 'Show the average rating of your products and how many reviews they\'ve received.',
      badge: null,
      installed: false,
      image: {
        bgColor: '#cce7ff',
        pattern: true,
        content: (
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '8px',
            width: '80%',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '8px' }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: '#000', fontSize: '24px' }}>★</span>
              ))}
            </div>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>4.8</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <div style={{ 
                padding: '8px 24px', 
                backgroundColor: '#4ade80',
                borderRadius: '20px',
                fontSize: '12px'
              }}></div>
              <div style={{ 
                padding: '8px 24px', 
                backgroundColor: '#e1e3e5',
                borderRadius: '20px',
                fontSize: '12px'
              }}></div>
            </div>
          </div>
        )
      }
    },
    {
      id: 'write-review',
      title: 'Write a Review',
      description: 'A pre-installed widget to help your customers write reviews.',
      badge: 'Installed',
      installed: true,
      image: {
        bgColor: '#c8f5dc',
        pattern: true,
        content: (
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '20px', 
            borderRadius: '8px',
            width: '85%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Write a review</div>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', justifyContent: 'center' }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ fontSize: '24px' }}>☆</span>
              ))}
            </div>
            <div style={{ 
              padding: '10px', 
              backgroundColor: '#4ade80',
              borderRadius: '6px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#000'
            }}>Submit review</div>
          </div>
        )
      }
    },
    {
      id: 'reviews-carousel',
      title: 'Reviews Carousel',
      description: 'Display customer reviews in a beautiful carousel format.',
      badge: null,
      installed: false,
      image: {
        bgColor: '#c8f5dc',
        pattern: true,
        content: (
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '16px', 
            borderRadius: '8px',
            width: '90%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>★★★★★</div>
            <div style={{ fontSize: '11px', marginBottom: '8px', color: '#666' }}>
              "Great product! Highly recommend..."
            </div>
            <div style={{ fontSize: '10px', color: '#999' }}>- John D.</div>
          </div>
        )
      }
    },
    {
      id: 'photo-reviews',
      title: 'Photo Reviews Grid',
      description: 'Showcase customer photos in an engaging grid layout.',
      badge: null,
      installed: false,
      image: {
        bgColor: '#c8f5dc',
        pattern: true,
        content: (
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '16px', 
            borderRadius: '8px',
            width: '90%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px'
            }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ 
                  aspectRatio: '1',
                  backgroundColor: '#e1e3e5',
                  borderRadius: '4px'
                }}></div>
              ))}
            </div>
          </div>
        )
      }
    },
    {
      id: 'floating-badge',
      title: 'Floating Rating Badge',
      description: 'A sticky badge that follows users as they scroll.',
      badge: null,
      installed: false,
      image: {
        bgColor: '#cce7ff',
        pattern: true,
        content: (
          <div style={{ 
            backgroundColor: '#000', 
            color: '#fff',
            padding: '12px 20px', 
            borderRadius: '24px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <span style={{ color: '#ffd700' }}>★</span>
            <span>4.8</span>
            <span style={{ fontSize: '12px', opacity: 0.8 }}>250 reviews</span>
          </div>
        )
      }
    }
    
    
    
  ];

  return (
    <AppProvider i18n={enTranslations}>
    <Layout>
      <Layout.Section>
        <BlockStack gap="600">
         
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {widgets.map(widget => (
              <WidgetCard
                key={widget.id}
                title={widget.title}
                description={widget.description}
                image={widget.image}
                badge={widget.badge}
                installed={widget.installed}
                onCustomize={() => handleCustomize(widget.title)}
                onInstall={!widget.installed ? () => handleInstall(widget.title) : undefined}
              />
            ))}
          </div>
        </BlockStack>
      </Layout.Section>
    </Layout>
    </AppProvider>
  );
}