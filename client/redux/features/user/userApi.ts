import build from "next/dist/build";
import { apiSlice } from "../api/apiSlice";
import { url } from "inspector";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "users/update-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({name}) => ({
        url: "users/update-info",
        method: "PUT",
        body: { name},
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({oldPassword, newPassword}) => ({
        url: "users/update-password",
        method: "PUT",
        body: {oldPassword, newPassword},
        credentials: "include" as const
      })
    })
    
      

  }),
  

});

export const { useUpdateAvatarMutation, useUpdatePasswordMutation,useEditProfileMutation } = userApi;
