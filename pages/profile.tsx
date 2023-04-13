import React, { useState } from "react";
import profileStyles from "../styles/Profile.module.css";
import Layout from '../components/Layout';

const Profile: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [mobile, setMobile] = useState("123-456-7890");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  const handleSave = () => {
    // Save the changes
    console.log("Save clicked");
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmNewPassword) {
      setPassword(newPassword);
      setIsEditingPassword(false);
      setIsSaveEnabled(true);
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <Layout>
    <div className={profileStyles.container}>
      <h1 className={profileStyles.title}>Profile</h1>
      <div className={profileStyles.field}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setIsSaveEnabled(true);
          }}
        />
      </div>
      <div className={profileStyles.field}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsSaveEnabled(true);
          }}
        />
      </div>
      <div className={profileStyles.field}>
        <label>Mobile:</label>
        <input type="tel" value={mobile} readOnly />
      </div>
      <div className={profileStyles.field}>
        <label>Password:</label>
        <input type="password" value={password} readOnly />
        {!isEditingPassword ? (
          <button onClick={handleEditPassword}>Edit</button>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Set</button>
          </>
        )}
      </div>
      {isSaveEnabled && (
        <button className={profileStyles.saveButton} onClick={handleSave}>
          Save
        </button>
      )}
    </div>
    </Layout>
    
  );
};

export default Profile;
