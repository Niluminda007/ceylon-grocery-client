interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  console.log("I rendered");
  return <>{children}</>;
};

export default HomeLayout;
