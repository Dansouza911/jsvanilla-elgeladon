const baseUrl = "http://localhost:3000/paletas";
let listaDePaletas = [];

const findAllPaletas = async () => {
  const resposta = await fetch(`${baseUrl}/todas-paletas`);

  const paletas = await resposta.json();
  listaDePaletas = paletas;
  return paletas;
};

const findPaletaById = async (id) => {
  const resposta = await fetch(`${baseUrl}/paleta/${id}`);
  const paleta = await resposta.json();

  console.log(paleta);

  return paleta;
};
/* findPaletaById(); */

const criarPaleta = async (sabor, descricao, foto, preco) => {
  const paleta = {
    sabor,
    descricao,
    foto,
    preco,
  };

  const resposta = await fetch(`${baseUrl}/criar-paleta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const novaPaleta = await resposta.json();

  return novaPaleta;
};

const atualizarPaleta = async (id, sabor, descricao, foto, preco) => {
  const paleta = {
    sabor,
    descricao,
    foto,
    preco,
  };

  const resposta = await fetch(`${baseUrl}/atualizar-paleta/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(paleta),
  });

  const paletaAtualizada = await resposta.json();

  return paletaAtualizada;
};

const excluirPaleta = async (id) => {
  const resposta = await fetch(`${baseUrl}//excluir-paleta/${id}`, {
    method: "DELETE",
    mode: "cors",
  });

  if (resposta.status === 204) {
    return "Paleta excluída com sucesso";
  } else {
    return "Paleta não encontrada";
  }
};

const mostrarTodasAsPaletas = async () => {
  const paletas = await findAllPaletas();

  paletas.forEach((paleta) => {
    document.getElementById("paletaList").insertAdjacentHTML(
      "beforeend",
      `
      <div class="CardPaleta">
        <div class="CardPaleta__infos">
          <h4>${paleta.sabor}</h4>
          <span>R$${paleta.preco.toFixed(2)}</span>
          <p>${paleta.descricao}</p>
          <div>
          <button onclick="mostrarModalExclusao('${
            paleta._id
          }')" class="botao-excluir-paleta">APAGAR</button>
          <button onclick="mostrarModalEdicao('${
            paleta._id
          }')" class="botao-editar-paleta">EDITAR</button>
        </div>
        </div>
        <img src="./${paleta.foto}" alt="Paleta sabor ${
        paleta.sabor
      }" class="CardPaleta__foto"/>
      </div>
      `
    );
  });
};

mostrarTodasAsPaletas();

const imprimirUmaPaletaPorId = async () => {
  document.getElementById("paletaEscolhida").innerHTML = "";

  const input = document.getElementById("inputBuscaSaborPaleta");
  const sabor = input.value;

  const paletaSelecionada = listaDePaletas.find((elem) => elem.sabor === sabor);

  const id = paletaSelecionada._id;

  const paleta = await findPaletaById(id);

  if (paleta === false) {
    const mensagemDeErro = document.createElement("p");
    mensagemDeErro.id = "paletaEscolhida";
    mensagemDeErro.classList.add("PaletaPesquisada");
    mensagemDeErro.innerText = "Nenhuma paleta encontrada";

    document.getElementById("paletaEscolhida").appendChild(mensagemDeErro);
  } else {
    document.getElementById("paletaEscolhida").innerHTML = `
  <div class="CardPaleta">
        <div class="CardPaleta__infos">
          <h4>${paleta.sabor}</h4>
          <span>R$${paleta.preco.toFixed(2)}</span>
          <p>${paleta.descricao}</p>
        </div>
        <img src="./${paleta.foto}" alt="Paleta sabor ${
      paleta.sabor
    }" class="CardPaleta__foto"/>
      </div>
  `;
  }
};

const mostrarModalCriacao = () => {
  document.getElementById("fundoModalCriacao").style.display = "flex";
};

const mostrarModalExclusao = (id) => {
  document.getElementById("fundoModalExclusao").style.display = "flex";

  const botaoConfirmar = document.getElementById("botaoConfirmarExclusao");

  botaoConfirmar.addEventListener("click", async () => {
    const exclusao = await excluirPaleta(id);

    esconderModalExclusao();
    mostrarTodasAsPaletas();
  });
};

const mostrarModalEdicao = (id) => {
  document.getElementById("fundoModalEdicao").style.display = "flex";

  const paleta = listaDePaletas.find((elemento) => elemento._id === id);

  document.getElementById("inputSaborEdicao").value = paleta.sabor;
  document.getElementById("inputPrecoEdicao").value = paleta.preco;
  document.getElementById("inputDescricaoEdicao").value = paleta.descricao;
  document.getElementById("inputFotoEdicao").value = paleta.foto;

  const botaoAtualizar = document.getElementById("botaoConfirmarEdicao");

  botaoAtualizar.addEventListener("click", async () => {
    const sabor = document.getElementById("inputSaborEdicao").value;
    const preco = document.getElementById("inputPrecoEdicao").value;
    const descricao = document.getElementById("inputDescricaoEdicao").value;
    const foto = document.getElementById("inputFotoEdicao").value;

    await atualizarPaleta(id, sabor, descricao, foto, preco);

    esconderModalEdicao();
    mostrarTodasAsPaletas();
  });
};

const esconderModalCriacao = () => {
  document.getElementById("inputSabor").value = "";
  document.getElementById("inputPreco").value = "";
  document.getElementById("inputDescricao").value = "";
  document.getElementById("inputFoto").value = "";

  document.getElementById("fundoModalCriacao").style.display = "none";
};

const esconderModalExclusao = () => {
  document.getElementById("fundoModalExclusao").style.display = "none";
};

const esconderModalEdicao = () => {
  document.getElementById("fundoModalEdicao").style.display = "none";
};

const cadastrarNovaPaleta = async () => {
  const sabor = document.getElementById("inputSabor").value;
  const preco = document.getElementById("inputPreco").value;
  const descricao = document.getElementById("inputDescricao").value;
  const foto = document.getElementById("inputFoto").value;

  const paleta = await criarPaleta(sabor, descricao, foto, preco);

  document.getElementById("paletaList").insertAdjacentHTML(
    "beforeend",
    `
    <div class="CartaoPaleta">
      <div class="CartaoPaleta__infos">
        <h4>${paleta.sabor}</h4>
        <span>R$${paleta.preco.toFixed(2)}</span>
        <p>${paleta.descricao}</p>
        <div>
          <button onclick="mostrarModalExclusao('${
            paleta._id
          }')" class="botao-excluir-paleta">APAGAR</button>
          <button onclick="mostrarModalEdicao('${
            paleta._id
          }')" class="botao-editar-paleta">EDITAR</button>
        </div>
      </div>
      <img src="./${paleta.foto}" alt="Paleta sabor ${
      paleta.sabor
    }" class="CartaoPaleta__foto"/>
    </div>
  `
  );

  esconderModalCriacao();
};
