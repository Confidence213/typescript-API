require("dotenv").config();

export default {
  jwtSecret: process.env.JWT_SECRET || "@QEGTUI"
};
