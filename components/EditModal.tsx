import React, { useState } from "react";
import profileStyles from "../styles/Profile.module.css";

interface EditModalProps {
  field: string;
  onClose: () => void;
  onSaveChanges: (newFieldValue: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  field,
  onClose,
  onSaveChanges,
}) => {
  const [newFieldValue, setNewFieldValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  const handleSave = () => {
    if (field === "password" && newFieldValue !== confirmValue) {
      alert("Passwords do not match");
      return;
    }
    onSaveChanges(newFieldValue);
  };

  return (
    <div className={profileStyles.modalOverlay}>
      <div className={profileStyles.modal}>
        <h2>Edit {field}</h2>
        <input
          type={field === "password" ? "password" : "text"}
          value={newFieldValue}
          onChange={(e) => setNewFieldValue(e.target.value)}
          placeholder={`Enter new ${field}`}
        />
        {field === "password" && (
          <input
            type="password"
            value={confirmValue}
            onChange={(e) => setConfirmValue(e.target.value)}
            placeholder="Confirm new password"
          />
        )}
        <div className={profileStyles.modalActions}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
