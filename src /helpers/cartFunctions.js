import { fetchProduct } from './fetchFunctions';

const getTotalPrice = document.querySelector('.total-price');
/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const newCartProducts = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
};

const updateTotalPrice = () => {
  const totalPriceStorage = JSON.parse(localStorage.getItem('totalPrice'));
  if (totalPriceStorage) {
    getTotalPrice.innerHTML = totalPriceStorage.toFixed(2);
  }
};

// diminui valor do produto no localStorage
const removeCartProduct = async (id) => {
  const data = await fetchProduct(id);
  const storagePrice = JSON.parse(localStorage.getItem('totalPrice'));
  const subPrice = storagePrice - data.price;
  localStorage.setItem('totalPrice', JSON.stringify(subPrice));
  updateTotalPrice();
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');
  removeCartProduct(id);
  const cartProducts = [...getSavedCartIDs()];
  const indexProduct = cartProducts.indexOf(id);
  cartProducts.splice(indexProduct, 1);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};
