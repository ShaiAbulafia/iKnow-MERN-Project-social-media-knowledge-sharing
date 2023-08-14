const normalizeUser = (user) => {
  return {
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    phone: user.phone,
    email: user.email,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    aboutMe: user.aboutMe,
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      zip: user.zip,
      houseNumber: user.houseNumber,
    },
    securityQa: {
      grandfatherName: user.grandfatherName,
      firstSchool: user.firstSchool,
      motherLastName: user.motherLastName,
    },
  };
};
export default normalizeUser;
