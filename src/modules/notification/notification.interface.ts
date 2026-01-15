export interface INotify {
    title:string
    content:string
    image?:string
    emails?:string[]
}

export interface INotifyEmail {
    subject:string
    content:string
    email:string
}