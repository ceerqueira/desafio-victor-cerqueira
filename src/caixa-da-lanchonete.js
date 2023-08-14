class CaixaDaLanchonete {
  cardapio = [
    { codigo: 'cafe', descricao: 'Café', valor: 3.0 },
    { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.5 },
    { codigo: 'suco', descricao: 'Suco Natural', valor: 6.2 },
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.5 },
    { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
    { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.5 }
  ];

  // Função para calcular o valor da compra com base nos itens escolhidos e forma de pagamento
  calcularValorDaCompra(formaDePagamento, itens) {
    // Verificar se não há itens no carrinho de compra
    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!';
    }

    let total = 0;
    // Extrair os códigos dos itens presentes no carrinho
    const nomesDosItens = itens.map(item => item.split(',')[0]);

    // Iterar sobre cada item no carrinho
    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');

      // Encontrar o item correspondente no cardápio
      const menu = this.cardapio.find(item => item.codigo === codigo);
      if (!menu) {
        return 'Item inválido!';
      }

      // Verificar se a quantidade é válida
      if (quantidade <= 0) {
        return 'Quantidade inválida!';
      }

      // Verificar se um item extra é pedido sem o principal correspondente ou se há incompatibilidade com combos
      if ((menu.descricao.includes('extra') && !(nomesDosItens.includes(menu.descricao.split(' ')[3].toLowerCase().split(')')[0].normalize('NFD').replace(/[\u0300-\u036f]/g, "")))))   {
        return 'Item extra não pode ser pedido sem o principal';
      }

      // Calcular o valor total da compra
      total += menu.valor * quantidade;
    }

    // Calcular descontos ou acréscimos com base na forma de pagamento
    if (formaDePagamento === 'dinheiro') {
      total *= 0.95; // 5% de desconto
    } else if (formaDePagamento === 'credito') {
      total *= 1.03; // 3% de acréscimo
    } else if (formaDePagamento !== 'debito' && formaDePagamento !== 'credito' && formaDePagamento !== 'dinheiro') {
      return 'Forma de pagamento inválida!';
    }

    // Formatar o valor total e retornar como string
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
