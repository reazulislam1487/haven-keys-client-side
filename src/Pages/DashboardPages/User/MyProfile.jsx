import React from "react";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useUserRole();

  if (!user || isRoleLoading) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Loading user info...
      </div>
    );
  }

  const displayRole = role && role !== "user";

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />

        <h2 className="text-2xl font-semibold text-gray-800">
          {user.displayName || "Unnamed User"}
        </h2>

        <p className="text-gray-600 text-sm">
          {user.email || "No Email Found"}
        </p>

        {displayRole && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Role: {role}
          </span>
        )}

        {/* Optional extra info */}
        <div className="w-full mt-4 border-t pt-4 text-left">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Joined:</span>{" "}
            {user.metadata?.creationTime?.slice(0, 16) || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
