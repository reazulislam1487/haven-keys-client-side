import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });

  const handleAction = async (type, id, label) => {
    try {
      await axios.patch(`http://localhost:5000/users/${type}/${id}`);
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
        await axios.delete(`http://localhost:5000/users/${id}`);
        Swal.fire("Deleted", "User removed", "success");
        queryClient.invalidateQueries(["users"]);
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Users</h2>
      <table className="table w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role / Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                {u.fraud ? (
                  <span className="text-red-600 font-bold">Fraud</span>
                ) : (
                  u.role
                )}
              </td>
              <td className="space-x-2">
                {!u.fraud && (
                  <>
                    <button
                      onClick={() => handleAction("admin", u._id, "Make Admin")}
                      className="btn btn-xs bg-blue-600 text-white"
                      disabled={u.role === "admin"}
                    >
                      Make Admin
                    </button>
                    <button
                      onClick={() => handleAction("agent", u._id, "Make Agent")}
                      className="btn btn-xs bg-green-600 text-white"
                      disabled={u.role === "agent"}
                    >
                      Make Agent
                    </button>
                    {u.role === "agent" && (
                      <button
                        onClick={() =>
                          handleAction("fraud", u._id, "Marked as Fraud")
                        }
                        className="btn btn-xs bg-yellow-500 text-white"
                      >
                        Mark as Fraud
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={() => handleDelete(u._id)}
                  className="btn btn-xs bg-red-600 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
