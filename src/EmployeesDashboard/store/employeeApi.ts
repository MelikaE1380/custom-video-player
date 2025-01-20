
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { config } from "@/configs/config";
// import { EmployeeType } from "@/@types/Type";



// export const employeeApi = createApi({
//     reducerPath: 'employeeApi', 
//     baseQuery: fetchBaseQuery({ baseUrl: config.APP_URL}), 
//     tagTypes: ['Employee'], 
//     endpoints: (builder) => ({
      
//         fetchEmployees: builder.query<EmployeeType[], void>({
//             query: () => 'employees', 
//             providesTags: ['Employee'], 
//         }),

    
//         addEmployee: builder.mutation<EmployeeType, EmployeeType>({
//             query: (employee) => ({
//                 url: 'employees', 
//                 method: 'POST',
//                 body: employee,
//             }),
         
//             invalidatesTags: ['Employee'],
//         }),

      
//         editEmployee: builder.mutation<EmployeeType, EmployeeType>({
//             query: (employee) => ({
//                 url: `employees/${employee.id}`,
//                 method: 'PUT',
//                 body: employee,
//             }),
//             invalidatesTags: ['Employee'], 
//         }),

     
//         deleteEmployee: builder.mutation<void, { id: number }>({ 
//             query: (employee) => ({
                
//                 url: `employees/${employee.id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Employee'], 
//         }),
//     }),
// });

// export const {
//     useFetchEmployeesQuery,
//     useAddEmployeeMutation,
//     useEditEmployeeMutation,
//     useDeleteEmployeeMutation,
// } = employeeApi;