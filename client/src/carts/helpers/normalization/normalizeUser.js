const normalizeUser = (user) => {
  return {
    phone: user.phone,
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      zip: user.zip,
      houseNumber: user.houseNumber,
    },
  };
};
export default normalizeUser;
