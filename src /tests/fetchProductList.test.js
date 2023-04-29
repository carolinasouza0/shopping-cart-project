import { fetchProductsList } from '../helpers/fetchFunctions';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    expect.assertions(1);

    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    expect.assertions(1);

    await fetchProductsList('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('retorno de fetchProductsList sem argumento é um erro com a mensagem Termo de busca não informado', async () => {
    expect.assertions();

    await expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });
});
