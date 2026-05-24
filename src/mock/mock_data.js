export const mockSchools = [
  { 
    id: 1, 
    name: "Lincoln High School", 
    emailDomain: "@lincoln.edu", 
    status: "approved",  // pending, approved, rejected
    schoolAdminEmail: "admin@lincoln.edu",
    schoolAdminPassword: "school123",
    address: "123 Lincoln Ave, Springfield",
    phone: "(555) 123-4567"
  },
  { 
    id: 2, 
    name: "Washington Academy", 
    emailDomain: "@washington.edu", 
    status: "pending",
    schoolAdminEmail: "admin@washington.edu",
    schoolAdminPassword: "school123",
    address: "456 Washington Blvd, Springfield",
    phone: "(555) 234-5678"
  },
  { 
    id: 3, 
    name: "Jefferson School", 
    emailDomain: "@jefferson.edu", 
    status: "pending",
    schoolAdminEmail: "admin@jefferson.edu",
    schoolAdminPassword: "school123",
    address: "789 Jefferson St, Springfield",
    phone: "(555) 345-6789"
  },
];

export const mockUsers = [
  { 
    id: 1, 
    email: "student@lincoln.edu", 
    role: "tutee", 
    schoolId: 1, 
    name: "John Doe",
    verifiedBySchool: true,
    verificationStatus: "approved",
    studentId: "STU-2024-001",
    registeredAt: "2024-01-15"
  },
  { 
    id: 2, 
    email: "tutor@lincoln.edu", 
    role: "tutor", 
    schoolId: 1, 
    name: "Jane Smith",
    verifiedBySchool: true,
    verificationStatus: "approved",
    studentId: "STU-2024-002",
    registeredAt: "2024-01-20"
  },
  { 
    id: 3, 
    email: "pending@lincoln.edu", 
    role: "tutee", 
    schoolId: 1, 
    name: "Pending User",
    verifiedBySchool: false,
    verificationStatus: "pending",
    studentId: "STU-2024-003",
    registeredAt: "2024-01-25"
  },
  { 
    id: 4, 
    email: "newstudent@lincoln.edu", 
    role: "tutor", 
    schoolId: 1, 
    name: "New Student",
    verifiedBySchool: false,
    verificationStatus: "pending",
    studentId: "STU-2024-004",
    registeredAt: "2024-01-26"
  },
];

export const platformAdmin = {
  id: 999,
  email: "admin@iju.com",
  role: "platform_admin",
  name: "Platform Admin",
  password: "admin123"
};

// Helper function to get students by school
export const getStudentsBySchool = (schoolId) => {
  return mockUsers.filter(user => user.schoolId === schoolId);
};

// Helper function to get pending students by school
export const getPendingStudentsBySchool = (schoolId) => {
  return mockUsers.filter(user => user.schoolId === schoolId && user.verificationStatus === "pending");
};

// Helper function to get approved students by school
export const getApprovedStudentsBySchool = (schoolId) => {
  return mockUsers.filter(user => user.schoolId === schoolId && user.verificationStatus === "approved");
};