export interface UserInfo {
    name: string,
    email: string,
    password: string,
    confirm_password?: string,
    articles?: []
}

export interface SignInUser {
    email: string,
    password: string
}

export interface HeaderContextType {
    userLogined: string,
    setUserLogined: (name: string) => void
}

export interface CreateFormType {
    title: string,
    text?: string,
    description: string,
    id?: any,
    creator?: string,
    setDeleteClick?:  any;
    deleteClick?: boolean
}

export interface ArticleCardType {
    title: string,
    description: string,
    text: string,
    creator: string,
    _id: string
}

export interface LoaderProp {
    color?: string;
}
