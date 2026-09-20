require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const mongoose = require("mongoose");
const User = require("../routes/user/model");
const { ROLES, USER_STATUS } = require("../constants/roles");

const SEED_USERS = [
  {
    name: "Admin User",
    email: "admin@starter.com",
    password: "Admin123!",
    role: ROLES.ADMIN,
    status: USER_STATUS.ACTIVE,
  },
  {
    name: "Manager User",
    email: "manager@starter.com",
    password: "Manager123!",
    role: ROLES.MANAGER,
    status: USER_STATUS.ACTIVE,
  },
  {
    name: "Regular User",
    email: "user@starter.com",
    password: "User123!",
    role: ROLES.USER,
    status: USER_STATUS.ACTIVE,
  },
];

const seedDatabase = async () => {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/custom_setup_mern";

  try {
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB successfully.\n");

    console.log("--- Seeding Demo Users ---");
    for (const userData of SEED_USERS) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(
          `  [EXISTS]  ${userData.role.padEnd(8)}: ${userData.email}`,
        );
      } else {
        await User.create(userData);
        console.log(
          `  [CREATED] ${userData.role.padEnd(8)}: ${userData.email} (Password: ${userData.password})`,
        );
      }
    }

    console.log("\nDatabase seeding completed successfully.");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
    process.exit(0);
  }
};

seedDatabase();
