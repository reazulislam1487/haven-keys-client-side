import React from "react";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const AdminProfile = () => {
  const { user } = useAuth();
  const { role, isRoleLoading } = useUserRole();

  if (!user || isRoleLoading) {
    return (
      <div className="text-center text-[#636e72] mt-20 text-lg font-medium animate-pulse">
        Loading admin profile...
      </div>
    );
  }

  const isAdmin = role && role !== "user";

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-[#FFF9F0] border border-[#F4F6F8] shadow-xl rounded-2xl">
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="Admin"
          className="w-32 h-32 rounded-full border-4 border-[#27AE60] object-cover shadow-md"
        />

        <h2 className="text-3xl font-bold text-[#2C3E50]">
          {user.displayName || "Unnamed Admin"}
        </h2>

        <p className="text-[#636e72] text-sm">{user.email}</p>

        {isAdmin && (
          <span className="bg-[#00B894]/10 text-[#00B894] px-4 py-1 rounded-full text-sm font-semibold border border-[#00B894] mt-1">
            Role: {role}
          </span>
        )}

        {/* Optional Admin Info */}
        <div className="w-full mt-6 border-t border-[#F4F6F8] pt-5 text-left text-sm text-[#2D3436] space-y-2">
          <p>
            <span className="font-semibold">📞 Phone:</span>{" "}
            {user.phoneNumber || "Not provided"}
          </p>
          <p>
            <span className="font-semibold">🗓️ Joined:</span>{" "}
            {user.metadata?.creationTime?.slice(0, 16) || "N/A"}
          </p>
          <p>
            <span className="font-semibold">✔️ Account Status:</span>{" "}
            {isAdmin ? "Administrator Verified" : "Regular User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
