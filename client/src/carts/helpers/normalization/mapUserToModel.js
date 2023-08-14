const mapUserToModel = (user) => {
  return {
    phone: user.phone,
    state: user.address.state,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    houseNumber: user.address.houseNumber,
    zip: user.address.zip,
  };
};

export default mapUserToModel;
