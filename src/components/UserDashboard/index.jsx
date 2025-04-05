import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaAddressCard,
  FaCreditCard,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import styles from "./UserDashboard.module.css";

const UserDashboard = ({ initialTab = "profile" }) => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Atualizar a aba ativa quando o initialTab mudar
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  // Resto do código permanece o mesmo...

  // Componente para a aba de Perfil
  const ProfileTab = () => (
    <div className={styles.profileTab}>
      <div className={styles.userInfo}>
        <div className={styles.userAvatar}>
          <FaUser size={40} />
        </div>
        <div className={styles.userDetails}>
          <h3>{currentUser.name}</h3>
          <p>{currentUser.email}</p>
          <button className={styles.editButton}>
            <FaEdit /> Editar Perfil
          </button>
        </div>
      </div>

      <div className={styles.accountDetails}>
        <h4>Informações da Conta</h4>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <strong>Nome:</strong>
            <span>{currentUser.name}</span>
          </div>
          <div className={styles.detailItem}>
            <strong>E-mail:</strong>
            <span>{currentUser.email}</span>
          </div>
          <div className={styles.detailItem}>
            <strong>Telefone:</strong>
            <span>{currentUser.phone || "Não informado"}</span>
          </div>
          <div className={styles.detailItem}>
            <strong>Data de Nascimento:</strong>
            <span>{currentUser.birthDate || "Não informada"}</span>
          </div>
        </div>
      </div>

      <div className={styles.passwordSection}>
        <h4>Alterar Senha</h4>
        <form className={styles.passwordForm}>
          <div className={styles.formGroup}>
            <label htmlFor="currentPassword">Senha Atual</label>
            <input type="password" id="currentPassword" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Nova Senha</label>
            <input type="password" id="newPassword" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmNewPassword">Confirmar Nova Senha</label>
            <input type="password" id="confirmNewPassword" />
          </div>
          <button type="submit" className={styles.submitButton}>
            Atualizar Senha
          </button>
        </form>
      </div>
    </div>
  );

  // Componente para a aba de Pedidos
  const OrdersTab = () => (
    <div className={styles.ordersTab}>
      <h3>Meus Pedidos</h3>

      {/* Se não houver pedidos */}
      <div className={styles.emptyState}>
        <FaShoppingBag size={50} />
        <h4>Você ainda não realizou nenhum pedido</h4>
        <p>Quando você fizer um pedido, ele aparecerá aqui.</p>
        <Link to="/" className={styles.shopNowButton}>
          Começar a Comprar
        </Link>
      </div>

      {/* Lista de pedidos (comentada por enquanto) */}
      {/* 
      <div className={styles.ordersList}>
        {orders.map(order => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <div>
                <h4>Pedido #{order.number}</h4>
                <span className={styles.orderDate}>{order.date}</span>
              </div>
              <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                {order.statusText}
              </span>
            </div>
            <div className={styles.orderItems}>
              {order.items.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemDetails}>
                    <h5>{item.name}</h5>
                    <p>Quantidade: {item.quantity}</p>
                    <p>R$ {item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.orderFooter}>
              <div className={styles.orderTotal}>
                <span>Total:</span>
                <strong>R$ {order.total.toFixed(2)}</strong>
              </div>
              <button className={styles.viewDetailsButton}>
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
      */}
    </div>
  );

  // Componente para a aba de Favoritos
  const WishlistTab = () => (
    <div className={styles.wishlistTab}>
      <h3>Meus Favoritos</h3>

      <div className={styles.emptyState}>
        <FaHeart size={50} />
        <h4>Sua lista de favoritos está vazia</h4>
        <p>Adicione itens aos favoritos para encontrá-los facilmente depois.</p>
        <Link to="/" className={styles.shopNowButton}>
          Explorar Produtos
        </Link>
      </div>
    </div>
  );

  // Componente para a aba de Endereços
  const AddressesTab = () => (
    <div className={styles.addressesTab}>
      <h3>Meus Endereços</h3>

      <div className={styles.emptyState}>
        <FaAddressCard size={50} />
        <h4>Você não possui endereços cadastrados</h4>
        <p>Adicione um endereço para agilizar suas compras.</p>
        <button className={styles.addButton}>Adicionar Endereço</button>
      </div>
    </div>
  );

  // Componente para a aba de Pagamentos
  const PaymentsTab = () => (
    <div className={styles.paymentsTab}>
      <h3>Métodos de Pagamento</h3>

      <div className={styles.emptyState}>
        <FaCreditCard size={50} />
        <h4>Você não possui métodos de pagamento salvos</h4>
        <p>Adicione um método de pagamento para agilizar suas compras.</p>
        <button className={styles.addButton}>
          Adicionar Método de Pagamento
        </button>
      </div>
    </div>
  );

  // Renderizar a aba ativa
  const renderActiveTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrdersTab />;
      case "wishlist":
        return <WishlistTab />;
      case "addresses":
        return <AddressesTab />;
      case "payments":
        return <PaymentsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.userAvatar}>
            <FaUser />
          </div>
          <h3>Olá, {currentUser.name.split(" ")[0]}</h3>
        </div>

        <nav className={styles.sidebarNav}>
          <button
            className={`${styles.navItem} ${
              activeTab === "profile" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser />
            <span>Meu Perfil</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeTab === "orders" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            <FaShoppingBag />
            <span>Meus Pedidos</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeTab === "wishlist" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("wishlist")}
          >
            <FaHeart />
            <span>Favoritos</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeTab === "addresses" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("addresses")}
          >
            <FaAddressCard />
            <span>Endereços</span>
          </button>

          <button
            className={`${styles.navItem} ${
              activeTab === "payments" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("payments")}
          >
            <FaCreditCard />
            <span>Pagamentos</span>
          </button>
        </nav>

        <button className={styles.logoutButton} onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>

      <div className={styles.content}>{renderActiveTab()}</div>
    </div>
  );
};

export default UserDashboard;
