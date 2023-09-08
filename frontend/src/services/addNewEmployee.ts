export default async function addNewEmployee(data: object) {
    if (import.meta.env.PROD) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        return fetch(
            'https://oc-p14-hrnet-full-app-git-main-maxew33.vercel.app/api/employees',
            requestOptions
        )
            .then((res) => {
                return res.json()
            })

            .catch((err) => {
                console.error('Error in updating profile', err)
            })
    } else {
        console.warn('you are not connected with the db')
    }
}