export interface dataFormat {
    [key: string]: string | number
    firstName: string
    lastName: string
    birthday: number
    street: string
    city: string
    state: string
    zipCode: number
    startDate: number
    department: string
}

export interface dataValidationType {
    firstName: boolean
    lastName: boolean
    startDate: boolean
    department: boolean
    birthday: boolean
    street: boolean
    city: boolean
    state: boolean
    zipCode: boolean
}
