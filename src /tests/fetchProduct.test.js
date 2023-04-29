import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    expect.assertions();

    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    expect.assertions();

    await fetchProduct('MLB1405519561');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1405519561';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('retorno de fetchProduct é uma estrutura de datos igual ao objeto product', async () => {
    expect.assertions();

    const returned = await fetchProduct('MLB1405519561');
    expect(returned).toEqual(product);
  });

  it('retorno de fetchProduct sem argumento é um erro com a mensagem ID não informado', async () => {
    expect.assertions();

    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });
});
