import "./ProfileData.scss";

type ProfileDataProps = {
  label?: string;
  value?: React.ReactNode;
  unit?: string;
};

export default function ProfileData({ label, value, unit }: ProfileDataProps) {
  return (
    <div className="profile-data">
      {label && <p className="profile-data__label">{label}</p>}
      {value !== undefined && (
        <p className="profile-data__value">
          {value}
          {unit && <span className="profile-data__unit"> {unit}</span>}
        </p>
      )}
    </div>
  );
}
