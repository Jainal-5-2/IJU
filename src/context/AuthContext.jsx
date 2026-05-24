import { createContext, useState, useContext, useEffect, createElement } from 'react';
import { mockUsers, mockSchools, platformAdmin } from '../mock/mock_data';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('iju_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Student login
  const studentLogin = (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      return { success: false, error: 'User not found. Please register first.' };
    }
    
    // Check if student is verified by school
    if (foundUser.verificationStatus !== 'approved') {
      return { success: false, error: 'Your account is pending verification by your school admin.' };
    }
    
    const school = mockSchools.find(s => s.id === foundUser.schoolId);
    const userData = {
      ...foundUser,
      school: school,
      role: foundUser.role,
      userType: 'student'
    };
    
    setUser(userData);
    localStorage.setItem('iju_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  // School admin login
  const schoolAdminLogin = (email, password) => {
    const foundSchool = mockSchools.find(s => s.schoolAdminEmail === email);
    
    if (!foundSchool) {
      return { success: false, error: 'School admin account not found.' };
    }
    
    if (foundSchool.status !== 'approved') {
      return { success: false, error: 'Your school is pending approval by platform admin.' };
    }
    
    if (foundSchool.schoolAdminPassword !== password) {
      return { success: false, error: 'Invalid password.' };
    }
    
    const userData = {
      id: foundSchool.id,
      email: email,
      role: 'school_admin',
      name: `${foundSchool.name} Admin`,
      school: foundSchool,
      userType: 'school_admin'
    };
    
    setUser(userData);
    localStorage.setItem('iju_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  // Platform admin login
  const platformAdminLogin = (email, password) => {
    if (platformAdmin.email === email && platformAdmin.password === password) {
      const userData = {
        ...platformAdmin,
        userType: 'platform_admin'
      };
      setUser(userData);
      localStorage.setItem('iju_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Invalid platform admin credentials.' };
  };

  // Unified login that detects user type
  const login = (email, password, userType) => {
    if (userType === 'student') {
      return studentLogin(email, password);
    } else if (userType === 'school_admin') {
      return schoolAdminLogin(email, password);
    } else if (userType === 'platform_admin') {
      return platformAdminLogin(email, password);
    }
    
    return { success: false, error: 'Invalid login type.' };
  };

  // Student registration
  const registerStudent = (userData) => {
    const school = mockSchools.find(s => s.id === userData.schoolId);
    
    if (!school) {
      return { success: false, error: 'School not found' };
    }
    
    if (school.status !== 'approved') {
      return { success: false, error: 'School is not yet approved by admin' };
    }
    
    // Check email domain
    if (userData.email && !userData.email.endsWith(school.emailDomain)) {
      return { success: false, error: `Email must end with ${school.emailDomain}` };
    }
    
    // Check if email already exists
    if (mockUsers.find(u => u.email === userData.email)) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user with pending verification
    const newUser = {
      id: mockUsers.length + 1,
      email: userData.email,
      role: userData.role,
      schoolId: userData.schoolId,
      name: userData.name,
      verifiedBySchool: false,
      verificationStatus: 'pending',
      studentId: `STU-${Date.now()}`,
      registeredAt: new Date().toISOString().split('T')[0]
    };
    
    // In real app, this would be an API call
    // For mock, we'll add to the array (but won't persist on refresh)
    mockUsers.push(newUser);
    
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('iju_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('iju_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    registerStudent,
    logout,
    updateUser,
    loading
  };

  return createElement(AuthContext.Provider, { value }, children);
};