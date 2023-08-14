const mapUserToModel = (user) => {
  return {
    first: user.name.first,
    middle: user.name.middle,
    last: user.name.last,
    phone: user.phone,
    email: user.email,
    password: user.password,
    url: user.image.url,
    alt: user.image.alt,
    aboutMe: user.aboutMe,
    state: user.address.state,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    houseNumber: user.address.houseNumber,
    zip: user.address.zip,
    grandfatherName: user.securityQa.grandfatherName,
    firstSchool: user.securityQa.firstSchool,
    motherLastName: user.securityQa.motherLastName,
  };
};

export default mapUserToModel;
