const baseUrl = "http://localhost:3000/paletas";

const findAllPaletas = async () => {
  const resposta = await fetch(`${baseUrl}/todas-paletas`);

  const paletas = await resposta.json();

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

  const input = document.getElementById("inputIdPaleta");
  const id = input.value;

  const paleta = await findPaletaById(id);

if (paleta == false) {
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