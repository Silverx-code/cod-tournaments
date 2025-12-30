import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Replace this with your actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();

      // Mock user data - replace with actual API response
      const mockUser = {
        id: 1,
        username: email.split("@")[0],
        email: email,
        token: "mock-jwt-token",
      };

      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return mockUser;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid email or password");
    }
  };

  const signup = async (userData) => {
    try {
      // Replace this with your actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData)
      // });
      // const data = await response.json();

      // Mock user data - replace with actual API response
      const mockUser = {
        id: Date.now(),
        username: userData.username,
        email: userData.email,
        token: "mock-jwt-token",
      };

      // Save user to state and localStorage
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return mockUser;
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Failed to create account");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};