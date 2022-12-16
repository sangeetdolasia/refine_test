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
const MockAPI = () => {
  // let LocalDataItem: any = localStorage.getItem('dataItem');
  // if (!LocalDataItem) {
  // const dataItem =  [
  //   {
  //     id: 1,
  //     clint_type: "Local",
  //     clint_name: "Uman",
  //     status: true,
  //   },
  //   {
  //     id: 2,
  //     clint_type: "Local",
  //     clint_name: "Denish",
  //     status: true,
  //   },
  //   {
  //     id: 3,
  //     clint_type: "Local",
  //     clint_name: "Romi",
  //     status: true,
  //   },
  //   {
  //     id: 4,
  //     clint_type: "Local",
  //     clint_name: "Dhaval",
  //     status: true,
  //   },
  //   {
  //     id: 5,
  //     clint_type: "Local",
  //     clint_name: "Raghav",
  //     status: true,
  //   },
  //   {
  //     id: 6,
  //     clint_type: "International",
  //     clint_name: "Sangeet",
  //     status: true,
  //   },
  //   {
  //     id: 7,
  //     clint_type: "Local",
  //     clint_name: "Punit",
  //     status: true,
  //   },
  //   {
  //     id: 8,
  //     clint_type: "Local",
  //     clint_name: "Shayam",
  //     status: true,
  //   },
  //   {
  //     id: 9,
  //     clint_type: "Local",
  //     clint_name: "Sangeet",
  //     status: true,
  //   },
  //   {
  //     id: 10,
  //     clint_type: "Local",
  //     clint_name: "Geet",
  //     status: true,
  //   },
  // ];
  //   localStorage.setItem('dataItem', JSON.stringify(dataItem));
  //   LocalDataItem = dataItem;
  // } else {
  //   LocalDataItem = JSON.parse(LocalDataItem);
  // }

  // const dataItem: any = LocalDataItem;
  // This sets the mock adapter on the default instance

  let dataList: {
    id: string | number;
    clint_type: string;
    clint_name: string;
    status: boolean;
  }[] = [
    {
      id: 1,
      clint_type: "Local",
      clint_name: "Uman",
      status: true,
    },
    {
      id: 2,
      clint_type: "Local",
      clint_name: "Denish",
      status: true,
    },
    {
      id: 3,
      clint_type: "Local",
      clint_name: "Romi",
      status: true,
    },
    {
      id: 4,
      clint_type: "Local",
      clint_name: "Dhaval",
      status: true,
    },
    {
      id: 5,
      clint_type: "Local",
      clint_name: "Raghav",
      status: true,
    },
    {
      id: 6,
      clint_type: "International",
      clint_name: "Sangeet",
      status: true,
    },
    {
      id: 7,
      clint_type: "Local",
      clint_name: "Punit",
      status: true,
    },
    {
      id: 8,
      clint_type: "Local",
      clint_name: "Shayam",
      status: true,
    },
    {
      id: 9,
      clint_type: "Local",
      clint_name: "Sangeet",
      status: true,
    },
    {
      id: 10,
      clint_type: "Local",
      clint_name: "Geet",
      status: true,
    },
  ];

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
    const { offset, filters, sort } = config.params;

    const value = filters.length ? filters[0].value.toLowerCase() : "";

    if (offset === 0 && !filters.length) {
      dataList = dataList;    
    } else if (offset === 1 && !filters.length) {
      dataList = [
        {
          id: 11,
          clint_type: "Local",
          clint_name: "Ram",
          status: true,
        },
        {
          id: 12,
          clint_type: "Local",
          clint_name: "Shyam",
          status: true,
        },
      ];
    }

    if (
      filters.length &&
      filters[0].field === "clint_name" &&
      (value === "s" ||
        value === "sa" ||
        value === "san" ||
        value === "sang" ||
        value === "sange" ||
        value === "sangee" ||
        value === "sangeet")
    ) {
      dataList = [
        {
          id: 9,
          clint_type: "Local",
          clint_name: "Sangeet",
          status: true,
        },
      ];
    }

    if (
      sort.length &&
      sort[0].field === "clint_name" &&
      sort[0].order === "asc"
    ) {
      dataList = [
        {
          id: 1,
          clint_type: "Local",
          clint_name: "Sangeet",
          status: true,
        },
        {
          id: 2,
          clint_type: "Local",
          clint_name: "Ram",
          status: true,
        },
        {
          id: 3,
          clint_type: "Local",
          clint_name: "Manan",
          status: true,
        },
        {
          id: 4,
          clint_type: "Local",
          clint_name: "Karan",
          status: true,
        },
        {
          id: 5,
          clint_type: "Local",
          clint_name: "Hardik",
          status: true,
        },
        {
          id: 6,
          clint_type: "International",
          clint_name: "Gaurav",
          status: true,
        },
        {
          id: 7,
          clint_type: "Local",
          clint_name: "Dipak",
          status: true,
        },
        {
          id: 8,
          clint_type: "Local",
          clint_name: "Catur",
          status: true,
        },
        {
          id: 9,
          clint_type: "Local",
          clint_name: "Baman",
          status: true,
        },
        {
          id: 10,
          clint_type: "Local",
          clint_name: "Aaman",
          status: true,
        },
      ];
    } else if (
      sort.length &&
      sort[0].field === "clint_name" &&
      sort[0].order === "desc"
    ) {
      dataList = [
        {
          id: 1,
          clint_type: "Local",
          clint_name: "Aaman",
          status: true,
        },
        {
          id: 2,
          clint_type: "Local",
          clint_name: "Baman",
          status: true,
        },
        {
          id: 3,
          clint_type: "Local",
          clint_name: "Catur",
          status: true,
        },
        {
          id: 4,
          clint_type: "Local",
          clint_name: "Dipak",
          status: true,
        },
        {
          id: 5,
          clint_type: "International",
          clint_name: "Gaurav",
          status: true,
        },
        {
          id: 6,
          clint_type: "Local",
          clint_name: "Hardik",
          status: true,
        },
        {
          id: 7,
          clint_type: "Local",
          clint_name: "Karan",
          status: true,
        },
        {
          id: 8,
          clint_type: "Local",
          clint_name: "Manan",
          status: true,
        },
        {
          id: 9,
          clint_type: "Local",
          clint_name: "Ram",
          status: true,
        },
        {
          id: 10,
          clint_type: "Local",
          clint_name: "Sangeet",
          status: true,
        },
      ];
    }

    if (sort.length && sort[0].field === "id" && sort[0].order === "asc") {
      dataList.sort();
    } else if (
      sort.length &&
      sort[0].field === "id" &&
      sort[0].order === "desc"
    ) {
      dataList.reverse();
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (true) {
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
      } else {
        reject(new Error("Something went wrong please try again!"));
      }
    });
  });

  mock.onPatch(new RegExp(`${"lists"}/*`)).reply((config: any) => {
    console.log("configconfig", config);
    const data = JSON.parse(config.data);
    const id = config.url.split("/")[1];

    const objIndex: number = dataList.findIndex(
      (obj: any) => parseFloat(obj.id) === parseFloat(id)
    );
    dataList[objIndex] = data;
    console.log(dataList, "dataList");

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
        });
      } else {
        reject(new Error("Something went wrong please try again!"));
      }
    });
  });
};

export default MockAPI;
