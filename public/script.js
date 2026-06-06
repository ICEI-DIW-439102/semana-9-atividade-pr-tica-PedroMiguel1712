const data = {
  "produtos": [
    {
      "id": 1,
      "nome": "Smartphone Galaxy S23",
      "preco": 3499.90,
      "categoria": "Celulares",
      "imagem": "https://example.com/imagens/galaxy-s23.jpg",
      "descricao": "Smartphone com 128GB de armazenamento, câmera de alta resolução e excelente desempenho.",
      "emEstoque": true
    },
    {
      "id": 2,
      "nome": "Notebook Dell Inspiron 15",
      "preco": 4599.00,
      "categoria": "Notebooks",
      "imagem": "https://example.com/imagens/dell-inspiron-15.jpg",
      "descricao": "Notebook com processador Intel i7, 16GB de RAM e SSD de 512GB, ideal para trabalho e estudos.",
      "emEstoque": false
    },
    {
      "id": 3,
      "nome": "Smart TV 15",
      "preco": 4599.00,
      "categoria": "Notebooks",
      "imagem": "https://example.com/imagens/dell-inspiron-15.jpg",
      "descricao": "TV :D",
      "emEstoque": false
    }
  ]
}

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");

function formatPrice(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute("data-id", produto.id);

  card.style.border = "1px solid #ccc";
  card.style.padding = "10px";
  card.style.margin = "10px";
  card.style.borderRadius = "8px";

  const titulo = document.createElement("h3");
  titulo.classList.add("card-title");
  titulo.textContent = produto.nome;

  const imagem = document.createElement("img");
  imagem.src = produto.imagem;
  imagem.alt = produto.nome;
  imagem.style.width = "100%";

  const preco = document.createElement("p");
  preco.textContent = formatPrice(produto.preco);

  const categoria = document.createElement("p");
  categoria.textContent = produto.categoria;

  const btnDetalhes = document.createElement("button");
  btnDetalhes.textContent = "Ver detalhes";

  btnDetalhes.addEventListener("click", () => {
    showProductDetails(produto);
  });

  const btnDestacar = document.createElement("button");
  btnDestacar.textContent = "Destacar";

  btnDestacar.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  card.appendChild(titulo);
  card.appendChild(imagem);
  card.appendChild(preco);
  card.appendChild(categoria);
  card.appendChild(btnDetalhes);
  card.appendChild(btnDestacar);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    productList.appendChild(createProductCard(produto));
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    console.log("ID do produto:", card.dataset.id);
  });
}

function renderCategories() {
  categorySelect.innerHTML = "";

  const todas = document.createElement("option");
  todas.value = "Todas";
  todas.textContent = "Todas";

  categorySelect.appendChild(todas);

  const categorias = [...new Set(data.produtos.map(produto => produto.categoria))];

  categorias.forEach(categoria => {
    const option = document.createElement("option");

    option.value = categoria;
    option.textContent = categoria;

    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h3>${produto.nome}</h3>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(produto => {
    const nomeValido = produto.nome.toLowerCase().includes(texto);

    const categoriaValida =
      categoria === "Todas" ||
      produto.categoria === categoria;

    return nomeValido && categoriaValida;
  });
}

searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);