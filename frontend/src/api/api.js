import axios from 'axios';

export const getTodos = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3003/api/todos/${userId}`, {
      withCredentials: true //to access cookies in req
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching todos:", err)
  }
};

export const addTodo = async (todoText, userId) => {
  try {
    const response = await axios.post(
      'http://localhost:3003/api/todos', 
      JSON.stringify({title: todoText, completed: false, userId: userId}),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
    return response.data
  } catch (err) {
    console.error("Error adding todo:", err)
  }
}

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3003/api/todos/${id}`, {withCredentials: true});
    return response.data.data;
  } catch (err) {
    console.error("Error fetching todos:", err)
  }
};

export const editTodo = async (id, text, completed, userId) => {
  try {
    const response = await axios.put(
      `http://localhost:3003/api/todos/${id}`,
      JSON.stringify({ id, title: text, completed, userId }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
    return response.data.data;
  } catch (err) {
    console.error("Error fetching todos:", err);
  }
};


export const loginUser = async (usernameOrPassword, password) => {
  const response = await axios.post(
    'http://localhost:3003/api/users/login', 
    JSON.stringify({usernameOrPassword: usernameOrPassword, password: password}),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }
  );
  return response
}

export const logoutUser = async () => {
  const response = await axios.post(
    'http://localhost:3003/api/users/logout', 
    null,
    {
      withCredentials: true
    }
  );
  return response.data
}

export const getToken = () => {
  return axios.post(`http://localhost:3003/api/users/get-token`, null, {
    withCredentials: true,
  })
}

export const getUser = async (token) => {
  const response = await axios.get(`http://localhost:3003/api/users/get-user`, {
    headers: {Authorization: token}
  })
  return response.data
}

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:3003/api/users/register',
      JSON.stringify({ username, email, password }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    );
    return response.data;
  } catch (err) {
    alert(err.response.data.err)
    console.error("Error registering user:", err);
    throw err;
  }
};

export const updateUser = async (userId, newInfo) => {
  try{
    const response = await axios.put(
      'http://localhost:3003/api/users/updateUser',
      JSON.stringify({ userId, newInfo }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
    )
    return response.data
  }catch (err) {

    console.error(err);
    throw err;
  }
}

export const getLeaderBoard = async () => {
  try {
    const response = await axios.get('http://localhost:3003/api/users/leaderboard', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};