import "./UserAvatar.css";

export const UserAvatar = ({ firstName = "", lastName = "" }) => {
  const initialFirst = firstName ? firstName.charAt(0).toUpperCase() : "";
  const initialLast = lastName ? lastName.charAt(0).toUpperCase() : "";
  const initials = `${initialFirst}${initialLast}` || "U";

  return (
    <div className="ua-container">
      <div className="ua-avatar" title={`${firstName} ${lastName}`}>
        {initials}
      </div>
    </div>
  );
};