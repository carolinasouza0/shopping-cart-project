import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const sectionProducts = document.querySelector('.products');
const olCartProducts = document.querySelector('.cart__products');
const getTotalPrice = document.querySelector('.total-price');
const inputCategory = document.querySelector('#input-category');
const form = document.querySelector('form');

const updateTotalPrice = () => {
  const totalPriceStorage = JSON.parse(localStorage.getItem('totalPrice'));
  if (totalPriceStorage) {
    getTotalPrice.innerHTML = totalPriceStorage.toFixed(2);
  }
};

const createh2Element = (nameClass, message) => {
  const h2 = document.createElement('h2');
  h2.classList = nameClass;
  h2.innerHTML = message;
  return sectionProducts.appendChild(h2);
};

const displayProducts = async (value = 'computador') => {
  const data = await fetchProductsList(value);
  sectionProducts.innerHTML = '';
  data.forEach((element) => {
    sectionProducts.appendChild(createProductElement(element));
  });
};
displayProducts();

const createErrorElement = async () => {
  try {
    createh2Element('loading', 'carregando..');
    await displayProducts();
  } catch (error) {
    createh2Element('error', 'Algum erro ocorreu, recarregue a página e tente novamente');
  }
};
createErrorElement();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { value } = inputCategory;
  if (value) {
    displayProducts(value);
  } else {
    displayProducts();
  }
});

const addCartProduct = async (id) => {
  const data = await fetchProduct(id);
  const storagePrice = JSON.parse(localStorage.getItem('totalPrice'));
  if (!storagePrice) {
    localStorage.setItem('totalPrice', JSON.stringify(data.price));
  }
  localStorage.setItem('totalPrice', JSON.stringify(storagePrice + data.price));
  updateTotalPrice();
};

const addCartProducts = async (event) => {
  if (event.target.classList.contains('product__add')) {
    const productId = event.target.parentNode.firstChild.innerHTML;
    const data = await fetchProduct(productId);
    addCartProduct(productId);

    saveCartID(productId);
    olCartProducts.appendChild(createCartProductElement(data));
  }
};
document.addEventListener('click', addCartProducts);

const getCartProducts = async () => {
  const arrayIds = getSavedCartIDs();
  const promise = arrayIds.map((id) => fetchProduct(id));
  // console.log(promise);
  const getData = await Promise.all(promise);
  // console.log(getData);
  return getData.forEach((data) => {
    olCartProducts.appendChild(createCartProductElement(data));
  });
};

getCartProducts();

window.onload = () => {
  updateTotalPrice();
};

// https://api.mercadolibre.com/sites/MLB/categories - pensar em fazer um select/options com as categorias ao invés de um botão para procurar.
