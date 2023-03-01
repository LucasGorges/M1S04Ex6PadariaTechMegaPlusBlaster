class CaixaRegistradora {
  constructor() {
    this.estoque = [];

    if (localStorage.getItem("estoque")) {
      this.estoque = JSON.parse(localStorage.getItem("estoque"));
    }

    this.itensCompra = [];

    this.valorTotal = 0;
  }

  adicionarProduto(codigoBarra, preco, nome, quantidade) {
    const novoProduto = { codigoBarra, preco, nome, quantidade };
    this.estoque.push(novoProduto);

    localStorage.setItem("estoque", JSON.stringify(this.estoque));
  }

  iniciarAtendimento(nomeCliente) {
    console.log(`Bem-vindo, ${nomeCliente}!`);
  }

  adicionarItem(codigoBarra, quantidade) {
    const produto = this.estoque.find((p) => p.codigoBarra === codigoBarra);
    if (!produto) {
      console.log("Produto não encontrado no estoque");
      return;
    }

    if (produto.quantidade < quantidade) {
      console.log("Não há quantidade suficiente no estoque");
      return;
    }

    this.itensCompra.push({ codigoBarra, preco: produto.preco, quantidade });
    produto.quantidade -= quantidade;

    this.valorTotal += produto.preco * quantidade;
    console.log(
      `Item adicionado: ${produto.nome} (R$${produto.preco.toFixed(
        2
      )}) x ${quantidade}`
    );
  }

  calcularValorTotal() {
    console.log(`Valor total da compra: R$${this.valorTotal.toFixed(2)}`);
  }

  fecharConta(dinheiro) {
    const troco = dinheiro - this.valorTotal;
    if (troco < 0) {
      console.log("Dinheiro insuficiente");
      return;
    }
    console.log(`Conta fechada. Troco: R$${troco.toFixed(2)}`);
    this.itensCompra = [];
    this.valorTotal = 0;
    localStorage.setItem("estoque", JSON.stringify(this.estoque));
  }
}
