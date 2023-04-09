const ProfileView = ({ name, email, mobile }: { name: string; email: string; mobile: string }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h3 className="mb-2 text-xl font-semibold">Profile</h3>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Mobile: {mobile}</p>
    </div>
  );
};

export default ProfileView;