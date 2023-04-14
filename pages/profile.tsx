import React, { useState } from "react";
import profileStyles from "../styles/Profile.module.css";
import Layout from "../components/Layout";
import EditModal from "../components/EditModal";

const Profile: React.FC = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [mobile, setMobile] = useState("123-456-7890");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState("");

  const handleSave = () => {
    // Save the changes
    console.log("Save clicked");
  };

  const handleEdit = (field: string) => {
    setEditingField(field);
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = (newFieldValue: string) => {
    if (editingField === "name") {
      setName(newFieldValue);
    } else if (editingField === "email") {
      setEmail(newFieldValue);
    } else if (editingField === "mobile") {
      setMobile(newFieldValue);
    } else if (editingField === "password") {
      setPassword(newFieldValue);
    }
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className={profileStyles.container}>
        <h1 className={profileStyles.title}>Profile</h1>
        <div className={profileStyles.field}>
          <label>Name:</label>
          <div className={profileStyles.inputWrapper}>
            <input type="text" value={name} readOnly />
            <span
              className={`material-icons ${profileStyles.editIcon}`}
              onClick={() => handleEdit("name")}
            >
              edit
            </span>
          </div>
        </div>
        <div className={profileStyles.field}>
          <label>Email:</label>
          <div className={profileStyles.inputWrapper}>
            <input type="email" value={email} readOnly />
            <span
              className={`material-icons ${profileStyles.editIcon}`}
              onClick={() => handleEdit("email")}
            >
              edit
            </span>
          </div>
        </div>
        <div className={profileStyles.field}>
          <label>Mobile:</label>
          <div className={profileStyles.inputWrapper}>
            <input type="tel" value={mobile} readOnly />
            <span
              className={`material-icons ${profileStyles.editIcon}`}
              onClick={() => handleEdit("mobile")}
            >
              edit
            </span>
          </div>
        </div>
        <div className={profileStyles.field}>
          <label>Password:</label>
          <div className={profileStyles.inputWrapper}>
            <input type="password" value={password} readOnly />
            <span
              className={`material-icons ${profileStyles.editIcon}`}
              onClick={() => handleEdit("password")}
            >
              edit
            </span>
          </div>
        </div>       
      </div>
      {isEditing && (
        <EditModal
          field={editingField}
          onClose={handleClose}
          onSaveChanges={handleSaveChanges}
        />
      )}
    </Layout>
  );
};

export default Profile;
