// import { EmployeeType } from '@/@types/Type';
// import { createSlice } from '@reduxjs/toolkit';
// import { employeeApi } from './employeeApi';




// interface EmployeeState {
//     data: EmployeeType[];
// }

// const initialState: EmployeeState = {
//     data: [],
// };


// const employeeSlice = createSlice({
//     name: "employee",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
          
//             .addMatcher(
//                 employeeApi.endpoints.fetchEmployees.matchFulfilled,
//                 (state, action) => {
//                     state.data = action.payload; 
//                 }
//             )
       
//             .addMatcher(
//                 employeeApi.endpoints.addEmployee.matchFulfilled,
//                 (state, action) => {
//                     const newEmployee: EmployeeType = action.payload;
//                     state.data.push(newEmployee); 
//                 }
//             )
           
//             .addMatcher(
//                 employeeApi.endpoints.editEmployee.matchFulfilled,
//                 (state, action) => {
//                     const index = state.data.findIndex((emp) => emp.id === action.payload.id);
//                     if (index !== -1) {
//                         state.data[index] = action.payload; 
//                     }
//                 }
//             )
          
//             .addMatcher(
//                 employeeApi.endpoints.deleteEmployee.matchFulfilled,
//                 (state, action) => {
                
//                     state.data = state.data.filter((emp) => emp.id !== action.payload);
//                 }
//             );
//     },
// });

// export default employeeSlice;