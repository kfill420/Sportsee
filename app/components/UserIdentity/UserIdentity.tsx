import type { UserInfos } from "~/types/user";
import { formatDate } from "~/utils/date";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import "./UserIdentity.scss";

type UserIdentityProps = {
  userInfos: UserInfos;
};

export default function UserIdentity({ userInfos }: UserIdentityProps) {
  return (
    <div className="user-identity">
      <ProfilePhoto userInfos={userInfos} />
      <div>
        <h1 className="user-identity__name">
          {userInfos.firstName} {userInfos.lastName}
        </h1>
        <p className="user-identity__since">
          Membre depuis le {formatDate(userInfos.createdAt)}
        </p>
      </div>
    </div>
  );
}
