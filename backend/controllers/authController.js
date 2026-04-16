const jwt = require("jsonwebtoken");
const User = require("../models/User");

// helper function Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//@desc Register New user
// @route POST  /api/auth/register
// @access Public

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    if (!name || !email || !password) {
        return res.status(400).json({ message: "please Fill all the fields"});
    }
    //check if the user exists 
    const userExists = await User.findOne({email});
    if(userExists){
      return res.status(400).json({message:"User Already Exists"})
    }

    // Create User
    const user = await User.create ({name,email,password});

    if(user) {
      res.status(201).json({ _id:user._id, name:user.name,email:user.email,token:generateToken(user._id), });
    } else {
      res.status(400).json ({message:"Invalid user data"})
    }
  } catch (error) {
    console.error("REGISTER ERROR",error)
    res.status(500).json({ message: error.message });
  }
};

//@desc Login User
//route POST  /api/auth/login

exports.loginUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    if(!email || !password) {
      return res.status(400).json({message:"Please enter the email and password"})
    }

    const user = await User.findOne({email}).select("+password");
    if(user && (await user.matchPassword(password))) {
    return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        businessName: user.businessName || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    } else {
      return res.status(401).json({message:"Invalid Credentials"});
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error); 
    res.status(500).json({ message: error.message });
  }
};

//@desc Get current Logged-in user
//@route GET /api/auth/me
//@access Private

exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      businessName: req.user.businessName || "",
      address: req.user.address || "",
      phone: req.user.phone || "",
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc Update User Profile
//@route PUT /api/auth/me
//@access Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = req.user; 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields only if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.businessName = req.body.businessName || user.businessName;
    user.address = req.body.address || user.address;
    user.phone = req.body.phone || user.phone;

    // Password update (optional)
    if (req.body.password) {
      user.password = req.body.password; // will be hashed by pre-save middleware
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      businessName: updatedUser.businessName,
      address: updatedUser.address,
      phone: updatedUser.phone,
      token: generateToken(updatedUser._id), // optional but recommended
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};