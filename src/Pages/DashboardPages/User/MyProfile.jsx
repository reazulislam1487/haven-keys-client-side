import React from "react";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import { FaUserCircle } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useUserRole();

  if (!user || isRoleLoading) {
    return (
      <div className="text-center text-[#636e72] mt-20 text-lg animate-pulse">
        Loading user info...
      </div>
    );
  }

  const displayRole = role && role !== "user";

  return (
    <div className="max-w-xl mx-auto px-8 py-10 mt-10 bg-[#F4F6F8] rounded-3xl shadow-lg border border-[#E0E0E0]">
      <div className="flex flex-col items-center gap-5 text-center">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User Avatar"
          className="w-36 h-36 rounded-full object-cover border-4 border-[#2C3E50] shadow"
        />

        <h2 className="text-3xl font-semibold text-[#2D3436]">
          {user.displayName || "Unnamed User"}
        </h2>

        <p className="text-base text-[#636e72]">
          {user.email || "No Email Found"}
        </p>

        {displayRole && (
          <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-[#E0F7F1] text-[#00B894] select-none">
            Role: {role}
          </span>
        )}

        <div className="w-full mt-8 border-t border-gray-300 pt-6 text-left text-sm text-[#2D3436] space-y-3 font-medium">
          <p>
            <span className="font-bold">Joined:</span>{" "}
            {user.metadata?.creationTime?.slice(0, 16) || "Unknown"}
          </p>
          {/* Additional user info can go here */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
