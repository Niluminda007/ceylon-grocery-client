interface ProductsLayoutProps {
  children: React.ReactNode;
}

const ProductsLayout = ({ children }: ProductsLayoutProps) => {
  return <div className="px-4 md:px-8 lg:px-16">{children}</div>;
};

export default ProductsLayout;
