import { Navbar, Footer, Searchbar, Container } from '@/Components/Layout';
import RouteLoading from '@/Components/UI/Loading/RouteLoading';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <Searchbar />
      <RouteLoading>{children}</RouteLoading>
      <Footer />
    </Container>
  );
}
export default MainLayout