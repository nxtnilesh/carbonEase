const register = async (req, res) => {
  const { email, bussinessName, password, role } = req.body;
  console.log("Req,", email, bussinessName, password, role);

  try {
    console.log();
  } catch (error) {
    logger.info(`Error in register ${error}`);
  }
};


export {register};