import AdminLeaderboard from "src/components/adminLeaderboard";

const scores = [
  {
    name: "Jenny",
    score: 900
  },
  {
    name: "HOLAA",
    score: 8
  },
  {
    name: "Falk",
    score: 5
  }
];

const AdminPage = () => {
  return (
    <>
      <div>adminPage</div>
      <AdminLeaderboard scores={scores} />
    </>

  );
};


export default AdminPage;
