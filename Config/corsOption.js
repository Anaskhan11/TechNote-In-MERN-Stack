import AllowedOrigin from "./AllowedOrigin.js";

const corsOption = {
  origin: (origin, callback) => {
    if (AllowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by Cors"));
    }
  },
  credentials: true,
  optionsSucessStatus: 200,
};

export default corsOption;
