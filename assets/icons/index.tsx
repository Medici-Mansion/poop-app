import { default as CommunityIconActive } from "./bottom-tabs/community_bottomtab.svg";
import { default as CommunityIcon } from "./bottom-tabs/community_inactive_bottomtab.svg";

import { default as ProfileActiveIcon } from "./bottom-tabs/profile_active_bottomtab.svg";
import { default as ProfileIcon } from "./bottom-tabs/profile_bottomtab.svg";

const Community = ({
  focused = false,

  ...rest
}: SvgProps & { focused?: boolean }) => {
  return focused ? (
    <CommunityIconActive {...rest} />
  ) : (
    <CommunityIcon {...rest} />
  );
};
const Profile = ({
  focused = false,

  ...rest
}: SvgProps & { focused?: boolean }) => {
  return focused ? <ProfileActiveIcon {...rest} /> : <ProfileIcon {...rest} />;
};

export { default as InputDeleteButton } from "./input-delete-button.svg";
export { default as InputCheckbutton } from "./input-check-button.svg";
export { default as InputEyeOn } from "./input-eye-on.svg";
export { default as InputEyeOff } from "./input-eye-off.svg";
export { default as CheckInactive } from "./check_inactive.svg";
export { default as CheckActive } from "./check_active.svg";

export { default as ArrowInactive } from "./arrow_inactive.svg";
export { default as ArrowActive } from "./arrow_active.svg";

export { default as Challenge } from "./challenge.svg";
export { default as Write } from "./write.svg";

export { default as ChavronLeft } from "./chevron_left.svg";

export { default as ArrowSmall } from "./arrow_small.svg";
export { default as ArrowLeft } from "./arrow_left.svg";
export { default as Apple } from "./apple.svg";
export { default as Google } from "./google.svg";

import { SvgProps } from "react-native-svg";
// Bottom Tab Icons
export { Community, Profile };
export { default as Plus } from "./plus_bottomtab.svg";
export { default as PlusActive } from "./plus-active_bottomtab.svg";
export { default as Search } from "./search.svg";
export { default as Home } from "./home.svg";
export { default as HomeActive } from "./home_active.svg";
