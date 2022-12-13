import {RootState} from "store/store";

export const selectIsGenerating = (state: RootState) => state.adminReducer.isGenerating;