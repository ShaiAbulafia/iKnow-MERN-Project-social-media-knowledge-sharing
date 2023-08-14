const DB = process.env.DB || "MONGODB";
const User = require("./mongodb/User");
const lodash = require("lodash");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const {
  newSystemNotification,
  newNotification,
} = require("../../notifications/models/notificationsAccessDataService");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) throw new Error("User already registered");

      user = new User(normalizedUser);
      user = await user.save();

      newSystemNotification({
        userId: user._id,
        target: `user/view/${user._id}`,
        title: "Welcome to iKnow!",
      });
      user = lodash.pick(user, ["name", "email", "_id"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser new user not in mongodb");
};

const loginUser = async ({ email, password, attempt }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email });

      if (!user)
        throw new Error("Authentication Error: Invalid email or password");

      if (!!user.blockedTill) {
        const curDate = new Date();
        const userDate = new Date(user.blockedTill);
        if (curDate >= user.blockedTill) {
          await User.findOneAndUpdate(
            { email },
            { blockedTill: null },
            {
              new: true,
            }
          );
        }
        throw new Error(
          `User blocked. Block remove on: ${userDate.toLocaleTimeString()}`
        );
      }

      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {
        if (!user.isAdmin && attempt >= 3) {
          let blockTime = new Date();
          blockTime.setHours(blockTime.getHours() + 24);
          await User.findOneAndUpdate(
            { email },
            { blockedTill: blockTime },
            {
              new: true,
            }
          );
          throw new Error("User blocked after 3 unsuccessful attempts");
        }
        throw new Error("Authentication Error: Invalid email or password");
      }

      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("loginUser user not in mongodb");
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 });
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const getViewUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        name: 1,
        aboutMe: 1,
        kPoints: 1,
        image: 1,
        follows: 1,
        createdAt: 1,
      });
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const getUserDisplay = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        name: 1,
        aboutMe: 1,
        kPoints: 1,
        image: 1,
        follows: 1,
        createdAt: 1,
      });
      if (!user) {
        let deletedUser = {
          _id: "deleted",
          image: {
            url: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png",
            alt: "no picture user image",
          },
          name: { first: "deleted", middle: "", last: "user" },
        };
        return Promise.resolve(deletedUser);
      }
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const getUsersDisplay = async () => {
  if (DB === "MONGODB") {
    try {
      let users = await User.find().select({
        name: 1,
        aboutMe: 1,
        kPoints: 1,
        image: 1,
        follows: 1,
        createdAt: 1,
        isAdmin: 1,
      });
      const noAdminsUsers = users.filter((user) => !user.isAdmin);
      return Promise.resolve(noAdminsUsers);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const getUserAddress = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId);
      if (!user) throw new Error("Could not find this user in the database");
      return Promise.resolve({
        phone: user.phone,
        address: user.address,
      });
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId);
      if (user.email !== normalizedUser.email) {
        let userTaken = await User.find({ email: normalizedUser.email });
        if (userTaken) throw new Error("Email already registered");
      }
      user = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      });
      if (!user)
        throw new Error("A user with this ID cannot be found in the database");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user update not in mongodb");
};

const updateUserPass = async (userInfo) => {
  if (DB === "MONGODB") {
    try {
      console.log(userInfo);
      let user = await User.findOne({ email: userInfo.email });
      if (!user) throw new Error("Invalid informations");
      if (
        user.securityQa.grandfatherName !== userInfo.grandfatherName ||
        user.securityQa.firstSchool !== userInfo.firstSchool ||
        user.securityQa.motherLastName !== userInfo.motherLastName
      )
        throw new Error("Invalid informations");

      user.password = userInfo.password;
      user = await user.save();

      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUserContact = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId);
      if (!user)
        throw new Error("A user with this ID cannot be found in the database");
      user.phone = normalizedUser.phone;
      user.address = normalizedUser.address;

      user = await user.save();
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user update not in mongodb");
};

const changeUserBlock = async (userId, isBlock) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId);
      if (!user) return Promise.resolve();

      if (isBlock) {
        let blockTime = new Date();
        blockTime.setHours(blockTime.getHours() + 24);
        let newUser = await User.findByIdAndUpdate(
          userId,
          { blockedTill: blockTime },
          {
            new: true,
          }
        );
        return Promise.resolve(newUser);
      }

      let newUser = await User.findByIdAndUpdate(
        userId,
        { blockedTill: null },
        {
          new: true,
        }
      );
      return Promise.resolve(newUser);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card liked not in mongodb");
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser)
        throw new Error("A user with this ID cannot be found in the database");
      return Promise.resolve(deletedUser);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user deleted not in mongodb");
};

const changeUserKpoints = async (userId, kPoints) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId);
      if (!user)
        throw new Error("A user with this ID cannot be found in the database");
      user.kPoints = user.kPoints + kPoints;
      if (user.kPoints < 0) {
        user.kPoints = 0;
      }
      user = await user.save();
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user deleted not in mongodb");
};

const followUser = async (userId, followerId) => {
  if (DB === "MONGODB") {
    try {
      let followerUser = await User.findById(followerId);
      if (!followerUser)
        throw new Error("A user with your ID cannot be found in the database");
      let followerName = `${followerUser.name.first} ${followerUser.name.middle} ${followerUser.name.last}`;
      if (followerUser.name.middle === "")
        followerName = `${followerUser.name.first} ${followerUser.name.last}`;
      let user = await User.findById(userId);

      if (!user)
        throw new Error("A user with this ID cannot be found in the database");
      const followers = user.follows.find((id) => id === followerId);

      if (!followers) {
        user.follows.push(followerId);
        user = await user.save();
        newNotification({
          userId: userId,
          title: `${followerName} is following you`,
          avatarUrl: followerUser.image.url,
          avatarAlt: followerUser.image.alt,
          target: `user/view/${followerUser._id}`,
        });
        return Promise.resolve();
      }

      const followsFiltered = user.follows.filter((id) => id !== followerId);
      user.follows = followsFiltered;
      user = await user.save();
      newNotification({
        userId: userId,
        title: `${followerName} no longer follows you`,
        avatarUrl: followerUser.image.url,
        avatarAlt: followerUser.image.alt,
        target: `user/view/${followerUser._id}`,
      });
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("user followed not in mongodb");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBlock = changeUserBlock;
exports.deleteUser = deleteUser;
exports.getViewUser = getViewUser;
exports.getUserAddress = getUserAddress;
exports.updateUserContact = updateUserContact;
exports.getUserDisplay = getUserDisplay;
exports.changeUserKpoints = changeUserKpoints;
exports.updateUserPass = updateUserPass;
exports.followUser = followUser;
exports.getUsersDisplay = getUsersDisplay;
