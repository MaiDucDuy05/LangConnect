'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-TBN2M0E32B'

export function GoogleAnalytics() {
  return (
    <>
      {/* Load Google Analytics script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Initialize GA */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }

            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });

            console.log("Google Analytics initialized with ID: ${GA_MEASUREMENT_ID}");
          `,
        }}
      />
    </>
  )
}
