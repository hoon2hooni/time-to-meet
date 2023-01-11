import Script from "next/script";
export default function GA() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={
          "https://www.googletagmanager.com/gtag/js?id=G-86RZGE090N](https://www.googletagmanager.com/gtag/js?id=G-86RZGE090N"
        }
      ></Script>

      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `         
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-86RZGE090N');
        `,
        }}
      ></Script>
    </>
  );
}
