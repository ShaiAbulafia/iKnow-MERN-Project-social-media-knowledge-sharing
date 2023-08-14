const normalizeUser = (rawUser) => {
  const name = { ...rawUser.name, middle: rawUser.name.middle || "" };

  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
    alt: rawUser.image.alt || "no picture user image",
  };

  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "",
    country: rawUser.address.country || "",
    city: rawUser.address.city || "",
    street: rawUser.address.street || "",
    houseNumber: rawUser.address.houseNumber || 0,
    zip: rawUser.address.zip || 0,
  };

  const user = {
    ...rawUser,
    name,
    image,
    address,
    phone: rawUser.phone || "",
  };

  return user;
};

module.exports = normalizeUser;
