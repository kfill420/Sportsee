import type { UserInfos } from "~/types/user";
import "./ProfilePhoto.scss";

type ProfilePhotoProps = {
  userInfos: Pick<UserInfos, "profilePicture" | "firstName" | "lastName">;
};

export default function ProfilePhoto({ userInfos }: ProfilePhotoProps) {
  const { profilePicture, firstName, lastName } = userInfos;

  return (
    <img
      className="profile-photo"
      src={profilePicture}
      alt={`${firstName} ${lastName}`}
    />
  );
}
