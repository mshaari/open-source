import Header from "./Header";
import Footer from "./Footer";

// layout component wraps page content between the Header and Footer components
export default function Layout({ children }) {

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )

};