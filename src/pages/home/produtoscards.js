const tenis = [
  { id: 1, nome: "Tênis Esportivo", imagem: "https://via.placeholder.com/200x200", preco: 299.99, promocao: true, avaliacoes: 4.5, divisao: "12x de <span>24,99</span> sem juros" },
  { id: 2, nome: "Tênis Casual", imagem: "https://via.placeholder.com/200x200", preco: 199.99, promocao: false, avaliacoes: 4.2, divisao: "10x de <span>19,99</span> sem juros" },
  { id: 3, nome: "Tênis de Corrida", imagem: "https://via.placeholder.com/200x200", preco: 349.99, promocao: true, avaliacoes: 4.8, divisao: "12x de <span>29,16</span> sem juros" },
  { id: 4, nome: "Tênis de Basquete", imagem: "https://via.placeholder.com/200x200", preco: 399.99, promocao: false, avaliacoes: 4.6, divisao: "10x de <span>39,99</span> sem juros" },
  { id: 5, nome: "Tênis de Skate", imagem: "https://via.placeholder.com/200x200", preco: 259.99, promocao: true, avaliacoes: 4.4, divisao: "8x de <span>32,50</span> sem juros" }
];

const camisetas = [
  { id: 6, nome: "Camiseta Básica", imagem: "https://via.placeholder.com/200x200", preco: 59.99, promocao: false, avaliacoes: 4.5, divisao: "2x de <span>29,99</span> sem juros" },
  { id: 7, nome: "Camiseta Estampada", imagem: "https://via.placeholder.com/200x200", preco: 79.99, promocao: true, avaliacoes: 4.7, divisao: "3x de <span>26,66</span> sem juros" },
  { id: 8, nome: "Camiseta Polo", imagem: "https://via.placeholder.com/200x200", preco: 99.99, promocao: false, avaliacoes: 4.2, divisao: "4x de <span>24,99</span> sem juros" },
  { id: 9, nome: "Camiseta Regata", imagem: "https://via.placeholder.com/200x200", preco: 49.99, promocao: false, avaliacoes: 4.3, divisao: "1x de <span>49,99</span> sem juros" },
  { id: 10, nome: "Camiseta Slim Fit", imagem: "https://via.placeholder.com/200x200", preco: 89.99, promocao: true, avaliacoes: 4.6, divisao: "3x de <span>29,99</span> sem juros" }
];

const acessorios = [
  { id: 11, nome: "Boné Preto", imagem: "https://via.placeholder.com/200x200", preco: 39.99, promocao: false, avaliacoes: 4.5, divisao: "1x de <span>39,99</span> sem juros" },
  { id: 12, nome: "Óculos de Sol", imagem: "https://via.placeholder.com/200x200", preco: 149.99, promocao: true, avaliacoes: 4.8, divisao: "5x de <span>29,99</span> sem juros" },
  { id: 13, nome: "Relógio Esportivo", imagem: "https://via.placeholder.com/200x200", preco: 249.99, promocao: true, avaliacoes: 4.7, divisao: "10x de <span>24,99</span> sem juros" },
  { id: 14, nome: "Mochila Casual", imagem: "https://via.placeholder.com/200x200", preco: 199.99, promocao: false, avaliacoes: 4.6, divisao: "8x de <span>24,99</span> sem juros" },
  { id: 15, nome: "Carteira de Couro", imagem: "https://via.placeholder.com/200x200", preco: 89.99, promocao: false, avaliacoes: 4.3, divisao: "3x de <span>29,99</span> sem juros" }
];

// Validação robusta para garantir que os dados dos produtos estejam corretos
const validateProducts = (products) => {
  return products.every(product => 
      product.id && 
      product.nome && 
      product.imagem && 
      typeof product.preco === 'number' && 
      typeof product.promocao === 'boolean' && 
      typeof product.avaliacoes === 'number' && 
      product.divisao
  );
};

if (!validateProducts([...tenis, ...camisetas, ...acessorios])) {
  console.error("Um ou mais produtos têm dados inválidos.");
}

export { tenis, camisetas, acessorios };
