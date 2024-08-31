


const registerHandler = () => {
    try {
      fetch("http://127.0.0.1:4000/auth/register", {
        method: "POST",
        body: JSON.stringify({
            "name":"Aryan",
            "email":"rajaryan9358@gmail.com",
            "password":"Qwerty1@"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        //   login(json);
        });
    } catch (error) {
      console.log(error);
    }
  };


  registerHandler();