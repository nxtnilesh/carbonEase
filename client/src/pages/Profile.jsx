import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <p className="text-gray-600">This is your protected profile page.</p>
      <Button className="mt-4" onClick={logoutUser}>Logout</Button>
    </div>
  );
};

export default Profile;
