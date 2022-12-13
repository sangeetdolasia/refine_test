import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const ACCESS_TOKEN_USER_1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const Users = [
  {
    uid: 1,
    email: "ui-react@refine.com",
    password: "12345",
    first_name: "ui",
    last_name: "react",
    access_token: ACCESS_TOKEN_USER_1,
  },
];

/* eslint-disable max-lines-per-function, complexity */
const MockAPI = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  mock.onPost("login").reply((config: any) => {
    const { user } = JSON.parse(config.data);
    const validUser = Users.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser.length === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = validUser[0].access_token;

          // JWT AccessToken
          const tokenObj = { access_token: token }; // Token Obj
          const userObj = {
            uid: validUser[0].uid,
            email: validUser[0].email,
          };
          const validUserObj = { ...userObj, ...tokenObj }; // validUser Obj

          resolve([
            200,
            {
              success: true,
              data: validUserObj,
            },
          ]);
        } else {
          reject(new Error("Please enter the correct username and password."));
        }
      });
    });
  });

  mock.onGet("lists").reply((config: any) => {
    console.log("hiiiiiiiiiiii");

    const dataList = [
      {
        id: 1,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 2,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 3,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 4,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 5,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 6,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 7,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 8,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 9,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
      {
        id: 10,
        clint_type: "Local",
        clint_name: "sangeet",
        status: true,
      },
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (true) {
          resolve([
            200,
            {
              success: true,
              result: dataList,
            },
          ]);
        } else {
          reject(new Error("Please enter the correct username and password."));
        }
      });
    });
  });
};

export default MockAPI;
