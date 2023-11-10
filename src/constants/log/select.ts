import logOrderByConstant from "./order-by";

const logConstant: object = {
  orderBy: logOrderByConstant,
  select: {
    id: true,
    datetime: true,
    type: true,
    Operator: {
      select: {
        id: true,
        username: true,
        status: true,
        Admin: {
          select: {
            username: true,
            role: true,
            status: true,
          },
        },
        UserInformation: {
          select: {
            lastName: true,
            firstName: true,
            middleName: true,
            suffix: true,
            gender: true,
            birthDate: true,
          },
        },
      },
    },
  },
};

export default logConstant;
