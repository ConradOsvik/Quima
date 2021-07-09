import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en" dir="ltr">
                <Head />
                <body>
                    <Main />
                    <div id="quima-overlay-fixed"></div>
                    <div id="quima-overlay-absolute"></div>
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
