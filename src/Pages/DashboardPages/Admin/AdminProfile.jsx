import React from "react";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const AdminProfile = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useUserRole();

  if (!user || isRoleLoading) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Loading admin profile...
      </div>
    );
  }

  const isAdmin = role && role !== "user";

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="Admin"
          className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
        />

        <h2 className="text-2xl font-bold text-gray-800">
          {user.displayName || "Unnamed Admin"}
        </h2>

        <p className="text-gray-600 text-sm">{user.email}</p>

        {isAdmin && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Role: {role}
          </span>
        )}

        {/* Optional Admin Info */}
        <div className="w-full mt-6 border-t pt-4 text-left text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {user.phoneNumber || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Joined:</span>{" "}
            {user.metadata?.creationTime?.slice(0, 16) || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Account Status:</span>{" "}
            {isAdmin ? "Administrator Verified" : "Regular User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
