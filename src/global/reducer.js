export const initialState = {
    user: null,
    posts: [],
    postanduser: []
}

const reducer = (state, action) => {

    switch(action.type){
            
        case "Set_User":
            return{
                ...state,
                user: action.user
            }
        
        case "Add_Posts": 
        
            return{

                ...state,
                posts: [action.posts, ...state.posts]

            }
            
        case "Add_PostsAndUser": 

        return{
                ...state,
                postanduser: [...state.postanduser, ...action.item ]
            }



        case "Delete_PostsAndUser": 
            let remArray = state.postanduser.filter(({_id})=> _id !== action.id)
            return{
                ...state,
                postanduser: remArray
            }


        default: 
            return state;
    }
}

export default reducer;