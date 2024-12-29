// example use action for login
export const setToken = (token: string | null) => {
  return {
    type: 'SET_TOKEN',
    token,
  };
};

export const setUser = (user: any) => {
  return {
    type: 'SET_USER',
    user: user,
  };
};
