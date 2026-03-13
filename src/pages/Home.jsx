import UseUser from "../hooks/UseUser.jsx";

import Dashboard from "../components/Dashboard/Dashboard.jsx";

const Home = () => {
  UseUser();

  return (
    <div className="home">
      <Dashboard activeMenu="Dashboard">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Budget Buddy!</h1>
            <p className="text-gray-600">Please log in to access your dashboard and manage your budget.</p>
          </div>
      </Dashboard>
    </div>
  );
}

export default Home;