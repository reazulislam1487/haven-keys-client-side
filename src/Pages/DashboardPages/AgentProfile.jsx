import React from "react";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import Loading from "../Shared/Loading";

const AgentProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (!user || roleLoading) {
    return <Loading></Loading>;
  }

  const isAgent = role && role !== "user";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-[#FFF9F0] border border-[#F4F6F8] shadow-xl rounded-2xl">
      <div className="flex flex-col items-center text-center gap-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="Agent"
          className="w-32 h-32 rounded-full border-4 border-[#FF6F3C] object-cover shadow-md"
        />

        <h2 className="text-3xl font-bold text-[#2C3E50]">
          {user.displayName || "Unnamed Agent"}
        </h2>

        <p className="text-[#636e72] text-sm">{user.email}</p>

        {isAgent && (
          <span className="bg-[#27AE60]/10 text-[#27AE60] px-4 py-1 rounded-full text-sm font-medium border border-[#27AE60] mt-1">
            Role: {role}
          </span>
        )}

        {/* Optional: Additional Info */}
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
            {isAgent ? "Verified Agent" : "Regular User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
