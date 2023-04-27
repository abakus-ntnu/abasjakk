import { useEffect, useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { DeleteUser, UpdateUser } from "src/api/user";
import "src/styles/leaderboard.css";
import { LeaderboardProps } from "src/types";

const AdminLeaderboard = ({ data, initialData, getUsersQuery }: LeaderboardProps) => {
    
    const [users, setUsers] = useState(data);

    useEffect(() => {
        data.sort((a, b) => (b.score - a.score));
        setUsers(data);
    }, [data]);
    
    const deleteUser = DeleteUser();
    const updateUser = UpdateUser();
    const Delete = (id: string) => deleteUser.mutate(users.find(user => user._id === id), {
        onSuccess: () => getUsersQuery.refetch()
    });
    const Update = (id: string) => updateUser.mutate(users.find(user => user._id === id), {
        onSuccess: () => getUsersQuery.refetch()
    });

    const handleChange = (id: string, event: any, changeName = false) => {
        const arr = [...users];
        const user = arr.find(user => user._id === id);
        if (changeName) {
            user.name = event.target.value;
        } else {
            user.score = event.target.value;
        }
        setUsers(arr);
    }

    return (
        <table className="adminLeaderboard">
            <tr>
                <th>Posisjon</th>
                <th className="nameHeader">Navn</th>
                <th className="scoreHeader">Score</th>
                <th />
            </tr>
            {data.map((user, index) => {
                return (
                    <tr key={index}>
                        <td>{initialData.indexOf(user) + 1}</td>
                        <td><input type="text" className="inputName" value={user.name} onChange={(e) => handleChange(user._id, e, true)} /></td>
                        <td><input type="number" className="inputScore" value={user.score} onChange={(e) => handleChange(user._id, e)} /></td>
                        <td className="imageBox">
                            <img src="src/public/save.svg" className="save" onClick={() => Update(user._id)} />
                            <img src="src/public/x.svg" className="x" onClick={() => Delete(user._id)} />
                        </td>
                    </tr>
                );
            })}
        </table>
    );
}

export default AdminLeaderboard;