import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaHeart,
  FaAddressCard,
  FaCreditCard,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaKey,
  FaExclamationTriangle,
  FaPlus,
  FaCcVisa,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import styles from "./UserDashboard.module.css";

const UserDashboard = ({ initialTab = "profile" }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    birthDate: currentUser?.birthDate || ""
  });

  // Atualizar a aba ativa quando o initialTab mudar
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Atualizar dados do usuário quando o currentUser mudar
  useEffect(() => {
    if (currentUser) {
      setUserData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        birthDate: currentUser.birthDate || ""
      });
    }
  }, [currentUser]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeLogoutModal();
      toast.success("Logout realizado com sucesso!");
      navigate('/');
    } catch (error) {
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Aqui implementaria a lógica para salvar o perfil
    toast.success("Perfil atualizado com sucesso!");
    setIsEditing(false);
    setShowPasswordSection(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setShowPasswordSection(false);
  };

  const togglePasswordSection = () => {
    setShowPasswordSection(!showPasswordSection);
  };

  // Componente para a aba de Perfil
  const ProfileTab = () => {
    return (
      <div className={styles.profileTab}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <FaUser size={40} />
          </div>
          <div className={styles.userDetails}>
            <h3>{currentUser.name}</h3>
            <p>{currentUser.email}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.editButton} onClick={toggleEditMode}>
                {isEditing ? (
                  <>
                    <FaTimes /> Cancelar
                  </>
                ) : (
                  <>
                    <FaEdit /> Editar Perfil
                  </>
                )}
              </button>
              {isEditing && (
                <button 
                  className={`${styles.editButton} ${styles.passwordButton}`} 
                  onClick={togglePasswordSection}
                >
                  <FaKey /> {showPasswordSection ? "Ocultar Alterar Senha" : "Alterar Senha"}
                </button>
              )}
            </div>
          </div>
        </div>

        {isEditing ? (
          // Formulário de edição do perfil
          <form className={styles.editForm} onSubmit={handleSaveProfile}>
            <div className={styles.accountDetails}>
              <h4>Editar Informações</h4>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={userData.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Telefone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="birthDate">Data de Nascimento</label>
                  <input 
                    type="date" 
                    id="birthDate" 
                    name="birthDate" 
                    value={userData.birthDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit" className={styles.submitButton}>
                <FaSave /> Salvar Alterações
              </button>
            </div>
          </form>
        ) : (
          // Visualização das informações
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
        )}

        {/* Seção de alteração de senha - visível apenas no modo de edição quando solicitado */}
        {isEditing && showPasswordSection && (
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
        )}
      </div>
    );
  };

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
  const AddressesTab = () => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [endereco, setEndereco] = useState(null);
    
    // Estados para formulário de endereço
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    
    const handleSalvarEndereco = (e) => {
      e.preventDefault();
      // Simulação de salvamento de endereço
      const novoEndereco = {
        cep,
        rua,
        numero,
        bairro,
        complemento,
        cidade,
        estado
      };
      setEndereco(novoEndereco);
      setShowAddressModal(false);
      toast.success("Endereço adicionado com sucesso!");
    };
    
    const formatarCep = (valor) => {
      // Remove caracteres não numéricos
      const apenasNumeros = valor.replace(/\D/g, '');
      
      // Formata como 00000-000
      if (apenasNumeros.length <= 5) {
        return apenasNumeros;
      } else {
        return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`;
      }
    };
    
    const handleCepChange = (e) => {
      const valorFormatado = formatarCep(e.target.value);
      setCep(valorFormatado);
    };
    
    return (
      <div className={styles.addressesTab}>
        <h3>Meus Endereços</h3>
        
        {endereco ? (
          <div className={styles.addressCard}>
            <div className={styles.addressInfo}>
              <div className={styles.addressLine}>
                <strong>Endereço:</strong> {endereco.rua}, {endereco.numero}
                {endereco.complemento && `, ${endereco.complemento}`}
              </div>
              <div className={styles.addressLine}>
                <strong>Bairro:</strong> {endereco.bairro}
              </div>
              <div className={styles.addressLine}>
                <strong>Cidade/Estado:</strong> {endereco.cidade}/{endereco.estado}
              </div>
              <div className={styles.addressLine}>
                <strong>CEP:</strong> {endereco.cep}
              </div>
            </div>
            <button className={styles.addButton} onClick={() => setShowAddressModal(true)}>
              Adicionar Novo Endereço
            </button>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaAddressCard size={50} />
            <h4>Você não possui endereços cadastrados</h4>
            <p>Adicione um endereço para agilizar suas compras.</p>
            <button className={styles.addButton} onClick={() => setShowAddressModal(true)}>
              Adicionar Endereço
            </button>
          </div>
        )}
        
        {/* Modal de Adicionar Endereço */}
        {showAddressModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3>Adicionar Endereço</h3>
                <button className={styles.closeButton} onClick={() => setShowAddressModal(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className={styles.modalBody}>
                <form className={styles.addressForm} onSubmit={handleSalvarEndereco}>
                  <div className={styles.formGroup}>
                    <label htmlFor="cep">CEP*</label>
                    <input
                      type="text"
                      id="cep"
                      value={cep}
                      onChange={handleCepChange}
                      maxLength="9"
                      placeholder="00000-000"
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="rua">Endereço*</label>
                    <input
                      type="text"
                      id="rua"
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      placeholder="Rua, Avenida, etc."
                      required
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="numero">Número*</label>
                      <input
                        type="text"
                        id="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder="123"
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="bairro">Bairro*</label>
                      <input
                        type="text"
                        id="bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        placeholder="Centro"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="complemento">Complemento (opcional)</label>
                    <input
                      type="text"
                      id="complemento"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      placeholder="Apto, Bloco, etc."
                    />
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="cidade">Cidade*</label>
                      <input
                        type="text"
                        id="cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="São Paulo"
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="estado">Estado*</label>
                      <input
                        type="text"
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        placeholder="SP"
                        maxLength="2"
                        required
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className={styles.submitButton}>
                    Salvar Endereço
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Componente para a aba de Pagamentos
  const PaymentsTab = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [savedMethods, setSavedMethods] = useState([]);
    
    // Estados para seleção do método de pagamento
    const [selectedMethod, setSelectedMethod] = useState('card');
    
    // Estados para formulário de cartão de crédito
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    
    // Estados para formulário do Mercado Pago
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    
    // Manipuladores para formatar entradas
    const formatCardNumber = (value) => {
      const digits = value.replace(/\D/g, '');
      let formatted = '';
      
      for (let i = 0; i < digits.length; i += 4) {
        if (i > 0) formatted += ' ';
        formatted += digits.slice(i, i + 4);
      }
      
      return formatted.trim();
    };
    
    const formatCardExpiry = (value) => {
      const digits = value.replace(/\D/g, '');
      
      if (digits.length <= 2) {
        return digits;
      }
      
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    };
    
    const formatCpf = (value) => {
      const digits = value.replace(/\D/g, '');
      
      if (digits.length <= 3) {
        return digits;
      } else if (digits.length <= 6) {
        return `${digits.slice(0, 3)}.${digits.slice(3)}`;
      } else if (digits.length <= 9) {
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
      } else {
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
      }
    };
    
    // Manipuladores para mudanças de input
    const handleCardNumberChange = (e) => {
      const formatted = formatCardNumber(e.target.value);
      if (formatted.length <= 19) setCardNumber(formatted);
    };
    
    const handleCardExpiryChange = (e) => {
      const formatted = formatCardExpiry(e.target.value);
      if (formatted.length <= 5) setCardExpiry(formatted);
    };
    
    const handleCpfChange = (e) => {
      const formatted = formatCpf(e.target.value);
      if (formatted.length <= 14) {
        setCpf(formatted);
        
        // Simulação: Se o CPF estiver completo, preencher nome e data de nascimento
        if (formatted.length === 14) {
          setName('Kaka Borges Silva');
          setBirthdate('20/20/2020');
        } else {
          setName('');
          setBirthdate('');
        }
      }
    };
    
    // Manipulador para salvar método de pagamento
    const handleSavePaymentMethod = () => {
      let newMethod;
      
      if (selectedMethod === 'card') {
        newMethod = {
          id: Date.now(),
          type: 'card',
          cardNumber,
          cardName,
          cardExpiry
        };
      } else {
        newMethod = {
          id: Date.now(),
          type: 'mercadopago',
          email,
          cpf,
          name,
          birthdate
        };
      }
      
      setSavedMethods([...savedMethods, newMethod]);
      setShowPaymentModal(false);
      toast.success("Método de pagamento adicionado com sucesso!");
    };
    
    return (
      <div className={styles.paymentsTab}>
        <h3>Métodos de Pagamento</h3>
        
        {savedMethods.length > 0 ? (
          <div className={styles.paymentMethodsContainer}>
            {savedMethods.map(method => (
              <div key={method.id} className={styles.paymentMethodCard}>
                <div className={styles.paymentMethodIcon}>
                  {method.type === 'card' ? <FaCcVisa size={30} /> : <FaMoneyBillWave size={30} />}
                </div>
                <div className={styles.paymentMethodInfo}>
                  <h4>{method.type === 'card' ? 'Cartão de Crédito' : 'Mercado Pago'}</h4>
                  {method.type === 'card' ? (
                    <p>**** **** **** {method.cardNumber.slice(-4)}</p>
                  ) : (
                    <p>{method.email}</p>
                  )}
                </div>
              </div>
            ))}
            <button className={styles.addButton} onClick={() => setShowPaymentModal(true)}>
              Adicionar Novo Método de Pagamento
            </button>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaCreditCard size={50} />
            <h4>Você não possui métodos de pagamento salvos</h4>
            <p>Adicione um método de pagamento para agilizar suas compras.</p>
            <button className={styles.addButton} onClick={() => setShowPaymentModal(true)}>
              Adicionar Método de Pagamento
            </button>
          </div>
        )}
        
        {/* Modal de Adicionar Método de Pagamento */}
        {showPaymentModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h3>Adicionar Método de Pagamento</h3>
                <button className={styles.closeButton} onClick={() => setShowPaymentModal(false)}>
                  <FaTimes />
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.paymentMethodSelector}>
                  <button 
                    className={`${styles.methodButton} ${selectedMethod === 'card' ? styles.methodActive : ''}`}
                    onClick={() => setSelectedMethod('card')}
                  >
                    <FaCcVisa size={20} />
                    <span>Cartão de Crédito</span>
                  </button>
                  <button 
                    className={`${styles.methodButton} ${selectedMethod === 'mercadopago' ? styles.methodActive : ''}`}
                    onClick={() => setSelectedMethod('mercadopago')}
                  >
                    <FaMoneyBillWave size={20} />
                    <span>Mercado Pago</span>
                  </button>
                </div>
                
                {selectedMethod === 'card' ? (
                  <div className={styles.creditCardForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="cardNumber">Número do Cartão</label>
                      <input
                        type="text"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="cardName">Nome no Cartão</label>
                      <input
                        type="text"
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="NOME COMO ESTÁ NO CARTÃO"
                      />
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="cardExpiry">Validade</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          value={cardExpiry}
                          onChange={handleCardExpiryChange}
                          placeholder="MM/AA"
                        />
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="cardCvv">CVV</label>
                        <input
                          type="text"
                          id="cardCvv"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.mercadoPagoForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="mpEmail">E-mail</label>
                      <input
                        type="email"
                        id="mpEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu-email@exemplo.com"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="mpCpf">CPF</label>
                      <input
                        type="text"
                        id="mpCpf"
                        value={cpf}
                        onChange={handleCpfChange}
                        placeholder="000.000.000-00"
                      />
                    </div>
                    
                    {name && (
                      <div className={styles.formGroup}>
                        <label>Nome</label>
                        <div className={styles.readOnlyField}>{name}</div>
                      </div>
                    )}
                    
                    {birthdate && (
                      <div className={styles.formGroup}>
                        <label>Data de Nascimento</label>
                        <div className={styles.readOnlyField}>{birthdate}</div>
                      </div>
                    )}
                  </div>
                )}
                
                <button
                  className={styles.submitButton}
                  onClick={handleSavePaymentMethod}
                >
                  Salvar Método de Pagamento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

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
            } ${styles.lastNavItem}`}
            onClick={() => setActiveTab("payments")}
          >
            <FaCreditCard />
            <span>Pagamentos</span>
          </button>
        </nav>

        <button className={styles.logoutButton} onClick={handleLogoutClick}>
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>

      <div className={styles.content}>{renderActiveTab()}</div>

      {/* Modal de confirmação de logout */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <FaExclamationTriangle className={styles.warningIcon} />
              <h3>Confirmar saída</h3>
            </div>
            <div className={styles.modalBody}>
              <p>Tem certeza que deseja sair da sua conta?</p>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={`${styles.modalButton} ${styles.cancelButton}`} 
                onClick={closeLogoutModal}
              >
                Cancelar
              </button>
              <button 
                className={`${styles.modalButton} ${styles.confirmButton}`} 
                onClick={handleLogout}
              >
                Sim, sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
