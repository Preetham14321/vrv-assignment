import React from 'react';
const Pagination = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage }) => {
   const pageNumbers = [];
 console.log(totalPosts)
   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <div className="flex mt-8 ">
         <ul className="flex bg-white shadow-md">
            <li onClick={previousPage} className="p-3 border-t-2 border-l-2 border-b-2 border-gray">
               Prev
            </li>
            {pageNumbers.map((number) => (
               <li
                  key={number}
                  onClick={() => paginate(number)}
                  className="p-3 border-t-2 border-b-2 border-l-2 border-gray"
               >
                  {number}
               </li>
            ))}
            <li onClick={nextPage} className="p-3 border-2 border-gray">
               Next
            </li>
         </ul>
      </div>
   );
};
 
export default Pagination;