"use client";

import { useEffect } from "react";

import { getCurrentUserProfileAction } from "@/actions/profile.actions";
import { useUserStore } from "@/store/userStore";

export default function UserStoreHydrator() {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    getCurrentUserProfileAction().then((result) => {
      if (result.ok && result.data) {
        setUser(result.data);
      }
    });
  }, [setUser]);

  return null;
}
