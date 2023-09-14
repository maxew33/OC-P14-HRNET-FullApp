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
            process.env.DB_URI ?? '',
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