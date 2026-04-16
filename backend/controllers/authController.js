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
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc Update User Profile
//@route PUT /api/auth/me
//@access Private
exports.updateUserProfile = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
