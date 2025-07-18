// // PropertyBought.jsx
// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import useAuth from "../../../hooks/useAuth";

// const PropertyBought = () => {
//   const { user } = useAuth();

//   const {
//     data: offersData,
//     isLoading,
//     isError,
//     error,
//   } = useQuery({
//     queryKey: ["boughtProperties", user?.email],
//     queryFn: async () => {
//       const res = await axios.get(
//         `http://localhost:5000/bought-properties?email=${user?.email}`
//       );
//       return res.data;
//     },
//     enabled: !!user?.email,
//   });

//   const offers = Array.isArray(offersData) ? offersData : [];

//   if (isLoading) return <p className="text-center">Loading offers...</p>;
//   if (isError)
//     return (
//       <p className="text-center text-red-600">
//         Error loading offers: {error.message}
//       </p>
//     );
//   if (offers.length === 0)
//     return <p className="text-center">No offers found.</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {offers.map((item) => (
//         <div key={item._id} className="bg-white p-4 rounded-xl shadow-lg">
//           {/* Property Image */}
//           <img
//             src={item.propertyImage || "https://via.placeholder.com/400x200"}
//             alt={item.propertyTitle || "Property"}
//             className="rounded-lg h-40 w-full object-cover"
//           />

//           {/* Property Title */}
//           <h3 className="text-lg font-semibold mt-3">
//             {item.propertyTitle || "Untitled Property"}
//           </h3>

//           {/* Property Location */}
//           <p className="text-gray-700 mt-1">
//             📍 {item.propertyLocation || "Location not available"}
//           </p>

//           {/* Agent Name */}
//           <p className="text-sm text-gray-600 mt-2">
//             🧑 Agent: {item.agentName || "Unknown"}
//           </p>

//           {/* Offered Amount */}
//           <p className="text-blue-600 font-medium mt-2">
//             💰 Offered Amount: ${item.offerAmount || "N/A"}
//           </p>

//           {/* Status */}
//           <p
//             className={`mt-2 font-semibold ${
//               item.status === "accepted" ? "text-green-600" : "text-yellow-600"
//             }`}
//           >
//             Status: {item.status || "pending"}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PropertyBought;
// PropertyBought.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const PropertyBought = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: offersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["boughtProperties", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/bought-properties?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const offers = Array.isArray(offersData) ? offersData : [];

  if (isLoading) return <p className="text-center">Loading offers...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600">
        Error loading offers: {error.message}
      </p>
    );
  if (offers.length === 0)
    return <p className="text-center">No offers found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((item) => (
        <div key={item._id} className="bg-white p-4 rounded-xl shadow-lg">
          {/* Property Image */}
          <img
            src={item.propertyImage || "https://via.placeholder.com/400x200"}
            alt={item.propertyTitle || "Property"}
            className="rounded-lg h-40 w-full object-cover"
          />

          {/* Property Title */}
          <h3 className="text-lg font-semibold mt-3">
            {item.propertyTitle || "Untitled Property"}
          </h3>

          {/* Property Location */}
          <p className="text-gray-700 mt-1">
            📍 {item.propertyLocation || "Location not available"}
          </p>

          {/* Agent Name */}
          <p className="text-sm text-gray-600 mt-2">
            🧑 Agent: {item.agentName || "Unknown"}
          </p>

          {/* Offered Amount */}
          <p className="text-blue-600 font-medium mt-2">
            💰 Offered Amount: ${item.offerAmount || "N/A"}
          </p>

          {/* Status */}
          <p
            className={`mt-2 font-semibold ${
              item.status === "accepted"
                ? "text-green-600"
                : item.status === "bought"
                ? "text-purple-600"
                : "text-yellow-600"
            }`}
          >
            Status: {item.status || "pending"}
          </p>

          {/* Pay Button / Transaction ID */}
          {item.status === "accepted" && !item.transactionId && (
            <button
              onClick={() =>
                navigate(`/dashboard/payment/${item._id}`, {
                  state: {
                    offerId: item._id,
                    amount: item.offerAmount,
                    propertyTitle: item.propertyTitle,
                  },
                })
              }
              className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-4 rounded-md"
            >
              Pay
            </button>
          )}

          {item.status === "bought" && item.transactionId && (
            <p className="mt-3 text-sm text-gray-800">
              🧾 Transaction ID:{" "}
              <span className="text-blue-700 font-semibold">
                {item.transactionId}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
