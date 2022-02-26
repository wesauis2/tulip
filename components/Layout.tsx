import Head from "next/head";

export interface LayoutProps {
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  title = title ? `Tulip | ${title}` : "Tulip";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};

export default Layout;
