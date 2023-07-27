import React, {createContext, useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const {currentUser} = useAuth();

  useEffect(() => {
    if (currentUser && currentUser !== '') {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);

      setUserDetails({
        name: parsedUser?.name,
        email: parsedUser?.email,
        username: parsedUser?.username,
        phone: parsedUser?.phone,
        address: parsedUser?.address,
        age: parsedUser?.age,
        gender: parsedUser?.gender,
        avatar: parsedUser?.avatar,
        cover: parsedUser?.cover,
        bio: parsedUser?.bio,
        website: parsedUser?.website,
        birthday: parsedUser?.birthday,
      });
    }
  }, [currentUser]);

  return (
    <UserContext.Provider value={{userDetails, setUserDetails}}>
      {children}
    </UserContext.Provider>
  );
};
