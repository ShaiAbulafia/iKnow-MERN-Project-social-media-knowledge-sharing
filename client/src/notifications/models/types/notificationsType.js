import { shape, string, bool } from "prop-types";

const notificationType = shape({
  userId: string.isRequired,
  title: string.isRequired,
  avatarUrl: string.isRequired,
  avatarAlt: string.isRequired,
  createdAt: string.isRequired,
  target: string.isRequired,
  read: bool.isRequired,
});

export default notificationType;
