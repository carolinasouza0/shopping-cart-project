const input = document.querySelector('.cep-input');
export const getAddress = async (inputCep) => {
  let response = '';
  const api1 = `https://cep.awesomeapi.com.br/json/${inputCep}`;
  const api2 = `https://brasilapi.com.br/api/cep/v2/${inputCep}`;

  const getData = await Promise.any([
    fetch(api1).then((res) => res.json()),
    fetch(api2).then((res) => res.json()),
  ]);

  if (getData.cep) {
    const street = getData.street || getData.address;
    const district = getData.neighborhood || getData.district;
    response = `${street} - ${district} - ${getData.city} - ${getData.state}`;
  } else {
    throw new Error('CEP não encontrado');
  }
  return response;
};

export const searchCep = async () => {
  const cartAddress = document.querySelector('.cart__address');

  try {
    const address = await getAddress(input.value);
    cartAddress.innerHTML = address;
  } catch (error) {
    cartAddress.innerHTML = 'CEP não encontrado';
  }
};
