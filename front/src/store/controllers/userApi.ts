import { IUser } from "../../interfaces/IUser";
import { IUserPre } from "../../interfaces/IUserPre";
import { api } from "../api";

export const userApi  = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => "/users",
            providesTags: ["User"]
        }),

        deleteUser: builder.mutation<IUser, string>({
            query: (id: string)=> ({
                url: `/users/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        }),

        addUser: builder.mutation<IUser, IUserPre>({
            query: (body: IUserPre)=> ({
                url: `/users`,
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),

        loginUser: builder.mutation<IUser, IUserPre>({
            query: (body: IUserPre)=> ({
                url: `/users/login`,
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),

        editUser: builder.mutation<IUser, IUser>({
            query: (data: IUser) => {
                const {id, ...body} = data;
                return {
                    url: `/users/${id}`,
                    method: "PUT",
                    body
                }
            },
            invalidatesTags: ["User"]
        }),

    }),
})

export const { 
                useGetUsersQuery,
                useDeleteUserMutation,
                useAddUserMutation,
                useEditUserMutation,
                useLoginUserMutation
            } = userApi;