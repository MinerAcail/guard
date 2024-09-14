// types.ts

export interface Student {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    gender?: 'male' | 'female'; // Optional
    grade: string;
    parentContact: string;
  } 
  
  export interface Staff {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    gender?: 'male' | 'female'; // Optional
    password: string;
    confirmPassword: string;
    position: 'teacher' | 'admin' | 'maintenance';
    superviseGrade: string;
  }
  