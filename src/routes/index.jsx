import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../contexts/AuthContext';
import { Outlet } from 'react-router-dom';

// Lazy load das páginas principais
const HomePage = lazy(() => import('../pages/home/homeindex'));
const ProductsPage = lazy(() => import('../pages/produtos/index'));
const ProdutoIndex = lazy(() => import('../pages/produto/index'));
const CartPage = lazy(() => import('../pages/cart'));
const LoginPage = lazy(() => import('../pages/login/index'));
const RegisterPage = lazy(() => import('../pages/cadastro/index'));
const ContaPage = lazy(() => import('../pages/conta/index'));
const PedidosPage = lazy(() => import('../pages/conta/pedidos/index'));
const PerfilPage = lazy(() => import('../pages/conta/perfil/index'));
const CheckoutPage = lazy(() => import('../pages/checkout/CheckoutPage'));
const InformacoesPage = lazy(() => import('../pages/informacoes/InformacoesPage'));
// Páginas administrativas (mantidas como import estático por padrão)
import AdminDashboard from '../pages/admin/Dashboard/DashboardPage';
import AdminProducts from '../pages/admin/Products/index';
import AdminOrders from '../pages/admin/Orders/OrdersPage';
import AdminUsers from '../pages/admin/Users/index';

// Páginas de informações do footer
const FaqPage = lazy(() => import('../pages/informacoes/perguntas-frequentes/index'));
const PoliticaEnvioPage = lazy(() => import('../pages/informacoes/politica-de-envio/index'));
const PoliticaPrivacidadePage = lazy(() => import('../pages/informacoes/politica-de-privacidade/index'));
const PoliticaReembolsoPage = lazy(() => import('../pages/informacoes/politica-de-reembolso/index'));
const PoliticaTrocaPage = lazy(() => import('../pages/informacoes/politica-de-trocas-e-devolucoes/index'));
const TermosServicoPage = lazy(() => import('../pages/informacoes/termos-de-servico/index'));
const TermosLegaisPage = lazy(() => import('../pages/informacoes/termos-legais/index'));
const PoliticaCookiesPage = lazy(() => import('../pages/informacoes/politica-de-cookies/index'));

// Componente de rota protegida
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Carregando página...</div>}>
      <Routes>
        {/* Rotas principais com Layout padrão */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/produto/:id" element={<ProdutoIndex />} />
          <Route path="/carrinho" element={<CartPage />} />
          {/* <Route path="/checkout" element={<CheckoutPage />} /> REMOVIDO para evitar header/footer duplicados */}
          <Route path="/informacoes" element={<InformacoesPage />} />
          <Route path="/informacoes/:tipo" element={<InformacoesPage />} />
          <Route path="/informacoes/perguntas-frequentes" element={<FaqPage />} />
          <Route path="/informacoes/politica-de-envio" element={<PoliticaEnvioPage />} />
          <Route path="/informacoes/politica-de-privacidade" element={<PoliticaPrivacidadePage />} />
          <Route path="/informacoes/politica-de-reembolso" element={<PoliticaReembolsoPage />} />
          <Route path="/informacoes/politica-de-trocas-e-devolucoes" element={<PoliticaTrocaPage />} />
          <Route path="/informacoes/termos-de-servico" element={<TermosServicoPage />} />
          <Route path="/informacoes/termos-legais" element={<TermosLegaisPage />} />
          <Route path="/informacoes/politica-de-cookies" element={<PoliticaCookiesPage />} />
        </Route>
        {/* Rotas de checkout e conta SEM layout global (sem header/footer duplicado) */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/conta" element={<ContaPage />} />
        <Route path="/conta/pedidos" element={<PedidosPage />} />
        <Route path="/conta/perfil" element={<PerfilPage />} />
        {/* Rotas de autenticação com AuthLayout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
        </Route>

        {/* Rotas administrativas com AdminLayout */}
        <Route
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/produtos" element={<AdminProducts />} />
          <Route path="/admin/pedidos" element={<AdminOrders />} />
          <Route path="/admin/usuarios" element={<AdminUsers />} />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 