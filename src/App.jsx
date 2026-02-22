import { useState } from 'react'
import './App.css'

function App() {
  // --- ESTADOS (Memória) ---//
  const [carrinho, setCarrinho] = useState([]); 
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  
  // O total precisa vir DEPOIS da criação do carrinho
  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

  // --- DADOS ---
  const restaurante = { nome: "Burger do Dev", cor: "#e74c3c", fone: "5511971128269" };
  const produtos = [
    { id: 1, nome: "Combo Smash", preco: 25.90, categoria: "Hambúrguer", destaque: true, desc: "2 blends de 90g e queijo.",
      imagem: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop"
     },
    { id: 2, nome: "Batata Suprema", preco: 18.00, categoria: "Acompanhamentos", destaque: true, desc: "Cheddar e bacon crocante.",
      imagem: "/batata.png" 
    },
    { id: 3, nome: "Coca-Cola", preco: 7.00, categoria: "Bebidas", destaque: true, desc: "Lata 350ml gelada.",
      imagem: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop"
     }
  ];

  // --- FUNÇÕES ---
  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  const enviarWhatsApp = () => {
    
    const itensPedido = carrinho.map(item => `- ${item.nome}`).join('\n');
    const mensagem = `Olá! Gostaria de fazer um pedido:\n${itensPedido}\n\n*Total: R$ ${total.toFixed(2)}*`;
    const link = `https://wa.me/${restaurante.fone}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="container">
      <header className="header-dinamico">
        <div className="header-content">
          <img src="/logo.png" alt="Logo" className="logo-restaurante" />
          <div className="header-info">
            <h1>{restaurante.nome}</h1>
            <div className="status-container">
              <span className="badge-status">● Aberto</span>
              <span className="tempo-entrega">🕒 30-45 min</span>
            </div>
          </div>

          <div className="carrinho-header" onClick={() => setCarrinhoAberto(!carrinhoAberto)}>
            <span className="icone-carrinho">🛒</span>
            
            {carrinho.length > 0 && (
              <span className="badge-quantidade">{carrinho.length}</span>
            )}
          </div>
        </div>
      </header>

      {/* 1. SEÇÃO DE DESTAQUE */}
      <main className="container-cardapio">
  
  {/* 1. SEÇÃO DE DESTAQUE */}
  <section className="secao-destaque">
    <h2>🔥 Destaques do Dia</h2>
    <div className="scroll-horizontal">
      {produtos.filter(p => p.destaque).map(item => (
        <div key={item.id} className="card-destaque" onClick={() => adicionarAoCarrinho(item)}>
          <img src={item.imagem} alt={item.nome} />
          <div className="info-destaque">
            <h3>{item.nome}</h3>
            <span>R$ {item.preco.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 2. FILTRO DE CATEGORIAS */}
  <nav className="filtros">
    {['Todos', 'Hambúrguer', 'Acompanhamentos', 'Bebidas'].map(cat => (
      <button 
        key={cat}
        className={categoriaAtiva === cat ? 'active' : ''} 
        onClick={() => setCategoriaAtiva(cat)}
      >
        {cat}
      </button>
    ))}
  </nav>

  {/* 3. LISTA FILTRADA */}
  <section className="lista-produtos">
    {produtos
      .filter(p => categoriaAtiva === 'Todos' || p.categoria === categoriaAtiva)
      .map((item) => (
        <div key={item.id} className="card-produto-compacto">
          <div className="info-texto">
            <h3>{item.nome}</h3>
            <p>{item.desc}</p>
            <strong>R$ {item.preco.toFixed(2)}</strong>
          </div>
          <div className="area-foto">
            <img src={item.imagem} alt={item.nome} />
            <button className="btn-add-mini" onClick={() => adicionarAoCarrinho(item)}>+</button>
          </div>
        </div>
    ))}
  </section>
</main>


     
      {carrinho.length > 0 && (
        <footer className="position-fixed">
          {carrinhoAberto && (
            <div className="revisao-pedido">
              <div className="revisao-header">
                <h3>Seu Pedido</h3>
                <button onClick={() => setCarrinhoAberto(false)}>Fechar [x]</button>
              </div>
              <ul className="itens-revisao">
                {carrinho.map((item, index) => (
                  <li key={index}>
                    <span>{item.nome}</span>
                    <strong>R$ {item.preco.toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="total-info" onClick={() => setCarrinhoAberto(!carrinhoAberto)} style={{cursor: 'pointer'}}>
            <span>{carrinhoAberto ? "⬇️ Fechar detalhes" : "⬆️ Ver detalhes"}</span>
            <span>Total: <strong>R$ {total.toFixed(2)}</strong></span>
          </div>

          <button className="btn-pedido" onClick={enviarWhatsApp}>
            Finalizar Pedido (WhatsApp)
          </button>
        </footer>
      )}
    </div>
  )
}

export default App