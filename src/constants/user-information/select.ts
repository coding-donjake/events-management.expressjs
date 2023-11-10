import logConstant from "../log/select";
import userSelectConstant from "../user/select";

const userInformationSelectConstant: object = {
  id: true,
  lastName: true,
  firstName: true,
  middleName: true,
  suffix: true,
  gender: true,
  birthDate: true,
  User: { select: userSelectConstant },
  UserInformationLog: logConstant,
};

export default userInformationSelectConstant;
