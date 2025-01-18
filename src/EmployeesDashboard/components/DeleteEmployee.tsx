// import { ModalUserType } from "@/@types/Type";
// import { useDeleteEmployeeMutation } from "../store/employeeApi";
// import { toast } from "react-toastify";



// function DeleteEmployee({ show, onClose, employee, onSubmit }: ModalUserType) {
//     const [deleteEmployee] = useDeleteEmployeeMutation();

//     const handleDelete = async () => {
//         if (employee) {
//             console.log('Employee ID:', employee.id); 
//             try {
//                 await deleteEmployee({ id: employee.id });  
//                 onSubmit(employee.id);
//                 onClose();
//             } catch (error) {
//                 console.error('Error deleting employee:', error);
//                 toast.error("خطا در حذف کارمند. لطفا دوباره تلاش کنید.");
//             }
//         } else {
//             console.error('Employee object is undefined');
//         }
//     };

//     if (!show) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex justify-center items-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm transition-opacity duration-300">
//             <div className="w-[90%] sm:w-[45%] lg:w-[30%] bg-white rounded-lg justify-center shadow-lg flex items-center flex-col px-6 pb-8 pt-6">
//                 <div className="text-center mb-6">
//                     <p className="text-xl font-semibold text-gray-800">
//                         آیا می‌خواهید کارمند با نام{' '}
//                         <span className="font-bold text-blue-600">{employee?.name}</span> حذف شود؟
//                     </p>
//                 </div>

//                 <div className="flex gap-4 w-full justify-center mt-6">
//                     <button
//                         className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full text-lg font-semibold transition-colors duration-300"
//                         onClick={onClose}
//                     >
//                         <p>لغو</p>
//                     </button>

//                     <button
//                         className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full text-lg font-semibold transition-colors duration-300"
//                         onClick={handleDelete}
//                     >
//                         <p>حذف</p>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DeleteEmployee;