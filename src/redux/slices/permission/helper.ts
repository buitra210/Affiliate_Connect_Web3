import { merge } from "lodash";
import { UserPermission, UserRole } from ".";

const USER_ROLE_LIST: UserRole[] = ["create", "view", "list", "update", "delete"];

export const parseRole = (item: string): {} => {
  if (!item) {
    return [""];
  }
  const itemSplited = item.split(".");
  if (itemSplited.length === 0) {
    return item;
  }
  if (USER_ROLE_LIST.includes(itemSplited[0] as UserRole)) {
    return { role: { [itemSplited[0]]: true } };
  } else {
    return {
      [itemSplited[0]]: parseRole(itemSplited.slice(1).join(".")),
    };
  }
};

export function updateUserPermission(permissions: string[]): { projects: UserPermission["data"] } {
  let userPermission = {};
  permissions.forEach((permission) => {
    userPermission = merge(userPermission, parseRole(permission));
  });
  return userPermission as { projects: UserPermission["data"] };
}
