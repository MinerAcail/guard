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
    confirmPassword?: string;
    position: "teacher" | "admin" | "maintenance";
    superviseGrade: string;
  }
  

 export type Parent = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string; // Consider using Date if you prefer date objects
    address: string;
    gender?: 'male' | 'female'; // Optional // Adjust as necessary based on your use case
    password: string;
    position: "teacher";

    confirmPassword?: string;
    supervise: string[]; // Array of UUIDs as strings
  };
  