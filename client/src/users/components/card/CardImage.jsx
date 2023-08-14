import React from "react";
import CardMedia from "@mui/material/CardMedia";
import imageType from "../../models/types/imageType";

const CardHead = ({ image }) => {
  return (
    <CardMedia component="img" image={image.url} alt={image.alt} height={250} />
  );
};

CardHead.propTypes = {
  image: imageType.isRequired,
};
export default CardHead;
