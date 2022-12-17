import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import _ from "lodash";

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
let crud = false;
const MockAPI = () => {
  // This sets the mock adapter on the default instance

  let dataList: {
    id: string | number;
    client_type: string;
    client_name: string;
    status: boolean;
  }[] = [
    {
      id: 1,
      client_type: "Local",
      client_name: "Uman",
      status: false,
    },
    {
      id: 2,
      client_type: "Local",
      client_name: "Denish",
      status: true,
    },
    {
      id: 3,
      client_type: "Local",
      client_name: "Romi",
      status: true,
    },
    {
      id: 4,
      client_type: "Local",
      client_name: "Dhaval",
      status: true,
    },
    {
      id: 5,
      client_type: "Local",
      client_name: "Raghav",
      status: true,
    },
    {
      id: 6,
      client_type: "International",
      client_name: "Sangeet",
      status: true,
    },
    {
      id: 7,
      client_type: "Local",
      client_name: "Punit",
      status: true,
    },
    {
      id: 8,
      client_type: "Local",
      client_name: "Shayam",
      status: true,
    },
    {
      id: 9,
      client_type: "Local",
      client_name: "Sangeet",
      status: true,
    },
    {
      id: 10,
      client_type: "Local",
      client_name: "Geet",
      status: true,
    },
  ];

  const mock = new MockAdapter(axios);
  mock.onPost("login").reply((config: any) => {
    const { email, password } = JSON.parse(config.data);

    const validUser = Users.filter(
      (usr) => usr?.email === email && usr?.password === password
    );
    console.log(validUser, "validUser");

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
          console.log("dfsdfdsfd");

          reject(new Error("Please enter the correct username and password."));
        }
      });
    });
  });

  mock.onGet("lists").reply((config: any) => {
    const { offset, filters, sort } = config.params;

    const value = filters.length ? filters[0].value.toLowerCase() : "";

    if (offset === 0 && !filters.length) {
      if (!crud) {
        dataList = [
          {
            id: 1,
            client_type: "Local",
            client_name: "Uman",
            status: false,
          },
          {
            id: 2,
            client_type: "Local",
            client_name: "Denish",
            status: true,
          },
          {
            id: 3,
            client_type: "Local",
            client_name: "Romi",
            status: true,
          },
          {
            id: 4,
            client_type: "Local",
            client_name: "Dhaval",
            status: true,
          },
          {
            id: 5,
            client_type: "Local",
            client_name: "Raghav",
            status: true,
          },
          {
            id: 6,
            client_type: "International",
            client_name: "Sangeet",
            status: true,
          },
          {
            id: 7,
            client_type: "Local",
            client_name: "Punit",
            status: true,
          },
          {
            id: 8,
            client_type: "Local",
            client_name: "Shayam",
            status: true,
          },
          {
            id: 9,
            client_type: "Local",
            client_name: "Sangeet",
            status: true,
          },
          {
            id: 10,
            client_type: "Local",
            client_name: "Geet",
            status: true,
          },
        ];
      } else {
        dataList = dataList;
      }
    } else if (offset === 1 && !filters.length) {
      if (!crud) {
        dataList = [
          {
            id: 11,
            client_type: "Local",
            client_name: "Ram",
            status: true,
          },
          {
            id: 12,
            client_type: "Local",
            client_name: "Shyam",
            status: true,
          },
        ];
      } else {
        dataList = dataList;
        crud = false;
      }
    }

    if (
      filters.length &&
      filters[0].field === "client_name" &&
      (value === "s" ||
        value === "sa" ||
        value === "san" ||
        value === "sang" ||
        value === "sange" ||
        value === "sangee" ||
        value === "sangeet")
    ) {
      if (!crud) {
        dataList = [
          {
            id: 9,
            client_type: "Local",
            client_name: "Sangeet",
            status: true,
          },
        ];
      } else {
        dataList = dataList;
        crud = false;
      }
    }

    if (
      sort.length &&
      sort[0].field === "client_name" &&
      sort[0].order === "asc" &&
      offset !== 1
    ) {
      if (!crud) {
        dataList = [
          {
            id: 1,
            client_type: "Local",
            client_name: "Sangeet",
            status: true,
          },
          {
            id: 2,
            client_type: "Local",
            client_name: "Ram",
            status: true,
          },
          {
            id: 3,
            client_type: "Local",
            client_name: "Manan",
            status: true,
          },
          {
            id: 4,
            client_type: "Local",
            client_name: "Karan",
            status: true,
          },
          {
            id: 5,
            client_type: "Local",
            client_name: "Hardik",
            status: true,
          },
          {
            id: 6,
            client_type: "International",
            client_name: "Gaurav",
            status: true,
          },
          {
            id: 7,
            client_type: "Local",
            client_name: "Dipak",
            status: true,
          },
          {
            id: 8,
            client_type: "Local",
            client_name: "Catur",
            status: true,
          },
          {
            id: 9,
            client_type: "Local",
            client_name: "Baman",
            status: true,
          },
          {
            id: 10,
            client_type: "Local",
            client_name: "Aaman",
            status: true,
          },
        ];
      } else {
        dataList = dataList;
        crud = false;
      }
    } else if (
      sort.length &&
      sort[0].field === "client_name" &&
      sort[0].order === "desc" &&
      offset !== 1
    ) {
      if (!crud) {
        dataList = [
          {
            id: 1,
            client_type: "Local",
            client_name: "Aaman",
            status: true,
          },
          {
            id: 2,
            client_type: "Local",
            client_name: "Baman",
            status: true,
          },
          {
            id: 3,
            client_type: "Local",
            client_name: "Catur",
            status: true,
          },
          {
            id: 4,
            client_type: "Local",
            client_name: "Dipak",
            status: true,
          },
          {
            id: 5,
            client_type: "International",
            client_name: "Gaurav",
            status: true,
          },
          {
            id: 6,
            client_type: "Local",
            client_name: "Hardik",
            status: true,
          },
          {
            id: 7,
            client_type: "Local",
            client_name: "Karan",
            status: true,
          },
          {
            id: 8,
            client_type: "Local",
            client_name: "Manan",
            status: true,
          },
          {
            id: 9,
            client_type: "Local",
            client_name: "Ram",
            status: true,
          },
          {
            id: 10,
            client_type: "Local",
            client_name: "Sangeet",
            status: true,
          },
        ];
      } else {
        dataList = dataList;
        crud = false;
      }
    }

    if (sort.length && sort[0].field === "id" && sort[0].order === "asc") {
      if (!crud) {
        dataList.sort();
      } else {
        dataList = dataList;
        crud = false;
      }
    } else if (
      sort.length &&
      sort[0].field === "id" &&
      sort[0].order === "desc"
    ) {
      if (!crud) {
        dataList.reverse();
      } else {
        dataList = dataList;
        crud = false;
      }
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (resolve) {
          resolve([
            200,
            {
              success: true,
              result: { data: dataList, total: 12 },
            },
          ]);
        } else {
          reject(new Error("Please enter the correct username and password."));
        }
      });
    });
  });

  mock.onGet(new RegExp(`${"lists"}/*`)).reply((config: any) => {
    const id = config.url.split("/")[1];

    const objIndex: number = dataList.findIndex(
      (obj: any) => parseFloat(obj.id) === parseFloat(id)
    );

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: dataList[objIndex],
            },
          ]);
        });
        crud = true;
      } else {
        reject(new Error("Something went wrong please try again!"));
      }
    });
  });

  mock.onPatch(new RegExp(`${"lists"}/*`)).reply((config: any) => {
    const data = JSON.parse(config.data);
    const id = config.url.split("/")[1];

    const objIndex: number = dataList.findIndex(
      (obj: any) => parseFloat(obj.id) === parseFloat(id)
    );
    dataList[objIndex] = data;

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: dataList,
            },
          ]);
          crud = true;
        });
      } else {
        reject(new Error("Something went wrong please try again!"));
      }
    });
  });

  mock.onPost("lists").reply((config: any) => {
    const data = JSON.parse(config.data);

    const item = { ...data };
    item.id = dataList.length + 1;

    dataList.push(item);

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: dataList,
            },
          ]);
          crud = true;
        });
      } else {
        reject(new Error("Something went wrong please try again!"));
      }
    });
  });

  mock.onDelete(new RegExp(`${"lists"}/*`)).reply((config: any) => {
    const id = config.url.split("/")[1];

    const objIndex: number = dataList.findIndex(
      (obj: any) => parseFloat(obj.id) === parseFloat(id)
    );
    dataList.splice(objIndex, 1);

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: dataList,
            },
          ]);
          crud = true;
        });
      } else {
        reject(new Error("Something went wrong please try again!"));
      }
    });
  });
};

export default MockAPI;
