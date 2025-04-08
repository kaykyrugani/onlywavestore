import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Informacoes.module.css';

const InformacoesPage = () => {
  const location = useLocation();
  const { tipo } = useParams();
  const [activeSection, setActiveSection] = useState(tipo || 'perguntas-frequentes');

  // Configurar a seção ativa com base no parâmetro da URL ou na parte final do caminho
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    
    if (lastPart && lastPart !== 'informacoes') {
      setActiveSection(lastPart);
    } else if (tipo) {
      setActiveSection(tipo);
    }
  }, [location, tipo]);

  // Lista de seções de informações
  const sections = [
    { id: 'perguntas-frequentes', title: 'Perguntas Frequentes' },
    { id: 'politica-de-envio', title: 'Política de Envio' },
    { id: 'politica-de-privacidade', title: 'Política de Privacidade' },
    { id: 'politica-de-reembolso', title: 'Política de Reembolso' },
    { id: 'politica-de-trocas-e-devolucoes', title: 'Política de Trocas e Devoluções' },
    { id: 'termos-de-servico', title: 'Termos de Serviço' },
    { id: 'termos-legais', title: 'Termos Legais' },
    { id: 'politica-de-cookies', title: 'Política de Cookies' },
  ];

  // Função para obter o título da seção ativa
  const getActiveTitle = () => {
    const section = sections.find(s => s.id === activeSection);
    return section ? section.title : 'Informações';
  };

  // Conteúdo de texto expandido (aproximadamente 2000 caracteres) em 3 parágrafos
  const getContentText = () => {
    return (
      <>
        <div>
          <p>
            Na Only Wave, temos o compromisso de oferecer a melhor experiência possível aos nossos clientes. Nossa abordagem é baseada na transparência, qualidade e respeito ao consumidor, garantindo que cada interação com nossa loja seja satisfatória e confiável. Acreditamos que a clareza nas informações é fundamental para uma relação comercial saudável e duradoura. Trabalhamos com dedicação para fornecer produtos autênticos e de qualidade, importados diretamente dos melhores fornecedores internacionais. Nosso processo de seleção é rigoroso, assegurando que apenas itens que atendam aos nossos padrões de excelência cheguem até você. Seguimos princípios fundamentais que orientam nossas operações diárias:
          </p>
          <ul>
            <li>Compromisso com a qualidade em cada etapa do processo, desde a seleção de produtos até a entrega final.</li>
            <li>Transparência total nas informações sobre produtos, prazos e políticas, sem surpresas desagradáveis.</li>
            <li>Atendimento humanizado e eficiente, sempre disponível para solucionar dúvidas e resolver problemas.</li>
            <li>Respeito ao consumidor e suas necessidades, adaptando nossos serviços para melhor atendê-lo.</li>
            <li>Responsabilidade ambiental e social em todas as nossas operações e parcerias comerciais.</li>
            <li>Busca constante por melhorias em nossos processos, produtos e serviços.</li>
          </ul>
        </div>

        <p>
          Todos os nossos produtos são cuidadosamente selecionados, passando por rigorosos controles de qualidade antes de chegarem até você. Trabalhamos com fornecedores confiáveis e comprometidos com a excelência, assegurando que cada item comercializado em nossa plataforma atenda aos mais altos padrões do mercado. Nosso catálogo é constantemente atualizado com as últimas tendências e inovações, sempre priorizando o equilíbrio entre qualidade e preço justo. Entendemos que cada cliente tem necessidades específicas, por isso oferecemos uma variedade de opções para diferentes estilos e preferências. Nossa equipe de curadoria está sempre atenta às tendências globais, buscando trazer novidades que façam a diferença no seu dia a dia. Além disso, mantemos um estoque estratégico para garantir disponibilidade e agilidade nas entregas, mesmo em períodos de alta demanda. Priorizamos parcerias com fornecedores que compartilham nossos valores de sustentabilidade e responsabilidade social, contribuindo para um ecossistema comercial mais justo e equilibrado. Cada produto em nosso catálogo passa por uma avaliação criteriosa que considera diversos fatores como durabilidade, design, conforto e impacto ambiental, garantindo que você receba apenas o melhor.
        </p>

        <p>
          A Only Wave valoriza profundamente a opinião dos seus clientes e busca constantemente aprimorar seus processos com base nos feedbacks recebidos. Acreditamos que essa troca de informações é essencial para evoluirmos como empresa e oferecermos um serviço cada vez melhor. Suas sugestões são sempre bem-vindas e consideradas em nosso planejamento estratégico. Nosso compromisso com a sustentabilidade também faz parte da nossa identidade corporativa. Implementamos práticas que minimizam o impacto ambiental de nossas operações, desde a escolha de materiais para embalagens até processos logísticos mais eficientes. Acreditamos que pequenas ações podem fazer grande diferença para um futuro mais sustentável e responsável. Nossa estratégia de crescimento está alinhada com valores éticos e sustentáveis, buscando não apenas expansão comercial, mas também impacto positivo nas comunidades onde atuamos. Investimos continuamente em tecnologia e treinamento para nossa equipe, pois entendemos que a qualidade do nosso serviço está diretamente relacionada ao conhecimento e bem-estar dos nossos colaboradores. Ao escolher a Only Wave, você não está apenas adquirindo produtos de qualidade, mas também apoiando uma empresa que valoriza a transparência, responsabilidade social e compromisso com seus clientes. Agradecemos sua confiança e estamos sempre à disposição para proporcionar a melhor experiência possível em cada interação.
        </p>
      </>
    );
  };

  return (
    <div className={styles.informacoesPage}>
      <div className={styles.informacoesContainer}>
        <div className={styles.breadcrumbs}>
          <Link to="/">Página Inicial</Link>
          <span>&gt;</span>
          <span>{getActiveTitle()}</span>
        </div>
        
        <div className={styles.mainContent}>
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Informações</h3>
            <ul className={styles.sidebarList}>
              {sections.map(section => (
                <li key={section.id}>
                  <Link 
                    to={`/informacoes/${section.id}`}
                    className={`${styles.sidebarLink} ${activeSection === section.id ? styles.activeLink : ''}`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
          
          <div className={styles.content}>
            <h1 className={styles.contentTitle}>{getActiveTitle()}</h1>
            <div className={styles.contentText}>
              {getContentText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacoesPage; 