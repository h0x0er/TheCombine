import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import { ExitToApp, Person, SettingsApplications } from "@material-ui/icons";
import React from "react";
import { Translate } from "react-localize-redux";

import { getUser } from "../../backend";
import * as LocalStorage from "../../backend/localStorage";
import history from "../../history";
import theme from "../../types/theme";
import { User } from "../../types/user";

export async function getIsAdmin(): Promise<boolean> {
  const userId = LocalStorage.getUserId();
  return await getUser(userId)
    .then((user: User) => {
      return user.isAdmin;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

/**
 * Avatar in appbar with dropdown UserMenu
 */
export default function UserMenu() {
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(
    null
  );
  const avatar = LocalStorage.getAvatar();
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorElement(event.currentTarget);
  }

  function handleClose() {
    setAnchorElement(null);
  }

  getIsAdmin().then((result) => setIsAdmin(result));

  return (
    <React.Fragment>
      <Button
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {avatar ? (
          <Avatar alt="User avatar" src={avatar} />
        ) : (
          <Person style={{ fontSize: 40 }} />
        )}
      </Button>
      <Menu
        getContentAnchorEl={null}
        id="user-menu"
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <UserMenuList isAdmin={isAdmin} />
      </Menu>
    </React.Fragment>
  );
}

interface UserMenuListProps {
  isAdmin: boolean;
}

/**
 * UserMenu options: site settings (for admins), user settings, log out
 */
export function UserMenuList(props: UserMenuListProps) {
  return (
    <React.Fragment>
      {/* Only show Site Settings link to Admin users. */}
      {props.isAdmin && (
        <MenuItem
          onClick={() => {
            LocalStorage.setProjectId("");
            history.push("/site-settings");
          }}
        >
          <SettingsApplications style={{ marginRight: theme.spacing(1) }} />
          <Translate id="userMenu.siteSettings" />
        </MenuItem>
      )}

      <MenuItem
        onClick={() => {
          history.push("/user-settings");
        }}
      >
        <Person style={{ marginRight: theme.spacing(1) }} />
        <Translate id="userMenu.userSettings" />
      </MenuItem>

      <MenuItem
        onClick={() => {
          history.push("/login");
        }}
      >
        <ExitToApp style={{ marginRight: theme.spacing(1) }} />
        <Translate id="userMenu.logout" />
      </MenuItem>
    </React.Fragment>
  );
}
