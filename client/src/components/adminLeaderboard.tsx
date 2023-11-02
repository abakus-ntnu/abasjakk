import { useEffect, useState } from "preact/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser, softDeleteUser, updateUser } from "@/api/user";
import { User } from "@/types";
import "@/styles/leaderboard.css";

interface Props {
  data: User[];
  initialData: User[];
  hasStarted?: boolean;
}

const AdminLeaderboard = ({ data, initialData, hasStarted }: Props) => {
  const [users, setUsers] = useState(data);

  useEffect(() => {
    data.sort((a, b) => b.score - a.score);
    setUsers(data);
  }, [data]);

  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  const softDeleteUserMutation = useMutation({
    mutationFn: softDeleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  const findUserById = (id: string) => users.find((user) => user._id === id);

  const handleChange = (id: string, event: any, changeName = false) => {
    const arr = [...users];
    const user = arr.find((user) => user._id === id);
    if (changeName) {
      user.name = event.target.value;
    } else {
      user.score = event.target.value;
    }
    setUsers(arr);
  };

  return (
    <table className="adminLeaderboard">
      <caption>Leaderboard</caption>
      <tr>
        <th>Posisjon</th>
        <th className="nameHeader">Navn</th>
        <th className="scoreHeader">Score</th>
        <th />
      </tr>
      {data.map((user, index) => {
        return (
          <tr key={index} className={user.isDeleted ? "deleted" : ""}>
            <td>{initialData.indexOf(user) + 1}</td>
            <td>
              <input
                type="text"
                className="inputName"
                style={{ textDecoration: user.isDeleted && "line-through" }}
                value={user.name}
                onChange={(e) => handleChange(user._id, e, true)}
              />
            </td>
            <td>
              <input
                type="number"
                className="inputScore"
                style={{ textDecoration: user.isDeleted && "line-through" }}
                value={user.score}
                onChange={(e) => handleChange(user._id, e)}
              />
            </td>
            <td className="imageBox">
              <img
                src="src/public/save.svg"
                className="save"
                onClick={() =>
                  updateUserMutation.mutate(findUserById(user._id))
                }
              />
              <img
                src="src/public/x.svg"
                className="x"
                onClick={() =>
                  hasStarted
                    ? softDeleteUserMutation.mutate(findUserById(user._id))
                    : deleteUserMutation.mutate(findUserById(user._id))
                }
              />
            </td>
          </tr>
        );
      })}
    </table>
  );
};

export default AdminLeaderboard;
