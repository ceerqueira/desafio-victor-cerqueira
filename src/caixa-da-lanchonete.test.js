import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test('Compra de café com chantily', () => {
        validaTeste('debito', 'R$ 6,00', ['cafe,1', 'chantily,2']);
    });
    test('Compra de combo e dois cafés', () => {
        validaTeste('credito', 'R$ 15,96', ['combo1,1', 'cafe,2']);
    });
    test('Compra de item inexistente', () => {
        validaTeste('credito', 'Item inválido!', ['pizza,1']);
    });
    test('Compra com quantidade inválida', () => {
        validaTeste('debito', 'Quantidade inválida!', ['cafe,0']);
    });
    test('Compra com forma de pagamento inválida', () => {
        validaTeste('especie', 'Forma de pagamento inválida!', ['cafe,1']);
    });
    test('Compra de vários itens extras sem os principais correspondentes', () => {
        validaTeste('credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'queijo,1']);
    });
    test('Compra de combos e itens individuais', () => {
        validaTeste('credito', 'Item extra não pode ser pedido sem o principal', ['combo1,1', 'queijo,2']);
    });
    test('Compra de 1000 cafés', () => {
        const itens = Array.from({ length: 1000 }, () => 'cafe,1');
        validaTeste('dinheiro', 'R$ 2850,00', itens);
    });
    test('Compra com forma de pagamento inválida', () => {
        validaTeste('boleto', 'Forma de pagamento inválida!', ['cafe,1']);
    });
    test('Compra com código de item inexistente', () => {
        validaTeste('credito', 'Item inválido!', ['pizza,1']);
    });
    test('Compra com quantidade inválida', () => {
        validaTeste('debito', 'Quantidade inválida!', ['cafe,0']);
    });
    test('Compra de item extra sem o principal', () => {
        validaTeste('credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1']);
    });
    test('Compra de combo e extra', () => {
        validaTeste('debito', 'Item extra não pode ser pedido sem o principal', ['combo1,1', 'chantily,1']);
    });
    test('Compra com item inválido no meio', () => {
        validaTeste('dinheiro', 'Item inválido!', ['cafe,1', '1', 'sanduiche,1']);
    });
    test('Compra de sanduíche com queijo extra', () => {
        validaTeste('debito', 'R$ 8,50', ['sanduiche,1', 'queijo,1']);
    });
});
