import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { CarrinhoProvider } from './contexts/CarrinhoContext';
import { ProdutosProvider } from './contexts/ProdutosContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UsersProvider } from './contexts/UsersContext';
import { ThemeToggle } from './components/ThemeToggle';

// Importando componentes
import Layout from './components/Layout/Layout';
import AdminLayout from './components/AdminLayout';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Lazy loading das páginas
const Home = lazy(() => import('./pages/home/homeindex'));
const Products = lazy(() => import('./pages/produtos'));
const ProductDetails = lazy(() => import('./pages/produto/ProdutoPage'));
const Cart = lazy(() => import('./components/Cart'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/cadastro'));
const AccountPage = lazy(() => import('./pages/conta'));
const NotFound = lazy(() => import('./pages/not-found/NotFoundPage'));
const TestePage = lazy(() => import('./pages/teste/TestePage'));
const InformacoesPage = lazy(() => import('./pages/informacoes'));
const CheckoutPage = lazy(() => import('./pages/checkout'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));

// Componente de Layout com Outlet
const LayoutWithOutlet = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
};

// Componente de AdminLayout com Outlet
const AdminLayoutWithOutlet = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProdutosProvider>
          <CarrinhoProvider>
            <CartProvider>
              <UsersProvider>
                <BrowserRouter>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      {/* Rotas públicas com Layout padrão */}
                      <Route path="/" element={<LayoutWithOutlet />}>
                        <Route index element={<Home />} />
                        <Route path="produtos" element={<Products />} />
                        <Route path="produtos/:categoria" element={<Products />} />
                        <Route path="produto/:id" element={<ProductDetails />} />
                        <Route path="carrinho" element={<Cart />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="login" element={<Login />} />
                        <Route path="cadastro" element={<Register />} />
                        <Route path="404" element={<NotFound />} />
                      </Route>

                      {/* Rotas sem Layout padrão */}
                      <Route path="/conta" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <AccountPage />
                        </Suspense>
                      } />
                      <Route path="/conta/profile" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <AccountPage initialTab="profile" />
                        </Suspense>
                      } />
                      <Route path="/conta/pedidos" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <AccountPage initialTab="orders" />
                        </Suspense>
                      } />
                      <Route path="/conta/favoritos" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <AccountPage initialTab="wishlist" />
                        </Suspense>
                      } />
                      <Route path="/conta/enderecos" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <AccountPage initialTab="addresses" />
                        </Suspense>
                      } />
                      <Route path="/conta/pagamentos" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <AccountPage initialTab="payments" />
                        </Suspense>
                      } />
                      <Route path="/teste" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <TestePage />
                        </Suspense>
                      } />

                      {/* Rotas administrativas */}
                      <Route path="/admin" element={<AdminLayoutWithOutlet />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="produtos" element={<AdminProducts />} />
                        <Route path="usuarios" element={<AdminUsers />} />
                        <Route path="pedidos" element={<div>Pedidos</div>} />
                        <Route path="relatorios" element={<div>Relatórios</div>} />
                        <Route path="configuracoes" element={<div>Configurações</div>} />
                      </Route>

                      {/* Rotas de informações */}
                      <Route path="/informacoes" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <InformacoesPage />
                        </Suspense>
                      } />
                      <Route path="/informacoes/:tipo" element={
                        <Suspense fallback={<LoadingSpinner />}>
                          <InformacoesPage />
                        </Suspense>
                      } />
                      
                      {/* Rota para página não encontrada */}
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                  </Suspense>
                  <ThemeToggle />
                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </BrowserRouter>
              </UsersProvider>
            </CartProvider>
          </CarrinhoProvider>
        </ProdutosProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
