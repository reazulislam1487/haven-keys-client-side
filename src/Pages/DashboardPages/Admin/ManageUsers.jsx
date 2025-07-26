import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const instance = useAxiosSecure();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await instance.get("/users");
      return res.data;
    },
  });

  const handleAction = async (type, id, label) => {
    try {
      await instance.patch(`/users/${type}/${id}`);
      Swal.fire("Success", `${label} successful`, "success");
      queryClient.invalidateQueries(["users"]);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted from both DB and Firebase.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        await instance.delete(`/users/${id}`);
        Swal.fire("Deleted", "User removed", "success");
        queryClient.invalidateQueries(["users"]);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="overflow-x-auto px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#2C3E50]">
        Manage Users
      </h2>
      <div className="overflow-hidden rounded-xl shadow-md border border-[#F4F6F8]">
        <table className="table w-full text-sm bg-white">
          <thead className="bg-[#F4F6F8] text-[#2C3E50] uppercase font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role / Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 font-medium text-gray-700">
                  {u.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                <td className="px-6 py-4">
                  {u.fraud ? (
                    <span className="text-red-600 font-bold">Fraud</span>
                  ) : (
                    <span className="capitalize text-[#2D3436]">{u.role}</span>
                  )}
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  {!u.fraud && (
                    <>
                      <button
                        onClick={() =>
                          handleAction("admin", u._id, "Make Admin")
                        }
                        disabled={u.role === "admin"}
                        className={`btn btn-xs ${
                          u.role === "admin"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#2563EB] hover:bg-blue-700 text-white"
                        }`}
                      >
                        Make Admin
                      </button>

                      <button
                        onClick={() =>
                          handleAction("agent", u._id, "Make Agent")
                        }
                        disabled={u.role === "agent"}
                        className={`btn btn-xs ${
                          u.role === "agent"
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-[#27AE60] hover:bg-green-700 text-white"
                        }`}
                      >
                        Make Agent
                      </button>

                      {u.role === "agent" && (
                        <button
                          onClick={() =>
                            handleAction("fraud", u._id, "Marked as Fraud")
                          }
                          className="btn btn-xs bg-[#F39C12] hover:bg-yellow-600 text-white"
                        >
                          Mark as Fraud
                        </button>
                      )}
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="btn btn-xs bg-[#E74C3C] hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
