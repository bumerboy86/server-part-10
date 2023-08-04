import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";

interface IUSerState {
    user: IUser | null
}

const initialState: IUSerState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },

        clearUser: (state) => {
            state.user = null
        },

    }
});

export const { setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;