import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const AgentProfile = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useUserRole();

  if (!user || isRoleLoading) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Loading agent profile...
      </div>
    );
  }

  const isAgent = role && role !== "user";

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="Agent"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />

        <h2 className="text-2xl font-bold text-gray-800">
          {user.displayName || "Unnamed Agent"}
        </h2>

        <p className="text-gray-600 text-sm">{user.email}</p>

        {isAgent && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            Role: {role}
          </span>
        )}

        {/* Optional: Additional agent info */}
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
            {isAgent ? "Verified Agent" : "Regular User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
