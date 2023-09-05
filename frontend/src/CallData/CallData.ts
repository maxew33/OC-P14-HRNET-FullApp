import { data } from "../__mocks__/store"

export default class CallData{
    private _url: string

    constructor(url: string) {
        this._url = url
    }

    async getEmployeesData() {
        return import.meta.env.PROD
            ? fetch(this._url)
                  .then((res) => {
                    return res.json()
                })
                  .catch((err) => {
                      console.error('an error occurs', err)
                  })
            : data
    }

}